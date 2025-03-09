import { DashboardLayout } from "@/components/dashboard-layout"
import { CorrelationHeatmap } from "@/components/correlation-heatmap"
import { AnovaResults } from "@/components/anova-results"
import { DistributionPlots } from "@/components/distribution-plots"
import { StatisticalSummary } from "@/components/statistical-summary"
import { MosaicGraphs } from "@/components/mosaic-graphs"

export default function VisualizationsPage() {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Visualizations</h1>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <CorrelationHeatmap />
          <AnovaResults />
          <DistributionPlots />
          <MosaicGraphs />
          <StatisticalSummary />
        </div>
      </div>
    </DashboardLayout>
  )
}

