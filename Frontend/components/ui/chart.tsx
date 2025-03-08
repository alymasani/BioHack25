"use client"

import type React from "react"

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export const BarChart = () => {
  return null
}

export const LineChart = () => {
  return null
}

export const AreaChart = () => {
  return null
}

export const ChartContainer = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>
}

export const ChartTooltip = ({ children, ...props }: any) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div>{children}</div>
        </TooltipTrigger>
        <TooltipContent {...props}>
          <ChartTooltipContent />
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export const ChartTooltipContent = () => {
  return <div></div>
}

