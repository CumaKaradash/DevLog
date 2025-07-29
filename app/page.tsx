import { PostCard } from "@/components/post-card"
import { SearchBar } from "@/components/search-bar"
import { TagFilter } from "@/components/tag-filter"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import Link from "next/link"

// Mock data - gerçek uygulamada veritabanından gelecek
const mockPosts = [
  {
    id: "1",
    title: "React Server Components ile Modern Web Geliştirme",
    slug: "react-server-components-modern-web",
    excerpt: "Server Components ile performanslı ve SEO dostu uygulamalar geliştirmenin inceliklerini keşfediyoruz...",
    content: "# React Server Components\n\nServer Components ile...",
    tags: ["React", "Next.js", "Performance"],
    createdAt: "2024-01-15",
    isDraft: false,
    isSilent: false,
  },
  {
    id: "2",
    title: "TypeScript ile Tip Güvenli API Tasarımı",
    slug: "typescript-tip-guvenli-api-tasarimi",
    excerpt: "TypeScript kullanarak hem frontend hem backend için tip güvenli API'lar nasıl tasarlanır...",
    content: "# TypeScript API Tasarımı\n\n```typescript\ninterface User {\n  id: string\n  name: string\n}\n```",
    tags: ["TypeScript", "API", "Backend"],
    createdAt: "2024-01-12",
    isDraft: false,
    isSilent: true,
  },
  {
    id: "3",
    title: "Mikro Frontend Mimarisi Deneyimlerim",
    slug: "mikro-frontend-mimarisi-deneyimlerim",
    excerpt: "Büyük ölçekli projelerde mikro frontend yaklaşımının avantaj ve dezavantajları...",
    content: "# Mikro Frontend\n\nBüyük takımlarla çalışırken...",
    tags: ["Architecture", "Frontend", "Microservices"],
    createdAt: "2024-01-10",
    isDraft: true,
    isSilent: false,
  },
]

const allTags = Array.from(new Set(mockPosts.flatMap((post) => post.tags)))

export default function HomePage() {
  // Sadece yayınlanmış postları göster
  const publishedPosts = mockPosts.filter((post) => !post.isDraft)

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">DevLog</h1>
          <p className="text-muted-foreground">Geliştiriciler için teknik düşünce arşivi ve dijital ifade alanı</p>
        </div>
        <Link href="/editor">
          <Button className="mt-4 md:mt-0">
            <PlusCircle className="w-4 h-4 mr-2" />
            Yeni Yazı
          </Button>
        </Link>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="flex-1">
          <SearchBar />
        </div>
        <TagFilter tags={allTags} />
      </div>

      {/* Posts Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-1">
        {publishedPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>

      {/* Empty State */}
      {publishedPosts.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-lg font-semibold mb-2">Henüz yazı yok</h3>
          <p className="text-muted-foreground mb-4">İlk yazınızı oluşturarak başlayın</p>
          <Link href="/editor">
            <Button>
              <PlusCircle className="w-4 h-4 mr-2" />
              İlk Yazıyı Oluştur
            </Button>
          </Link>
        </div>
      )}
    </div>
  )
}
