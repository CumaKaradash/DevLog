import { PostCard } from "@/components/post-card"

interface Post {
  id: string
  title: string
  slug: string
  excerpt: string
  tags: string[]
  createdAt: string
  isDraft: boolean
  isSilent: boolean
}

interface RelatedPostsProps {
  currentPost: Post
}

// Mock data - gerçek uygulamada ilgili postlar algoritmayla bulunacak
const mockRelatedPosts = [
  {
    id: "2",
    title: "TypeScript ile Tip Güvenli API Tasarımı",
    slug: "typescript-tip-guvenli-api-tasarimi",
    excerpt: "TypeScript kullanarak hem frontend hem backend için tip güvenli API'lar nasıl tasarlanır...",
    tags: ["TypeScript", "API", "Backend"],
    createdAt: "2024-01-12",
    isDraft: false,
    isSilent: true,
  },
]

export function RelatedPosts({ currentPost }: RelatedPostsProps) {
  // İlgili postları bul (ortak etiketlere göre)
  const relatedPosts = mockRelatedPosts.filter(
    (post) => post.id !== currentPost.id && post.tags.some((tag) => currentPost.tags.includes(tag)),
  )

  if (relatedPosts.length === 0) {
    return null
  }

  return (
    <div className="border-t pt-8">
      <h3 className="text-xl font-semibold mb-6">İlgili Yazılar</h3>
      <div className="grid gap-4 md:grid-cols-2">
        {relatedPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  )
}
