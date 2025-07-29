"use client"

import { PostContent } from "@/components/post-content"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Bold, Code, Italic, Link, List, Quote } from "lucide-react"

interface MarkdownEditorProps {
  content: string
  onChange: (content: string) => void
  isPreview: boolean
}

export function MarkdownEditor({ content, onChange, isPreview }: MarkdownEditorProps) {
  const insertMarkdown = (before: string, after = "") => {
    const textarea = document.querySelector("textarea") as HTMLTextAreaElement
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = content.substring(start, end)
    const newText = content.substring(0, start) + before + selectedText + after + content.substring(end)

    onChange(newText)

    // Cursor pozisyonunu ayarla
    setTimeout(() => {
      textarea.focus()
      textarea.setSelectionRange(start + before.length, start + before.length + selectedText.length)
    }, 0)
  }

  if (isPreview) {
    return <PostContent content={content} />
  }

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex items-center gap-1 p-2 border rounded-md bg-muted/50">
        <Button variant="ghost" size="sm" onClick={() => insertMarkdown("**", "**")} title="Kalın (Ctrl+B)">
          <Bold className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="sm" onClick={() => insertMarkdown("*", "*")} title="İtalik (Ctrl+I)">
          <Italic className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="sm" onClick={() => insertMarkdown("`", "`")} title="Kod">
          <Code className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="sm" onClick={() => insertMarkdown("[", "](url)")} title="Link">
          <Link className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="sm" onClick={() => insertMarkdown("> ", "")} title="Alıntı">
          <Quote className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="sm" onClick={() => insertMarkdown("- ", "")} title="Liste">
          <List className="w-4 h-4" />
        </Button>
      </div>

      {/* Editor */}
      <Textarea
        value={content}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Markdown ile yazınızı yazın..."
        className="min-h-[500px] font-mono text-sm resize-none"
        onKeyDown={(e) => {
          if (e.ctrlKey || e.metaKey) {
            switch (e.key) {
              case "b":
                e.preventDefault()
                insertMarkdown("**", "**")
                break
              case "i":
                e.preventDefault()
                insertMarkdown("*", "*")
                break
            }
          }
        }}
      />
    </div>
  )
}
