"use client"

import Image from "next/image"
import {
  ZoomIn,
  ZoomOut,
  Sun,
  Replace,
} from "lucide-react"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { Header } from "@/components/preview/header"
import { ChatBar } from "@/components/preview/chat-bar"
import { RightPanel } from "@/components/preview/right-panel"
import { ChatHistory } from "@/components/preview/chat-history"

const CANVAS_ACTIONS = [
  { icon: ZoomIn, label: "Zoom In" },
  { icon: ZoomOut, label: "Zoom Out" },
  { icon: Sun, label: "Canvas Light/Dark" },
  { icon: Replace, label: "Replace Image" },
]

function CanvasControls() {
  return (
    <div
      className="fixed top-20 left-1/2 -translate-x-1/2 z-30 flex items-center gap-1 rounded-2xl px-2 py-1.5"
      style={{
        backgroundColor: "rgba(30, 30, 28, 0.9)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        border: "1px solid #3A3935",
        boxShadow: "0 4px 16px rgba(0,0,0,0.3), 3px 3px 0px 0px #1A1A1A",
      }}
    >
      {CANVAS_ACTIONS.map((action) => (
        <Tooltip key={action.label}>
          <TooltipTrigger
            className="w-8 h-8 rounded-xl flex items-center justify-center text-[#9B9589] hover:text-[#EDE9E0] hover:bg-[#3A3935] cursor-pointer transition-colors"
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
        className="rounded-2xl overflow-hidden"
        style={{
          boxShadow: "0 8px 32px rgba(0,0,0,0.12), 4px 4px 0px 0px rgba(26,26,26,0.15)",
          border: "2px solid #C4BFB4",
        }}
      >
        <Image
          src="https://baounngyxqighaipmxgc.supabase.co/storage/v1/object/public/assets/preview/design-preview.png"
          alt="Uploaded design — playful monster mash illustration"
          width={480}
          height={480}
          className="object-contain"
          priority
        />
      </div>
    </div>
  )
}

export default function EditorPreview() {
  return (
    <div className="canvas-bg h-screen overflow-hidden">
      <Header />
      <CanvasControls />
      <ChatHistory />
      <ImageCanvas />
      <ChatBar />
      <RightPanel />
    </div>
  )
}
