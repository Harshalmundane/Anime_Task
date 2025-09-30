import { Header } from "@/components/layout/header"
import { AnimeGrid } from "@/components/anime/anime-grid"
import { SearchBar } from "@/components/anime/search-bar"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Header />

      <main className="container mx-auto px-4 py-8 space-y-8">
        <div className="space-y-4">
          <h1 className="text-5xl font-bold text-balance">Discover Amazing Anime</h1>
          <p className="text-xl text-muted-foreground text-pretty max-w-2xl">
            Explore thousands of anime series and movies. Find your next favorite show.
          </p>
        </div>

        <SearchBar />

        <section className="space-y-4">
          <h2 className="text-3xl font-bold">Trending Now</h2>
          <AnimeGrid />
        </section>
      </main>
    </div>
  )
}
