"use client"

import type React from "react"

import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import { getSupabaseBrowserClient } from "@/lib/supabase/client"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import { useState } from "react"

interface FavoriteCardProps {
  favorite: {
    id: string
    anime_id: number
    anime_title: string
    anime_image: string
  }
}

export function FavoriteCard({ favorite }: FavoriteCardProps) {
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()
  const router = useRouter()
  const supabase = getSupabaseBrowserClient()

  const handleRemove = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    setLoading(true)

    try {
      const { error } = await supabase.from("favorites").delete().eq("id", favorite.id)

      if (error) throw error

      toast({
        title: "Removed from favorites",
        description: `${favorite.anime_title} has been removed`,
      })

      router.refresh()
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to remove favorite",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative group">
      <Link href={`/anime/${favorite.anime_id}`}>
        <Card className="overflow-hidden hover:ring-2 hover:ring-primary transition-all">
          <CardContent className="p-0">
            <div className="relative aspect-[2/3] overflow-hidden bg-muted">
              <Image
                src={favorite.anime_image || "/placeholder.svg"}
                alt={favorite.anime_title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 16vw"
              />
            </div>
            <div className="p-3">
              <h3 className="font-semibold text-sm line-clamp-2 text-balance">{favorite.anime_title}</h3>
            </div>
          </CardContent>
        </Card>
      </Link>

      <Button
        size="icon"
        variant="destructive"
        className="absolute top-2 right-2 h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={handleRemove}
        disabled={loading}
      >
        <X className="h-4 w-4" />
        <span className="sr-only">Remove from favorites</span>
      </Button>
    </div>
  )
}
