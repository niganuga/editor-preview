"use client"

import { forwardRef } from "react"
import { CheckCircle, XCircle, AlertTriangle, Info } from "lucide-react"
import { cn } from "@/lib/utils"

/**
 * StatusBadge — pass/fail/warning/info indicator.
 *
 * Used in print readiness checks, file validation results, and
 * anywhere a status needs to be communicated with color + icon + text.
 *
 * Follows brand rule: status is NEVER communicated by color alone.
 * Always renders: icon + color + text label.
 */

type Status = "pass" | "fail" | "warning" | "info"

interface StatusBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  status: Status
  /** Primary label (e.g. "Resolution") */
  label: string
  /** Value in monospace (e.g. "72 DPI") */
  value?: string
  /** Compact mode — icon + label only, no value. Used in summary rows. */
  compact?: boolean
}

const STATUS_CONFIG = {
  pass: { icon: CheckCircle, color: "#4CAF6A", bg: "transparent" },
  fail: { icon: XCircle, color: "#D64045", bg: "rgba(214, 64, 69, 0.08)" },
  warning: { icon: AlertTriangle, color: "#D4943D", bg: "rgba(212, 148, 61, 0.06)" },
  info: { icon: Info, color: "#3B8DB0", bg: "transparent" },
} as const

export const StatusBadge = forwardRef<HTMLDivElement, StatusBadgeProps>(
  function StatusBadge({ status, label, value, compact = false, className, ...props }, ref) {
    const config = STATUS_CONFIG[status]
    const Icon = config.icon

    if (compact) {
      return (
        <div ref={ref} className={cn("flex items-center gap-1.5", className)} {...props}>
          <Icon size={12} style={{ color: config.color }} className="shrink-0" />
          <span className="text-[11px] font-medium text-[#EDE9E0]">{label}</span>
        </div>
      )
    }

    return (
      <div
        ref={ref}
        className={cn("flex items-start gap-2 rounded-lg px-2 py-1.5", className)}
        style={{ backgroundColor: config.bg }}
        {...props}
      >
        <Icon size={12} style={{ color: config.color }} className="shrink-0 mt-0.5" />
        <div className="flex flex-col gap-0.5 min-w-0">
          <span className="text-[11px] font-medium text-[#EDE9E0]">{label}</span>
          {value && (
            <span className="text-[10px] font-mono text-[#9B9589]">{value}</span>
          )}
        </div>
      </div>
    )
  },
)
