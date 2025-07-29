import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Clock, TrendingUp } from "lucide-react"

interface DraftStatsProps {
  totalDrafts: number
  totalWords: number
  recentlyUpdated: number
}

export function DraftStats({ totalDrafts, totalWords, recentlyUpdated }: DraftStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Toplam Taslak</CardTitle>
          <FileText className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalDrafts}</div>
          <p className="text-xs text-muted-foreground">Yayınlanmayı bekleyen yazılar</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Toplam Kelime</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalWords.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">Taslakların toplam kelime sayısı</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Son Güncellenen</CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{recentlyUpdated}</div>
          <p className="text-xs text-muted-foreground">Son 7 gün içinde güncellenen</p>
        </CardContent>
      </Card>
    </div>
  )
}
