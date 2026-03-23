"use client"

import { ChromePanel } from "@/components/ui/kit"
import { Text } from "@/components/ui/utilities"

export function Header() {
  return (
    <ChromePanel
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50 h-11 flex items-center justify-between px-5 min-w-[280px]"
    >
      <Text variant="heading" color="primary">OneFlow</Text>

      <div className="w-px h-4 mx-3 bg-[#3A3935]" />

      <div className="flex items-center gap-2.5">
        <Text variant="caption" color="muted">847 tokens</Text>
        <div
          className="w-7 h-7 rounded-full flex items-center justify-center border border-[#3A3935]"
          style={{ backgroundColor: "#2A2926" }}
          aria-label="User avatar: MK"
        >
          <Text variant="caption" color="primary" className="font-semibold">MK</Text>
        </div>
      </div>
    </ChromePanel>
  )
}
