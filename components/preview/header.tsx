"use client"

export function Header() {
  return (
    <header
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50 h-11 flex items-center justify-between px-5 rounded-2xl w-auto min-w-[320px]"
      style={{
        backgroundColor: "rgba(30, 30, 28, 0.9)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        border: "1px solid #3A3935",
        boxShadow: "0 4px 16px rgba(0,0,0,0.3), 3px 3px 0px 0px #1A1A1A",
      }}
    >
      <span className="font-semibold text-sm text-[#EDE9E0]">
        OneFlow
      </span>

      <div className="w-px h-4 mx-3 bg-[#3A3935]" />

      <div className="flex items-center gap-2.5">
        <span className="text-xs font-medium text-[#9B9589]">
          847 tokens
        </span>
        <div
          className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold bg-[#2A2926] text-[#EDE9E0] border border-[#3A3935]"
          aria-label="User avatar: MK"
        >
          MK
        </div>
      </div>
    </header>
  )
}
