"use client"

export function GradientBg({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Base gradient — soft periwinkle → mauve → peach → warm orange */}
      <div
        className="fixed inset-0 z-0"
        style={{
          background: "linear-gradient(180deg, #B8C4E8 0%, #D4B8D9 20%, #E8BFD0 38%, #F0C9C0 52%, #F2C4AC 65%, #E8A882 80%, #D98A6A 100%)",
        }}
      />

      {/* Central warm glow — bottom center */}
      <div
        className="fixed z-0"
        style={{
          width: "70vw",
          height: "50vw",
          left: "15%",
          bottom: "-15%",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(230,130,60,0.6) 0%, rgba(220,110,70,0.3) 35%, rgba(200,140,120,0.1) 60%, transparent 80%)",
          filter: "blur(60px)",
          animation: "auroraFloat 18s ease-in-out infinite",
        }}
      />

      {/* Soft lavender wash — top right */}
      <div
        className="fixed z-0"
        style={{
          width: "45vw",
          height: "45vw",
          right: "-5%",
          top: "0%",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(170,160,210,0.4) 0%, rgba(190,175,220,0.15) 50%, transparent 75%)",
          filter: "blur(50px)",
          animation: "auroraFloat 22s ease-in-out infinite reverse",
        }}
      />

      {/* Pink midtone — center left */}
      <div
        className="fixed z-0"
        style={{
          width: "35vw",
          height: "35vw",
          left: "-5%",
          top: "30%",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(210,160,180,0.35) 0%, rgba(200,150,170,0.1) 50%, transparent 75%)",
          filter: "blur(50px)",
          animation: "auroraFloat 16s ease-in-out infinite 3s",
        }}
      />

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>

      <style>{`
        @keyframes auroraFloat {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(2%, -3%) scale(1.03); }
          66% { transform: translate(-2%, 2%) scale(0.98); }
        }
      `}</style>
    </div>
  )
}
