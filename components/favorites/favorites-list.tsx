import { getSupabaseServerClient } from "@/lib/supabase/server"
import { FavoriteCard } from "@/components/favorites/favorite-card"

interface Favorite {
  id: string
  anime_id: number
  anime_title: string
  anime_image: string
  created_at: string
}

async function getFavorites(userId: string) {
  const supabase = await getSupabaseServerClient()

  const { data, error } = await supabase
    .from("favorites")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching favorites:", error)
    return []
  }

  return data as Favorite[]
}

export async function FavoritesList({ userId }: { userId: string }) {
  const favorites = await getFavorites(userId)

  if (favorites.length === 0) {
    return (
      <div className="text-center py-12 space-y-4">
        <p className="text-muted-foreground text-lg">You haven't added any favorites yet</p>
        <p className="text-sm text-muted-foreground">
          Browse anime and click the heart icon to add them to your favorites
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
      {favorites.map((favorite) => (
        <FavoriteCard key={favorite.id} favorite={favorite} />
      ))}
    </div>
  )
}
