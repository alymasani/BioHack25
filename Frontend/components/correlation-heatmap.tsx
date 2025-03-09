"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"

// Mock data for dataset selection
const datasets = [
  { id: "dataset1", name: "Mental Health Study on Students" },
]

// Hard-coded correlation matrix
const correlationData = [
  [1.0, -0.08, 0.01, 0.01, -0.0, -0.03, -0.1, -0.23],
  [-0.08, 1.0, -0.02, -0.12, -0.04, 0.09, 0.15, 0.47],
  [0.01, -0.02, 1.0, -0.05, -0.0, 0.0, 0.01, 0.02],
  [0.01, -0.12, -0.05, 1.0, 0.01, -0.04, -0.06, -0.17],
  [-0.0, -0.04, -0.0, 0.01, 1.0, -0.03, -0.01, -0.09],
  [-0.03, 0.09, 0.0, -0.04, -0.03, 1.0, 0.07, 0.2],
  [-0.1, 0.15, 0.01, -0.06, -0.01, 0.07, 1.0, 0.36],
  [-0.23, 0.47, 0.02, -0.17, -0.09, 0.2, 0.36, 1.0],
]

const labels = [
  "Age",
  "Academic Pressure",
  "CGPA",
  "Study Satisfaction",
  "Sleep Duration",
  "Work/Study Hours",
  "Financial Stress",
  "Depression",
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
        {/* Wrapper for the heatmap */}
        <div className="flex flex-col w-full overflow-auto p-4">
          {/* Column labels across the top */}
          <div className="grid grid-cols-9 gap-1 mb-2" style={{ width: "fit-content" }}>
            <div /> {/* empty top-left corner cell */}
            {labels.map((label) => (
              <div key={label} className="text-xs font-medium text-center w-14">
                {label}
              </div>
            ))}
          </div>

          {/* Heatmap rows (with row labels on the left) */}
          <div className="grid grid-rows-8 gap-y-1" style={{ width: "fit-content" }}>
            {correlationData.map((row, rowIndex) => (
              <div key={rowIndex} className="grid grid-cols-9 gap-1" style={{ width: "fit-content" }}>
                {/* Row label */}
                <div className="flex items-center justify-end pr-2 text-xs font-medium w-14">
                  {labels[rowIndex]}
                </div>

                {/* Correlation cells */}
                {row.map((value, colIndex) => {
                  // clamp the alpha so it doesn't go below 0.2
                  const absValue = Math.abs(value)
                  const alpha = Math.max(absValue, 0.2) // ensures at least 0.2
                  const color = value >= 0
                    ? `rgba(220, 38, 38, ${alpha})` // red for positive
                    : `rgba(37, 99, 235, ${alpha})`  // blue for negative

                  return (
                    <div
                      key={`${rowIndex}-${colIndex}`}
                      className="flex items-center justify-center text-xs font-medium text-white"
                      style={{
                        width: "3rem",
                        height: "3rem",
                        backgroundColor: color,
                        borderRadius: 4,
                      }}
                    >
                      {value.toFixed(2)}
                    </div>
                  )
                })}
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
