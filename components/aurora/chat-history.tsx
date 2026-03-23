"use client"

interface Message {
  role: "ai" | "user"
  text: string
  type?: "plan"
}

const MESSAGES: Message[] = [
  {
    role: "user",
    text: "I want to print this on a youth t-shirt. Is this file good to go?",
  },
  {
    role: "ai",
    text: "Checked your file. Found a few things to sort out before this prints well.",
  },
  {
    role: "ai",
    text: "Your image has a solid white background. If you print this as-is, that white prints as a visible block on the shirt. You want a transparent background — only the design transfers. Keeps the shirt lightweight and the print feels premium.",
  },
  {
    role: "ai",
    text: "Also, your image is at 72 DPI. For sharp prints you need 300+. At 72, details will look soft on fabric. Standard youth chest print is about 9\" × 11\".",
  },
  {
    role: "ai",
    text: "Here's what I'd do:\n\n1. Crop to actual design edges\n2. Upscale to 300+ DPI\n3. Remove white background → transparent PNG\n4. Color adjustments for fabric contrast\n5. Resize to 9\" × 11\" youth standard",
    type: "plan",
  },
  {
    role: "ai",
    text: "Sound good? Hit Fix All to start.",
  },
]

export function AuroraChatHistory() {
  return (
    <div
      className="fixed left-5 top-20 bottom-32 z-20 w-[320px] flex flex-col rounded-2xl overflow-hidden"
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.35)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        border: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <div className="px-4 py-3 border-b border-white/8">
        <span className="text-xs font-bold tracking-widest uppercase text-white/30">
          Conversation
        </span>
      </div>

      <div className="flex-1 overflow-y-auto px-3 py-3 flex flex-col gap-2.5">
        {MESSAGES.map((msg, i) => (
          <div key={i} className="flex flex-col gap-1">
            {(i === 0 || MESSAGES[i - 1].role !== msg.role) && (
              <span
                className="text-[10px] font-semibold uppercase tracking-wider px-1"
                style={{ color: msg.role === "ai" ? "rgba(251,146,60,0.9)" : "rgba(255,255,255,0.35)" }}
              >
                {msg.role === "ai" ? "Print Ready" : "You"}
              </span>
            )}
            <div
              className="rounded-xl px-3 py-2.5 text-xs leading-relaxed whitespace-pre-line"
              style={{
                backgroundColor:
                  msg.type === "plan"
                    ? "rgba(251,146,60,0.1)"
                    : msg.role === "ai"
                      ? "rgba(255,255,255,0.06)"
                      : "rgba(255,255,255,0.03)",
                color: "rgba(255,255,255,0.8)",
                border:
                  msg.type === "plan"
                    ? "1px solid rgba(251,146,60,0.2)"
                    : msg.role === "user"
                      ? "1px solid rgba(255,255,255,0.08)"
                      : "none",
              }}
            >
              {msg.text}
            </div>
          </div>
        ))}

        <div className="px-1 pt-1">
          <button
            type="button"
            className="w-full py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest cursor-pointer hover:opacity-90 transition-opacity"
            style={{
              background: "linear-gradient(135deg, #FB923C 0%, #E91E63 100%)",
              color: "white",
            }}
          >
            Fix All
          </button>
        </div>
      </div>
    </div>
  )
}
