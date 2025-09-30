import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"

interface AnimeCardProps {
  anime: {
    mal_id: number
    title: string
    images: {
      jpg: {
        large_image_url: string
      }
    }
    score: number
  }
}

export function AnimeCard({ anime }: AnimeCardProps) {
  return (
    <Link href={`/anime/${anime.mal_id}`}>
      <Card className="overflow-hidden hover:ring-2 hover:ring-primary transition-all group">
        <CardContent className="p-0">
          <div className="relative aspect-[2/3] overflow-hidden bg-muted">
            <Image
              src={anime.images.jpg.large_image_url || "/placeholder.svg"}
              alt={anime.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 16vw"
            />
            {anime.score > 0 && (
              <div className="absolute top-2 right-2 bg-background/90 backdrop-blur-sm px-2 py-1 rounded-md flex items-center gap-1">
                <Star className="h-3 w-3 fill-primary text-primary" />
                <span className="text-xs font-semibold">{anime.score}</span>
              </div>
            )}
          </div>
          <div className="p-3">
            <h3 className="font-semibold text-sm line-clamp-2 text-balance">{anime.title}</h3>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
