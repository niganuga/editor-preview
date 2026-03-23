"use client"

const MESSAGES = [
  {
    role: "ai" as const,
    text: "Hey! I'm your AI Designer. Drop an image on the canvas and I'll check it for print readiness — or just tell me what you need.",
  },
  {
    role: "user" as const,
    text: "I uploaded my logo design. Can you check if it's ready for DTF printing on a black hoodie?",
  },
  {
    role: "ai" as const,
    text: "Checking your file now... Found 2 issues:\n\n• Resolution is 72 DPI — needs 300 DPI for clean DTF output at this size.\n• Semi-transparent pixels detected around the edges — these may cause white halos on dark fabric.\n\nWant me to fix both? I can upscale and clean the edges in one pass.",
  },
  {
    role: "user" as const,
    text: "Yes, fix both please.",
  },
  {
    role: "ai" as const,
    text: "On it. Running upscale (4x) and edge cleanup now...",
  },
]

export function ChatHistory() {
  return (
    <div
      className="fixed left-4 top-20 bottom-28 z-20 w-[340px] flex flex-col rounded-2xl overflow-hidden border border-[#3A3935]"
      style={{
        backgroundColor: "rgba(30, 30, 28, 0.9)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        boxShadow: "0 4px 16px rgba(0,0,0,0.3)",
      }}
    >
      {/* Panel header */}
      <div className="px-4 py-3 border-b border-[#3A3935]">
        <span className="text-xs font-bold tracking-widest uppercase text-[#9B9589]">
          Conversation
        </span>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-3 py-3 flex flex-col gap-3">
        {MESSAGES.map((msg, i) => (
          <div key={i} className="flex flex-col gap-1">
            <span className="text-[10px] font-semibold uppercase tracking-wider px-1"
              style={{ color: msg.role === "ai" ? "#E8863A" : "#9B9589" }}
            >
              {msg.role === "ai" ? "AI Designer" : "You"}
            </span>
            <div
              className="rounded-xl px-3 py-2.5 text-xs leading-relaxed whitespace-pre-line"
              style={{
                backgroundColor:
                  msg.role === "ai"
                    ? "rgba(42, 41, 38, 0.8)"
                    : "rgba(232, 134, 58, 0.1)",
                color: "#EDE9E0",
                border: msg.role === "user" ? "1px solid rgba(232, 134, 58, 0.2)" : "none",
              }}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
