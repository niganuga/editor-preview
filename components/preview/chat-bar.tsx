"use client"

import {
  ArrowUpCircle,
  Droplet,
  Eraser,
  FileCheck,
  Layers,
  Palette,
  Paperclip,
  SendHorizontal,
} from "lucide-react"
import { ChromePanel } from "@/components/ui/kit"
import { IconButton } from "@/components/ui/kit"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

const TOOL_ITEMS = [
  { icon: FileCheck, label: "File Validator" },
  { icon: Eraser, label: "BG Remover" },
  { icon: ArrowUpCircle, label: "Upscaler" },
  { icon: Droplet, label: "Color Knockout" },
  { icon: Palette, label: "Recolor" },
  { icon: Layers, label: "Texture+Cut" },
]

export function ChatBar() {
  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-[640px] max-w-[calc(100vw-2rem)]">
      <ChromePanel elevation="elevated">
        {/* Message input row */}
        <div className="flex items-center gap-3 px-4 py-3">
          <IconButton icon={Paperclip} iconSize={16} aria-label="Attach file" className="w-8 h-8 min-w-[44px] min-h-[44px]" />

          <div
            className="flex-1 rounded-xl px-3 py-2"
            style={{
              backgroundColor: "rgba(20, 20, 19, 0.6)",
              border: "1px solid #3A3935",
            }}
          >
            <textarea
              rows={1}
              placeholder="Type your message here..."
              className="w-full bg-transparent text-sm text-[#EDE9E0] placeholder:text-[#6B6660] outline-none resize-none leading-5"
              aria-label="Chat message"
            />
          </div>

          <button
            type="button"
            className="min-w-[44px] min-h-[44px] w-8 h-8 rounded-full bg-[#E8863A] text-[#1A1A1A] flex items-center justify-center cursor-pointer hover:opacity-90 transition-opacity shrink-0"
            aria-label="Send message"
          >
            <SendHorizontal className="w-4 h-4" />
          </button>
        </div>

        {/* Divider */}
        <div className="border-t border-[#3A3935] mx-3" />

        {/* Tools row — always visible, evenly spaced */}
        <div className="flex items-center justify-evenly px-2 py-2">
          {TOOL_ITEMS.map((tool) => (
            <Tooltip key={tool.label}>
              <TooltipTrigger
                className="flex-1 flex items-center justify-center min-h-[44px] rounded-xl text-[#9B9589] hover:text-[#EDE9E0] hover:bg-[#3A3935] cursor-pointer transition-colors"
                aria-label={tool.label}
              >
                <tool.icon className="w-[18px] h-[18px]" />
              </TooltipTrigger>
              <TooltipContent>
                <p>{tool.label}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
      </ChromePanel>
    </div>
  )
}
