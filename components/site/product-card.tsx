import Link from "next/link"
import { ArrowRight } from "lucide-react"
import type { Product } from "@/lib/content/products"
import { Pill } from "@/components/site/primitives"
import { PageMarksVisual, ArchitectureVisual } from "@/components/site/product-visuals"
import { cn } from "@/lib/utils/cn"

const VISUALS: Record<string, React.ComponentType<{ className?: string }>> = {
  pagemarks: PageMarksVisual,
  "ai-architecture": ArchitectureVisual,
}

export function ProductCard({ product, className }: { product: Product; className?: string }) {
  const Visual = VISUALS[product.slug]

  return (
    <article
      className={cn(
        "group grid overflow-hidden rounded-2xl border border-border bg-card shadow-xs transition duration-300 ease-smooth hover:border-brand/25 hover:shadow-md lg:grid-cols-2",
        className
      )}
    >
      <div className="flex min-w-0 flex-col p-6 sm:p-8">
        <div className="flex items-center gap-2">
          <Pill tone={product.status === "available" ? "brand" : "warning"}>
            {product.statusLabel}
          </Pill>
          <Pill>{product.category}</Pill>
        </div>

        <h3 className="mt-5 text-2xl font-semibold text-foreground">{product.name}</h3>
        <p className="mt-2 text-[0.9375rem] font-medium text-brand">{product.tagline}</p>
        <p className="mt-4 text-[0.9375rem] leading-relaxed text-muted-foreground">
          {product.summary}
        </p>

        <ul className="mt-6 space-y-3 border-t border-border pt-6">
          {product.features.slice(0, 3).map((feature) => (
            <li key={feature.title}>
              <p className="text-sm font-semibold text-foreground">{feature.title}</p>
              <p className="mt-1 text-[0.8125rem] leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </li>
          ))}
        </ul>

        {product.platforms?.length ? (
          <p className="mt-6 text-[0.8125rem] text-muted-foreground">
            Works in {product.platforms.join(", ")}.
          </p>
        ) : null}

        <Link
          href={product.cta.href}
          className="mt-7 inline-flex items-center gap-1.5 self-start text-sm font-semibold text-brand transition-colors hover:text-brand-hover"
        >
          {product.cta.label}
          <ArrowRight
            aria-hidden="true"
            className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
          />
        </Link>
      </div>

      {Visual ? (
        <div className="flex min-w-0 items-center border-t border-border bg-surface p-6 sm:p-8 lg:border-l lg:border-t-0">
          <Visual className="w-full" />
        </div>
      ) : null}
    </article>
  )
}
