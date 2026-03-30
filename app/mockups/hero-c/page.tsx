"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { Upload, ArrowDown } from "lucide-react"

/**
 * Hero C — "Dark Statement"
 * Full-dark background, massive typography, single CTA.
 * Editor screenshot fades in below. Cinematic, minimal.
 * Tone: Premium, confident, "we handle the hard part."
 */

function GlowOrb() {
  return (
    <div
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
      style={{
        width: "60vw",
        height: "60vw",
        maxWidth: "800px",
        maxHeight: "800px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(232,134,58,0.15) 0%, rgba(232,134,58,0.05) 40%, transparent 70%)",
        filter: "blur(80px)",
      }}
    />
  )
}

export default function HeroC() {
  return (
    <div className="bg-[#0D0D0C] min-h-screen text-[#EDE9E0]">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0D0D0C]/80 backdrop-blur-md border-b border-[#2A2926]">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <span className="font-black text-lg">
            PrintReady<span className="text-[#E8863A]">Flow</span>
          </span>
          <div className="flex items-center gap-6">
            <span className="text-sm text-[#B5AFA6] hidden md:block">Pricing</span>
            <span className="text-sm text-[#B5AFA6] hidden md:block">Blog</span>
            <button className="text-sm font-bold bg-[#E8863A] text-[#0D0D0C] px-4 py-2 rounded-lg">
              Open Editor
            </button>
          </div>
        </div>
      </nav>

      {/* Hero — Full dark statement */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 pt-14 overflow-hidden">
        <GlowOrb />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 max-w-4xl"
        >
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-[#B5AFA6]/60 block mb-8">
            The print-prep tool for creators
          </span>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-[0.92] tracking-tight">
            Design is the
            <br />
            easy part.
          </h1>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-[0.92] tracking-tight text-[#E8863A] mt-2">
            We handle
            <br />
            the rest.
          </h1>

          <p className="text-lg md:text-xl text-[#B5AFA6] max-w-lg mx-auto mt-8 leading-relaxed">
            Upload any design file. PrintReady Flow checks it for print issues, fixes them automatically, and delivers a production-ready file.
          </p>

          <div className="flex flex-col items-center gap-4 mt-10">
            <button className="inline-flex items-center gap-2 bg-[#E8863A] text-[#0D0D0C] text-base font-bold px-10 py-4 rounded-xl hover:bg-[#F09A4E] transition-colors shadow-lg shadow-[#E8863A]/20">
              <Upload className="w-5 h-5" />
              Check My Design Free
            </button>
            <span className="font-mono text-[11px] text-[#B5AFA6]/40 uppercase tracking-wider">
              No signup &bull; No credit card &bull; Instant results
            </span>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ArrowDown className="w-5 h-5 text-[#B5AFA6]/40" />
          </motion.div>
        </motion.div>
      </section>

      {/* Editor reveal section */}
      <section className="relative pb-32">
        {/* Gradient transition from dark to slightly lighter */}
        <div
          className="absolute top-0 left-0 right-0 h-40 pointer-events-none"
          style={{
            background: "linear-gradient(180deg, #0D0D0C 0%, transparent 100%)",
          }}
        />

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto px-6"
        >
          {/* Editor card */}
          <div
            className="rounded-2xl overflow-hidden border border-[#3A3935]"
            style={{
              background: "rgba(30, 30, 28, 0.95)",
              boxShadow: "0 40px 100px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.03) inset, 0 0 80px rgba(232,134,58,0.08)",
            }}
          >
            {/* Title bar */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-[#3A3935]">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-[#D64045]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#D4943D]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#4CAF6A]" />
              </div>
              <span className="text-[11px] font-mono text-[#B5AFA6]/60 ml-2">
                printreadyflow.com/editor
              </span>
            </div>

            <Image
              src="https://baounngyxqighaipmxgc.supabase.co/storage/v1/object/public/assets/preview/editor-preview.png"
              alt="PrintReady Flow editor"
              width={1280}
              height={800}
              className="w-full object-cover object-left-top"
            />
          </div>
        </motion.div>

        {/* Stats bar */}
        <div className="max-w-4xl mx-auto mt-16 grid grid-cols-3 gap-8 px-6">
          {[
            { value: "10s", label: "Average check time" },
            { value: "1-click", label: "Automatic fixes" },
            { value: "5+", label: "Print methods supported" },
          ].map(({ value, label }) => (
            <div key={label} className="text-center">
              <div className="text-3xl md:text-4xl font-black text-[#E8863A]">{value}</div>
              <div className="text-xs font-mono uppercase tracking-wider text-[#B5AFA6]/60 mt-1">{label}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
