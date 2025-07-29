import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, EyeOff, Edit } from "lucide-react"
import Link from "next/link"

interface Post {
  id: string
  title: string
  slug: string
  excerpt: string
  tags: string[]
  createdAt: string
  isDraft: boolean
  isSilent: boolean
  updatedAt?: string
}

interface PostCardProps {
  post: Post
  isDraftView?: boolean
}

export function PostCard({ post, isDraftView = false }: PostCardProps) {
  return (
    <Link href={`/post/${post.slug}`}>
      <Card className="hover:shadow-md transition-shadow cursor-pointer">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <h2 className="text-xl font-semibold line-clamp-2 flex-1">{post.title}</h2>
            {post.isSilent && <EyeOff className="w-4 h-4 text-muted-foreground ml-2 flex-shrink-0" />}
            {isDraftView && (
              <Link href={`/editor?edit=${post.slug}`}>
                <Button variant="ghost" size="sm">
                  <Edit className="w-4 h-4" />
                </Button>
              </Link>
            )}
          </div>
          <p className="text-muted-foreground line-clamp-3 mt-2">{post.excerpt}</p>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex items-center justify-between">
            <div className="flex flex-wrap gap-1">
              {post.tags.slice(0, 3).map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
              {post.tags.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{post.tags.length - 3}
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              {isDraftView && post.updatedAt && (
                <div className="flex items-center">
                  <span className="text-xs">Son güncelleme:</span>
                  <span className="ml-1">{new Date(post.updatedAt).toLocaleDateString("tr-TR")}</span>
                </div>
              )}
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                {new Date(post.createdAt).toLocaleDateString("tr-TR")}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
