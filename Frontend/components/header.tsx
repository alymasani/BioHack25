"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChart3, Brain } from "lucide-react"
import { cn } from "@/lib/utils"
import { ModeToggle } from "@/components/mode-toggle"

export function Header() {
  const pathname = usePathname()

  const routes = [
    {
      title: "Models",
      href: "/models",
      icon: Brain,
    },
    {
      title: "Visualizations",
      href: "/visualizations",
      icon: BarChart3,
    },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="flex items-center gap-2">
            <span className="font-bold text-xl hidden md:inline-flex">Depression Analysis</span>
            <span className="font-bold text-xl md:hidden">Analysis</span>
          </Link>
        </div>
        <nav className="flex items-center gap-6 text-sm">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "flex items-center gap-2 font-medium transition-colors hover:text-primary",
                pathname === route.href ? "text-primary" : "text-muted-foreground",
              )}
            >
              <route.icon className="h-4 w-4" />
              {route.title}
            </Link>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <ModeToggle />
        </div>
      </div>
    </header>
  )
}

