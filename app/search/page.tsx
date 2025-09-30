import { Header } from "@/components/layout/header"
import { AnimeCard } from "@/components/anime/anime-card"
import { SearchBar } from "@/components/anime/search-bar"

interface Anime {
  mal_id: number
  title: string
  images: {
    jpg: {
      large_image_url: string
    }
  }
  score: number
}

async function searchAnime(query: string) {
  try {
    const res = await fetch(`https://api.jikan.moe/v4/anime?q=${encodeURIComponent(query)}&limit=24`, {
      next: { revalidate: 3600 },
    })

    if (!res.ok) {
      throw new Error("Failed to search anime")
    }

    const data = await res.json()
    return data.data as Anime[]
  } catch (error) {
    console.error("Error searching anime:", error)
    return []
  }
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { q?: string }
}) {
  const query = searchParams.q || ""
  const results = query ? await searchAnime(query) : []

  return (
    <div className="min-h-screen">
      <Header />

      <main className="container mx-auto px-4 py-8 space-y-8">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold">Search Anime</h1>
          <SearchBar />
        </div>

        {query && (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">
              Results for "{query}" ({results.length})
            </h2>

            {results.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                {results.map((anime) => (
                  <AnimeCard key={anime.mal_id} anime={anime} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <p>No results found for "{query}"</p>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  )
}
