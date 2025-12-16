import { redirect } from "next/navigation"
import { getSession } from "@/lib/baserow/auth"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Users, Clock, CheckCircle } from "lucide-react"
import { AdminBorrowGrid } from "@/components/admin-borrow-grid"

// Baserow API for fetching all borrow records
async function getAllBorrowRecords() {
  const BASEROW_API_URL = process.env.NEXT_PUBLIC_BASEROW_API_URL || "https://api.baserow.io"
  const BASEROW_API_TOKEN = process.env.NEXT_PUBLIC_BASEROW_API_TOKEN || ""
  const TABLE_BORROW_BOOKS = process.env.NEXT_PUBLIC_BASEROW_TABLE_BORROW_BOOKS || "772607"

  try {
    const response = await fetch(
      `${BASEROW_API_URL}/api/database/rows/table/${TABLE_BORROW_BOOKS}/?user_field_names=true&size=200`,
      {
        headers: {
          Authorization: `Token ${BASEROW_API_TOKEN}`,
          "Content-Type": "application/json",
        },
        cache: "no-store",
      }
    )

    if (!response.ok) return []

    const data = await response.json()
    return data.results || []
  } catch {
    return []
  }
}

export default async function AdminPage() {
  const session = await getSession()

  if (!session) {
    redirect("/auth/login")
  }

  // Check if user is admin
  if (!session.isAdmin) {
    redirect("/")
  }

  // Fetch all borrowed books
  const borrowedBooks = await getAllBorrowRecords()

  // Calculate stats
  const totalBorrowed = borrowedBooks?.length || 0
  const currentlyBorrowed = borrowedBooks?.filter((b: { Status: string }) => b.Status === "borrowed").length || 0
  const returned = borrowedBooks?.filter((b: { Status: string }) => b.Status === "returned").length || 0
  const overdue =
    borrowedBooks?.filter((b: { Status: string; Due_Date: string }) => {
      if (b.Status !== "borrowed") return false
      return new Date(b.Due_Date) < new Date()
    }).length || 0

  // Get unique users count
  const uniqueUsers = new Set(borrowedBooks?.map((b: { User?: { id: number }[] }) => b.User?.[0]?.id)).size

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-pink-700 mb-2">Admin Dashboard</h1>
        <p className="text-muted-foreground">Track and manage all book borrowing activities</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Borrowed</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalBorrowed}</div>
            <p className="text-xs text-muted-foreground">All time records</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Currently Borrowed</CardTitle>
            <Clock className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600">{currentlyBorrowed}</div>
            <p className="text-xs text-muted-foreground">Books out now</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Returned</CardTitle>
            <CheckCircle className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-600">{returned}</div>
            <p className="text-xs text-muted-foreground">Completed returns</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Overdue</CardTitle>
            <Clock className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">{overdue}</div>
            <p className="text-xs text-muted-foreground">Past due date</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{uniqueUsers}</div>
            <p className="text-xs text-muted-foreground">Unique borrowers</p>
          </CardContent>
        </Card>
      </div>

      {/* Borrow Records Grid */}
      <Card>
        <CardHeader>
          <CardTitle>All Borrow Records</CardTitle>
          <CardDescription>Complete history of all book borrowing activities</CardDescription>
        </CardHeader>
        <CardContent>
          <AdminBorrowGrid borrowedBooks={borrowedBooks || []} />
        </CardContent>
      </Card>
    </div>
  )
}

