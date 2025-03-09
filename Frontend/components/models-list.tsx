"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Eye, BarChart } from "lucide-react"
import Link from "next/link"

// Mock data for models
const models = [
  {
    id: "1",
    name: "Random Forest Classifier",
    accuracy: 0.89,
    date: "2025-03-08",
    description: "Ensemble learning method for classification that operates by constructing multiple decision trees.",
  },
  {
    id: "2",
    name: "Logistic Regression",
    accuracy: 0.82,
    date: "2023-11-20",
    description: "Statistical model that uses a logistic function to model a binary dependent variable.",
  },
 
]

export function ModelsList() {
  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>Available Models</CardTitle>
        <CardDescription>Select a model to view details or run predictions</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {models.map((model) => (
            <div key={model.id} className="flex flex-col space-y-2 p-4 border rounded-lg">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">{model.name}</h3>
                <span className="text-sm bg-primary/10 text-primary px-2 py-1 rounded-full">
                  {(model.accuracy * 100).toFixed(1)}% Accuracy
                </span>
              </div>
              <p className="text-sm text-muted-foreground">{model.description}</p>
              <div className="flex items-center justify-between mt-2">
                <span className="text-xs text-muted-foreground">Created: {model.date}</span>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/models/${model.id}`}>
                      <Eye className="h-4 w-4 mr-1" />
                      Details
                    </Link>
                  </Button>
                  <Button variant="default" size="sm" asChild>
                    <Link href={`/models/${model.id}`}>
                      <BarChart className="h-4 w-4 mr-1" />
                      Use
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

