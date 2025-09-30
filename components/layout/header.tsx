import Link from "next/link"
import { Button } from "@/components/ui/button"
import { UserNav } from "@/components/layout/user-nav"
import { getSupabaseServerClient } from "@/lib/supabase/server"
import { Heart, Film } from "lucide-react"

export async function Header() {
  const supabase = await getSupabaseServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl">
          <Film className="h-6 w-6 text-primary" />
          <span>AnimeStream</span>
        </Link>

        <nav className="flex items-center gap-6">
          {user ? (
            <>
              <Link href="/favorites">
                <Button variant="ghost" size="sm" className="gap-2">
                  <Heart className="h-4 w-4" />
                  Favorites
                </Button>
              </Link>
              <UserNav user={user} />
            </>
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/login">
                <Button variant="ghost" size="sm">
                  Sign In
                </Button>
              </Link>
              <Link href="/signup">
                <Button size="sm">Get Started</Button>
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  )
}
