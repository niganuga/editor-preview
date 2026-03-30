import Link from "next/link"

export default function MockupsIndex() {
  const mockups = [
    {
      id: "hero-a",
      title: "Warm Scroll Reveal",
      description:
        "Clean warm-white bg, ContainerScroll parallax effect, trust badges, marquee strip. Apple keynote feel.",
      tone: "Approachable, confident",
      bg: "bg-[#F5F2EC]",
      text: "text-[#1A1A1A]",
    },
    {
      id: "hero-b",
      title: "Split Editorial",
      description:
        "Two-column: bold stacked copy left, floating dark chrome editor card right. Value props below headline.",
      tone: "Editorial, operator-grade",
      bg: "bg-[#F5F2EC]",
      text: "text-[#1A1A1A]",
    },
    {
      id: "hero-c",
      title: "Dark Statement",
      description:
        "Full-dark background, massive type, orange glow orb, editor screenshot reveals on scroll. Stats bar below.",
      tone: "Premium, cinematic",
      bg: "bg-[#0D0D0C]",
      text: "text-[#EDE9E0]",
    },
  ]

  return (
    <div className="min-h-screen bg-[#F5F2EC] p-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-black text-[#1A1A1A] mb-2">
          Hero Mockups
        </h1>
        <p className="text-[#5A554D] mb-10">
          3 hero section variations for PrintReady Flow. Click to preview.
        </p>

        <div className="space-y-4">
          {mockups.map((m) => (
            <Link
              key={m.id}
              href={`/mockups/${m.id}`}
              className="block group"
            >
              <div className="border-2 border-[#1A1A1A] rounded-xl overflow-hidden hover:shadow-[6px_6px_0px_0px_#1A1A1A] transition-all duration-150 hover:-translate-x-[2px] hover:-translate-y-[2px]">
                {/* Color preview strip */}
                <div className={`${m.bg} h-3`} />

                <div className="bg-white p-5">
                  <div className="flex items-start justify-between mb-2">
                    <h2 className="text-xl font-black text-[#1A1A1A] group-hover:text-[#E8863A] transition-colors">
                      {m.title}
                    </h2>
                    <span className="font-mono text-[10px] uppercase tracking-widest text-[#5A554D]/60 border border-[#C4BFB4] px-2 py-0.5 rounded">
                      {m.tone}
                    </span>
                  </div>
                  <p className="text-sm text-[#5A554D]">{m.description}</p>
                  <p className="text-xs font-mono text-[#E8863A] mt-3 uppercase tracking-wider">
                    /mockups/{m.id} →
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-10 pt-6 border-t border-[#C4BFB4]">
          <p className="text-xs font-mono text-[#5A554D]/50 uppercase tracking-wider">
            Existing examples: <Link href="/" className="text-[#E8863A] hover:underline">/</Link> (warm) &bull; <Link href="/aurora" className="text-[#E8863A] hover:underline">/aurora</Link> (gradient) &bull; <Link href="/editor" className="text-[#E8863A] hover:underline">/editor</Link> (full mockup)
          </p>
        </div>
      </div>
    </div>
  )
}
