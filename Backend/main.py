from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.pipeline import Pipeline
from sklearn.compose import ColumnTransformer
from sklearn.decomposition import PCA
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestClassifier
from xgboost import XGBClassifier
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score, confusion_matrix

app = FastAPI()

# Enable CORS for your frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # allow your Next.js frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load dataset
df = pd.read_csv("Student_depression_dataset.csv")

# Data Preprocessing
df.drop(columns=["Work Pressure", "Job Satisfaction", "Degree", "City"], inplace=True)

# Mapping categorical values to numeric
sleep_mapping = {
    "Less than 5 hours": 4,
    "5-6 hours": 5.5,
    "7-8 hours": 7.5,
    "More than 8 hours": 9
}
binary_mapping = {"Yes": 1, "No": 0}

df["Have you ever had suicidal thoughts ?"] = df["Have you ever had suicidal thoughts ?"].str.strip().map(binary_mapping)
df["Family History of Mental Illness"] = df["Family History of Mental Illness"].str.strip().map(binary_mapping)
df["Sleep Duration"] = df["Sleep Duration"].map(sleep_mapping)

# Handle missing values
df["Financial Stress"].fillna(df["Financial Stress"].median(), inplace=True)
df["Sleep Duration"].fillna(df["Sleep Duration"].median(), inplace=True)

# Feature selection
selected_features = [
    "Academic Pressure", "Work/Study Hours", "Financial Stress",
    "Dietary Habits", "Sleep Duration", "Family History of Mental Illness",
    "Have you ever had suicidal thoughts ?", "CGPA", "Gender"
]
X = df[selected_features].copy()
y = df["Depression"]

# Define feature types
continuous_features = ["Academic Pressure", "Work/Study Hours", "Financial Stress", "Sleep Duration", "CGPA"]
categorical_features = ["Dietary Habits", "Family History of Mental Illness", "Have you ever had suicidal thoughts ?", "Gender"]

# Preprocessing pipelines
continuous_pipeline = Pipeline([
    ("scaler", StandardScaler()),
    ("pca", PCA(n_components=0.95))
])
categorical_pipeline = Pipeline([
    ("onehot", OneHotEncoder(drop="first"))
])
preprocessor = ColumnTransformer([
    ("cont", continuous_pipeline, continuous_features),
    ("cat", categorical_pipeline, categorical_features)
])

# Split dataset
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, stratify=y, random_state=42)

# Train models
rf_model = Pipeline([
    ("preprocessor", preprocessor),
    ("classifier", RandomForestClassifier(n_estimators=100, random_state=42))
])
logreg_model = Pipeline([
    ("preprocessor", preprocessor),
    ("classifier", LogisticRegression(max_iter=1000, class_weight="balanced", random_state=42))
])

# Add XGBoost model
xgb_model = Pipeline([
    ("preprocessor", preprocessor),
    ("classifier", XGBClassifier(n_estimators=50, max_depth=3, subsample=0.8, learning_rate=0.1, random_state=42, use_label_encoder=False, eval_metric='logloss'))
])

# Train all models
rf_model.fit(X_train, y_train)
logreg_model.fit(X_train, y_train)
xgb_model.fit(X_train, y_train)

# Store trained models in memory
models = {
    "RandomForest": rf_model,
    "LogisticRegression": logreg_model,
    "XGBoost": xgb_model
}

# Compute model evaluation metrics
metrics = {}
for name, model in models.items():
    y_pred = model.predict(X_test)
    
    # Handle feature importance extraction
    feature_importance = None
    if hasattr(model.named_steps["classifier"], "feature_importances_"):
        feature_importance = model.named_steps["classifier"].feature_importances_.tolist()
    elif hasattr(model.named_steps["classifier"], "coef_"):
        feature_importance = model.named_steps["classifier"].coef_[0].tolist()

    metrics[name] = {
        "accuracy": accuracy_score(y_test, y_pred),
        "precision": precision_score(y_test, y_pred),
        "recall": recall_score(y_test, y_pred),
        "f1": f1_score(y_test, y_pred),
        "confusion_matrix": confusion_matrix(y_test, y_pred).tolist(),
        "feature_importance": feature_importance,
    }
    print(f"Feature importance for {name}: {feature_importance}")  # Debug output

# Define the expected input format for prediction
class PredictionInput(BaseModel):
    model_id: str
    features: dict  # Dictionary with input feature values

@app.post("/predict")
def predict(input_data: PredictionInput):
    try:
        model_id = input_data.model_id
        features = input_data.features

        if model_id not in models:
            raise HTTPException(status_code=404, detail="Model not found")

        # Convert user input into a DataFrame
        input_df = pd.DataFrame([features])
        print("Input DataFrame:", input_df)  # Debug print

        model = models[model_id]
        prediction_prob = model.predict_proba(input_df)[0][1]  # Probability for positive class

        return {
            "probability": prediction_prob,
            "prediction": "Depression Likely" if prediction_prob > 0.5 else "Depression Unlikely"
        }
    except Exception as e:
        print("Error in prediction:", e)
        raise HTTPException(status_code=500, detail=str(e))

# Get list of available models
@app.get("/models")
def get_models():
    return [{"id": key, "name": key, "accuracy": value["accuracy"]} for key, value in metrics.items()]

# Get detailed model metrics
@app.get("/models/{model_id}")
def get_model_details(model_id: str):
    if model_id not in metrics:
        raise HTTPException(status_code=404, detail="Model not found")
    return metrics[model_id]

# Health check endpoint
@app.get("/")
def read_root():
    return {"status": "API is running", "models_available": list(models.keys())}