import { Badge } from "@/components/ui/badge"
import { Calendar, EyeOff } from "lucide-react"

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

interface PostHeaderProps {
  post: Post
}

export function PostHeader({ post }: PostHeaderProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        {post.isSilent && (
          <div className="flex items-center text-sm text-muted-foreground">
            <EyeOff className="w-4 h-4 mr-1" />
            Sessiz Yayın
          </div>
        )}
        <div className="flex items-center text-sm text-muted-foreground">
          <Calendar className="w-4 h-4 mr-1" />
          {new Date(post.createdAt).toLocaleDateString("tr-TR", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </div>
      </div>

      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>

      <div className="flex flex-wrap gap-2">
        {post.tags.map((tag) => (
          <Badge key={tag} variant="secondary">
            {tag}
          </Badge>
        ))}
      </div>
    </div>
  )
}
