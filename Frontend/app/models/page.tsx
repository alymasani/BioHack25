import { DashboardLayout } from "@/components/dashboard-layout"
import { ModelsList } from "@/components/models-list"
import { ModelUpload } from "@/components/model-upload"

export default function ModelsPage() {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Models</h1>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <ModelUpload />
          <ModelsList />
        </div>
      </div>
    </DashboardLayout>
  )
}

