import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils/cn"

export interface Crumb {
  name: string
  href: string
}

export function Breadcrumbs({ items, className }: { items: Crumb[]; className?: string }) {
  return (
    <nav aria-label="Breadcrumb" className={cn("mb-6", className)}>
      <ol className="flex flex-wrap items-center gap-1.5 text-[0.8125rem] text-muted-foreground">
        {items.map((item, i) => {
          const last = i === items.length - 1
          return (
            <li key={item.href} className="flex items-center gap-1.5">
              {i > 0 ? (
                <ChevronRight aria-hidden="true" className="h-3.5 w-3.5 text-border" />
              ) : null}
              {last ? (
                <span aria-current="page" className="font-medium text-foreground">
                  {item.name}
                </span>
              ) : (
                <Link href={item.href} className="transition-colors hover:text-foreground">
                  {item.name}
                </Link>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
