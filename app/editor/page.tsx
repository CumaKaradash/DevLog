"use client"

import { MarkdownEditor } from "@/components/markdown-editor"
import { PostSettings } from "@/components/post-settings"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Eye, Save } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"

// Mock data - gerçek uygulamada veritabanından gelecek
const mockPosts = [
  {
    id: "1",
    title: "React Server Components ile Modern Web Geliştirme",
    slug: "react-server-components-modern-web",
    content: `# React Server Components ile Modern Web Geliştirme

React Server Components, modern web geliştirmede yeni bir paradigma sunuyor...`,
    tags: ["React", "Next.js", "Performance"],
    isDraft: false,
    isSilent: false,
  },
]

export default function EditorPage() {
  const searchParams = useSearchParams()
  const editSlug = searchParams.get("edit")

  const [title, setTitle] = useState("")
  const [content, setContent] = useState("# Yeni Yazı\n\nBuraya yazınızı yazın...")
  const [tags, setTags] = useState<string[]>([])
  const [isDraft, setIsDraft] = useState(true)
  const [isSilent, setIsSilent] = useState(false)
  const [isPreview, setIsPreview] = useState(false)
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    if (editSlug) {
      // Düzenleme modunda mevcut postu yükle
      const postToEdit = mockPosts.find((post) => post.slug === editSlug)
      if (postToEdit) {
        setTitle(postToEdit.title)
        setContent(postToEdit.content)
        setTags(postToEdit.tags)
        setIsDraft(postToEdit.isDraft)
        setIsSilent(postToEdit.isSilent)
        setIsEditing(true)
      }
    }
  }, [editSlug])

  const handleSave = () => {
    // Burada yazı kaydedilecek
    console.log("Saving post:", { title, content, tags, isDraft, isSilent, isEditing })
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <Link href="/">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Ana Sayfa
          </Button>
        </Link>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => setIsPreview(!isPreview)}>
            <Eye className="w-4 h-4 mr-2" />
            {isPreview ? "Editör" : "Önizleme"}
          </Button>
          <Button onClick={handleSave}>
            <Save className="w-4 h-4 mr-2" />
            {isEditing ? "Güncelle" : "Kaydet"}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Editor */}
        <div className="lg:col-span-3">
          {/* Title */}
          <Input
            placeholder="Yazı başlığı..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="text-2xl font-bold border-none px-0 mb-4 focus-visible:ring-0"
          />

          <Separator className="mb-6" />

          {/* Editor */}
          <MarkdownEditor content={content} onChange={setContent} isPreview={isPreview} />
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <PostSettings
            tags={tags}
            onTagsChange={setTags}
            isDraft={isDraft}
            onDraftChange={setIsDraft}
            isSilent={isSilent}
            onSilentChange={setIsSilent}
          />
        </div>
      </div>
    </div>
  )
}
