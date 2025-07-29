"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { X } from "lucide-react"
import { useState } from "react"

interface PostSettingsProps {
  tags: string[]
  onTagsChange: (tags: string[]) => void
  isDraft: boolean
  onDraftChange: (isDraft: boolean) => void
  isSilent: boolean
  onSilentChange: (isSilent: boolean) => void
}

export function PostSettings({
  tags,
  onTagsChange,
  isDraft,
  onDraftChange,
  isSilent,
  onSilentChange,
}: PostSettingsProps) {
  const [newTag, setNewTag] = useState("")

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      onTagsChange([...tags, newTag.trim()])
      setNewTag("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    onTagsChange(tags.filter((tag) => tag !== tagToRemove))
  }

  return (
    <div className="space-y-6">
      {/* Yayın Ayarları */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Yayın Ayarları</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Taslak olarak kaydet</Label>
              <p className="text-sm text-muted-foreground">Yazı yayınlanmayacak</p>
            </div>
            <Switch checked={isDraft} onCheckedChange={onDraftChange} />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Sessiz yayınla</Label>
              <p className="text-sm text-muted-foreground">Sosyal bildirimleri gizle</p>
            </div>
            <Switch checked={isSilent} onCheckedChange={onSilentChange} disabled={isDraft} />
          </div>
        </CardContent>
      </Card>

      {/* Etiketler */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Etiketler</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="Etiket ekle..."
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault()
                  addTag()
                }
              }}
            />
            <Button onClick={addTag} size="sm">
              Ekle
            </Button>
          </div>

          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                {tag}
                <Button variant="ghost" size="sm" className="h-auto p-0 w-4 h-4" onClick={() => removeTag(tag)}>
                  <X className="w-3 h-3" />
                </Button>
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Yazı İstatistikleri */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">İstatistikler</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Kelime sayısı:</span>
            <span className="font-medium">0</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Karakter sayısı:</span>
            <span className="font-medium">0</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Okuma süresi:</span>
            <span className="font-medium">~1 dk</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
