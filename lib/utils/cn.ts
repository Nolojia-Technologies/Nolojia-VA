import { type ClassValue, clsx } from "clsx"
import { extendTailwindMerge } from "tailwind-merge"

/**
 * tailwind-merge does not know about the custom display font sizes declared in
 * tailwind.config.ts. Without this it reads `text-display-sm` as a text *colour*
 * and silently drops it when a real colour class follows — headings then render
 * at the inherited size. Registering the group keeps size and colour separate.
 */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [{ text: ["display-sm", "display-md", "display-lg"] }],
    },
  },
})

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
