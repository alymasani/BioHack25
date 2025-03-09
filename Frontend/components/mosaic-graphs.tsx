"use client"

import { useState } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// Hardcoded real data from Python's Mosaic Plot analysis
const mosaicData = {
  gender_depression: {
    title: "Gender vs Depression Status",
    description:
      "Mosaic plot showing the relationship between gender and depression status",
    // xAxis is no longer used since we map over each category for the x-axis labels
    yAxis: "Depression Status",
    categories: [
      { name: "Male", depressed: 9115, nonDepressed: 6432 },
      { name: "Female", depressed: 7221, nonDepressed: 5133 },
    ],
  },
  sleep_depression: {
    title: "Sleep Duration vs Depression Status",
    description:
      "Mosaic plot showing the relationship between sleep duration and depression status",
    xAxis: "Sleep Duration",
    yAxis: "Depression Status",
    categories: [
      { name: "Less than 5 hours", depressed: 5361, nonDepressed: 2949 },
      { name: "5-6 hours", depressed: 3517, nonDepressed: 2666 },
      { name: "7-8 hours", depressed: 4371, nonDepressed: 2975 },
      { name: "More than 8 hours", depressed: 3078, nonDepressed: 2966 },
    ],
  },
  academic_pressure_depression: {
    title: "Academic Pressure vs Depression Status",
    description:
      "Mosaic plot showing the relationship between academic pressure and depression status",
    xAxis: "Academic Pressure",
    yAxis: "Depression Status",
    categories: [
      
      { name: "1", depressed: 932, nonDepressed: 3869 },
      { name: "2", depressed: 1566, nonDepressed: 2612 },
      { name: "3", depressed: 4489, nonDepressed: 2973 },
      { name: "4", depressed: 3925, nonDepressed: 1230 },
      { name: "5", depressed: 5420, nonDepressed: 876 },
    ],
  },
}

export function MosaicGraphs() {
  const [selectedVariable, setSelectedVariable] = useState("gender_depression")
  const data = mosaicData[selectedVariable]

  // Calculate totals for proportions per category
  const calculateTotals = () => {
    const categories = data.categories
    const totalDepressed = categories.reduce(
      (sum, cat) => sum + cat.depressed,
      0
    )
    const totalNonDepressed = categories.reduce(
      (sum, cat) => sum + cat.nonDepressed,
      0
    )
    const grandTotal = totalDepressed + totalNonDepressed

    return {
      totalDepressed,
      totalNonDepressed,
      grandTotal,
      categoryTotals: categories.map((cat) => cat.depressed + cat.nonDepressed),
    }
  }

  const { grandTotal, categoryTotals } = calculateTotals()

  return (
    <Card className="col-span-1 shadow-lg">
      <CardHeader className="flex flex-row items-start justify-between pb-2">
        <div>
          <CardTitle>Mosaic Plots</CardTitle>
          <CardDescription>
            Visualizing relationships between categorical variables
          </CardDescription>
        </div>
        <Select value={selectedVariable} onValueChange={setSelectedVariable}>
          <SelectTrigger className="w-[220px]">
            <SelectValue placeholder="Select relationship" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="gender_depression">
              Gender vs Depression
            </SelectItem>
            <SelectItem value="sleep_depression">
              Sleep Duration vs Depression
            </SelectItem>
            <SelectItem value="academic_pressure_depression">
              Academic Pressure vs Depression
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="text-center">
            <h3 className="text-xl font-semibold">{data.title}</h3>
            <p className="text-sm text-muted-foreground">{data.description}</p>
          </div>
          <div className="relative">
            {/* Y-axis Label (rotated) */}
            <div className="absolute left-[-70px] top-1/2 transform -translate-y-1/2 rotate-[-90deg] text-sm font-medium text-gray-600 dark:text-gray-300">
              {data.yAxis}
            </div>
            {/* Y-axis Tick Marks */}
            <div className="absolute left-[-40px] top-0 h-full flex flex-col justify-between">
              <span className="text-xs text-gray-600 dark:text-gray-300">100</span>
              <span className="text-xs text-gray-600 dark:text-gray-300">75</span>
              <span className="text-xs text-gray-600 dark:text-gray-300">50</span>
              <span className="text-xs text-gray-600 dark:text-gray-300">25</span>
              <span className="text-xs text-gray-600 dark:text-gray-300">0</span>
            </div>
            {/* Mosaic Graph */}
            <div className="relative h-[300px] w-full bg-gray-100 dark:bg-gray-800 border rounded-md overflow-hidden">
              <div className="absolute inset-0 flex">
                {data.categories.map((category, index) => {
                  const categoryWidth =
                    (categoryTotals[index] / grandTotal) * 100
                  const depressedHeight =
                    (category.depressed / categoryTotals[index]) * 100
                  const nonDepressedHeight = 100 - depressedHeight

                  return (
                    <div
                      key={category.name}
                      className="flex flex-col transition-all duration-300"
                      style={{ width: `${categoryWidth}%` }}
                    >
                      <div
                        className="bg-red-500 dark:bg-red-700 flex items-center justify-center text-white text-xs font-medium transition-all duration-300 hover:opacity-90"
                        style={{ height: `${depressedHeight}%` }}
                      >
                        {depressedHeight > 12 && category.depressed}
                      </div>
                      <div
                        className="bg-green-500 dark:bg-green-700 flex items-center justify-center text-white text-xs font-medium transition-all duration-300 hover:opacity-90"
                        style={{ height: `${nonDepressedHeight}%` }}
                      >
                        {nonDepressedHeight > 12 && category.nonDepressed}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
            {/* X-axis Category Labels */}
            <div className="flex mt-2">
              {data.categories.map((category, index) => {
                const categoryWidth =
                  (categoryTotals[index] / grandTotal) * 100
                return (
                  <div
                    key={category.name}
                    className="text-center text-sm font-medium text-gray-600 dark:text-gray-300"
                    style={{
                      width: `${categoryWidth}%`,
                      paddingLeft: "1rem",
                      paddingRight: "1rem",
                    }}
                  >
                    {category.name}
                  </div>
                )
              })}
            </div>
            {/* Legend */}
            <div className="flex justify-center mt-4 gap-6 text-sm text-gray-600 dark:text-gray-300">
              <div className="flex items-center gap-2">
                <span className="block w-4 h-4 bg-red-500 dark:bg-red-700"></span>
                <span>true</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="block w-4 h-4 bg-green-500 dark:bg-green-700"></span>
                <span>false</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
