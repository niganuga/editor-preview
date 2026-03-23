"use client"

import Image from "next/image"
import { ContainerScroll } from "@/components/ui/container-scroll-animation"

function HeroCanva() {
  return (
    <ContainerScroll
      titleComponent={
        <div className="flex flex-col items-center gap-4">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#5A554D]">
            For Canva creators
          </span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-[#1A1A1A] leading-[1.05] tracking-tight max-w-4xl">
            Canva made the design easy.{" "}
            <span className="text-[#E8863A]">
              Printing it shouldn&apos;t be the hard part.
            </span>
          </h1>
          <p className="text-lg md:text-xl text-[#5A554D] max-w-xl mt-2">
            Check any file free. Fix issues in one click. No signup required.
          </p>
        </div>
      }
    >
      <Image
        src="/editor-preview.png"
        alt="PrintReady Flow editor showing print readiness check"
        width={1280}
        height={800}
        className="w-full h-full object-cover object-left-top"
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
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#5A554D]">
            For Kittl designers
          </span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-[#1A1A1A] leading-[1.05] tracking-tight max-w-4xl">
            Your Kittl design looks great.{" "}
            <span className="text-[#E8863A]">
              Is it print-ready?
            </span>
          </h1>
          <p className="text-lg md:text-xl text-[#5A554D] max-w-xl mt-2">
            Find out in 10 seconds. Fix it in one click.
          </p>
        </div>
      }
    >
      <Image
        src="/editor-preview.png"
        alt="PrintReady Flow editor showing print readiness check"
        width={1280}
        height={800}
        className="w-full h-full object-cover object-left-top"
      />
    </ContainerScroll>
  )
}

function HeroAI() {
  return (
    <ContainerScroll
      titleComponent={
        <div className="flex flex-col items-center gap-4">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#5A554D]">
            For AI creators
          </span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-[#1A1A1A] leading-[1.05] tracking-tight max-w-4xl">
            AI made creation instant.{" "}
            <span className="text-[#E8863A]">
              The file your printer needs? Still takes an expert.
            </span>
          </h1>
          <p className="text-lg md:text-xl text-[#5A554D] max-w-xl mt-2">
            Until now.
          </p>
        </div>
      }
    >
      <Image
        src="/editor-preview.png"
        alt="PrintReady Flow editor showing print readiness check"
        width={1280}
        height={800}
        className="w-full h-full object-cover object-left-top"
      />
    </ContainerScroll>
  )
}

export default function LandingPage() {
  return (
    <div className="bg-[#F5F2EC]">
      <HeroCanva />

      <div className="max-w-xs mx-auto border-t border-[#C4BFB4]" />

      <HeroKittl />

      <div className="max-w-xs mx-auto border-t border-[#C4BFB4]" />

      <HeroAI />
    </div>
  )
}
