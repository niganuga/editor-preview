"use client"

export function AuroraHeader() {
  return (
    <header
      className="fixed top-5 left-1/2 -translate-x-1/2 z-50 h-10 flex items-center gap-3 px-4 rounded-full"
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.35)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        border: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <span className="text-sm font-semibold text-white/90 tracking-tight">
        OneFlow
      </span>
      <div className="w-px h-4 bg-white/15" />
      <span className="text-xs text-white/40 font-medium">
        847 tokens
      </span>
      <div
        className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-semibold text-white/80"
        style={{ backgroundColor: "rgba(255,255,255,0.12)" }}
      >
        MK
      </div>
    </header>
  )
}
