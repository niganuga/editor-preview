"use client"

import { cn } from "@/lib/utils"

/**
 * Text — typography component with variant system.
 *
 * Every text element in the editor chrome should use this component
 * instead of raw <span>/<p> with ad-hoc Tailwind classes.
 *
 * Variants map to the brand typography scale:
 * - heading: Panel titles, section headers
 * - body: Default readable text
 * - label: Uppercase tracking-wide section labels ("CONVERSATION", "FILE INFO")
 * - caption: Small secondary text
 * - data: Monospace for numeric values (DPI, dimensions, file sizes)
 * - role: Chat role labels ("Print Ready", "You")
 */

type TextVariant = "heading" | "body" | "caption" | "label" | "data" | "role"
type TextColor = "primary" | "muted" | "placeholder" | "accent" | "inherit"

interface TextProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: TextVariant
  color?: TextColor
  as?: "span" | "p" | "h1" | "h2" | "h3" | "h4" | "div"
}

const VARIANT_CLASSES: Record<TextVariant, string> = {
  heading: "text-sm font-semibold",
  body: "text-xs leading-relaxed",
  caption: "text-[10px]",
  label: "text-xs font-bold tracking-widest uppercase",
  data: "text-[10px] font-mono",
  role: "text-[10px] font-semibold uppercase tracking-wider",
}

const COLOR_CLASSES: Record<TextColor, string> = {
  primary: "text-[#EDE9E0]",
  muted: "text-[#9B9589]",
  placeholder: "text-[#6B6660]",
  accent: "text-[#E8863A]",
  inherit: "",
}

export function Text({ variant = "body", color = "primary", as: Tag = "span", className, ...props }: TextProps) {
  return (
    <Tag
      className={cn(VARIANT_CLASSES[variant], COLOR_CLASSES[color], className)}
      {...props}
    />
  )
}
