import { PostContent } from "@/components/post-content"
import { PostHeader } from "@/components/post-header"
import { RelatedPosts } from "@/components/related-posts"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Edit } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"

// Mock data - gerçek uygulamada veritabanından gelecek
const mockPosts = [
  {
    id: "1",
    title: "React Server Components ile Modern Web Geliştirme",
    slug: "react-server-components-modern-web",
    excerpt: "Server Components ile performanslı ve SEO dostu uygulamalar geliştirmenin inceliklerini keşfediyoruz...",
    content: `# React Server Components ile Modern Web Geliştirme

React Server Components, modern web geliştirmede yeni bir paradigma sunuyor. Bu teknoloji ile hem performans hem de geliştirici deneyimi açısından önemli avantajlar elde edebiliyoruz.

## Server Components Nedir?

Server Components, React bileşenlerinin sunucu tarafında render edilmesini sağlayan bir teknoloji. Bu sayede:

- **Daha hızlı ilk yükleme**: JavaScript bundle boyutu azalır
- **SEO dostu**: İçerik sunucu tarafında render edilir
- **Veri erişimi**: Doğrudan veritabanına erişim mümkün

## Örnek Kullanım

\`\`\`tsx
// Server Component
async function UserProfile({ userId }: { userId: string }) {
  const user = await db.user.findUnique({
    where: { id: userId }
  })
  
  return (
    <div className="user-profile">
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  )
}
\`\`\`

## Client vs Server Components

| Özellik | Server Component | Client Component |
|---------|------------------|------------------|
| Render | Sunucu | Tarayıcı |
| JavaScript Bundle | Dahil değil | Dahil |
| Veri Erişimi | Doğrudan | API üzerinden |
| Interaktivite | Yok | Var |

## Sonuç

Server Components, özellikle içerik ağırlıklı uygulamalar için mükemmel bir çözüm. Next.js 13+ ile birlikte kullanımı oldukça kolay hale geldi.`,
    tags: ["React", "Next.js", "Performance"],
    createdAt: "2024-01-15",
    isDraft: false,
    isSilent: false,
  },
]

interface PostPageProps {
  params: {
    slug: string
  }
}

export default function PostPage({ params }: PostPageProps) {
  const post = mockPosts.find((p) => p.slug === params.slug)

  if (!post) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Navigation */}
      <div className="flex items-center justify-between mb-8">
        <Link href="/">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Ana Sayfa
          </Button>
        </Link>
        <Link href={`/editor?edit=${post.slug}`}>
          <Button variant="outline" size="sm">
            <Edit className="w-4 h-4 mr-2" />
            Düzenle
          </Button>
        </Link>
      </div>

      {/* Post Header */}
      <PostHeader post={post} />

      {/* Post Content */}
      <PostContent content={post.content} />

      {/* Related Posts */}
      <RelatedPosts currentPost={post} />
    </div>
  )
}

export async function generateMetadata({ params }: PostPageProps) {
  const post = mockPosts.find((p) => p.slug === params.slug)

  if (!post) {
    return {
      title: "Post bulunamadı",
    }
  }

  return {
    title: `${post.title} | DevLog`,
    description: post.excerpt,
    keywords: post.tags.join(", "),
  }
}
