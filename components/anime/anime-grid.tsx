import { AnimeCard } from "@/components/anime/anime-card"

interface Anime {
  mal_id: number
  title: string
  images: {
    jpg: {
      large_image_url: string
    }
  }
  score: number
  episodes: number
  year: number
}

async function getTrendingAnime() {
  try {
    const res = await fetch("https://api.jikan.moe/v4/top/anime?limit=12", {
      next: { revalidate: 3600 }, // Cache for 1 hour
    })

    if (!res.ok) {
      throw new Error("Failed to fetch anime")
    }

    const data = await res.json()
    return data.data as Anime[]
  } catch (error) {
    console.error("Error fetching anime:", error)
    return []
  }
}

export async function AnimeGrid() {
  const animeList = await getTrendingAnime()

  if (animeList.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <p>No anime found. Please try again later.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
      {animeList.map((anime) => (
        <AnimeCard key={anime.mal_id} anime={anime} />
      ))}
    </div>
  )
}
