const API_BASE_URL = "http://127.0.0.1:8000"; // FastAPI backend URL

// Fetch all models
export async function fetchModels() {
  try {
    console.log("Fetching models from:", `${API_BASE_URL}/models`);
    
    const response = await fetch(`${API_BASE_URL}/models`, {
      method: "GET",
      mode: "cors",
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

  if (!response.ok) {
    throw new Error(`HTTP Error: ${response.status}`);
  }

  return response.json();
}

// Sanitize feature data to ensure all values are proper numbers
function sanitizeFeatures(features: Record<string, any>): Record<string, number> {
  const sanitized: Record<string, number> = {};
  
  for (const [key, value] of Object.entries(features)) {
    // Convert string numbers to actual numbers
    if (typeof value === 'string' && !isNaN(Number(value))) {
      sanitized[key] = Number(value);
    }
    // Pass numbers through directly
    else if (typeof value === 'number') {
      sanitized[key] = value;
    }
    // Convert booleans to 0/1
    else if (typeof value === 'boolean') {
      sanitized[key] = value ? 1 : 0;
    }
    // Handle Yes/No strings
    else if (value === 'Yes') {
      sanitized[key] = 1;
    }
    else if (value === 'No') {
      sanitized[key] = 0;
    }
    // Set a default value for any unhandled cases
    else {
      console.warn(`Unhandled value type for ${key}: ${typeof value}, value: ${value}. Using 0 as default.`);
      sanitized[key] = 0;
    }
    
    // Ensure the value is not NaN
    if (isNaN(sanitized[key])) {
      console.warn(`Value for ${key} is NaN, using 0 as default.`);
      sanitized[key] = 0;
    }
  }
  
  return sanitized;
}

// Make prediction with model
export async function predictModel(modelId: string, features: Record<string, any>) {
  // Sanitize all feature values to ensure they're proper numbers
  const sanitizedFeatures = sanitizeFeatures(features);
  
  console.log("Making prediction with data:", { model_id: modelId, features: sanitizedFeatures });
  console.log("Raw features before sanitization:", features);
  console.log("Sanitized features:", sanitizedFeatures);
  
  try {
    const response = await fetch(`${API_BASE_URL}/predict`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        model_id: modelId, 
        features: sanitizedFeatures 
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Server error response:", errorText);
      
      // Add specific handling for the NumPy isnan error
      if (errorText.includes("isnan") && errorText.includes("not supported for the input types")) {
        console.error("NumPy type error detected. This usually happens when non-numeric values are passed to the model.");
        throw new Error("Type error in model prediction: Please ensure all inputs are valid numbers.");
      }
      
      throw new Error(`Prediction failed: ${response.status} - ${errorText}`);
    }
    
    return response.json();
  } catch (error) {
    console.error("Failed to make prediction:", error);
    throw error;
  }
}