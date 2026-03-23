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
  { label: "Sharpness", value: "Low — will soften", status: "warning" },
]

function StatusIcon({ status }: { status: CheckItem["status"] }) {
  switch (status) {
    case "pass":
      return <CheckCircle size={12} className="text-emerald-400 shrink-0" />
    case "fail":
      return <XCircle size={12} className="text-rose-400 shrink-0" />
    case "warning":
      return <AlertTriangle size={12} className="text-amber-400 shrink-0" />
    case "info":
      return <Info size={12} className="text-sky-400 shrink-0" />
  }
}

const PANEL_ITEMS = [
  { id: "print-readiness", icon: <CheckCircle size={16} />, label: "Print Readiness" },
  { id: "export", icon: <Download size={16} />, label: "Export" },
  { id: "print-intelligence", icon: <Cpu size={16} />, label: "Print Intelligence" },
  { id: "history", icon: <History size={16} />, label: "History" },
]

export function AuroraRightPanel() {
  const [activePanel, setActivePanel] = useState<string | null>("print-readiness")

  const isExpanded = activePanel !== null
  const failCount = READINESS_CHECKS.filter((c) => c.status === "fail").length

  return (
    <div
      className="fixed right-5 top-1/2 -translate-y-1/2 z-30 flex flex-row rounded-2xl transition-all duration-300"
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.45)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        border: "1px solid rgba(255,255,255,0.08)",
        boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
      }}
    >
      {/* Icon column */}
      <div
        className={`flex flex-col items-center gap-1 py-3 w-12 ${isExpanded ? "border-r border-white/10" : ""}`}
      >
        {PANEL_ITEMS.map((item) => {
          const isActive = activePanel === item.id
          return (
            <Tooltip key={item.id}>
              <TooltipTrigger
                onClick={() => setActivePanel((prev) => (prev === item.id ? null : item.id))}
                aria-label={item.label}
                className={`w-8 h-8 rounded-xl flex items-center justify-center cursor-pointer transition-colors relative ${
                  isActive
                    ? "bg-white/20 text-white"
                    : "text-white/40 hover:text-white/70 hover:bg-white/10"
                }`}
              >
                {item.icon}
                {item.id === "print-readiness" && failCount > 0 && !isActive && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[9px] font-bold flex items-center justify-center">
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

      {/* Expanded content */}
      {isExpanded && activePanel === "print-readiness" && (
        <div className="w-60 p-3 relative flex flex-col gap-2 max-h-[400px] overflow-y-auto">
          <button
            type="button"
            onClick={() => setActivePanel(null)}
            className="absolute top-2.5 right-2.5 w-6 h-6 flex items-center justify-center rounded-lg text-white/40 hover:text-white/70 hover:bg-white/10 transition-colors z-10"
          >
            <X size={14} />
          </button>

          <p className="font-semibold text-sm text-white/90 pr-6">Print Readiness</p>

          <div className="flex items-center gap-3 text-[10px] font-semibold uppercase tracking-wider pb-1">
            <span className="text-rose-400">3 failed</span>
            <span className="text-amber-400">2 warning</span>
            <span className="text-emerald-400">2 passed</span>
          </div>

          <div className="flex flex-col gap-1.5">
            {READINESS_CHECKS.map((check, i) => (
              <div
                key={i}
                className="flex items-start gap-2 rounded-lg px-2 py-1.5"
                style={{
                  backgroundColor:
                    check.status === "fail"
                      ? "rgba(244, 63, 94, 0.1)"
                      : check.status === "warning"
                        ? "rgba(251, 191, 36, 0.08)"
                        : "transparent",
                }}
              >
                <StatusIcon status={check.status} />
                <div className="flex flex-col gap-0.5 min-w-0">
                  <span className="text-[11px] font-medium text-white/80">{check.label}</span>
                  <span className="text-[10px] font-mono text-white/40">{check.value}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-white/10 pt-2 mt-1">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-white/30 mb-1.5">File Info</p>
            <div className="grid grid-cols-2 gap-x-3 gap-y-1 text-[10px]">
              <span className="text-white/30">Format</span>
              <span className="font-mono text-white/70">PNG</span>
              <span className="text-white/30">Size</span>
              <span className="font-mono text-white/70">2.4 MB</span>
              <span className="text-white/30">DPI</span>
              <span className="font-mono text-rose-400">72</span>
              <span className="text-white/30">Target</span>
              <span className="font-mono text-white/70">Youth Tee</span>
              <span className="text-white/30">Print Size</span>
              <span className="font-mono text-white/70">9&quot; × 11&quot;</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
