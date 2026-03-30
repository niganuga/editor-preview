"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { Upload, Check, Zap, Shield } from "lucide-react"

/**
 * Hero B — "Split Editorial"
 * Two-column: bold copy left, floating editor card right.
 * Tone: Editorial, bold, operator-grade. Dark accents.
 */

function FloatingEditorCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, rotateY: -8 }}
      animate={{ opacity: 1, y: 0, rotateY: 0 }}
      transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
      className="relative"
      style={{ perspective: "1200px" }}
    >
      {/* Main editor screenshot */}
      <div
        className="rounded-2xl overflow-hidden border border-[#3A3935]"
        style={{
          background: "rgba(30, 30, 28, 0.95)",
          boxShadow: "0 24px 80px rgba(0,0,0,0.25), 0 0 0 1px rgba(255,255,255,0.05) inset",
        }}
      >
        {/* Fake title bar */}
        <div className="flex items-center gap-2 px-4 py-2.5 border-b border-[#3A3935]">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#D64045]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#D4943D]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#4CAF6A]" />
          </div>
          <span className="text-[11px] font-mono text-[#B5AFA6] ml-2">printreadyflow.com/editor</span>
        </div>

        <Image
          src="https://baounngyxqighaipmxgc.supabase.co/storage/v1/object/public/assets/preview/editor-preview.png"
          alt="PrintReady Flow editor"
          width={640}
          height={400}
          className="w-full object-cover object-left-top"
          priority
        />
      </div>

      {/* Floating badge — "Print Ready" */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, x: 20 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="absolute -bottom-4 -left-4 bg-[#4CAF6A] text-white text-xs font-bold font-mono uppercase tracking-wider px-4 py-2 rounded-lg shadow-lg flex items-center gap-1.5"
      >
        <Check className="w-3.5 h-3.5" />
        Print Ready
      </motion.div>
    </motion.div>
  )
}

function ValueProps() {
  const props = [
    { icon: Zap, text: "Results in 10 seconds" },
    { icon: Shield, text: "AI-powered fixes" },
    { icon: Check, text: "Works with any file type" },
  ]

  return (
    <div className="flex flex-col gap-3 mt-8">
      {props.map(({ icon: Icon, text }) => (
        <div key={text} className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#E8863A]/10 flex items-center justify-center">
            <Icon className="w-4 h-4 text-[#E8863A]" />
          </div>
          <span className="text-sm font-bold text-[#1A1A1A]">{text}</span>
        </div>
      ))}
    </div>
  )
}

export default function HeroB() {
  return (
    <div className="bg-[#F5F2EC] min-h-screen">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#F5F2EC]/80 backdrop-blur-md border-b border-[#C4BFB4]/50">
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
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

      {/* Hero — Split Layout */}
      <section className="min-h-screen flex items-center pt-14">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left — Copy */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#5A554D]/60 block mb-5">
              For print creators
            </span>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#1A1A1A] leading-[0.95] tracking-tight">
              Stop guessing
              <br />
              if your file
              <br />
              <span className="text-[#E8863A]">will print right.</span>
            </h1>

            <p className="text-lg text-[#5A554D] max-w-md mt-6 leading-relaxed">
              PrintReady Flow analyzes your artwork, catches problems before they cost you, and fixes them with one click.
            </p>

            <div className="flex flex-col sm:flex-row items-start gap-3 mt-8">
              <button className="inline-flex items-center gap-2 bg-[#E8863A] text-white text-base font-bold px-8 py-4 rounded-xl hover:bg-[#D4772E] transition-colors shadow-lg shadow-[#E8863A]/20">
                <Upload className="w-5 h-5" />
                Check My Design Free
              </button>
              <span className="font-mono text-[11px] text-[#5A554D]/50 uppercase tracking-wider self-center">
                No signup needed
              </span>
            </div>

            <ValueProps />
          </motion.div>

          {/* Right — Editor Card */}
          <div className="relative lg:pl-8">
            <FloatingEditorCard />
          </div>
        </div>
      </section>

      {/* Social proof strip */}
      <div className="border-t border-[#C4BFB4]/50 bg-[#F5F2EC]">
        <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col items-center gap-4">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#5A554D]/50">
            Works with files from
          </p>
          <div className="flex flex-wrap justify-center gap-8">
            {["Canva", "Kittl", "Midjourney", "Photoshop", "Illustrator"].map((app) => (
              <span
                key={app}
                className="text-xl font-black text-[#1A1A1A]/20 tracking-tight"
              >
                {app}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
