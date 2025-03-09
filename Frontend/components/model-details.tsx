"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { BarChart, LineChart, ChartContainer, ChartTooltip } from "@/components/ui/chart"
import { XAxis, YAxis, CartesianGrid, Tooltip, Legend, Bar, Line } from "recharts"

// Mock data for model details
const modelDetails = {
  "1": {
    name: "Random Forest Classifier",
    accuracy: 0.87,
    precision: 0.85,
    recall: 0.83,
    f1: 0.84,
    date: "2023-12-15",
    features: ["Age", "Gender", "PHQ-9 Score", "Sleep Quality", "Physical Activity", "Social Support"],
    description:
      "Ensemble learning method for classification that operates by constructing multiple decision trees during training and outputting the class that is the mode of the classes of the individual trees.",
    performanceHistory: [
      { version: "v1", accuracy: 0.78, date: "2023-10-15" },
      { version: "v2", accuracy: 0.82, date: "2023-11-01" },
      { version: "v3", accuracy: 0.87, date: "2023-12-15" },
    ],
    featureImportance: [
      { name: "PHQ-9 Score", value: 0.35 },
      { name: "Sleep Quality", value: 0.25 },
      { name: "Social Support", value: 0.18 },
      { name: "Physical Activity", value: 0.12 },
      { name: "Age", value: 0.07 },
      { name: "Gender", value: 0.03 },
    ],
    confusionMatrix: {
      truePositive: 85,
      falsePositive: 15,
      trueNegative: 80,
      falseNegative: 20,
    },
  },
  "2": {
    name: "Logistic Regression",
    accuracy: 0.82,
    precision: 0.8,
    recall: 0.79,
    f1: 0.79,
    date: "2023-11-20",
    features: ["Age", "Gender", "PHQ-9 Score", "Sleep Quality", "Physical Activity"],
    description:
      "Statistical model that uses a logistic function to model a binary dependent variable. In this case, it predicts the probability of depression based on input features.",
    performanceHistory: [
      { version: "v1", accuracy: 0.75, date: "2023-09-10" },
      { version: "v2", accuracy: 0.82, date: "2023-11-20" },
    ],
    featureImportance: [
      { name: "PHQ-9 Score", value: 0.42 },
      { name: "Sleep Quality", value: 0.28 },
      { name: "Physical Activity", value: 0.15 },
      { name: "Age", value: 0.1 },
      { name: "Gender", value: 0.05 },
    ],
    confusionMatrix: {
      truePositive: 78,
      falsePositive: 22,
      trueNegative: 75,
      falseNegative: 25,
    },
  },
  "3": {
    name: "Support Vector Machine",
    accuracy: 0.85,
    precision: 0.84,
    recall: 0.82,
    f1: 0.83,
    date: "2024-01-10",
    features: ["Age", "Gender", "PHQ-9 Score", "Sleep Quality", "Physical Activity", "Social Support", "Stress Level"],
    description:
      "Supervised learning model that analyzes data for classification and regression analysis. It uses hyperplanes to separate different classes in high-dimensional space.",
    performanceHistory: [
      { version: "v1", accuracy: 0.79, date: "2023-11-05" },
      { version: "v2", accuracy: 0.85, date: "2024-01-10" },
    ],
    featureImportance: [
      { name: "PHQ-9 Score", value: 0.38 },
      { name: "Stress Level", value: 0.22 },
      { name: "Sleep Quality", value: 0.18 },
      { name: "Social Support", value: 0.12 },
      { name: "Physical Activity", value: 0.06 },
      { name: "Age", value: 0.03 },
      { name: "Gender", value: 0.01 },
    ],
    confusionMatrix: {
      truePositive: 82,
      falsePositive: 18,
      trueNegative: 78,
      falseNegative: 22,
    },
  },
  "4": {
    name: "Neural Network",
    accuracy: 0.89,
    precision: 0.88,
    recall: 0.87,
    f1: 0.87,
    date: "2024-02-05",
    features: [
      "Age",
      "Gender",
      "PHQ-9 Score",
      "Sleep Quality",
      "Physical Activity",
      "Social Support",
      "Stress Level",
      "Diet Quality",
      "Screen Time",
    ],
    description:
      "Deep learning model with multiple layers for feature extraction and classification. This neural network has been trained to identify patterns associated with depression.",
    performanceHistory: [
      { version: "v1", accuracy: 0.81, date: "2023-12-10" },
      { version: "v2", accuracy: 0.85, date: "2024-01-15" },
      { version: "v3", accuracy: 0.89, date: "2024-02-05" },
    ],
    featureImportance: [
      { name: "PHQ-9 Score", value: 0.32 },
      { name: "Stress Level", value: 0.2 },
      { name: "Sleep Quality", value: 0.15 },
      { name: "Social Support", value: 0.12 },
      { name: "Screen Time", value: 0.08 },
      { name: "Physical Activity", value: 0.06 },
      { name: "Diet Quality", value: 0.04 },
      { name: "Age", value: 0.02 },
      { name: "Gender", value: 0.01 },
    ],
    confusionMatrix: {
      truePositive: 88,
      falsePositive: 12,
      trueNegative: 85,
      falseNegative: 15,
    },
  },
}

