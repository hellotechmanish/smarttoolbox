export interface Tool {
  id: string
  name: string
  description: string
  icon: string
  category: string
  slug: string
}

export interface ToolCategory {
  id: string
  name: string
  icon: string
  tools: Tool[]
}

export const TOOL_CATEGORIES: ToolCategory[] = [
  {
    id: "video",
    name: "Video Tools",
    icon: "🎥",
    tools: [
      {
        id: "video-compressor",
        name: "Video Compressor",
        description: "Reduce video size online quickly",
        icon: "🗜️",
        category: "video",
        slug: "video-compressor",
      },
      {
        id: "video-converter",
        name: "Video Converter",
        description: "Convert videos to different formats",
        icon: "🔄",
        category: "video",
        slug: "video-converter",
      },
      {
        id: "video-downloader",
        name: "Video Downloader",
        description: "Download videos from popular platforms",
        icon: "⬇️",
        category: "video",
        slug: "video-downloader",
      },
    ],
  },
  {
    id: "image",
    name: "Image Tools",
    icon: "🖼️",
    tools: [
      {
        id: "image-resizer",
        name: "Image Resizer",
        description: "Resize your photos easily",
        icon: "📐",
        category: "image",
        slug: "image-resizer",
      },
      {
        id: "image-compressor",
        name: "Image Compressor",
        description: "Compress images without losing quality",
        icon: "🗜️",
        category: "image",
        slug: "image-compressor",
      },
      {
        id: "background-remover",
        name: "Background Remover",
        description: "Remove image backgrounds instantly",
        icon: "✂️",
        category: "image",
        slug: "background-remover",
      },
      {
        id: "image-converter",
        name: "Image Converter",
        description: "Convert images to different formats",
        icon: "🔄",
        category: "image",
        slug: "image-converter",
      },
    ],
  },
  {
    id: "pdf",
    name: "PDF Tools",
    icon: "📄",
    tools: [
      {
        id: "pdf-merger",
        name: "PDF Merger",
        description: "Merge multiple PDFs into one",
        icon: "🔗",
        category: "pdf",
        slug: "pdf-merger",
      },
      {
        id: "pdf-compressor",
        name: "PDF Compressor",
        description: "Reduce PDF file size",
        icon: "🗜️",
        category: "pdf",
        slug: "pdf-compressor",
      },
      {
        id: "pdf-converter",
        name: "PDF Converter",
        description: "Convert PDFs to other formats",
        icon: "🔄",
        category: "pdf",
        slug: "pdf-converter",
      },
      {
        id: "pdf-splitter",
        name: "PDF Splitter",
        description: "Split PDF into multiple files",
        icon: "✂️",
        category: "pdf",
        slug: "pdf-splitter",
      },
    ],
  },
  {
    id: "audio",
    name: "Audio Tools",
    icon: "🎵",
    tools: [
      {
        id: "audio-converter",
        name: "Audio Converter",
        description: "Convert audio files to different formats",
        icon: "🔄",
        category: "audio",
        slug: "audio-converter",
      },
      {
        id: "audio-compressor",
        name: "Audio Compressor",
        description: "Reduce audio file size",
        icon: "🗜️",
        category: "audio",
        slug: "audio-compressor",
      },
      {
        id: "audio-trimmer",
        name: "Audio Trimmer",
        description: "Cut and trim audio files",
        icon: "✂️",
        category: "audio",
        slug: "audio-trimmer",
      },
    ],
  },
  {
    id: "text",
    name: "Text Tools",
    icon: "📝",
    tools: [
      {
        id: "word-counter",
        name: "Word Counter",
        description: "Count words, characters, and sentences",
        icon: "🔢",
        category: "text",
        slug: "word-counter",
      },
      {
        id: "grammar-checker",
        name: "Grammar Checker",
        description: "Check and fix grammar mistakes",
        icon: "✅",
        category: "text",
        slug: "grammar-checker",
      },
      {
        id: "paraphrasing-tool",
        name: "Paraphrasing Tool",
        description: "Rewrite text in different ways",
        icon: "🔄",
        category: "text",
        slug: "paraphrasing-tool",
      },
      {
        id: "case-converter",
        name: "Case Converter",
        description: "Convert text case (upper, lower, title)",
        icon: "🔤",
        category: "text",
        slug: "case-converter",
      },
    ],
  },
  {
    id: "web",
    name: "Web Tools",
    icon: "🌐",
    tools: [
      {
        id: "qr-generator",
        name: "QR Code Generator",
        description: "Create QR codes instantly",
        icon: "📱",
        category: "web",
        slug: "qr-generator",
      },
      {
        id: "url-shortener",
        name: "URL Shortener",
        description: "Shorten long URLs",
        icon: "🔗",
        category: "web",
        slug: "url-shortener",
      },
      {
        id: "base64-encoder",
        name: "Base64 Encoder/Decoder",
        description: "Encode and decode Base64",
        icon: "🔐",
        category: "web",
        slug: "base64-encoder",
      },
      {
        id: "json-formatter",
        name: "JSON Formatter",
        description: "Format and validate JSON",
        icon: "{ }",
        category: "web",
        slug: "json-formatter",
      },
    ],
  },
  {
    id: "utility",
    name: "Utility Tools",
    icon: "🛠️",
    tools: [
      {
        id: "unit-converter",
        name: "Unit Converter",
        description: "Convert between different units",
        icon: "⚖️",
        category: "utility",
        slug: "unit-converter",
      },
      {
        id: "currency-converter",
        name: "Currency Converter",
        description: "Convert currencies in real-time",
        icon: "💱",
        category: "utility",
        slug: "currency-converter",
      },
      {
        id: "zip-unzip",
        name: "ZIP/Unzip Files",
        description: "Compress and extract ZIP files",
        icon: "📦",
        category: "utility",
        slug: "zip-unzip",
      },
      {
        id: "color-picker",
        name: "Color Picker",
        description: "Pick and convert colors",
        icon: "🎨",
        category: "utility",
        slug: "color-picker",
      },
    ],
  },
]

export const getAllTools = (): Tool[] => {
  return TOOL_CATEGORIES.flatMap((category) => category.tools)
}

export const getToolBySlug = (slug: string): Tool | undefined => {
  return getAllTools().find((tool) => tool.slug === slug)
}

export const getToolsByCategory = (categoryId: string): Tool[] => {
  const category = TOOL_CATEGORIES.find((cat) => cat.id === categoryId)
  return category?.tools || []
}

export const getCategoryById = (categoryId: string): ToolCategory | undefined => {
  return TOOL_CATEGORIES.find((cat) => cat.id === categoryId)
}
