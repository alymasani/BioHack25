"use client"

import type React from "react"

import { Header } from "@/components/header"

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex-1 p-8">
        <main>{children}</main>
      </div>
    </div>
  )
}

