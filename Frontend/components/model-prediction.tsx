"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FileUp, Play } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { Progress } from "@/components/ui/progress"

// Mock model features based on model ID
const modelFeatures = {
  "1": [
    { name: "age", label: "Age", type: "number", min: 18, max: 90 },
    { name: "gender", label: "Gender", type: "select", options: ["Male", "Female", "Other"] },
    { name: "phq9", label: "PHQ-9 Score", type: "slider", min: 0, max: 27 },
    { name: "sleep", label: "Sleep Quality", type: "slider", min: 0, max: 10 },
    { name: "activity", label: "Physical Activity (hours/week)", type: "number", min: 0, max: 40 },
    { name: "social", label: "Social Support", type: "slider", min: 0, max: 10 },
  ],
  "2": [
    { name: "age", label: "Age", type: "number", min: 18, max: 90 },
    { name: "gender", label: "Gender", type: "select", options: ["Male", "Female", "Other"] },
    { name: "phq9", label: "PHQ-9 Score", type: "slider", min: 0, max: 27 },
    { name: "sleep", label: "Sleep Quality", type: "slider", min: 0, max: 10 },
    { name: "activity", label: "Physical Activity (hours/week)", type: "number", min: 0, max: 40 },
  ],
  "3": [
    { name: "age", label: "Age", type: "number", min: 18, max: 90 },
    { name: "gender", label: "Gender", type: "select", options: ["Male", "Female", "Other"] },
    { name: "phq9", label: "PHQ-9 Score", type: "slider", min: 0, max: 27 },
    { name: "sleep", label: "Sleep Quality", type: "slider", min: 0, max: 10 },
    { name: "activity", label: "Physical Activity (hours/week)", type: "number", min: 0, max: 40 },
    { name: "social", label: "Social Support", type: "slider", min: 0, max: 10 },
    { name: "stress", label: "Stress Level", type: "slider", min: 0, max: 10 },
  ],
  "4": [
    { name: "age", label: "Age", type: "number", min: 18, max: 90 },
    { name: "gender", label: "Gender", type: "select", options: ["Male", "Female", "Other"] },
    { name: "phq9", label: "PHQ-9 Score", type: "slider", min: 0, max: 27 },
    { name: "sleep", label: "Sleep Quality", type: "slider", min: 0, max: 10 },
    { name: "activity", label: "Physical Activity (hours/week)", type: "number", min: 0, max: 40 },
    { name: "social", label: "Social Support", type: "slider", min: 0, max: 10 },
    { name: "stress", label: "Stress Level", type: "slider", min: 0, max: 10 },
    { name: "diet", label: "Diet Quality", type: "slider", min: 0, max: 10 },
    { name: "screen", label: "Screen Time (hours/day)", type: "number", min: 0, max: 24 },
  ],
}

export function ModelPrediction({ id }: { id: string }) {
  const [formData, setFormData] = useState<Record<string, any>>({})
  const [file, setFile] = useState<File | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [result, setResult] = useState<{ probability: number; prediction: string } | null>(null)
  const { toast } = useToast()

  const features = modelFeatures[id as keyof typeof modelFeatures] || []

  const handleInputChange = (name: string, value: any) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  const handlePredict = () => {
    // Check if all required fields are filled
    const missingFields = features.filter(
      (feature) => formData[feature.name] === undefined || formData[feature.name] === "",
    )

    if (missingFields.length > 0 && !file) {
      toast({
        title: "Missing information",
        description: "Please fill in all fields or upload a dataset",
        variant: "destructive",
      })
      return
    }

    setIsProcessing(true)
    setProgress(0)

    // Simulate prediction process
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsProcessing(false)

          // Generate a random prediction result
          const probability = Math.random()
          setResult({
            probability: probability,
            prediction: probability > 0.5 ? "Depression Likely" : "Depression Unlikely",
          })

          return 100
        }
        return prev + 10
      })
    }, 300)
  }

  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>Run Prediction</CardTitle>
        <CardDescription>Enter patient data or upload a dataset to predict depression risk</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {features.map((feature) => (
          <div key={feature.name} className="space-y-2">
            <Label htmlFor={feature.name}>{feature.label}</Label>

            {feature.type === "number" && (
              <Input
                id={feature.name}
                type="number"
                min={feature.min}
                max={feature.max}
                value={formData[feature.name] || ""}
                onChange={(e) => handleInputChange(feature.name, e.target.value)}
              />
            )}

            {feature.type === "select" && (
              <Select
                value={formData[feature.name] || ""}
                onValueChange={(value) => handleInputChange(feature.name, value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder={`Select ${feature.label}`} />
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

            {feature.type === "slider" && (
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Low ({feature.min})</span>
                  <span>High ({feature.max})</span>
                </div>
                <div className="flex items-center gap-4">
                  <Slider
                    id={feature.name}
                    min={feature.min}
                    max={feature.max}
                    step={1}
                    value={[formData[feature.name] || feature.min]}
                    onValueChange={(value) => handleInputChange(feature.name, value[0])}
                  />
                  <span className="w-12 text-center font-medium">{formData[feature.name] || feature.min}</span>
                </div>
              </div>
            )}
          </div>
        ))}

        <div className="space-y-2 pt-2">
          <div className="flex items-center">
            <div className="h-px flex-1 bg-muted"></div>
            <span className="px-2 text-xs text-muted-foreground">OR</span>
            <div className="h-px flex-1 bg-muted"></div>
          </div>

          <Label htmlFor="dataset-upload">Upload Dataset</Label>
          <div className="flex items-center gap-2">
            <Input id="dataset-upload" type="file" className="hidden" onChange={handleFileChange} accept=".csv,.json" />
            <Button
              variant="outline"
              className="w-full"
              onClick={() => document.getElementById("dataset-upload")?.click()}
            >
              <FileUp className="h-4 w-4 mr-2" />
              {file ? file.name : "Upload CSV or JSON"}
            </Button>
          </div>
        </div>

        {isProcessing && (
          <div className="space-y-2">
            <Label>Processing</Label>
            <Progress value={progress} />
            <p className="text-xs text-muted-foreground text-center">Analyzing data and generating prediction...</p>
          </div>
        )}

        {result && !isProcessing && (
          <div className="space-y-2 border rounded-lg p-4">
            <h4 className="font-medium">Prediction Result</h4>
            <div className="flex justify-between items-center">
              <span className="text-sm">Depression Probability:</span>
              <span className="font-medium">{(result.probability * 100).toFixed(1)}%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2.5">
              <div
                className={`h-2.5 rounded-full ${
                  result.probability > 0.7 ? "bg-red-500" : result.probability > 0.4 ? "bg-yellow-500" : "bg-green-500"
                }`}
                style={{ width: `${result.probability * 100}%` }}
              ></div>
            </div>
            <div className="flex justify-between items-center mt-2">
              <span className="text-sm">Prediction:</span>
              <span
                className={`font-medium ${
                  result.prediction === "Depression Likely"
                    ? "text-red-500 dark:text-red-400"
                    : "text-green-500 dark:text-green-400"
                }`}
              >
                {result.prediction}
              </span>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={handlePredict} disabled={isProcessing}>
          <Play className="h-4 w-4 mr-2" />
          {isProcessing ? "Processing..." : "Run Prediction"}
        </Button>
      </CardFooter>
    </Card>
  )
}

