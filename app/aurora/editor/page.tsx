"use client"

import Image from "next/image"
import {
  ZoomIn,
  ZoomOut,
  Sun,
  Replace,
} from "lucide-react"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { GradientBg } from "@/components/aurora/gradient-bg"
import { AuroraHeader } from "@/components/aurora/header"
import { AuroraChatBar } from "@/components/aurora/chat-bar"
import { AuroraRightPanel } from "@/components/aurora/right-panel"
import { AuroraChatHistory } from "@/components/aurora/chat-history"

const CANVAS_ACTIONS = [
  { icon: ZoomIn, label: "Zoom In" },
  { icon: ZoomOut, label: "Zoom Out" },
  { icon: Sun, label: "Canvas Light/Dark" },
  { icon: Replace, label: "Replace Image" },
]

function CanvasControls() {
  return (
    <div
      className="fixed top-20 left-1/2 -translate-x-1/2 z-30 flex items-center gap-1 rounded-full px-2 py-1.5"
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.35)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        border: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      {CANVAS_ACTIONS.map((action) => (
        <Tooltip key={action.label}>
          <TooltipTrigger
            className="w-8 h-8 rounded-full flex items-center justify-center text-white/40 hover:text-white/80 hover:bg-white/10 cursor-pointer transition-colors"
            aria-label={action.label}
          >
            <action.icon className="w-4 h-4" />
          </TooltipTrigger>
          <TooltipContent>
            <p>{action.label}</p>
          </TooltipContent>
        </Tooltip>
      ))}
    </div>
  )
}

function ImageCanvas() {
  return (
    <div className="fixed inset-0 z-0 flex items-center justify-center">
      <div
        className="rounded-3xl overflow-hidden"
        style={{
          boxShadow: "0 16px 64px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.1)",
          backgroundColor: "rgba(255,255,255,0.95)",
          padding: "24px",
        }}
      >
        <Image
          src="https://baounngyxqighaipmxgc.supabase.co/storage/v1/object/public/assets/preview/design-preview.png"
          alt="Uploaded design — playful monster mash illustration"
          width={380}
          height={380}
          className="object-contain rounded-2xl"
          priority
        />
      </div>
    </div>
  )
}

export default function AuroraEditorPreview() {
  return (
    <GradientBg>
      <div className="h-screen overflow-hidden">
        <AuroraHeader />
        <CanvasControls />
        <AuroraChatHistory />
        <ImageCanvas />
        <AuroraChatBar />
        <AuroraRightPanel />
      </div>
    </GradientBg>
  )
}
