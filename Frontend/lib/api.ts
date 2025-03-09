const API_BASE_URL = "http://127.0.0.1:8000"; // FastAPI backend URL

// Fetch all models
export async function fetchModels() {
  try {
    console.log("Fetching models from:", `${API_BASE_URL}/models`);
    
    const response = await fetch(`${API_BASE_URL}/models`, {
      method: "GET",
      mode: "cors",  // ✅ Ensure CORS mode
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
}

// Fetch model details (accuracy, confusion matrix, etc.)
export async function fetchModelDetails(id: string) {
  const response = await fetch(`${API_BASE_URL}/models/${id}`, {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response.json();
}

// Fetch predictions
export async function fetchPrediction(id: string, inputData: Record<string, any>) {
  const query = new URLSearchParams(inputData).toString();
  const response = await fetch(`${API_BASE_URL}/models/${id}/predict?${query}`, {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response.json();
}


export async function predictModel(modelId: string, features: Record<string, any>) {
    const response = await fetch(`${API_BASE_URL}/predict`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ model_id: modelId, features }),
    });
  
    if (!response.ok) throw new Error("Prediction failed");
    return response.json();
  }