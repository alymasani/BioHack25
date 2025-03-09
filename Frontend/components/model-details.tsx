"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { XAxis, YAxis, CartesianGrid, Tooltip, Legend, Bar, BarChart } from "recharts";
import { fetchModelDetails } from "@/lib/api";

export function ModelDetails({ id }: { id: string }) {
  const [model, setModel] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadModelData() {
      try {
        const modelData = await fetchModelDetails(id);
        console.log("Model data:", modelData);
        console.log("Feature importance:", modelData.feature_importance);
        setModel(modelData);
      } catch (err) {
        console.error("Error loading model details:", err);
        setError("Failed to load model details");
      } finally {
        setLoading(false);
      }
    }

    loadModelData();
  }, [id]);

  if (loading) return <p>Loading model details...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!model) return <p>No model found.</p>;

  // Confusion matrix values
  const { confusion_matrix, accuracy, precision, recall, f1, feature_importance } = model;
  const [tp, fp] = confusion_matrix?.[0] || [0, 0]; // True Positives & False Positives
  const [fn, tn] = confusion_matrix?.[1] || [0, 0]; // False Negatives & True Negatives

  // Format feature importance data for chart
  const featureData = Array.isArray(feature_importance) 
    ? feature_importance.map((value: number, index: number) => ({
        name: `Feature ${index + 1}`,
        value: parseFloat(value.toFixed(4)),
      }))
    : [];

  return (
    <Card className="col-span-1">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Model Details: {id}</CardTitle>
          </div>
          <Badge variant="outline" className="bg-primary/10 text-primary">
            {(accuracy * 100).toFixed(1)}% Accuracy
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="performance">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="features">Features</TabsTrigger>
          </TabsList>

          {/* Performance Metrics */}
          <TabsContent value="performance" className="pt-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-muted p-2 rounded-md">
                <p className="text-xs text-muted-foreground">Precision</p>
                <p className="text-lg font-medium">{precision?.toFixed(2) || "N/A"}</p>
              </div>
              <div className="bg-muted p-2 rounded-md">
                <p className="text-xs text-muted-foreground">Recall</p>
                <p className="text-lg font-medium">{recall?.toFixed(2) || "N/A"}</p>
              </div>
              <div className="bg-muted p-2 rounded-md">
                <p className="text-xs text-muted-foreground">F1 Score</p>
                <p className="text-lg font-medium">{f1?.toFixed(2) || "N/A"}</p>
              </div>
            </div>

            {/* Confusion Matrix */}
            <h4 className="text-sm font-medium my-4">Confusion Matrix</h4>
            <div className="grid grid-cols-2 gap-1 text-center">
              <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-md">
                <p className="text-xs text-muted-foreground">True Positive</p>
                <p className="text-lg font-medium">{tp}</p>
              </div>
              <div className="bg-red-100 dark:bg-red-900/30 p-2 rounded-md">
                <p className="text-xs text-muted-foreground">False Positive</p>
                <p className="text-lg font-medium">{fp}</p>
              </div>
              <div className="bg-red-100 dark:bg-red-900/30 p-2 rounded-md">
                <p className="text-xs text-muted-foreground">False Negative</p>
                <p className="text-lg font-medium">{fn}</p>
              </div>
              <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-md">
                <p className="text-xs text-muted-foreground">True Negative</p>
                <p className="text-lg font-medium">{tn}</p>
              </div>
            </div>
          </TabsContent>

          {/* Feature Importance */}
          <TabsContent value="features" className="pt-4">
            <h4 className="text-sm font-medium mb-2">Feature Importance</h4>
            {featureData.length > 0 ? (
              <ChartContainer className="h-64 w-full">
                <BarChart data={featureData} width={500} height={300} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip content={<ChartTooltip />} />
                  <Legend />
                  <Bar dataKey="value" fill="hsl(var(--primary))" />
                </BarChart>
              </ChartContainer>
            ) : (
              <p className="text-muted-foreground">
                Feature importance data is missing or empty. Check the API response.
              </p>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}