export function ModelDetails({ id }: { id: string }) {
  const model = modelDetails[id as keyof typeof modelDetails]

  if (!model) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Model Not Found</CardTitle>
          <CardDescription>The requested model could not be found.</CardDescription>
        </CardHeader>
      </Card>
    )
  }

  // Calculate confusion matrix metrics
  const { truePositive, falsePositive, trueNegative, falseNegative } = model.confusionMatrix
  const total = truePositive + falsePositive + trueNegative + falseNegative

  return (
    <Card className="col-span-1">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>{model.name}</CardTitle>
            <CardDescription>Created on {model.date}</CardDescription>
          </div>
          <Badge variant="outline" className="bg-primary/10 text-primary">
            {(model.accuracy * 100).toFixed(1)}% Accuracy
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="overview">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="features">Features</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4 pt-4">
            <div>
              <h4 className="text-sm font-medium mb-2">Description</h4>
              <p className="text-sm text-muted-foreground">{model.description}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium mb-2">Metrics</h4>
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-muted p-2 rounded-md">
                  <p className="text-xs text-muted-foreground">Accuracy</p>
                  <p className="text-lg font-medium">{model.accuracy.toFixed(2)}</p>
                </div>
                <div className="bg-muted p-2 rounded-md">
                  <p className="text-xs text-muted-foreground">Precision</p>
                  <p className="text-lg font-medium">{model.precision.toFixed(2)}</p>
                </div>
                <div className="bg-muted p-2 rounded-md">
                  <p className="text-xs text-muted-foreground">Recall</p>
                  <p className="text-lg font-medium">{model.recall.toFixed(2)}</p>
                </div>
                <div className="bg-muted p-2 rounded-md">
                  <p className="text-xs text-muted-foreground">F1 Score</p>
                  <p className="text-lg font-medium">{model.f1.toFixed(2)}</p>
                </div>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-medium mb-2">Confusion Matrix</h4>
              <div className="grid grid-cols-2 gap-1 text-center">
                <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-tl-md">
                  <p className="text-xs text-muted-foreground">True Positive</p>
                  <p className="text-lg font-medium">{truePositive}</p>
                  <p className="text-xs text-muted-foreground">({((truePositive / total) * 100).toFixed(1)}%)</p>
                </div>
                <div className="bg-red-100 dark:bg-red-900/30 p-2 rounded-tr-md">
                  <p className="text-xs text-muted-foreground">False Positive</p>
                  <p className="text-lg font-medium">{falsePositive}</p>
                  <p className="text-xs text-muted-foreground">({((falsePositive / total) * 100).toFixed(1)}%)</p>
                </div>
                <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-bl-md">
                  <p className="text-xs text-muted-foreground">True Negative</p>
                  <p className="text-lg font-medium">{trueNegative}</p>
                  <p className="text-xs text-muted-foreground">({((trueNegative / total) * 100).toFixed(1)}%)</p>
                </div>
                <div className="bg-red-100 dark:bg-red-900/30 p-2 rounded-br-md">
                  <p className="text-xs text-muted-foreground">False Negative</p>
                  <p className="text-lg font-medium">{falseNegative}</p>
                  <p className="text-xs text-muted-foreground">({((falseNegative / total) * 100).toFixed(1)}%)</p>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="performance" className="pt-4">
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium mb-2">Performance History</h4>
                <div className="h-[200px]">
                  <ChartContainer>
                    <LineChart data={model.performanceHistory}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="version" />
                      <YAxis domain={[0.7, 0.9]} tickFormatter={(value) => value.toFixed(2)} />
                      <Tooltip content={<ChartTooltip />} />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="accuracy"
                        stroke="hsl(var(--primary))"
                        activeDot={{ r: 8 }}
                        name="Accuracy"
                      />
                    </LineChart>
                  </ChartContainer>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="features" className="pt-4">
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium mb-2">Feature Importance</h4>
                <div className="h-[300px]">
                  <ChartContainer>
                    <BarChart data={model.featureImportance}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis tickFormatter={(value) => value.toFixed(2)} />
                      <Tooltip content={<ChartTooltip />} />
                      <Legend />
                      <Bar dataKey="value" fill="hsl(var(--primary))" name="Importance" />
                    </BarChart>
                  </ChartContainer>
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium mb-2">Features Used ({model.features.length})</h4>
                <div className="flex flex-wrap gap-2">
                  {model.features.map((feature) => (
                    <Badge key={feature} variant="secondary">
                      {feature}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

