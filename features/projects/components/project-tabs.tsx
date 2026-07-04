"use client"

import { useState, ReactNode } from "react"
import { cn } from "@/lib/utils"

interface ProjectTabsProps {
  updatesContent: ReactNode
  generateContent: ReactNode
}

export function ProjectTabs({ updatesContent, generateContent }: ProjectTabsProps) {
  const [activeTab, setActiveTab] = useState<"updates" | "generate">("updates")

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-8 border-b border-border">
        <button
          onClick={() => setActiveTab("updates")}
          className={cn(
            "pb-3 text-base font-medium transition-colors hover:text-foreground border-b-2 -mb-[1px]",
            activeTab === "updates" ? "border-primary text-foreground" : "border-transparent text-muted-foreground"
          )}
        >
          Recent Updates
        </button>
        <button
          onClick={() => setActiveTab("generate")}
          className={cn(
            "pb-3 text-base font-medium transition-colors hover:text-foreground border-b-2 -mb-[1px]",
            activeTab === "generate" ? "border-primary text-foreground" : "border-transparent text-muted-foreground"
          )}
        >
          Generate Content
        </button>
      </div>

      <div className="pt-2 animate-in fade-in-50 duration-300">
        {activeTab === "updates" && updatesContent}
        {activeTab === "generate" && generateContent}
      </div>
    </div>
  )
}
