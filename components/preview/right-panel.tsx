"use client"

import { useState } from "react"
import { CheckCircle, Download, Cpu, History, X } from "lucide-react"
import { ChromePanel } from "@/components/ui/kit"
import { StatusBadge } from "@/components/ui/kit"
import { Text } from "@/components/ui/utilities"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

interface CheckItem {
  label: string
  value: string
  status: "pass" | "fail" | "warning" | "info"
}

const READINESS_CHECKS: CheckItem[] = [
  { label: "Resolution", value: "72 DPI", status: "fail" },
  { label: "Background", value: "Solid white", status: "fail" },
  { label: "Transparency", value: "None detected", status: "fail" },
  { label: "File Format", value: "PNG", status: "pass" },
  { label: "File Size", value: "2.4 MB", status: "pass" },
  { label: "Dimensions", value: "1024 × 1024 px", status: "warning" },
  { label: "Color Mode", value: "RGB", status: "info" },
  { label: "Sharpness", value: "Low — will soften on fabric", status: "warning" },
]

interface PanelItem {
  id: string
  icon: React.ReactNode
  label: string
}

const PANEL_ITEMS: PanelItem[] = [
  { id: "print-readiness", icon: <CheckCircle size={16} />, label: "Print Readiness" },
  { id: "export", icon: <Download size={16} />, label: "Export" },
  { id: "print-intelligence", icon: <Cpu size={16} />, label: "Print Intelligence" },
  { id: "history", icon: <History size={16} />, label: "History" },
]

const PANEL_CONTENT: Record<string, string[]> = {
  export: [
    "Export will be available after fixes.",
    "Recommended: transparent PNG at 300 DPI.",
    "Youth tee size: 9\" × 11\" at print resolution.",
  ],
  "print-intelligence": [
    "Print method: DTF recommended for this design.",
    "Ink coverage: Medium — good for cotton and blends.",
    "Color count: 12+ colors detected — DTF handles this well.",
    "Dark fabric: transparent background required.",
  ],
  history: [
    "Current version — original upload",
    "No edits yet. Fix All will create version 2.",
  ],
}

export function RightPanel() {
  const [activePanel, setActivePanel] = useState<string | null>("print-readiness")

  const isExpanded = activePanel !== null

  function handleIconClick(id: string) {
    setActivePanel((prev) => (prev === id ? null : id))
  }

  function handleClose() {
    setActivePanel(null)
  }

  const failCount = READINESS_CHECKS.filter((c) => c.status === "fail").length
  const warnCount = READINESS_CHECKS.filter((c) => c.status === "warning").length
  const passCount = READINESS_CHECKS.filter((c) => c.status === "pass").length

  return (
    <ChromePanel
      className="fixed right-4 top-1/2 -translate-y-1/2 z-30 flex flex-row transition-all duration-200"
      overflowVisible
    >
      {/* Icon column */}
      <div
        className={`flex flex-col items-center gap-1 py-3 w-12 ${isExpanded ? "border-r border-[#3A3935]" : ""}`}
      >
        {PANEL_ITEMS.map((item) => {
          const isActive = activePanel === item.id
          return (
            <Tooltip key={item.id}>
              <TooltipTrigger
                onClick={() => handleIconClick(item.id)}
                aria-label={item.label}
                aria-pressed={isActive}
                className={`min-w-[44px] min-h-[44px] w-8 h-8 rounded-xl flex items-center justify-center cursor-pointer transition-colors relative ${
                  isActive
                    ? "bg-[#E8863A] text-[#1A1A1A]"
                    : "text-[#9B9589] hover:text-[#EDE9E0] hover:bg-[#2A2926]"
                }`}
              >
                {item.icon}
                {item.id === "print-readiness" && failCount > 0 && !isActive && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#D64045] text-[#EDE9E0] text-[9px] font-bold flex items-center justify-center">
                    {failCount}
                  </span>
                )}
              </TooltipTrigger>
              <TooltipContent side="left">
                <p>{item.label}</p>
              </TooltipContent>
            </Tooltip>
          )
        })}
      </div>

      {/* Expanded content area */}
      {isExpanded && (
        <div className="w-64 p-3 relative flex flex-col gap-2 max-h-[420px] overflow-y-auto">
          <button
            type="button"
            aria-label="Close panel"
            onClick={handleClose}
            className="absolute top-2.5 right-2.5 min-w-[44px] min-h-[44px] w-6 h-6 flex items-center justify-center rounded-lg text-[#9B9589] hover:text-[#EDE9E0] hover:bg-[#2A2926] transition-colors z-10"
          >
            <X size={14} />
          </button>

          {/* Print Readiness Panel */}
          {activePanel === "print-readiness" && (
            <>
              <Text variant="heading" color="primary" className="pr-6">Print Readiness</Text>

              {/* Score summary */}
              <div className="flex items-center gap-3 pb-1">
                <Text variant="caption" className="font-semibold uppercase tracking-wider text-[#D64045]">{failCount} failed</Text>
                <Text variant="caption" className="font-semibold uppercase tracking-wider text-[#D4943D]">{warnCount} warning</Text>
                <Text variant="caption" className="font-semibold uppercase tracking-wider text-[#4CAF6A]">{passCount} passed</Text>
              </div>

              {/* Check rows — using StatusBadge */}
              <div className="flex flex-col gap-1.5">
                {READINESS_CHECKS.map((check, i) => (
                  <StatusBadge
                    key={i}
                    status={check.status}
                    label={check.label}
                    value={check.value}
                  />
                ))}
              </div>

              {/* File specs */}
              <div className="border-t border-[#3A3935] pt-2 mt-1">
                <Text variant="label" color="muted" className="text-[10px] mb-1.5">File Info</Text>
                <div className="grid grid-cols-2 gap-x-3 gap-y-1">
                  <Text variant="data" color="muted">Format</Text>
                  <Text variant="data" color="primary">PNG</Text>
                  <Text variant="data" color="muted">Size</Text>
                  <Text variant="data" color="primary">2.4 MB</Text>
                  <Text variant="data" color="muted">Dimensions</Text>
                  <Text variant="data" color="primary">1024 × 1024</Text>
                  <Text variant="data" color="muted">DPI</Text>
                  <Text variant="data" className="text-[#D64045]">72</Text>
                  <Text variant="data" color="muted">Color</Text>
                  <Text variant="data" color="primary">RGB</Text>
                  <Text variant="data" color="muted">Background</Text>
                  <Text variant="data" className="text-[#D64045]">Opaque</Text>
                  <Text variant="data" color="muted">Target</Text>
                  <Text variant="data" color="primary">Youth Tee</Text>
                  <Text variant="data" color="muted">Print Size</Text>
                  <Text variant="data" color="primary">9&quot; × 11&quot;</Text>
                </div>
              </div>
            </>
          )}

          {/* Other panels — static content */}
          {activePanel && activePanel !== "print-readiness" && PANEL_CONTENT[activePanel] && (
            <>
              <Text variant="heading" color="primary" className="pr-6">
                {PANEL_ITEMS.find((p) => p.id === activePanel)?.label}
              </Text>
              <div className="flex flex-col gap-1">
                {PANEL_CONTENT[activePanel].map((line, i) => (
                  <Text key={i} variant="body" color="muted">{line}</Text>
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </ChromePanel>
  )
}
