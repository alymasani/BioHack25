"use client"

import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

// Hardcoded data extracted from CSV analysis
const lineChartData = {
  academic_pressure: [
    { academicPressure: 0, averageDepression: 0.444 },
    { academicPressure: 1, averageDepression: 0.194 },
    { academicPressure: 2, averageDepression: 0.375 },
    { academicPressure: 3, averageDepression: 0.602 },
    { academicPressure: 4, averageDepression: 0.761 },
    { academicPressure: 5, averageDepression: 0.861 },
  ],
  sleep: [
    { sleep: 4.0, averageDepression: 0.645 },
    { sleep: 5.5, averageDepression: 0.569 },
    { sleep: 7.5, averageDepression: 0.595 },
    { sleep: 9.0, averageDepression: 0.509 },
  ],
  hours: [
    { hours: 0, averageDepression: 0.355 },
    { hours: 1, averageDepression: 0.403 },
    { hours: 2, averageDepression: 0.438 },
    { hours: 3, averageDepression: 0.474 },
    { hours: 4, averageDepression: 0.505 },
    { hours: 5, averageDepression: 0.545 },
    { hours: 6, averageDepression: 0.573 },
    { hours: 7, averageDepression: 0.588 },
    { hours: 8, averageDepression: 0.625 },
    { hours: 9, averageDepression: 0.599 },
    { hours: 10, averageDepression: 0.704 },
    { hours: 11, averageDepression: 0.678 },
    { hours: 12, averageDepression: 0.684 },
  ],
}

const distributionLabels = {
  academic_pressure: {
    title: "Academic Pressure vs Depression",
    description: "Line chart showing mean depression scores by academic pressure",
    xLabel: "Academic Pressure",
    yLabel: "Average Depression Score",
  },
  sleep: {
    title: "Sleep vs Depression",
    description: "Line chart showing mean depression scores by sleep hours",
    xLabel: "Sleep (Hours)",
    yLabel: "Average Depression Score",
  },
  hours: {
    title: "Study Hours vs Depression",
    description: "Line chart showing mean depression scores by daily study hours",
    xLabel: "Study Hours/Day",
    yLabel: "Average Depression Score",
  },
}

// Custom tooltip component
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 border border-gray-200 shadow-md rounded">
        <p className="text-sm font-medium">{`${payload[0].name}: ${label}`}</p>
        <p className="text-sm text-primary">
          {`Depression Score: ${payload[0].value.toFixed(3)}`}
        </p>
      </div>
    );
  }
  return null;
};

export function DistributionPlots() {
  return (
    <Card className="col-span-1 shadow-lg">
      <CardHeader>
        <CardTitle>Distribution Plots</CardTitle>
        <CardDescription>Line charts of key metrics vs depression scores</CardDescription>
      </CardHeader>

      <CardContent>
        <Tabs defaultValue="academic_pressure">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="academic_pressure">Academic Pressure</TabsTrigger>
            <TabsTrigger value="sleep">Sleep</TabsTrigger>
            <TabsTrigger value="hours">Study Hours</TabsTrigger>
          </TabsList>

          {Object.entries(lineChartData).map(([key, data]) => {
            const labels = distributionLabels[key];
            const xAxisKey =
              key === "academic_pressure" ? "academicPressure" : key === "sleep" ? "sleep" : "hours";

            return (
              <TabsContent key={key} value={key} className="space-y-4 pt-4">
                <div className="text-center">
                  <h3 className="text-xl font-semibold">{labels.title}</h3>
                  <p className="text-sm text-muted-foreground">{labels.description}</p>
                </div>

                <div style={{ width: '100%', height: 300 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={data}
                      margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        dataKey={xAxisKey} 
                        label={{ 
                          value: labels.xLabel, 
                          position: "insideBottom", 
                          offset: -5 
                        }} 
                      />
                      <YAxis
                        label={{
                          value: labels.yLabel,
                          angle: -90,
                          position: "insideLeft",
                          offset: -5
                        }}
                      />
                      <Tooltip content={<CustomTooltip />} />
                      <Line 
                        type="monotone" 
                        dataKey="averageDepression" 
                        stroke="hsl(var(--primary, 221 83% 53%))" 
                        strokeWidth={2}
                        dot={{ r: 4 }}
                        activeDot={{ r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </TabsContent>
            );
          })}
        </Tabs>
      </CardContent>
    </Card>
  );
}