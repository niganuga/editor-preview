"use client"

export function GradientBg({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Base gradient */}
      <div
        className="fixed inset-0 z-0"
        style={{
          background: "linear-gradient(180deg, #C5CAE9 0%, #E1BEE7 25%, #F8BBD0 45%, #FFCCBC 65%, #FF8A65 85%, #E91E63 100%)",
        }}
      />

      {/* Aurora orbs */}
      <div
        className="fixed z-0"
        style={{
          width: "60vw",
          height: "60vw",
          left: "20%",
          bottom: "-10%",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,152,0,0.7) 0%, rgba(233,30,99,0.3) 40%, transparent 70%)",
          filter: "blur(80px)",
          animation: "auroraFloat 12s ease-in-out infinite",
        }}
      />
      <div
        className="fixed z-0"
        style={{
          width: "40vw",
          height: "40vw",
          right: "5%",
          top: "10%",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(156,39,176,0.4) 0%, rgba(103,58,183,0.2) 40%, transparent 70%)",
          filter: "blur(60px)",
          animation: "auroraFloat 16s ease-in-out infinite reverse",
        }}
      />
      <div
        className="fixed z-0"
        style={{
          width: "35vw",
          height: "35vw",
          left: "0%",
          top: "20%",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(186,147,210,0.5) 0%, rgba(149,117,205,0.2) 40%, transparent 70%)",
          filter: "blur(70px)",
          animation: "auroraFloat 14s ease-in-out infinite 2s",
        }}
      />

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>

      <style>{`
        @keyframes auroraFloat {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(3%, -5%) scale(1.05); }
          66% { transform: translate(-3%, 3%) scale(0.97); }
        }
      `}</style>
    </div>
  )
}
