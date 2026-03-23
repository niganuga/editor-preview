"use client"

import { forwardRef } from "react"
import { cn } from "@/lib/utils"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import type { LucideIcon } from "lucide-react"

/**
 * IconButton — 44px touch target icon button with optional tooltip.
 *
 * Used for all interactive icons in the editor chrome:
 * canvas controls, tool bar icons, panel tab icons, close buttons.
 *
 * Enforces 44px minimum touch target (WCAG 2.1 AA).
 */

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: LucideIcon
  /** Icon size in px. Default 16. */
  iconSize?: number
  /** Show tooltip on hover. If omitted, no tooltip rendered. */
  tooltip?: string
  /** Tooltip placement. Default "top". */
  tooltipSide?: "top" | "bottom" | "left" | "right"
  /** Visual state. */
  variant?: "default" | "active" | "accent"
}

const VARIANT_CLASSES = {
  default: "text-[#9B9589] hover:text-[#EDE9E0] hover:bg-[#3A3935]",
  active: "bg-[#E8863A] text-[#1A1A1A]",
  accent: "bg-[#E8863A] text-[#1A1A1A] hover:opacity-90",
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  function IconButton(
    { icon: Icon, iconSize = 16, tooltip, tooltipSide = "top", variant = "default", className, disabled, ...props },
    ref,
  ) {
    const button = (
      <button
        ref={ref}
        type="button"
        disabled={disabled}
        className={cn(
          "min-w-[44px] min-h-[44px] w-11 h-11 rounded-xl flex items-center justify-center cursor-pointer transition-colors shrink-0",
          VARIANT_CLASSES[variant],
          disabled && "opacity-40 cursor-not-allowed pointer-events-none",
          className,
        )}
        {...props}
      >
        <Icon style={{ width: iconSize, height: iconSize }} />
      </button>
    )

    if (tooltip) {
      return (
        <Tooltip>
          <TooltipTrigger
            disabled={disabled}
            onClick={props.onClick}
            aria-label={props["aria-label"] ?? tooltip}
            className={cn(
              "min-w-[44px] min-h-[44px] w-11 h-11 rounded-xl flex items-center justify-center cursor-pointer transition-colors shrink-0",
              VARIANT_CLASSES[variant],
              disabled && "opacity-40 cursor-not-allowed pointer-events-none",
              className,
            )}
          >
            <Icon style={{ width: iconSize, height: iconSize }} />
          </TooltipTrigger>
          <TooltipContent side={tooltipSide}>
            <p>{tooltip}</p>
          </TooltipContent>
        </Tooltip>
      )
    }

    return button
  },
)
