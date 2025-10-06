import { TOOL_CATEGORIES } from "@/lib/constants"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { ToolCard } from "@/components/tool-card"

export default function HomePage() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <div className="flex-1 pl-64">
        <Header />

        <main className="p-6">
          <div className="mb-8">
            <h1 className="text-4xl font-bold tracking-tight text-balance">All-in-One Online Tools</h1>
            <p className="mt-2 text-lg text-muted-foreground text-pretty">
              Free online utilities for your daily tasks - video, image, PDF, audio, text, and more
            </p>
          </div>

          <div className="space-y-12">
            {TOOL_CATEGORIES.map((category) => (
              <section key={category.id}>
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-2xl">
                    {category.icon}
                  </div>
                  <div>
                    <h2 className="text-2xl font-semibold">{category.name}</h2>
                    <p className="text-sm text-muted-foreground">{category.tools.length} tools available</p>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {category.tools.map((tool, index) => (
                    <ToolCard key={tool.id} tool={tool} index={index} />
                  ))}
                </div>
              </section>
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}
