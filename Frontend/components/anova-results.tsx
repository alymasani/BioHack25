"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { InfoIcon, BookOpenIcon, TrendingUpIcon } from "lucide-react"

// ANOVA results data for Sleep Duration, Dietary Habits, Academic Pressure, CGPA, and Work/Study Hours
const anovaData = {
  sleep_duration: [
    {
      name: "Sleep Duration",
      f_value: 213.953034,
      p_value: 2.848185e-48,
      significant: true,
      analysis:
        "A very large F-value and p < 0.05 indicate that sleep duration is strongly associated with depression levels. Adequate or better sleep seems to correlate with lower depression.",
      recommendations: [
        "Promote healthy sleep hygiene practices among students",
        "Consider later class start times to accommodate student sleep needs",
        "Provide workshops on effective sleep management techniques"
      ],
      insights: "Students reporting 7-9 hours of sleep showed significantly lower depression scores compared to those sleeping less than 6 hours."
    },
  ],
  dietary_habits: [
    {
      name: "Dietary Habits",
      f_value: 1246.909289,
      p_value: 3.042777e-267,
      significant: true,
      analysis:
        "Dietary habits also show a very high F-value, suggesting strong differences in depression across different diet qualities.",
      recommendations: [
        "Improve campus dining options with healthier choices",
        "Conduct nutritional awareness campaigns",
        "Offer cooking workshops for students living off-campus"
      ],
      insights: "Regular meal patterns and balanced nutritional intake correlated with improved mental health outcomes and lower depression rates."
    },
  ],
  academic_pressure: [
    {
      name: "Academic Pressure",
      f_value: 8112.402655,
      p_value: 0.0,
      significant: true,
      analysis:
        "Academic pressure is extremely significant (p < 0.05) in affecting student depression, indicating that higher academic loads can increase stress and risk of depression.",
      recommendations: [
        "Review and potentially restructure course workloads",
        "Implement more frequent but smaller assessments rather than high-stakes exams",
        "Develop academic support programs focused on stress management"
      ],
      insights: "The academic pressure metric showed the highest correlation with depression indicators, suggesting this may be the most critical factor to address."
    },
  ],
  cgpa: [
    {
      name: "CGPA",
      f_value: 13.35687,
      p_value: 2.579504e-4,
      significant: true,
      analysis:
        "CGPA shows a moderate F-value but still significant, suggesting academic performance correlates with depression.",
      recommendations: [
        "Establish early intervention systems for students with declining grades",
        "Create peer tutoring networks to support struggling students",
        "Provide more academic counseling resources"
      ],
      insights: "While significant, CGPA showed the lowest F-value among factors studied, suggesting that performance anxiety may be more impactful than actual grades."
    },
  ],
  work_study_hours: [
    {
      name: "Work/Study Hours",
      f_value: 1268.909889,
      p_value: 8.10242e-272,
      significant: true,
      analysis:
        "A high F-value here implies that students' total hours of work or study strongly correlate with depression levels.",
      recommendations: [
        "Advocate for reasonable campus employment hours",
        "Create more flexible class scheduling options",
        "Develop time management workshops specifically for working students"
      ],
      insights: "Students working more than 20 hours per week while carrying a full course load showed dramatically higher depression scores than their peers."
    },
  ],
}

// Comparison data - keeping this for reference but not using in the chart
const comparisonData = [
  { name: "Sleep Duration", value: 213.95 },
  { name: "Dietary Habits", value: 1246.91 },
  { name: "Academic Pressure", value: 8112.40 },
  { name: "CGPA", value: 13.36 },
  { name: "Work/Study Hours", value: 1268.91 }
];

