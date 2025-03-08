"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock data for mosaic plots
const mosaicData = {
  gender_depression: {
    title: "Gender vs Depression Status",
    description: "Mosaic plot showing the relationship between gender and depression status",
    categories: [
      { name: "Male", depressed: 120, nonDepressed: 230 },
      { name: "Female", depressed: 180, nonDepressed: 210 },
      { name: "Other", depressed: 15, nonDepressed: 10 },
    ],
  },
  age_depression: {
    title: "Age Group vs Depression Status",
    description: "Mosaic plot showing the relationship between age groups and depression status",
    categories: [
      { name: "18-25", depressed: 85, nonDepressed: 95 },
      { name: "26-40", depressed: 110, nonDepressed: 150 },
      { name: "41-60", depressed: 75, nonDepressed: 130 },
      { name: "60+", depressed: 45, nonDepressed: 75 },
    ],
  },
  education_depression: {
    title: "Education Level vs Depression Status",
    description: "Mosaic plot showing the relationship between education level and depression status",
    categories: [
      { name: "High School", depressed: 95, nonDepressed: 85 },
      { name: "Bachelor's", depressed: 120, nonDepressed: 160 },
      { name: "Master's", depressed: 70, nonDepressed: 130 },
      { name: "PhD", depressed: 30, nonDepressed: 75 },
    ],
  },
}

export function MosaicGraphs() {
  const [selectedVariable, setSelectedVariable] = useState("gender_depression")
  const data = mosaicData[selectedVariable as keyof typeof mosaicData]

  // Calculate totals for proportions
  const calculateTotals = () => {
    const categories = data.categories
    const totalDepressed = categories.reduce((sum, cat) => sum + cat.depressed, 0)
    const totalNonDepressed = categories.reduce((sum, cat) => sum + cat.nonDepressed, 0)
    const grandTotal = totalDepressed + totalNonDepressed

    return {
      totalDepressed,
      totalNonDepressed,
      grandTotal,
      categoryTotals: categories.map((cat) => cat.depressed + cat.nonDepressed),
    }
  }

  const { totalDepressed, totalNonDepressed, grandTotal, categoryTotals } = calculateTotals()

  return (
    <Card className="col-span-1">
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
        <div>
          <CardTitle>Mosaic Plots</CardTitle>
          <CardDescription>Visualizing relationships between categorical variables</CardDescription>
        </div>
        <Select value={selectedVariable} onValueChange={setSelectedVariable}>
          <SelectTrigger className="w-[220px]">
            <SelectValue placeholder="Select relationship" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="gender_depression">Gender vs Depression</SelectItem>
            <SelectItem value="age_depression">Age Group vs Depression</SelectItem>
            <SelectItem value="education_depression">Education vs Depression</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <h3 className="text-sm font-medium">{data.title}</h3>
          <p className="text-sm text-muted-foreground">{data.description}</p>

          <div className="h-[300px] w-full border rounded-md p-4">
            <div className="flex h-full w-full flex-col">
              {/* Render mosaic plot */}
              {data.categories.map((category, index) => {
                const categoryWidth = (categoryTotals[index] / grandTotal) * 100
                const depressedHeight = (category.depressed / categoryTotals[index]) * 100
                const nonDepressedHeight = 100 - depressedHeight

                return (
                  <div key={category.name} className="flex h-full" style={{ width: `${categoryWidth}%` }}>
                    <div className="flex flex-col w-full">
                      <div
                        className="bg-red-500/80 dark:bg-red-700/80 relative"
                        style={{ height: `${depressedHeight}%` }}
                      >
                        {depressedHeight > 10 && (
                          <div className="absolute inset-0 flex items-center justify-center text-white text-xs font-medium">
                            {category.depressed}
                          </div>
                        )}
                      </div>
                      <div
                        className="bg-green-500/80 dark:bg-green-700/80 relative"
                        style={{ height: `${nonDepressedHeight}%` }}
                      >
                        {nonDepressedHeight > 10 && (
                          <div className="absolute inset-0 flex items-center justify-center text-white text-xs font-medium">
                            {category.nonDepressed}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* X-axis labels */}
            <div className="flex w-full mt-2">
              {data.categories.map((category, index) => {
                const categoryWidth = (categoryTotals[index] / grandTotal) * 100

                return (
                  <div
                    key={category.name}
                    className="flex justify-center text-xs"
                    style={{ width: `${categoryWidth}%` }}
                  >
                    {category.name}
                  </div>
                )
              })}
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 dark:bg-red-700 rounded-sm"></div>
              <span className="text-xs">Depressed ({totalDepressed})</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 dark:bg-green-700 rounded-sm"></div>
              <span className="text-xs">Non-Depressed ({totalNonDepressed})</span>
            </div>
          </div>

          <div className="text-xs text-muted-foreground">
            <p>* Width of each column is proportional to the category size</p>
            <p>* Height of each section represents the proportion within the category</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

