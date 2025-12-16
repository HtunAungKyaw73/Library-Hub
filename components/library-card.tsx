import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Library, User, Calendar, BookOpen } from "lucide-react"

interface LibraryCardProps {
  userEmail: string
  borrowedCount: number
  memberSince: string
}

export function LibraryCard({ userEmail, borrowedCount, memberSince }: LibraryCardProps) {
  const memberDate = new Date(memberSince).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  })

  // Generate a simple card number from email
  const cardNumber = userEmail
    .split("")
    .reduce((acc, char) => acc + char.charCodeAt(0), 0)
    .toString()
    .padStart(8, "0")
    .slice(0, 8)

  return (
    <Card className="bg-linear-to-br from-primary to-primary/80 text-primary-foreground border-0 shadow-xl">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <Library className="h-8 w-8" />
          <span className="text-sm font-medium opacity-80">MEMBER CARD</span>
        </div>
        <CardTitle className="text-xl mt-4">ISP Library</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="font-roboto-mono text-2xl tracking-wider">{cardNumber.match(/.{1,4}/g)?.join(" ")}</div>

        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-primary-foreground/20">
          <div>
            <div className="flex items-center gap-1.5 text-xs opacity-70 mb-1">
              <User className="h-3 w-3" />
              MEMBER
            </div>
            <p className="text-sm font-medium truncate">{userEmail}</p>
          </div>
          <div>
            <div className="flex items-center gap-1.5 text-xs opacity-70 mb-1">
              <Calendar className="h-3 w-3" />
              SINCE
            </div>
            <p className="text-sm font-medium">{memberDate}</p>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-primary-foreground/20">
          <div className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            <span className="text-sm">Currently Borrowed</span>
          </div>
          <span className="text-2xl font-bold">{borrowedCount}</span>
        </div>
      </CardContent>
    </Card>
  )
}
