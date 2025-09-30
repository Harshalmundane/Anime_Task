import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { FavoriteButton } from "@/components/anime/favorite-button"
import { Star, Calendar, Tv, Clock, Users } from "lucide-react"

interface AnimeDetailsProps {
  anime: {
    mal_id: number
    title: string
    title_english: string
    images: {
      jpg: {
        large_image_url: string
      }
    }
    score: number
    scored_by: number
    rank: number
    synopsis: string
    background: string
    year: number
    type: string
    episodes: number
    status: string
    aired: {
      string: string
    }
    duration: string
    rating: string
    genres: Array<{ name: string }>
    themes: Array<{ name: string }>
    studios: Array<{ name: string }>
    trailer: {
      youtube_id: string
      url: string
    }
  }
}

export function AnimeDetails({ anime }: AnimeDetailsProps) {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="grid lg:grid-cols-[300px_1fr] gap-8">
        {/* Poster */}
        <div className="space-y-4">
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <div className="relative aspect-[2/3]">
                <Image
                  src={anime.images.jpg.large_image_url || "/placeholder.svg"}
                  alt={anime.title}
                  fill
                  className="object-cover"
                  priority
                  sizes="300px"
                />
              </div>
            </CardContent>
          </Card>

          <FavoriteButton
            animeId={anime.mal_id}
            animeTitle={anime.title}
            animeImage={anime.images.jpg.large_image_url}
          />

          {/* Stats Card */}
          <Card>
            <CardContent className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Score</span>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-primary text-primary" />
                  <span className="font-semibold">{anime.score || "N/A"}</span>
                </div>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Rank</span>
                <span className="font-semibold">#{anime.rank || "N/A"}</span>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Type</span>
                <span className="font-semibold">{anime.type}</span>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Episodes</span>
                <span className="font-semibold">{anime.episodes || "?"}</span>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Status</span>
                <span className="font-semibold">{anime.status}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Details */}
        <div className="space-y-6">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold text-balance">{anime.title_english || anime.title}</h1>
            {anime.title_english && anime.title_english !== anime.title && (
              <p className="text-lg text-muted-foreground">{anime.title}</p>
            )}
          </div>

          {/* Genres */}
          <div className="flex flex-wrap gap-2">
            {anime.genres.map((genre) => (
              <Badge key={genre.name} variant="secondary">
                {genre.name}
              </Badge>
            ))}
            {anime.themes.map((theme) => (
              <Badge key={theme.name} variant="outline">
                {theme.name}
              </Badge>
            ))}
          </div>

          {/* Info Grid */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">Aired:</span>
              <span className="font-medium">{anime.aired.string}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">Duration:</span>
              <span className="font-medium">{anime.duration}</span>
            </div>
            {anime.studios.length > 0 && (
              <div className="flex items-center gap-2 text-sm">
                <Tv className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Studio:</span>
                <span className="font-medium">{anime.studios.map((s) => s.name).join(", ")}</span>
              </div>
            )}
            <div className="flex items-center gap-2 text-sm">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">Rating:</span>
              <span className="font-medium">{anime.rating}</span>
            </div>
          </div>

          <Separator />

          {/* Synopsis */}
          <div className="space-y-3">
            <h2 className="text-2xl font-bold">Synopsis</h2>
            <p className="text-muted-foreground leading-relaxed text-pretty">
              {anime.synopsis || "No synopsis available."}
            </p>
          </div>

          {anime.background && (
            <>
              <Separator />
              <div className="space-y-3">
                <h2 className="text-2xl font-bold">Background</h2>
                <p className="text-muted-foreground leading-relaxed text-pretty">{anime.background}</p>
              </div>
            </>
          )}

          {/* Trailer */}
          {anime.trailer?.youtube_id && (
            <>
              <Separator />
              <div className="space-y-3">
                <h2 className="text-2xl font-bold">Trailer</h2>
                <div className="aspect-video rounded-lg overflow-hidden bg-muted">
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${anime.trailer.youtube_id}`}
                    title="Anime Trailer"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  )
}
