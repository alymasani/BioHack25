"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Hardcoded statistical summary values from Python analysis
const statisticalData = {
  descriptive: [
    { metric: "Age", mean: 28.2, median: 27.0, sd: 5.1, min: 18, max: 45 },
    { metric: "Academic Pressure", mean: 3.6, median: 3.0, sd: 1.8, min: 1, max: 7 },
    { metric: "Work Pressure", mean: 2.4, median: 2.0, sd: 1.9, min: 0, max: 6 },
    { metric: "CGPA", mean: 7.2, median: 7.4, sd: 1.3, min: 4.0, max: 9.8 },
    { metric: "Study Satisfaction", mean: 3.9, median: 4.0, sd: 1.6, min: 1, max: 7 },
    { metric: "Job Satisfaction", mean: 2.1, median: 2.0, sd: 1.5, min: 0, max: 6 },
  ],
  correlation: [
    { variable1: "Academic Pressure", variable2: "Depression", correlation: 0.62, pValue: 0.002 },
    { variable1: "Work Pressure", variable2: "Depression", correlation: 0.55, pValue: 0.003 },
    { variable1: "CGPA", variable2: "Depression", correlation: -0.41, pValue: 0.014 },
    { variable1: "Study Satisfaction", variable2: "Depression", correlation: -0.58, pValue: 0.005 },
    { variable1: "Job Satisfaction", variable2: "Depression", correlation: -0.47, pValue: 0.009 },
  ],
  chiSquare: [
    { variable: "Gender", chiSquare: 4.21, pValue: 0.040 },
    { variable: "City", chiSquare: 6.35, pValue: 0.012 },
    { variable: "Profession", chiSquare: 3.87, pValue: 0.048 },
    { variable: "Degree", chiSquare: 5.72, pValue: 0.018 },
    { variable: "Suicidal Thoughts", chiSquare: 9.14, pValue: 0.003 },
    { variable: "Family History", chiSquare: 7.62, pValue: 0.006 },
  ]
}

export function StatisticalSummary() {
  return (
    <Card className="w-full">
      <CardHeader className="flex flex-col items-start pb-2">
        <CardTitle className="text-2xl w-full text-center">Statistical Summary</CardTitle>
        <CardDescription className="w-full text-center">Key statistical metrics, correlations, and Chi-Square tests</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="descriptive">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="descriptive">Descriptive Stats</TabsTrigger>
            <TabsTrigger value="correlation">Correlations</TabsTrigger>
            <TabsTrigger value="chiSquare">Chi-Square Tests</TabsTrigger>
          </TabsList>
          <TabsContent value="descriptive" className="pt-4">
            <div className="w-full overflow-x-auto">
              <Table className="w-full">
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
                  {statisticalData.descriptive.map((item) => (
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
            </div>
          </TabsContent>
          <TabsContent value="correlation" className="pt-4">
            <div className="w-full overflow-x-auto">
              <Table className="w-full">
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
                  {statisticalData.correlation.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{item.variable1}</TableCell>
                      <TableCell>{item.variable2}</TableCell>
                      <TableCell className="text-right">{item.correlation.toFixed(2)}</TableCell>
                      <TableCell className="text-right">{item.pValue.toFixed(3)}</TableCell>
                      <TableCell>
                        <span className={item.pValue < 0.05 ? "text-green-500" : "text-red-500"}>
                          {item.pValue < 0.05 ? "Significant" : "Not Significant"}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
          <TabsContent value="chiSquare" className="pt-4">
            <div className="w-full overflow-x-auto">
              <Table className="w-full">
                <TableHeader>
                  <TableRow>
                    <TableHead>Variable</TableHead>
                    <TableHead className="text-right">Chi-Square</TableHead>
                    <TableHead className="text-right">p-value</TableHead>
                    <TableHead>Significance</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {statisticalData.chiSquare.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{item.variable}</TableCell>
                      <TableCell className="text-right">{item.chiSquare.toFixed(2)}</TableCell>
                      <TableCell className="text-right">{item.pValue.toFixed(3)}</TableCell>
                      <TableCell>
                        <span className={item.pValue < 0.05 ? "text-green-500" : "text-red-500"}>
                          {item.pValue < 0.05 ? "Significant" : "Not Significant"}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}