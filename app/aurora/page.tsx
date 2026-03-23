"use client"

import Image from "next/image"
import { GradientBg } from "@/components/aurora/gradient-bg"
import { ContainerScroll } from "@/components/ui/container-scroll-animation"

function HeroCanva() {
  return (
    <ContainerScroll
      titleComponent={
        <div className="flex flex-col items-center gap-4">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-white/40">
            For Canva creators
          </span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-[1.05] tracking-tight max-w-4xl drop-shadow-lg">
            Canva made the design easy.{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #FB923C 0%, #F472B6 50%, #A78BFA 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Printing it shouldn&apos;t be the hard part.
            </span>
          </h1>
          <p className="text-lg md:text-xl text-white/50 max-w-xl mt-2">
            Check any file free. Fix issues in one click. No signup required.
          </p>
        </div>
      }
    >
      <Image
        src="https://baounngyxqighaipmxgc.supabase.co/storage/v1/object/public/assets/preview/aurora-editor-preview.png"
        alt="PrintReady Flow editor"
        width={1280}
        height={800}
        className="w-full h-full object-cover object-left-top rounded-2xl"
        priority
      />
    </ContainerScroll>
  )
}

function HeroKittl() {
  return (
    <ContainerScroll
      titleComponent={
        <div className="flex flex-col items-center gap-4">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-white/40">
            For Kittl designers
          </span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-[1.05] tracking-tight max-w-4xl drop-shadow-lg">
            Your Kittl design looks great.{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #FB923C 0%, #F472B6 50%, #A78BFA 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Is it print-ready?
            </span>
          </h1>
          <p className="text-lg md:text-xl text-white/50 max-w-xl mt-2">
            Find out in 10 seconds. Fix it in one click.
          </p>
        </div>
      }
    >
      <Image
        src="https://baounngyxqighaipmxgc.supabase.co/storage/v1/object/public/assets/preview/aurora-editor-preview.png"
        alt="PrintReady Flow editor"
        width={1280}
        height={800}
        className="w-full h-full object-cover object-left-top rounded-2xl"
      />
    </ContainerScroll>
  )
}

function HeroAI() {
  return (
    <ContainerScroll
      titleComponent={
        <div className="flex flex-col items-center gap-4">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-white/40">
            For AI creators
          </span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-[1.05] tracking-tight max-w-4xl drop-shadow-lg">
            AI made creation instant.{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #FB923C 0%, #F472B6 50%, #A78BFA 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              The file your printer needs? Still takes an expert.
            </span>
          </h1>
          <p className="text-lg md:text-xl text-white/50 max-w-xl mt-2">
            Until now.
          </p>
        </div>
      }
    >
      <Image
        src="https://baounngyxqighaipmxgc.supabase.co/storage/v1/object/public/assets/preview/aurora-editor-preview.png"
        alt="PrintReady Flow editor"
        width={1280}
        height={800}
        className="w-full h-full object-cover object-left-top rounded-2xl"
      />
    </ContainerScroll>
  )
}

export default function AuroraLanding() {
  return (
    <GradientBg>
      <HeroCanva />

      <div className="max-w-xs mx-auto border-t border-white/10" />

      <HeroKittl />

      <div className="max-w-xs mx-auto border-t border-white/10" />

      <HeroAI />
    </GradientBg>
  )
}
