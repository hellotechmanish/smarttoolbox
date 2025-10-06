import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { Tool } from "@/lib/constants"

interface RelatedToolsProps {
  tools: Tool[]
  currentToolId: string
}

export function RelatedTools({ tools, currentToolId }: RelatedToolsProps) {
  const relatedTools = tools.filter((tool) => tool.id !== currentToolId).slice(0, 3)

  if (relatedTools.length === 0) {
    return null
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Related Tools</CardTitle>
        <CardDescription>Other tools you might find useful</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {relatedTools.map((tool) => (
          <Link
            key={tool.id}
            href={`/tools/${tool.category}/${tool.slug}`}
            className="group flex items-center gap-3 rounded-lg border border-border bg-card p-3 transition-colors hover:bg-accent"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-xl">
              {tool.icon}
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">{tool.name}</p>
              <p className="text-xs text-muted-foreground line-clamp-1">{tool.description}</p>
            </div>
            <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
          </Link>
        ))}
      </CardContent>
    </Card>
  )
}
