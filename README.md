# BioHack25 - Chatters

# Mental Health Analysis for Students

## Overview
This project analyzes various factors influencing student mental health using statistical analysis and machine learning models. The frontend is built with Next.js, while the backend is implemented in FastAPI, providing trained machine learning models for predictions.

## How to Run the Code

### 1. Backend (FastAPI)
#### Prerequisites:
- Python 3.8+
- Install dependencies:
  ```sh
  pip install fastapi uvicorn pandas numpy scikit-learn xgboost
  ```

#### Steps to Run:
1. Navigate to the backend folder:
   ```sh
   cd backend
   ```
2. Start the FastAPI server:
   ```sh
   uvicorn main:app --host 0.0.0.0 --port 8000 --reload
   ```
3. Access API docs at `http://localhost:8000/docs`

### 2. Frontend (Next.js)
#### Prerequisites:
- Node.js 16+
- Install dependencies:
  ```sh
  npm install --force (some legacy code may cause unnecessaary install cancels)
  ```

#### Steps to Run:
1. Navigate to the frontend folder:
   ```sh
   cd frontend
   ```
2. Start the Next.js development server:
   ```sh
   npm run dev
   ```
3. Open `http://localhost:3000` in the browser.

## Implemented Statistical Analyses

### 1. **ANOVA (Analysis of Variance)**
- Used to determine statistical significance of factors affecting depression.
- Factors analyzed:
  - Sleep Duration
  - Dietary Habits
  - Academic Pressure
  - CGPA
  - Work/Study Hours

### 2. **Correlation Analysis**
- Examines the relationship between various factors and depression levels.
- Displayed via heatmaps.

### 3. **Mosaic Plots**
- Visual representation of categorical data relationships (e.g., Gender vs. Depression, Sleep Duration vs. Depression).

### 4. **Descriptive Statistics**
- Summary metrics including mean, median, standard deviation, min, and max values.

### 5. **Chi-Square Tests**
- Analyzes categorical associations (e.g., Gender, Family History, Suicidal Thoughts).

## Machine Learning Models
The backend trains the following models on every startup:
1. **Random Forest**
2. **Logistic Regression**
3. **XGBoost**

### Model Performance Metrics:
- Accuracy
- Precision
- Recall
- F1 Score
- Confusion Matrix
- Feature Importance

## API Endpoints

### 1. **Predict Depression Probability**
**Endpoint:** `POST /predict`
```json
{
  "model_id": "RandomForest",
  "features": {
    "Academic Pressure": 4,
    "Work/Study Hours": 15,
    "Financial Stress": 6,
    "Dietary Habits": 1,
    "Sleep Duration": 6.5,
    "Family History of Mental Illness": 0,
    "Have you ever had suicidal thoughts ?": 1,
    "CGPA": 3.5,
    "Gender": 1
  }
}
```

### 2. **Get Available Models**
**Endpoint:** `GET /models`
- Returns the list of trained models and their accuracy.

### 3. **Get Model Details**
**Endpoint:** `GET /models/{model_id}`
- Retrieves confusion matrix, feature importance, and evaluation metrics for a specific model.

## Dependencies

### Backend:
- `fastapi`
- `uvicorn`
- `pandas`
- `numpy`
- `scikit-learn`
- `xgboost`

### Frontend:
- `Next.js`
- `ShadCN UI`
- `Recharts`
- `Zustand` (State Management)

## License
This project is open-source and licensed under the MIT License.

