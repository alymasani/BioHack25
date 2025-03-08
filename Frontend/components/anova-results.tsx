"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, ChartContainer, ChartTooltip } from "@/components/ui/chart"
import { XAxis, YAxis, CartesianGrid, Tooltip, Legend, Bar } from "recharts"

// Mock data for ANOVA results
const anovaData = {
  age_groups: [
    { name: "18-25", f_value: 3.42, p_value: 0.034, significant: true },
    { name: "26-40", f_value: 4.18, p_value: 0.021, significant: true },
    { name: "41-60", f_value: 2.87, p_value: 0.062, significant: false },
    { name: "60+", f_value: 1.95, p_value: 0.145, significant: false },
  ],
  gender: [
    { name: "Male", f_value: 2.76, p_value: 0.098, significant: false },
    { name: "Female", f_value: 3.92, p_value: 0.029, significant: true },
    { name: "Other", f_value: 1.45, p_value: 0.237, significant: false },
  ],
  education: [
    { name: "High School", f_value: 4.53, p_value: 0.012, significant: true },
    { name: "Bachelor's", f_value: 3.21, p_value: 0.043, significant: true },
    { name: "Master's", f_value: 2.18, p_value: 0.112, significant: false },
    { name: "PhD", f_value: 1.76, p_value: 0.185, significant: false },
  ],
}

export function AnovaResults() {
  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>ANOVA Analysis</CardTitle>
        <CardDescription>Statistical analysis of variance between groups</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="age_groups">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="age_groups">Age Groups</TabsTrigger>
            <TabsTrigger value="gender">Gender</TabsTrigger>
            <TabsTrigger value="education">Education</TabsTrigger>
          </TabsList>
          {Object.entries(anovaData).map(([key, data]) => (
            <TabsContent key={key} value={key} className="space-y-4 pt-4">
              <div className="h-[250px]">
                <ChartContainer>
                  <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis label={{ value: "F-Value", angle: -90, position: "insideLeft" }} />
                    <Tooltip content={<ChartTooltip />} />
                    <Legend />
                    <Bar dataKey="f_value" name="F-Value" fill="hsl(var(--primary))" className="fill-primary" />
                  </BarChart>
                </ChartContainer>
              </div>
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Significance Results</h4>
                <div className="space-y-2">
                  {data.map((item) => (
                    <div key={item.name} className="flex justify-between items-center text-sm">
                      <span>{item.name}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-muted-foreground">p = {item.p_value.toFixed(3)}</span>
                        <span
                          className={
                            item.significant ? "text-green-500 dark:text-green-400" : "text-red-500 dark:text-red-400"
                          }
                        >
                          {item.significant ? "Significant" : "Not Significant"}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="text-xs text-muted-foreground">
                <p>* Significance level: p &lt; 0.05</p>
                <p>* F-Value: Higher values indicate stronger evidence against the null hypothesis</p>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  )
}

