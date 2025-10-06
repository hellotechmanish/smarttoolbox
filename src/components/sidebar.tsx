"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Layers } from "lucide-react"
import { TOOL_CATEGORIES } from "@/lib/constants"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="fixed left-0 top-0 z-30 h-screen w-64 border-r border-sidebar-border bg-sidebar">
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="flex h-16 items-center border-b border-sidebar-border px-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Layers className="h-5 w-5" />
            </div>
            <span className="text-lg font-semibold text-sidebar-foreground">Daily Tools</span>
          </Link>
        </div>

        {/* Navigation */}
        <ScrollArea className="flex-1 px-3 py-4">
          <div className="space-y-1">
            <Button asChild variant={pathname === "/" ? "secondary" : "ghost"} className="w-full justify-start">
              <Link href="/">
                <Layers className="mr-2 h-4 w-4" />
                All Tools
              </Link>
            </Button>
          </div>

          <div className="mt-4">
            <Accordion type="multiple" className="w-full">
              {TOOL_CATEGORIES.map((category) => (
                <AccordionItem key={category.id} value={category.id} className="border-none">
                  <AccordionTrigger className="px-3 py-2 text-sm font-medium text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:no-underline rounded-md">
                    <div className="flex items-center gap-2">
                      <span className="text-base">{category.icon}</span>
                      <span>{category.name}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pb-1 pt-0">
                    <div className="ml-6 space-y-1">
                      {category.tools.map((tool) => (
                        <Button
                          key={tool.id}
                          asChild
                          variant={pathname === `/tools/${category.id}/${tool.slug}` ? "secondary" : "ghost"}
                          className="w-full justify-start text-sm"
                          size="sm"
                        >
                          <Link href={`/tools/${category.id}/${tool.slug}`}>
                            <span className="mr-2">{tool.icon}</span>
                            {tool.name}
                          </Link>
                        </Button>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </ScrollArea>
      </div>
    </aside>
  )
}