export function AnovaResults() {
  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>ANOVA Analysis</CardTitle>
        <CardDescription>Statistical analysis of variance between factors affecting depression</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="sleep_duration">
          {/* Tab triggers */}
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="sleep_duration">Sleep Duration</TabsTrigger>
            <TabsTrigger value="dietary_habits">Dietary Habits</TabsTrigger>
            <TabsTrigger value="academic_pressure">Academic Pressure</TabsTrigger>
            <TabsTrigger value="cgpa">CGPA</TabsTrigger>
            <TabsTrigger value="work_study_hours">Work/Study</TabsTrigger>
          </TabsList>

          {/* 1. Sleep Duration Tab */}
          <TabsContent value="sleep_duration" className="space-y-4 pt-4">
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Significance Results</h4>
              <div className="space-y-2">
                {anovaData.sleep_duration.map((item) => (
                  <div key={item.name} className="flex flex-col gap-1 text-sm">
                    <div className="flex justify-between items-center">
                      <span>{item.name}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-muted-foreground">
                          F = {item.f_value.toFixed(2)}
                        </span>
                        <span className="text-muted-foreground">
                          p = {item.p_value.toExponential(3)}
                        </span>
                        <span
                          className={
                            item.significant
                              ? "text-green-500 dark:text-green-400"
                              : "text-red-500 dark:text-red-400"
                          }
                        >
                          {item.significant ? "Significant" : "Not Significant"}
                        </span>
                      </div>
                    </div>
                    {/* Analysis/Insight below each entry */}
                    <div className="text-xs text-muted-foreground">{item.analysis}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Added sections */}
            <div className="mt-4 space-y-4">
              <div className="rounded-md border p-4">
                <div className="flex items-center gap-2 mb-2">
                  <InfoIcon className="h-4 w-4 text-blue-500" />
                  <h4 className="text-sm font-medium">Key Insights</h4>
                </div>
                <p className="text-xs text-muted-foreground">
                  {anovaData.sleep_duration[0].insights}
                </p>
              </div>
              
              <div className="rounded-md border p-4">
                <div className="flex items-center gap-2 mb-2">
                  <BookOpenIcon className="h-4 w-4 text-green-500" />
                  <h4 className="text-sm font-medium">Recommendations</h4>
                </div>
                <ul className="text-xs text-muted-foreground pl-5 space-y-1 list-disc">
                  {anovaData.sleep_duration[0].recommendations.map((rec, index) => (
                    <li key={index}>{rec}</li>
                  ))}
                </ul>
              </div>
              
              <Alert className="bg-amber-50 dark:bg-amber-950/50">
                <div className="flex items-center gap-2">
                  <TrendingUpIcon className="h-4 w-4 text-amber-500" />
                  <h4 className="text-sm font-medium">Comparison to Other Factors</h4>
                </div>
                <AlertDescription className="mt-2 text-xs">
                  Sleep duration has a significant impact on depression, but ranks lower than academic pressure and work/study hours in terms of effect size.
                </AlertDescription>
              </Alert>
            </div>

            <div className="text-xs text-muted-foreground">
              <p>* Significance level: p &lt; 0.05</p>
              <p>* F-Value: Higher values indicate stronger evidence against the null hypothesis</p>
            </div>
          </TabsContent>

          {/* 2. Dietary Habits Tab */}
          <TabsContent value="dietary_habits" className="space-y-4 pt-4">
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Significance Results</h4>
              <div className="space-y-2">
                {anovaData.dietary_habits.map((item) => (
                  <div key={item.name} className="flex flex-col gap-1 text-sm">
                    <div className="flex justify-between items-center">
                      <span>{item.name}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-muted-foreground">
                          F = {item.f_value.toFixed(2)}
                        </span>
                        <span className="text-muted-foreground">
                          p = {item.p_value.toExponential(3)}
                        </span>
                        <span
                          className={
                            item.significant
                              ? "text-green-500 dark:text-green-400"
                              : "text-red-500 dark:text-red-400"
                          }
                        >
                          {item.significant ? "Significant" : "Not Significant"}
                        </span>
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground">{item.analysis}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Added sections */}
            <div className="mt-4 space-y-4">
              <div className="rounded-md border p-4">
                <div className="flex items-center gap-2 mb-2">
                  <InfoIcon className="h-4 w-4 text-blue-500" />
                  <h4 className="text-sm font-medium">Key Insights</h4>
                </div>
                <p className="text-xs text-muted-foreground">
                  {anovaData.dietary_habits[0].insights}
                </p>
              </div>
              
              <div className="rounded-md border p-4">
                <div className="flex items-center gap-2 mb-2">
                  <BookOpenIcon className="h-4 w-4 text-green-500" />
                  <h4 className="text-sm font-medium">Recommendations</h4>
                </div>
                <ul className="text-xs text-muted-foreground pl-5 space-y-1 list-disc">
                  {anovaData.dietary_habits[0].recommendations.map((rec, index) => (
                    <li key={index}>{rec}</li>
                  ))}
                </ul>
              </div>
              
              <Alert className="bg-amber-50 dark:bg-amber-950/50">
                <div className="flex items-center gap-2">
                  <TrendingUpIcon className="h-4 w-4 text-amber-500" />
                  <h4 className="text-sm font-medium">Comparison to Other Factors</h4>
                </div>
                <AlertDescription className="mt-2 text-xs">
                  Dietary habits show a very high F-value (1246.91), making it the third most influential factor after academic pressure and work/study hours.
                </AlertDescription>
              </Alert>
            </div>

            <div className="text-xs text-muted-foreground">
              <p>* Significance level: p &lt; 0.05</p>
              <p>* F-Value: Higher values indicate stronger evidence against the null hypothesis</p>
            </div>
          </TabsContent>

          {/* 3. Academic Pressure Tab */}
          <TabsContent value="academic_pressure" className="space-y-4 pt-4">
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Significance Results</h4>
              <div className="space-y-2">
                {anovaData.academic_pressure.map((item) => (
                  <div key={item.name} className="flex flex-col gap-1 text-sm">
                    <div className="flex justify-between items-center">
                      <span>{item.name}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-muted-foreground">
                          F = {item.f_value.toFixed(2)}
                        </span>
                        <span className="text-muted-foreground">p = {item.p_value}</span>
                        <span
                          className={
                            item.significant
                              ? "text-green-500 dark:text-green-400"
                              : "text-red-500 dark:text-red-400"
                          }
                        >
                          {item.significant ? "Significant" : "Not Significant"}
                        </span>
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground">{item.analysis}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Added sections */}
            <div className="mt-4 space-y-4">
              <div className="rounded-md border p-4">
                <div className="flex items-center gap-2 mb-2">
                  <InfoIcon className="h-4 w-4 text-blue-500" />
                  <h4 className="text-sm font-medium">Key Insights</h4>
                </div>
                <p className="text-xs text-muted-foreground">
                  {anovaData.academic_pressure[0].insights}
                </p>
              </div>
              
              <div className="rounded-md border p-4">
                <div className="flex items-center gap-2 mb-2">
                  <BookOpenIcon className="h-4 w-4 text-green-500" />
                  <h4 className="text-sm font-medium">Recommendations</h4>
                </div>
                <ul className="text-xs text-muted-foreground pl-5 space-y-1 list-disc">
                  {anovaData.academic_pressure[0].recommendations.map((rec, index) => (
                    <li key={index}>{rec}</li>
                  ))}
                </ul>
              </div>
              
              <Alert className="bg-amber-50 dark:bg-amber-950/50">
                <div className="flex items-center gap-2">
                  <TrendingUpIcon className="h-4 w-4 text-amber-500" />
                  <h4 className="text-sm font-medium">Comparison to Other Factors</h4>
                </div>
                <AlertDescription className="mt-2 text-xs">
                  Academic pressure has by far the highest F-value (8112.40) of all factors studied, suggesting it is the dominant contributor to student depression.
                </AlertDescription>
              </Alert>
            </div>

            <div className="text-xs text-muted-foreground">
              <p>* Significance level: p &lt; 0.05</p>
              <p>* F-Value: Higher values indicate stronger evidence against the null hypothesis</p>
            </div>
          </TabsContent>

          {/* 4. CGPA Tab */}
          <TabsContent value="cgpa" className="space-y-4 pt-4">
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Significance Results</h4>
              <div className="space-y-2">
                {anovaData.cgpa.map((item) => (
                  <div key={item.name} className="flex flex-col gap-1 text-sm">
                    <div className="flex justify-between items-center">
                      <span>{item.name}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-muted-foreground">
                          F = {item.f_value.toFixed(2)}
                        </span>
                        <span className="text-muted-foreground">
                          p = {item.p_value.toExponential(3)}
                        </span>
                        <span
                          className={
                            item.significant
                              ? "text-green-500 dark:text-green-400"
                              : "text-red-500 dark:text-red-400"
                          }
                        >
                          {item.significant ? "Significant" : "Not Significant"}
                        </span>
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground">{item.analysis}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Added sections */}
            <div className="mt-4 space-y-4">
              <div className="rounded-md border p-4">
                <div className="flex items-center gap-2 mb-2">
                  <InfoIcon className="h-4 w-4 text-blue-500" />
                  <h4 className="text-sm font-medium">Key Insights</h4>
                </div>
                <p className="text-xs text-muted-foreground">
                  {anovaData.cgpa[0].insights}
                </p>
              </div>
              
              <div className="rounded-md border p-4">
                <div className="flex items-center gap-2 mb-2">
                  <BookOpenIcon className="h-4 w-4 text-green-500" />
                  <h4 className="text-sm font-medium">Recommendations</h4>
                </div>
                <ul className="text-xs text-muted-foreground pl-5 space-y-1 list-disc">
                  {anovaData.cgpa[0].recommendations.map((rec, index) => (
                    <li key={index}>{rec}</li>
                  ))}
                </ul>
              </div>
              
              <Alert className="bg-amber-50 dark:bg-amber-950/50">
                <div className="flex items-center gap-2">
                  <TrendingUpIcon className="h-4 w-4 text-amber-500" />
                  <h4 className="text-sm font-medium">Comparison to Other Factors</h4>
                </div>
                <AlertDescription className="mt-2 text-xs">
                  CGPA has the lowest F-value (13.36) among all factors studied, suggesting that while significant, actual grades have less impact on depression than other academic factors.
                </AlertDescription>
              </Alert>
            </div>

            <div className="text-xs text-muted-foreground">
              <p>* Significance level: p &lt; 0.05</p>
              <p>* F-Value: Higher values indicate stronger evidence against the null hypothesis</p>
            </div>
          </TabsContent>

          {/* 5. Work/Study Hours Tab */}
          <TabsContent value="work_study_hours" className="space-y-4 pt-4">
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Significance Results</h4>
              <div className="space-y-2">
                {anovaData.work_study_hours.map((item) => (
                  <div key={item.name} className="flex flex-col gap-1 text-sm">
                    <div className="flex justify-between items-center">
                      <span>{item.name}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-muted-foreground">
                          F = {item.f_value.toFixed(2)}
                        </span>
                        <span className="text-muted-foreground">
                          p = {item.p_value.toExponential(3)}
                        </span>
                        <span
                          className={
                            item.significant
                              ? "text-green-500 dark:text-green-400"
                              : "text-red-500 dark:text-red-400"
                          }
                        >
                          {item.significant ? "Significant" : "Not Significant"}
                        </span>
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground">{item.analysis}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Added sections */}
            <div className="mt-4 space-y-4">
              <div className="rounded-md border p-4">
                <div className="flex items-center gap-2 mb-2">
                  <InfoIcon className="h-4 w-4 text-blue-500" />
                  <h4 className="text-sm font-medium">Key Insights</h4>
                </div>
                <p className="text-xs text-muted-foreground">
                  {anovaData.work_study_hours[0].insights}
                </p>
              </div>
              
              <div className="rounded-md border p-4">
                <div className="flex items-center gap-2 mb-2">
                  <BookOpenIcon className="h-4 w-4 text-green-500" />
                  <h4 className="text-sm font-medium">Recommendations</h4>
                </div>
                <ul className="text-xs text-muted-foreground pl-5 space-y-1 list-disc">
                  {anovaData.work_study_hours[0].recommendations.map((rec, index) => (
                    <li key={index}>{rec}</li>
                  ))}
                </ul>
              </div>
              
              <Alert className="bg-amber-50 dark:bg-amber-950/50">
                <div className="flex items-center gap-2">
                  <TrendingUpIcon className="h-4 w-4 text-amber-500" />
                  <h4 className="text-sm font-medium">Comparison to Other Factors</h4>
                </div>
                <AlertDescription className="mt-2 text-xs">
                  Work/Study Hours has the second highest F-value (1268.91), significantly higher than sleep and dietary factors, indicating time management is a critical area for intervention.
                </AlertDescription>
              </Alert>
            </div>

            <div className="text-xs text-muted-foreground">
              <p>* Significance level: p &lt; 0.05</p>
              <p>* F-Value: Higher values indicate stronger evidence against the null hypothesis</p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}