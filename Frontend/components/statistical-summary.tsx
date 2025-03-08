"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Mock data for statistical summary
const statisticalData = {
  all: {
    descriptive: [
      { metric: "PHQ-9 Score", mean: 8.7, median: 7.5, sd: 5.2, min: 0, max: 27 },
      { metric: "Sleep Quality", mean: 5.8, median: 6.0, sd: 2.1, min: 0, max: 10 },
      { metric: "Physical Activity", mean: 3.2, median: 2.5, sd: 2.8, min: 0, max: 14 },
      { metric: "Social Support", mean: 6.4, median: 7.0, sd: 2.5, min: 0, max: 10 },
      { metric: "Stress Level", mean: 6.9, median: 7.0, sd: 2.3, min: 0, max: 10 },
    ],
    correlation: [
      { variable1: "PHQ-9 Score", variable2: "Sleep Quality", correlation: -0.65, pValue: 0.001 },
      { variable1: "PHQ-9 Score", variable2: "Physical Activity", correlation: -0.48, pValue: 0.003 },
      { variable1: "PHQ-9 Score", variable2: "Social Support", correlation: -0.72, pValue: 0.001 },
      { variable1: "PHQ-9 Score", variable2: "Stress Level", correlation: 0.81, pValue: 0.001 },
      { variable1: "Sleep Quality", variable2: "Stress Level", correlation: -0.58, pValue: 0.002 },
    ],
  },
  depressed: {
    descriptive: [
      { metric: "PHQ-9 Score", mean: 16.3, median: 15.0, sd: 4.1, min: 10, max: 27 },
      { metric: "Sleep Quality", mean: 3.9, median: 4.0, sd: 1.8, min: 0, max: 8 },
      { metric: "Physical Activity", mean: 1.8, median: 1.5, sd: 1.9, min: 0, max: 10 },
      { metric: "Social Support", mean: 4.2, median: 4.0, sd: 2.1, min: 0, max: 9 },
      { metric: "Stress Level", mean: 8.4, median: 8.5, sd: 1.5, min: 4, max: 10 },
    ],
    correlation: [
      { variable1: "PHQ-9 Score", variable2: "Sleep Quality", correlation: -0.72, pValue: 0.001 },
      { variable1: "PHQ-9 Score", variable2: "Physical Activity", correlation: -0.53, pValue: 0.002 },
      { variable1: "PHQ-9 Score", variable2: "Social Support", correlation: -0.68, pValue: 0.001 },
      { variable1: "PHQ-9 Score", variable2: "Stress Level", correlation: 0.75, pValue: 0.001 },
      { variable1: "Sleep Quality", variable2: "Stress Level", correlation: -0.64, pValue: 0.002 },
    ],
  },
  non_depressed: {
    descriptive: [
      { metric: "PHQ-9 Score", mean: 3.2, median: 3.0, sd: 2.1, min: 0, max: 9 },
      { metric: "Sleep Quality", mean: 7.4, median: 8.0, sd: 1.5, min: 4, max: 10 },
      { metric: "Physical Activity", mean: 4.5, median: 4.0, sd: 2.6, min: 0, max: 14 },
      { metric: "Social Support", mean: 8.1, median: 8.5, sd: 1.7, min: 3, max: 10 },
      { metric: "Stress Level", mean: 4.2, median: 4.0, sd: 1.9, min: 0, max: 9 },
    ],
    correlation: [
      { variable1: "PHQ-9 Score", variable2: "Sleep Quality", correlation: -0.42, pValue: 0.015 },
      { variable1: "PHQ-9 Score", variable2: "Physical Activity", correlation: -0.38, pValue: 0.022 },
      { variable1: "PHQ-9 Score", variable2: "Social Support", correlation: -0.45, pValue: 0.012 },
      { variable1: "PHQ-9 Score", variable2: "Stress Level", correlation: 0.51, pValue: 0.008 },
      { variable1: "Sleep Quality", variable2: "Stress Level", correlation: -0.39, pValue: 0.018 },
    ],
  },
}

export function StatisticalSummary() {
  const [group, setGroup] = useState("all")

  return (
    <Card className="col-span-1">
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
        <div>
          <CardTitle>Statistical Summary</CardTitle>
          <CardDescription>Key statistical metrics and correlations</CardDescription>
        </div>
        <Select value={group} onValueChange={setGroup}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select group" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Participants</SelectItem>
            <SelectItem value="depressed">Depressed Group</SelectItem>
            <SelectItem value="non_depressed">Non-Depressed Group</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="descriptive">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="descriptive">Descriptive Stats</TabsTrigger>
            <TabsTrigger value="correlation">Correlations</TabsTrigger>
          </TabsList>
          <TabsContent value="descriptive" className="pt-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Metric</TableHead>
                  <TableHead className="text-right">Mean</TableHead>
                  <TableHead className="text-right">Median</TableHead>
                  <TableHead className="text-right">SD</TableHead>
                  <TableHead className="text-right">Min</TableHead>
                  <TableHead className="text-right">Max</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {statisticalData[group as keyof typeof statisticalData].descriptive.map((item) => (
                  <TableRow key={item.metric}>
                    <TableCell className="font-medium">{item.metric}</TableCell>
                    <TableCell className="text-right">{item.mean.toFixed(1)}</TableCell>
                    <TableCell className="text-right">{item.median.toFixed(1)}</TableCell>
                    <TableCell className="text-right">{item.sd.toFixed(1)}</TableCell>
                    <TableCell className="text-right">{item.min}</TableCell>
                    <TableCell className="text-right">{item.max}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>
          <TabsContent value="correlation" className="pt-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Variable 1</TableHead>
                  <TableHead>Variable 2</TableHead>
                  <TableHead className="text-right">Correlation</TableHead>
                  <TableHead className="text-right">p-value</TableHead>
                  <TableHead>Significance</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {statisticalData[group as keyof typeof statisticalData].correlation.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{item.variable1}</TableCell>
                    <TableCell>{item.variable2}</TableCell>
                    <TableCell className="text-right">{item.correlation.toFixed(2)}</TableCell>
                    <TableCell className="text-right">{item.pValue.toFixed(3)}</TableCell>
                    <TableCell>
                      <span
                        className={
                          item.pValue < 0.05 ? "text-green-500 dark:text-green-400" : "text-red-500 dark:text-red-400"
                        }
                      >
                        {item.pValue < 0.05 ? "Significant" : "Not Significant"}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <p className="text-xs text-muted-foreground mt-2">* Significance level: p &lt; 0.05</p>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

