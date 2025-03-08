"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"

// Mock data for correlation heatmap
const datasets = [
  { id: "dataset1", name: "Clinical Dataset (n=500)" },
  { id: "dataset2", name: "Survey Dataset (n=1200)" },
  { id: "dataset3", name: "Longitudinal Study (n=350)" },
]

export function CorrelationHeatmap() {
  const [selectedDataset, setSelectedDataset] = useState("dataset1")

  return (
    <Card className="col-span-1">
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
        <div>
          <CardTitle>Feature Correlation</CardTitle>
          <CardDescription>Heatmap showing correlation between features</CardDescription>
        </div>
        <Select value={selectedDataset} onValueChange={setSelectedDataset}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select dataset" />
          </SelectTrigger>
          <SelectContent>
            {datasets.map((dataset) => (
              <SelectItem key={dataset.id} value={dataset.id}>
                {dataset.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <div className="aspect-square w-full relative">
          <img
            src={`/placeholder.svg?height=400&width=400&text=Correlation+Heatmap`}
            alt="Correlation Heatmap"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="grid grid-cols-5 grid-rows-5 gap-1 w-full h-full p-8">
              {Array.from({ length: 25 }).map((_, i) => {
                const row = Math.floor(i / 5)
                const col = i % 5
                const isDiagonal = row === col
                const value = isDiagonal ? 1 : Math.random() * (row === 0 || col === 0 ? 0.8 : 0.6)
                const opacity = Math.max(0.1, value)
                const color =
                  value > 0.7
                    ? `rgba(220, 38, 38, ${opacity})`
                    : value > 0.4
                      ? `rgba(234, 179, 8, ${opacity})`
                      : value > 0.2
                        ? `rgba(59, 130, 246, ${opacity})`
                        : `rgba(107, 114, 128, ${opacity})`

                return (
                  <div
                    key={i}
                    className="flex items-center justify-center text-xs font-medium text-white"
                    style={{
                      backgroundColor: color,
                      borderRadius: "2px",
                    }}
                  >
                    {value.toFixed(2)}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
        <div className="flex justify-between mt-2 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-red-500 rounded-sm"></div>
            <span>Strong Positive</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-yellow-500 rounded-sm"></div>
            <span>Moderate</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-blue-500 rounded-sm"></div>
            <span>Weak</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-gray-500 rounded-sm"></div>
            <span>No Correlation</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

