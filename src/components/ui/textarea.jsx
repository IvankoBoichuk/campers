import * as React from "react"

import { cn } from "@/lib/utils"

function Textarea({
  className,
  ...props
}) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "border-theme-inputs placeholder:text-muted-foreground rounded-[10px] focus-visible:border-theme-btn focus-visible:ring-theme-btn/50 aria-invalid:ring-destructive/20 aria-invalid:border-destructive flex field-sizing-content min-h-[118px] w-full border bg-theme-inputs p-[18px] transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      )}
      {...props} />
  );
}

export { Textarea }
