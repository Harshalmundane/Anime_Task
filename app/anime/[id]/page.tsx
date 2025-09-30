import { Header } from "@/components/layout/header"
import { AnimeDetails } from "@/components/anime/anime-details"
import { notFound } from "next/navigation"

interface AnimeData {
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
  popularity: number
  members: number
  favorites: number
  synopsis: string
  background: string
  season: string
  year: number
  broadcast: {
    day: string
    time: string
    timezone: string
  }
  producers: Array<{ name: string }>
  licensors: Array<{ name: string }>
  studios: Array<{ name: string }>
  genres: Array<{ name: string }>
  themes: Array<{ name: string }>
  demographics: Array<{ name: string }>
  type: string
  source: string
  episodes: number
  status: string
  aired: {
    from: string
    to: string
    string: string
  }
  duration: string
  rating: string
  trailer: {
    youtube_id: string
    url: string
  }
}

async function getAnimeDetails(id: string): Promise<AnimeData | null> {
  try {
    const res = await fetch(`https://api.jikan.moe/v4/anime/${id}`, {
      next: { revalidate: 3600 },
    })

    if (!res.ok) {
      return null
    }

    const data = await res.json()
    return data.data
  } catch (error) {
    console.error("Error fetching anime details:", error)
    return null
  }
}

export default async function AnimeDetailPage({
  params,
}: {
  params: { id: string }
}) {
  const anime = await getAnimeDetails(params.id)

  if (!anime) {
    notFound()
  }

  return (
    <div className="min-h-screen">
      <Header />
      <AnimeDetails anime={anime} />
    </div>
  )
}
