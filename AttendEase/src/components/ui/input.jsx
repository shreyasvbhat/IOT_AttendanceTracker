import * as React from "react";
import { cn } from "@/lib/utils";

function Input({ className, type, ...props }) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        // Glassy, modern input style
        "bg-white/10 dark:bg-white/10 border border-white/30 dark:border-white/20 backdrop-blur-md",
        "rounded-xl px-4 py-2 text-base text-white placeholder:text-indigo-300",
        "focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-violet-400 transition-all duration-200",
        "shadow-lg hover:shadow-xl",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        className
      )}
      {...props}
    />
  );
}

export { Input };
