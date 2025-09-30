"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Heart } from "lucide-react"
import { getSupabaseBrowserClient } from "@/lib/supabase/client"
import { useToast } from "@/hooks/use-toast"

interface FavoriteButtonProps {
  animeId: number
  animeTitle: string
  animeImage: string
}

export function FavoriteButton({ animeId, animeTitle, animeImage }: FavoriteButtonProps) {
  const [isFavorite, setIsFavorite] = useState(false)
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState<any>(null)
  const router = useRouter()
  const { toast } = useToast()
  const supabase = getSupabaseBrowserClient()

  useEffect(() => {
    checkUser()
  }, [])

  useEffect(() => {
    if (user) {
      checkFavoriteStatus()
    }
  }, [user, animeId])

  async function checkUser() {
    const {
      data: { user },
    } = await supabase.auth.getUser()
    setUser(user)
  }

  async function checkFavoriteStatus() {
    if (!user) return

    try {
      const { data, error } = await supabase
        .from("favorites")
        .select("id")
        .eq("user_id", user.id)
        .eq("anime_id", animeId)
        .single()

      if (error && error.code !== "PGRST116") {
        console.error("Error checking favorite:", error)
        return
      }

      setIsFavorite(!!data)
    } catch (error) {
      console.error("Error checking favorite:", error)
    }
  }

  async function toggleFavorite() {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to add favorites",
        variant: "destructive",
      })
      router.push("/login")
      return
    }

    setLoading(true)

    try {
      if (isFavorite) {
        // Remove from favorites
        const { error } = await supabase.from("favorites").delete().eq("user_id", user.id).eq("anime_id", animeId)

        if (error) throw error

        setIsFavorite(false)
        toast({
          title: "Removed from favorites",
          description: `${animeTitle} has been removed from your favorites`,
        })
      } else {
        // Add to favorites
        const { error } = await supabase.from("favorites").insert({
          user_id: user.id,
          anime_id: animeId,
          anime_title: animeTitle,
          anime_image: animeImage,
        })

        if (error) throw error

        setIsFavorite(true)
        toast({
          title: "Added to favorites",
          description: `${animeTitle} has been added to your favorites`,
        })
      }

      router.refresh()
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to update favorites",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button
      onClick={toggleFavorite}
      disabled={loading}
      variant={isFavorite ? "default" : "outline"}
      className="w-full gap-2"
    >
      <Heart className={`h-4 w-4 ${isFavorite ? "fill-current" : ""}`} />
      {loading ? "Loading..." : isFavorite ? "Remove from Favorites" : "Add to Favorites"}
    </Button>
  )
}
