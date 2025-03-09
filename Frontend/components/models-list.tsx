"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, BarChart } from "lucide-react";
import Link from "next/link";
import { fetchModels } from "@/lib/api";

export function ModelsList() {
  const [models, setModels] = useState<{ id: string; name: string; accuracy: number }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadModels() {
      try {
        const data = await fetchModels();
        setModels(data);
      } catch (err) {
        setError("Failed to load models");
      } finally {
        setLoading(false);
      }
    }

    loadModels();
  }, []);

  if (loading) return <p>Loading models...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>Available Models</CardTitle>
        <CardDescription>Select a model to view details or run predictions</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {models.map((model) => (
            <div key={model.id} className="flex flex-col space-y-2 p-4 border rounded-lg">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">{model.name}</h3>
                <span className="text-sm bg-primary/10 text-primary px-2 py-1 rounded-full">
                  {(model.accuracy * 100).toFixed(1)}% Accuracy
                </span>
              </div>
              <div className="flex items-center justify-between mt-2">
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/models/${model.id}`}>
                      <Eye className="h-4 w-4 mr-1" />
                      Details
                    </Link>
                  </Button>
                  <Button variant="default" size="sm" asChild>
                    <Link href={`/models/${model.id}`}>
                      <BarChart className="h-4 w-4 mr-1" />
                      Use
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
