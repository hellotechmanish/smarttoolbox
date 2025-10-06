import { notFound } from "next/navigation"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { RelatedTools } from "@/components/related-tools"
import { getToolBySlug, getToolsByCategory } from "@/lib/constants"
import { ToolUI } from "./tool-ui"

interface ToolPageProps {
  params: Promise<{
    category: string
    toolSlug: string
  }>
}

export default async function ToolPage({ params }: ToolPageProps) {
  const { category, toolSlug } = await params
  const tool = getToolBySlug(toolSlug)

  if (!tool || tool.category !== category) {
    notFound()
  }

  const relatedTools = getToolsByCategory(category)

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <div className="flex-1 pl-64">
        <Header />

        <main className="p-6">
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-2xl">
                {tool.icon}
              </div>
              <div>
                <h1 className="text-3xl font-bold tracking-tight">{tool.name}</h1>
                <p className="text-muted-foreground">{tool.description}</p>
              </div>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <ToolUI tool={tool} />
            </div>

            <div className="space-y-6">
              <RelatedTools tools={relatedTools} currentToolId={tool.id} />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
