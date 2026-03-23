"use client"

import { useState } from "react"
import { CheckCircle, Download, Cpu, History, X } from "lucide-react"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

interface PanelItem {
  id: string
  icon: React.ReactNode
  label: string
  placeholder: string[]
}

const PANEL_ITEMS: PanelItem[] = [
  {
    id: "print-readiness",
    icon: <CheckCircle size={16} />,
    label: "Print Readiness",
    placeholder: [
      "Your document passes all preflight checks.",
      "Bleed area: 3mm on all sides detected.",
      "Color profile: CMYK confirmed for print output.",
      "Resolution: All images meet 300dpi minimum.",
    ],
  },
  {
    id: "export",
    icon: <Download size={16} />,
    label: "Export",
    placeholder: [
      "Export your document in print-ready formats.",
      "PDF/X-1a and PDF/X-4 are available for this layout.",
      "Select a preset or configure custom export settings.",
    ],
  },
  {
    id: "print-intelligence",
    icon: <Cpu size={16} />,
    label: "Print Intelligence",
    placeholder: [
      "AI-assisted print optimization is active.",
      "Ink coverage is within acceptable limits.",
      "Font embedding verified — no missing typefaces.",
      "Overprint settings have been automatically applied.",
    ],
  },
  {
    id: "history",
    icon: <History size={16} />,
    label: "History",
    placeholder: [
      "Version 3 — Today at 2:14 PM",
      "Version 2 — Today at 11:02 AM",
      "Version 1 — Yesterday at 5:47 PM",
    ],
  },
]

export function RightPanel() {
  const [activePanel, setActivePanel] = useState<string | null>(null)

  const isExpanded = activePanel !== null
  const activePanelItem = PANEL_ITEMS.find((item) => item.id === activePanel)

  function handleIconClick(id: string) {
    setActivePanel((prev) => (prev === id ? null : id))
  }

  function handleClose() {
    setActivePanel(null)
  }

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
                  "w-8 h-8 rounded-xl flex items-center justify-center cursor-pointer transition-colors",
                  isActive
                    ? "bg-[#E8863A] text-[#1A1A1A]"
                    : "text-[#9B9589] hover:text-[#EDE9E0] hover:bg-[#2A2926]",
                ].join(" ")}
              >
                {item.icon}
              </TooltipTrigger>
              <TooltipContent side="left">
                <p>{item.label}</p>
              </TooltipContent>
            </Tooltip>
          )
        })}
      </div>

      {/* Expanded content area */}
      {isExpanded && activePanelItem && (
        <div className="w-60 p-4 relative flex flex-col gap-2">
          <button
            type="button"
            aria-label="Close panel"
            onClick={handleClose}
            className="absolute top-3 right-3 w-6 h-6 flex items-center justify-center rounded-lg text-[#9B9589] hover:text-[#EDE9E0] hover:bg-[#2A2926] transition-colors"
          >
            <X size={14} />
          </button>

          <p className="font-semibold text-sm text-[#EDE9E0] pr-6">
            {activePanelItem.label}
          </p>

          <div className="flex flex-col gap-1">
            {activePanelItem.placeholder.map((line, index) => (
              <p key={index} className="text-xs text-[#9B9589] leading-relaxed">
                {line}
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
