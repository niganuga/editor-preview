"use client"

import { useState } from "react"
import {
  CheckCircle,
  Download,
  Cpu,
  History,
  X,
  XCircle,
  AlertTriangle,
  Info,
} from "lucide-react"
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

function StatusIcon({ status }: { status: CheckItem["status"] }) {
  switch (status) {
    case "pass":
      return <CheckCircle size={12} className="text-[#4CAF6A] shrink-0" />
    case "fail":
      return <XCircle size={12} className="text-[#D64045] shrink-0" />
    case "warning":
      return <AlertTriangle size={12} className="text-[#D4943D] shrink-0" />
    case "info":
      return <Info size={12} className="text-[#3B8DB0] shrink-0" />
  }
}

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
    <div
      className="fixed right-4 top-1/2 -translate-y-1/2 z-30 flex flex-row rounded-2xl border border-[#3A3935] transition-all duration-200"
      style={{
        backgroundColor: "rgba(30, 30, 28, 0.95)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        boxShadow: "0 4px 16px rgba(0,0,0,0.3), 3px 3px 0px 0px #1A1A1A",
      }}
    >
      {/* Icon column */}
      <div
        className={[
          "flex flex-col items-center gap-1 py-3 w-12",
          isExpanded ? "border-r border-[#3A3935]" : "",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {PANEL_ITEMS.map((item) => {
          const isActive = activePanel === item.id
          return (
            <Tooltip key={item.id}>
              <TooltipTrigger
                onClick={() => handleIconClick(item.id)}
                aria-label={item.label}
                aria-pressed={isActive}
                className={[
                  "w-8 h-8 rounded-xl flex items-center justify-center cursor-pointer transition-colors relative",
                  isActive
                    ? "bg-[#E8863A] text-[#1A1A1A]"
                    : "text-[#9B9589] hover:text-[#EDE9E0] hover:bg-[#2A2926]",
                ].join(" ")}
              >
                {item.icon}
                {/* Badge for print readiness failures */}
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
            className="absolute top-2.5 right-2.5 w-6 h-6 flex items-center justify-center rounded-lg text-[#9B9589] hover:text-[#EDE9E0] hover:bg-[#2A2926] transition-colors z-10"
          >
            <X size={14} />
          </button>

          {/* Print Readiness Panel */}
          {activePanel === "print-readiness" && (
            <>
              <p className="font-semibold text-sm text-[#EDE9E0] pr-6">
                Print Readiness
              </p>

              {/* Score summary */}
              <div className="flex items-center gap-3 text-[10px] font-semibold uppercase tracking-wider pb-1">
                <span className="text-[#D64045]">{failCount} failed</span>
                <span className="text-[#D4943D]">{warnCount} warning</span>
                <span className="text-[#4CAF6A]">{passCount} passed</span>
              </div>

              {/* Check rows */}
              <div className="flex flex-col gap-1.5">
                {READINESS_CHECKS.map((check, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-2 rounded-lg px-2 py-1.5"
                    style={{
                      backgroundColor:
                        check.status === "fail"
                          ? "rgba(214, 64, 69, 0.08)"
                          : check.status === "warning"
                            ? "rgba(212, 148, 61, 0.06)"
                            : "transparent",
                    }}
                  >
                    <StatusIcon status={check.status} />
                    <div className="flex flex-col gap-0.5 min-w-0">
                      <span className="text-[11px] font-medium text-[#EDE9E0]">
                        {check.label}
                      </span>
                      <span className="text-[10px] font-mono text-[#9B9589]">
                        {check.value}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* File specs */}
              <div className="border-t border-[#3A3935] pt-2 mt-1">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-[#9B9589] mb-1.5">
                  File Info
                </p>
                <div className="grid grid-cols-2 gap-x-3 gap-y-1 text-[10px]">
                  <span className="text-[#9B9589]">Format</span>
                  <span className="font-mono text-[#EDE9E0]">PNG</span>
                  <span className="text-[#9B9589]">Size</span>
                  <span className="font-mono text-[#EDE9E0]">2.4 MB</span>
                  <span className="text-[#9B9589]">Dimensions</span>
                  <span className="font-mono text-[#EDE9E0]">1024 × 1024</span>
                  <span className="text-[#9B9589]">DPI</span>
                  <span className="font-mono text-[#D64045]">72</span>
                  <span className="text-[#9B9589]">Color</span>
                  <span className="font-mono text-[#EDE9E0]">RGB</span>
                  <span className="text-[#9B9589]">Background</span>
                  <span className="font-mono text-[#D64045]">Opaque</span>
                  <span className="text-[#9B9589]">Target</span>
                  <span className="font-mono text-[#EDE9E0]">Youth Tee</span>
                  <span className="text-[#9B9589]">Print Size</span>
                  <span className="font-mono text-[#EDE9E0]">9&quot; × 11&quot;</span>
                </div>
              </div>
            </>
          )}

          {/* Other panels — static content */}
          {activePanel && activePanel !== "print-readiness" && PANEL_CONTENT[activePanel] && (
            <>
              <p className="font-semibold text-sm text-[#EDE9E0] pr-6">
                {PANEL_ITEMS.find((p) => p.id === activePanel)?.label}
              </p>
              <div className="flex flex-col gap-1">
                {PANEL_CONTENT[activePanel].map((line, i) => (
                  <p key={i} className="text-xs text-[#9B9589] leading-relaxed">
                    {line}
                  </p>
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  )
}
