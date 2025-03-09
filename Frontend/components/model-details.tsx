"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {   ChartContainer, ChartTooltip } from "@/components/ui/chart"
import { XAxis, YAxis, CartesianGrid, Tooltip, Legend, Bar, Line, LineChart} from "recharts"
import { BarChart } from "recharts";


// Mock data for model details
const modelDetails = {
  "1": {
    name: "Random Forest Classifier",
    accuracy: 0.89,
    precision: 0.89,
    recall: 0.89,
    f1: 0.91,
    date: "2023-12-15",
    features:  [
      'Academic Pressure', 'Work/Study Hours', 'Financial Stress',
      'Dietary Habits', 'Sleep Duration', 'Family History of Mental Illness',
      'Have you ever had suicidal thoughts ?', 'CGPA', 'Gender'
  ],
    description:
      "Ensemble learning method for classification that operates by constructing multiple decision trees during training and outputting the class that is the mode of the classes of the individual trees.",
    performanceHistory: [
      { version: "v1", accuracy: 0.82, date: "2023-10-15" },
      { version: "v2", accuracy: 0.86, date: "2023-11-01" },
      { version: "v3", accuracy: 0.89, date: "2023-12-15" },
    ],
    featureImportance: [
      { "name": "Academic_Pressure", "value": 0.38 },
      { "name": "Suicidal Thoughts", "value": 0.33 },
      { "name": "Study Hours", "value": 0.07 },
      { "name": "Sleep Hours", "value": 0.07 },
      { "name": "CGPA", "value": 0.05 },
      { "name": "Financial Stress", "value": 0.05 }
    ]
    ,
    confusionMatrix: {
      truePositive: 15477,
      falsePositive: 1472,
      trueNegative: 10093,
      falseNegative: 859,
    },
  },
  "2": {
  name: "Logistic Regression (with PCA)",
  accuracy: 0.8328,
  precision: 0.83,
  recall: 0.83,
  f1: 0.8612,
  date: "2023-11-20",
  features: ["Age", "Gender", "PHQ-9 Score", "Sleep Quality", "Physical Activity"],
  description:
    "Statistical model that uses a logistic function combined with PCA to model a binary dependent variable. Test Results (Threshold=0.395): Accuracy: 0.8328, F1 Score: 0.8612. Classification Report: For class 0 – precision: 0.82, recall: 0.76, f1-score: 0.79 (support: 2313); for class 1 – precision: 0.84, recall: 0.89, f1-score: 0.86 (support: 3268); Overall accuracy: 0.83.",
  performanceHistory: [
    { version: "v1", accuracy: 0.75, date: "2023-09-10" },
    { version: "v2", accuracy: 0.8328, date: "2023-11-20" }
  ],
  featureImportance: [
    { name: "PHQ-9 Score", value: 0.42 },
    { name: "Sleep Quality", value: 0.28 },
    { name: "Physical Activity", value: 0.15 },
    { name: "Age", value: 0.1 },
    { name: "Gender", value: 0.05 }
  ],
  
  confusionMatrix: {
    truePositive: 2895,
    falsePositive: 560,  // Derived from precision: 0.84 = TP/(TP+FP)
    trueNegative: 1753,  // Derived from overall accuracy and total samples
    falseNegative: 373
  }
}

  
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

