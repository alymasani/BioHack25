"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AreaChart, ChartContainer, ChartTooltip } from "@/components/ui/chart"
import { XAxis, YAxis, CartesianGrid, Tooltip, Area } from "recharts"

// Mock data for distribution plots
const distributionData = {
  phq9: Array.from({ length: 28 }, (_, i) => ({
    score: i,
    frequency: Math.floor(Math.random() * 100) * (i < 5 ? 0.5 : i < 10 ? 1.5 : i < 15 ? 2 : i < 20 ? 1 : 0.3),
  })),
  sleep: Array.from({ length: 11 }, (_, i) => ({
    score: i,
    frequency: Math.floor(Math.random() * 100) * (i < 3 ? 0.8 : i < 6 ? 1.2 : i < 8 ? 1.5 : 0.7),
  })),
  stress: Array.from({ length: 11 }, (_, i) => ({
    score: i,
    frequency: Math.floor(Math.random() * 100) * (i < 3 ? 0.6 : i < 5 ? 1 : i < 8 ? 1.8 : 0.9),
  })),
}

const distributionLabels = {
  phq9: {
    title: "PHQ-9 Score Distribution",
    description: "Distribution of depression severity scores",
    xLabel: "PHQ-9 Score",
    yLabel: "Frequency",
    thresholds: [
      { value: 5, label: "Mild" },
      { value: 10, label: "Moderate" },
      { value: 15, label: "Moderately Severe" },
      { value: 20, label: "Severe" },
    ],
  },
  sleep: {
    title: "Sleep Quality Distribution",
    description: "Distribution of sleep quality scores",
    xLabel: "Sleep Quality Score",
    yLabel: "Frequency",
    thresholds: [
      { value: 3, label: "Poor" },
      { value: 7, label: "Good" },
    ],
  },
  stress: {
    title: "Stress Level Distribution",
    description: "Distribution of stress level scores",
    xLabel: "Stress Level",
    yLabel: "Frequency",
    thresholds: [
      { value: 3, label: "Low" },
      { value: 7, label: "High" },
    ],
  },
}

export function DistributionPlots() {
  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>Distribution Plots</CardTitle>
        <CardDescription>Distribution of key metrics across the dataset</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="phq9">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="phq9">PHQ-9</TabsTrigger>
            <TabsTrigger value="sleep">Sleep</TabsTrigger>
            <TabsTrigger value="stress">Stress</TabsTrigger>
          </TabsList>
          {Object.entries(distributionData).map(([key, data]) => {
            const labels = distributionLabels[key as keyof typeof distributionLabels]

            return (
              <TabsContent key={key} value={key} className="space-y-4 pt-4">
                <div className="h-[250px]">
                  <ChartContainer>
                    <AreaChart data={data}>
                      <defs>
                        <linearGradient id={`color-${key}`} x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8} />
                          <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.1} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="score" label={{ value: labels.xLabel, position: "insideBottom", offset: -5 }} />
                      <YAxis label={{ value: labels.yLabel, angle: -90, position: "insideLeft" }} />
                      <Tooltip content={<ChartTooltip />} />
                      <Area
                        type="monotone"
                        dataKey="frequency"
                        stroke="hsl(var(--primary))"
                        fillOpacity={1}
                        fill={`url(#color-${key})`}
                        name="Frequency"
                      />
                      {/* Add threshold reference lines */}
                      {labels.thresholds.map((threshold) => (
                        <line
                          key={threshold.value}
                          x1={threshold.value}
                          y1="0%"
                          x2={threshold.value}
                          y2="100%"
                          stroke="hsl(var(--muted-foreground))"
                          strokeWidth={1}
                          strokeDasharray="3 3"
                        />
                      ))}
                    </AreaChart>
                  </ChartContainer>
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  {labels.thresholds.map((threshold, index) => (
                    <div key={index} className="flex flex-col items-center">
                      <div className="w-px h-4 bg-muted-foreground"></div>
                      <span>
                        {threshold.label} ({threshold.value})
                      </span>
                    </div>
                  ))}
                </div>
              </TabsContent>
            )
          })}
        </Tabs>
      </CardContent>
    </Card>
  )
}

