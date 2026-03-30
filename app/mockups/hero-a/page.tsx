"use client"

import Image from "next/image"
import { ContainerScroll } from "@/components/ui/container-scroll-animation"
import { Upload, ArrowRight } from "lucide-react"

/**
 * Hero A — "Warm Scroll Reveal"
 * Clean warm-white background, ContainerScroll parallax, trust badges.
 * Tone: Confident, approachable, "tool for creators."
 */

function TrustBar() {
  const audiences = [
    "Canva Users",
    "Kittl Designers",
    "Midjourney Artists",
    "Etsy Sellers",
    "POD Creators",
  ]

  return (
    <div className="flex flex-col items-center gap-4 mt-8">
      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#5A554D]/60">
        Made for creators like you
      </p>
      <div className="flex flex-wrap justify-center gap-2">
        {audiences.map((label) => (
          <span
            key={label}
            className="font-mono text-[11px] uppercase tracking-wider px-3 py-1.5 border border-[#C4BFB4] text-[#5A554D] rounded-full"
          >
            {label}
          </span>
        ))}
      </div>
    </div>
  )
}

function PrintMethodStrip() {
  const methods = "DTF \u00b7 DTG \u00b7 SCREEN PRINT \u00b7 SUBLIMATION \u00b7 HTV"

  return (
    <div className="w-full bg-[#1A1A1A] text-[#F5F2EC] overflow-hidden">
      <div className="flex animate-marquee whitespace-nowrap py-3">
        {[...Array(6)].map((_, i) => (
          <span
            key={i}
            className="text-xs font-bold font-mono uppercase tracking-[0.3em] mx-8"
          >
            {methods}
          </span>
        ))}
      </div>
    </div>
  )
}

export default function HeroA() {
  return (
    <div className="bg-[#F5F2EC] min-h-screen">
      {/* Nav placeholder */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#F5F2EC]/80 backdrop-blur-md border-b border-[#C4BFB4]/50">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <span className="font-black text-lg text-[#1A1A1A]">
            PrintReady<span className="text-[#E8863A]">Flow</span>
          </span>
          <div className="flex items-center gap-6">
            <span className="text-sm text-[#5A554D] hidden md:block">Pricing</span>
            <span className="text-sm text-[#5A554D] hidden md:block">Blog</span>
            <button className="text-sm font-bold bg-[#1A1A1A] text-[#F5F2EC] px-4 py-2 rounded-lg">
              Open Editor
            </button>
          </div>
        </div>
      </nav>

      {/* Hero with ContainerScroll */}
      <ContainerScroll
        titleComponent={
          <div className="flex flex-col items-center gap-5 pt-14">
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#5A554D]/60">
              Creation is solved. Production readiness isn&apos;t.
            </span>

            <h1 className="text-4xl md:text-6xl lg:text-[5.5rem] font-black text-[#1A1A1A] leading-[0.95] tracking-tight max-w-4xl">
              Your design looks great.{" "}
              <span className="text-[#E8863A]">
                Will it actually print?
              </span>
            </h1>

            <p className="text-lg md:text-xl text-[#5A554D] max-w-lg mt-1 leading-relaxed">
              Upload your Canva, Kittl, or Midjourney file.
              Know in seconds. Fix in one click.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-3 mt-4">
              <button className="inline-flex items-center gap-2 bg-[#E8863A] text-white text-base font-bold px-8 py-4 rounded-xl hover:bg-[#D4772E] transition-colors shadow-lg shadow-[#E8863A]/20">
                <Upload className="w-5 h-5" />
                Check My Design Free
              </button>
              <span className="font-mono text-[11px] text-[#5A554D]/50 uppercase tracking-wider">
                No signup required
              </span>
            </div>

            <TrustBar />
          </div>
        }
      >
        <Image
          src="https://baounngyxqighaipmxgc.supabase.co/storage/v1/object/public/assets/preview/editor-preview.png"
          alt="PrintReady Flow editor showing print readiness check"
          width={1280}
          height={800}
          className="w-full h-full object-cover object-left-top"
          priority
        />
      </ContainerScroll>

      {/* Print method strip */}
      <PrintMethodStrip />

      {/* Placeholder below fold */}
      <div className="h-screen bg-[#F5F2EC] flex items-center justify-center">
        <div className="text-center space-y-4 max-w-md">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#5A554D]/60">
            Next section
          </p>
          <h2 className="text-3xl font-black text-[#1A1A1A]">
            Meet the editor
          </h2>
          <button className="inline-flex items-center gap-2 text-[#E8863A] font-bold">
            Learn more <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </div>
  )
}
