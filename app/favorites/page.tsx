import { Header } from "@/components/layout/header"
import { FavoritesList } from "@/components/favorites/favorites-list"
import { getSupabaseServerClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

export default async function FavoritesPage() {
  const supabase = await getSupabaseServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  return (
    <div className="min-h-screen">
      <Header />

      <main className="container mx-auto px-4 py-8 space-y-8">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold">My Favorites</h1>
          <p className="text-muted-foreground text-pretty">Your collection of favorite anime series and movies</p>
        </div>

        <FavoritesList userId={user.id} />
      </main>
    </div>
  )
}
