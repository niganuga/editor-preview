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
    text: "Your image has a solid white background. If you print this as-is, that white prints as a visible block on the shirt. For most apparel — especially dark fabrics — you want a transparent background so only the design transfers. Keeps the shirt lightweight, breathable, and the print feels premium.",
  },
  {
    role: "ai",
    text: "I also see you want this on a youth tee. Standard youth full-front chest print is about 9\" wide × 11\" max height. Your image dimensions work, but it's currently at 72 DPI. For prints to come out sharp, you need 300 DPI or higher. At 72, the detail will look soft and blurry on fabric.",
  },
  {
    role: "ai",
    text: "Here's what I'd do:\n\n1. Crop the design to its actual edges\n2. Upscale to 300+ DPI for sharp output\n3. Remove the white background → transparent PNG\n4. Minor color adjustments so darks and lights pop on fabric\n5. Resize to 9\" × 11\" youth chest standard\n\nYou'll get a print-ready transparent PNG, sized exactly for a youth tee.",
    type: "plan",
  },
  {
    role: "ai",
    text: "Sound good? Hit Fix All to start.",
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
      <div className="flex-1 overflow-y-auto px-3 py-3 flex flex-col gap-2.5">
        {MESSAGES.map((msg, i) => (
          <div key={i} className="flex flex-col gap-1">
            {/* Only show label when role changes from previous */}
            {(i === 0 || MESSAGES[i - 1].role !== msg.role) && (
              <span
                className="text-[10px] font-semibold uppercase tracking-wider px-1"
                style={{ color: msg.role === "ai" ? "#E8863A" : "#9B9589" }}
              >
                {msg.role === "ai" ? "Print Ready" : "You"}
              </span>
            )}
            <div
              className="rounded-xl px-3 py-2.5 text-xs leading-relaxed whitespace-pre-line"
              style={{
                backgroundColor:
                  msg.type === "plan"
                    ? "rgba(232, 134, 58, 0.08)"
                    : msg.role === "ai"
                      ? "rgba(42, 41, 38, 0.8)"
                      : "rgba(232, 134, 58, 0.1)",
                color: "#EDE9E0",
                border:
                  msg.type === "plan"
                    ? "1px solid rgba(232, 134, 58, 0.25)"
                    : msg.role === "user"
                      ? "1px solid rgba(232, 134, 58, 0.2)"
                      : "none",
              }}
            >
              {msg.text}
            </div>
          </div>
        ))}

        {/* Fix All CTA */}
        <div className="px-1 pt-1">
          <button
            type="button"
            className="w-full py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest bg-[#E8863A] text-[#1A1A1A] cursor-pointer hover:opacity-90 transition-opacity"
          >
            Fix All
          </button>
        </div>
      </div>
    </div>
  )
}
