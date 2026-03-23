"use client"

import { forwardRef } from "react"
import { cn } from "@/lib/utils"

/**
 * ChromePanel — the shared dark glassmorphic floating container.
 *
 * Every floating element in the editor (header, chat bar, chat history,
 * right panel, canvas controls) uses this as its base surface.
 *
 * Provides: dark bg, backdrop blur, border, shadow, rounded-2xl.
 * Consumers add: position, size, z-index, internal layout.
 */

interface ChromePanelProps extends React.HTMLAttributes<HTMLDivElement> {
  /** "default" uses ambient + small brutalist offset. "elevated" uses larger shadow for primary surfaces like chat bar. */
  elevation?: "default" | "elevated"
  /** When true, removes overflow:hidden — useful for panels with tooltips/popovers that escape bounds. */
  overflowVisible?: boolean
}

const SHADOW = {
  default: "0 4px 16px rgba(0,0,0,0.3), 3px 3px 0px 0px #1A1A1A",
  elevated: "0 8px 32px rgba(0,0,0,0.4), 4px 4px 0px 0px #1A1A1A",
}

export const ChromePanel = forwardRef<HTMLDivElement, ChromePanelProps>(
  function ChromePanel({ className, elevation = "default", overflowVisible = false, style, ...props }, ref) {
    return (
      <div
        ref={ref}
        className={cn(
          "rounded-2xl border border-[#3A3935]",
          overflowVisible ? "overflow-visible" : "overflow-hidden",
          className,
        )}
        style={{
          backgroundColor: "rgba(30, 30, 28, 0.95)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          boxShadow: SHADOW[elevation],
          ...style,
        }}
        {...props}
      />
    )
  },
)
