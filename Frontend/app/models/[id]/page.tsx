import { DashboardLayout } from "@/components/dashboard-layout"
import { ModelDetails } from "@/components/model-details"
import { ModelPrediction } from "@/components/model-prediction"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default async function ModelDetailsPage({ params }: { params: { id: string } }) {
  // Ensure params is resolved before accessing its properties
  const resolvedParams = await Promise.resolve(params)
  const { id } = resolvedParams

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" asChild>
            <Link href="/models">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back to models</span>
            </Link>
          </Button>
          <h1 className="text-3xl font-bold tracking-tight">Model Details</h1>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <ModelDetails id={id} />
          <ModelPrediction id={id} />
        </div>
      </div>
    </DashboardLayout>
  )
}
