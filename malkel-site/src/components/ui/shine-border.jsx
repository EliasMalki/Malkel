import * as React from "react"

import { cn } from "@/lib/utils"

/**
 * Shine Border
 *
 * An animated background border effect component with configurable properties.
 */
export function ShineBorder({
  borderWidth = 1,
  duration = 14,
  shineColor = "#000000",
  className,
  style,
  ...props
}) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 size-full rounded-[inherit] overflow-hidden",
        className
      )}
      style={{
        mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
        WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
        WebkitMaskComposite: "xor",
        maskComposite: "exclude",
        padding: `${borderWidth}px`,
        ...style
      }}
      {...props}
    >
      <div 
        className="animate-spin"
        style={{
          position: 'absolute',
          top: '-100%',
          left: '-100%',
          right: '-100%',
          bottom: '-100%',
          background: `conic-gradient(from 0deg, transparent 0%, transparent 20%, ${Array.isArray(shineColor) ? shineColor.join(",") : shineColor} 50%, transparent 80%, transparent 100%)`,
          animationDuration: `${duration}s`,
          animationDelay: style?.animationDelay,
        }}
      />
    </div>
  );
}
