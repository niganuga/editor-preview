"use client"

import Image from "next/image"
import {
  ZoomIn,
  ZoomOut,
  Sun,
  Replace,
  Undo2,
  Redo2,
} from "lucide-react"
import { ChromePanel } from "@/components/ui/kit"
import { IconButton } from "@/components/ui/kit"
import { Header } from "@/components/preview/header"
import { ChatBar } from "@/components/preview/chat-bar"
import { RightPanel } from "@/components/preview/right-panel"
import { ChatHistory } from "@/components/preview/chat-history"

function CanvasControls() {
  return (
    <ChromePanel
      className="fixed top-20 left-1/2 -translate-x-1/2 z-30 flex items-center gap-0.5 px-1 py-1"
      overflowVisible
    >
      <IconButton icon={Undo2} tooltip="Undo" iconSize={16} disabled />
      <IconButton icon={Redo2} tooltip="Redo" iconSize={16} disabled />
      <div className="w-px h-4 bg-[#3A3935] mx-0.5" />
      <IconButton icon={ZoomIn} tooltip="Zoom In" iconSize={16} />
      <IconButton icon={ZoomOut} tooltip="Zoom Out" iconSize={16} />
      <div className="w-px h-4 bg-[#3A3935] mx-0.5" />
      <IconButton icon={Sun} tooltip="Canvas Light/Dark" iconSize={16} />
      <IconButton icon={Replace} tooltip="Replace Image" iconSize={16} />
    </ChromePanel>
  )
}

function ImageCanvas() {
  return (
    <div className="fixed inset-0 z-0 flex items-center justify-center">
      <div
        className="rounded-2xl overflow-hidden bg-[#F5F2EC]"
        style={{
          boxShadow: "0 8px 32px rgba(0,0,0,0.12), 4px 4px 0px 0px rgba(26,26,26,0.15)",
          border: "2px solid #C4BFB4",
          padding: "24px",
        }}
      >
        <Image
          src="https://baounngyxqighaipmxgc.supabase.co/storage/v1/object/public/assets/preview/design-preview.png"
          alt="Uploaded design — playful monster mash illustration"
          width={420}
          height={420}
          className="object-contain rounded-xl"
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
