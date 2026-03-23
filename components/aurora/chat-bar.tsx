"use client"

import { useState } from "react"
import {
  ArrowUpCircle,
  Droplet,
  Eraser,
  FileCheck,
  Layers,
  Palette,
  Paperclip,
  Globe,
  Settings,
  Mic,
  Columns2,
} from "lucide-react"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

const TOOL_ITEMS = [
  { icon: FileCheck, label: "File Validator" },
  { icon: Eraser, label: "BG Remover" },
  { icon: ArrowUpCircle, label: "Upscaler" },
  { icon: Droplet, label: "Color Knockout" },
  { icon: Palette, label: "Recolor" },
  { icon: Layers, label: "Texture+Cut" },
]

export function AuroraChatBar() {
  const [showTools, setShowTools] = useState(false)

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 w-[640px] max-w-[calc(100vw-4rem)] flex flex-col items-center gap-3">
      {/* Tools tray */}
      {showTools && (
        <div
          className="rounded-2xl px-2 py-2 flex items-center gap-1"
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          {TOOL_ITEMS.map((tool) => (
            <Tooltip key={tool.label}>
              <TooltipTrigger
                className="w-10 h-10 rounded-xl flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 cursor-pointer transition-colors"
                aria-label={tool.label}
              >
                <tool.icon className="w-5 h-5" />
              </TooltipTrigger>
              <TooltipContent>
                <p>{tool.label}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
      )}

      {/* Main input bar */}
      <div
        className="w-full rounded-2xl overflow-hidden"
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.55)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
        }}
      >
        {/* Input row */}
        <div className="px-5 pt-4 pb-2">
          <input
            type="text"
            placeholder="Type your message here..."
            className="w-full bg-transparent text-sm text-white/90 placeholder:text-white/40 outline-none"
          />
        </div>

        {/* Bottom icons */}
        <div className="flex items-center px-5 pb-3 pt-1">
          <div className="flex items-center gap-3">
            <Paperclip className="w-4 h-4 text-white/35 hover:text-white/70 cursor-pointer transition-colors" />
            <Globe className="w-4 h-4 text-white/35 hover:text-white/70 cursor-pointer transition-colors" />
          </div>

          <div className="w-px h-4 bg-white/10 mx-3" />

          <div className="flex items-center gap-3">
            <Settings className="w-4 h-4 text-white/35 hover:text-white/70 cursor-pointer transition-colors" />
            <button
              type="button"
              onClick={() => setShowTools((prev) => !prev)}
              className="cursor-pointer transition-colors"
            >
              <Columns2 className={`w-4 h-4 transition-colors ${showTools ? "text-white/70" : "text-white/35 hover:text-white/70"}`} />
            </button>
          </div>

          <div className="flex-1" />

          {/* Mic button */}
          <button
            type="button"
            className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center cursor-pointer hover:scale-105 transition-transform"
          >
            <Mic className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
