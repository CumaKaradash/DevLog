"use client"

import { PostCard } from "@/components/post-card"
import { DraftStats } from "@/components/draft-stats"
import { Button } from "@/components/ui/button"
import { PlusCircle, FileText } from "lucide-react"
import Link from "next/link"

// Mock data - gerçek uygulamada veritabanından gelecek
const mockDrafts = [
  {
    id: "3",
    title: "Mikro Frontend Mimarisi Deneyimlerim",
    slug: "mikro-frontend-mimarisi-deneyimlerim",
    excerpt: "Büyük ölçekli projelerde mikro frontend yaklaşımının avantaj ve dezavantajları...",
    content: "# Mikro Frontend\n\nBüyük takımlarla çalışırken...",
    tags: ["Architecture", "Frontend", "Microservices"],
    createdAt: "2024-01-10",
    updatedAt: "2024-01-15",
    isDraft: true,
    isSilent: false,
    wordCount: 245,
  },
  {
    id: "4",
    title: "GraphQL vs REST API Karşılaştırması",
    slug: "graphql-vs-rest-api-karsilastirmasi",
    excerpt: "Modern web uygulamalarında API tasarımı için hangi yaklaşımı seçmeli?",
    content: "# GraphQL vs REST\n\nAPI tasarımında...",
    tags: ["API", "GraphQL", "REST", "Backend"],
    createdAt: "2024-01-08",
    updatedAt: "2024-01-12",
    isDraft: true,
    isSilent: false,
    wordCount: 180,
  },
  {
    id: "5",
    title: "Docker ile Geliştirme Ortamı Kurulumu",
    slug: "docker-ile-gelistirme-ortami-kurulumu",
    excerpt: "Tutarlı geliştirme ortamları için Docker kullanımı ve best practices...",
    content: "# Docker Geliştirme Ortamı\n\n```dockerfile\nFROM node:18-alpine\n```",
    tags: ["Docker", "DevOps", "Development"],
    createdAt: "2024-01-05",
    updatedAt: "2024-01-09",
    isDraft: true,
    isSilent: true,
    wordCount: 320,
  },
  {
    id: "6",
    title: "React Hook'ları Derinlemesine",
    slug: "react-hooklari-derinlemesine",
    excerpt: "useState, useEffect ve custom hook'lar ile modern React geliştirme...",
    content: "# React Hooks\n\n```jsx\nconst [state, setState] = useState()\n```",
    tags: ["React", "Hooks", "JavaScript"],
    createdAt: "2024-01-03",
    updatedAt: "2024-01-07",
    isDraft: true,
    isSilent: false,
    wordCount: 156,
  },
]

export default function DraftsPageClient() {
  const totalDrafts = mockDrafts.length
  const totalWords = mockDrafts.reduce((sum, draft) => sum + draft.wordCount, 0)
  const recentlyUpdated = mockDrafts.filter((draft) => {
    const updatedDate = new Date(draft.updatedAt)
    const weekAgo = new Date()
    weekAgo.setDate(weekAgo.getDate() - 7)
    return updatedDate > weekAgo
  }).length

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2 flex items-center">
            <FileText className="w-8 h-8 mr-3 text-muted-foreground" />
            Taslaklar
          </h1>
          <p className="text-muted-foreground">Henüz yayınlanmamış yazılarınız ve devam eden çalışmalarınız</p>
        </div>
        <Link href="/editor">
          <Button className="mt-4 md:mt-0">
            <PlusCircle className="w-4 h-4 mr-2" />
            Yeni Taslak
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <DraftStats totalDrafts={totalDrafts} totalWords={totalWords} recentlyUpdated={recentlyUpdated} />

      {/* Drafts List */}
      {mockDrafts.length > 0 ? (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Tüm Taslaklar</h2>
            <div className="text-sm text-muted-foreground">{mockDrafts.length} taslak</div>
          </div>

          <div className="grid gap-6">
            {mockDrafts.map((draft) => (
              <div key={draft.id} className="relative">
                <PostCard post={draft} isDraftView={true} />
                <div className="absolute top-4 right-4">
                  <div className="bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 px-2 py-1 rounded-full text-xs font-medium">
                    Taslak
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* Empty State */
        <div className="text-center py-16">
          <FileText className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-xl font-semibold mb-2">Henüz taslak yok</h3>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Düşüncelerinizi kaydetmeye başlayın. Taslaklar sadece sizin görebileceğiniz özel alanınızdır.
          </p>
          <Link href="/editor">
            <Button>
              <PlusCircle className="w-4 h-4 mr-2" />
              İlk Taslağı Oluştur
            </Button>
          </Link>
        </div>
      )}

      {/* Tips */}
      <div className="mt-12 p-6 bg-muted/50 rounded-lg border">
        <h3 className="font-semibold mb-3 flex items-center">💡 Taslak İpuçları</h3>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>• Taslaklar sadece sizin görebileceğiniz özel yazılardır</li>
          <li>• Düzenlemek için herhangi bir taslağa tıklayabilirsiniz</li>
          <li>• Hazır olduğunda "Yayınla" butonuyla herkesle paylaşabilirsiniz</li>
          <li>• "Sessiz yayın" ile sosyal bildirimleri kapatabilirsiniz</li>
        </ul>
      </div>
    </div>
  )
}
