"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Play } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Progress } from "@/components/ui/progress";
import { predictModel } from "@/lib/api";

// Define features for models
const modelFeatures = {
  "RandomForest": [
    { name: "Academic Pressure", type: "slider", min: 0, max: 10 },
    { name: "Work/Study Hours", type: "slider", min: 0, max: 40 },
    { name: "Financial Stress", type: "slider", min: 0, max: 10 },
    { name: "Dietary Habits", type: "slider", min: 0, max: 10 },
    { name: "Sleep Duration", type: "slider", min: 4, max: 10 },
    { name: "Family History of Mental Illness", type: "select", options: ["Yes", "No"] },
    { name: "Suicidal Thoughts", type: "select", options: ["Yes", "No"] },
    { name: "CGPA", type: "slider", min: 2, max: 4 },
    { name: "Gender", type: "select", options: ["Male", "Female", "Other"] }
  ]
};

export function ModelPrediction({ id }: { id: string }) {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<{ probability: number; prediction: string } | null>(null);
  const { toast } = useToast();

  // Get features for the current model or default to empty array
  const features = modelFeatures[id as keyof typeof modelFeatures] || [];
  
  // Initialize form data with default values
  useState(() => {
    const initialData: Record<string, any> = {};
    features.forEach(feature => {
      if (feature.type === "slider") {
        initialData[feature.name] = feature.min;
      }
    });
    setFormData(initialData);
  });

  const handleInputChange = (name: string, value: any) => {
    console.log(`✏️ Input Changed: ${name} ->`, value);
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePredict = async () => {
    console.log("🔄 Predict button clicked!");

    // Ensure all required fields are filled
    const missingFields = features.filter(feature => formData[feature.name] === undefined);
    if (missingFields.length > 0) {
      console.log("⚠️ Missing Fields:", missingFields.map(f => f.name));
      toast({ 
        title: "Missing Information", 
        description: `Please fill in: ${missingFields.map(f => f.name).join(', ')}`, 
        variant: "destructive" 
      });
      return;
    }

    setIsProcessing(true);
    setProgress(0);
    
    // Simulate progress while API call is happening
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        const newProgress = Math.min(prev + 10, 90);
        return newProgress;
      });
    }, 200);

    try {
      console.log("📡 Sending API request with:", { model_id: id, features: formData });

      // Make the API call
      const prediction = await predictModel(id, formData);
      console.log("✅ Prediction Response:", prediction);

      // Set result and complete progress
      setResult(prediction);
      setProgress(100);
      
      // Show success toast
      toast({ 
        title: "Prediction Complete", 
        description: `Result: ${prediction.prediction}`, 
      });
    } catch (error) {
      console.error("❌ Prediction Error:", error);
      toast({ 
        title: "Prediction Failed", 
        description: "Check browser console for details", 
        variant: "destructive" 
      });
    } finally {
      clearInterval(progressInterval);
      setIsProcessing(false);
    }
  };

  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>Run Prediction</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {features.map((feature) => (
          <div key={feature.name} className="space-y-2">
            <Label htmlFor={feature.name}>{feature.name}</Label>

            {feature.type === "slider" && (
              <div className="space-y-2">
                <Slider
                  id={feature.name}
                  min={feature.min}
                  max={feature.max}
                  step={1}
                  value={[formData[feature.name] || feature.min]}
                  onValueChange={(value) => handleInputChange(feature.name, value[0])}
                />
                <span className="text-sm font-medium">{formData[feature.name] || feature.min}</span>
              </div>
            )}

            {feature.type === "select" && (
              <Select value={formData[feature.name] || ""} onValueChange={(value) => handleInputChange(feature.name, value)}>
                <SelectTrigger>
                  <SelectValue placeholder={`Select ${feature.name}`} />
                </SelectTrigger>
                <SelectContent>
                  {feature.options?.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>
        ))}

        {isProcessing && <Progress value={progress} />}
        {result && !isProcessing && (
          <div className="border rounded-lg p-4">
            <h4 className="font-medium">Prediction Result</h4>
            <p className="text-lg">{(result.probability * 100).toFixed(1)}% Chance of Depression</p>
            <p className={`font-medium ${result.probability > 0.5 ? "text-red-500" : "text-green-500"}`}>
              {result.prediction}
            </p>
          </div>
        )}
      </CardContent>
      <div className="p-4">
        <Button className="w-full" onClick={handlePredict} disabled={isProcessing}>
          <Play className="h-4 w-4 mr-2" />
          {isProcessing ? "Processing..." : "Run Prediction"}
        </Button>
      </div>
    </Card>
  );
}