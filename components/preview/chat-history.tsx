"use client"

interface Message {
  role: "ai" | "user"
  text: string
  type?: "plan"
}

const MESSAGES: Message[] = [
  {
    role: "user",
    text: "I want to print this on a youth t-shirt. Is this file ready?",
  },
  {
    role: "ai",
    text: "Got it — youth tee. I checked your file and found 3 things to fix before it prints well.",
  },
  {
    role: "ai",
    text: "The white background will print as a visible white box on the shirt. We need to remove it so only your design shows. This also makes the print softer and more comfortable to wear.",
  },
  {
    role: "ai",
    text: "Your image is a bit low quality for print. It'll come out blurry at this size. I can sharpen it up so it looks clean on fabric.",
  },
  {
    role: "ai",
    text: "Here's the plan:\n\n1. Crop to the design edges\n2. Sharpen for print quality\n3. Remove the white background\n4. Boost colors for fabric\n5. Size it for a youth tee",
    type: "plan",
  },
  {
    role: "ai",
    text: "You'll get a clean file, right size, ready to send to your printer. Hit Fix All and I'll handle it.",
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
