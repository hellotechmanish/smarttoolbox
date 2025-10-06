"use client"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { Tool } from "@/lib/constants"

interface ToolCardProps {
  tool: Tool
  index?: number
}

export function ToolCard({ tool, index = 0 }: ToolCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      whileHover={{ y: -4 }}
    >
      <Card className="group h-full transition-shadow hover:shadow-lg">
        <CardHeader>
          <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-2xl">
            {tool.icon}
          </div>
          <CardTitle className="text-lg">{tool.name}</CardTitle>
          <CardDescription className="line-clamp-2">{tool.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <Button asChild className="w-full group-hover:bg-primary group-hover:text-primary-foreground">
            <Link href={`/tools/${tool.category}/${tool.slug}`}>
              Open Tool
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  )
}
