'use client'
import { BookDetails } from "@/components/book-details"
import { useGetBookByIdQuery, useGetBorrowedBooksQuery } from "@/lib/redux/services/baserowApi"
import { notFound, useParams } from "next/navigation"
import BooksLoading from "../loading"
import { useAppSelector } from "@/lib/redux/hooks"
import { selectUser } from "@/lib/redux/slices/authSlice"

export default function BookPage() {
  const { id } = useParams<{ id: string }>()

  const { data: book, isLoading, isError } = useGetBookByIdQuery(id, {
    skip: !id
  })
  const user = useAppSelector(selectUser)

  const { data: borrowedBooks } = useGetBorrowedBooksQuery(user?.user_id || "", {
    skip: !user?.user_id
  })

  const hasBorrowed = borrowedBooks?.some(b => (b.book_id === book?.book_id) && (b.status === "borrowed"))
  const currentBorrows = borrowedBooks?.filter(b => b.status === "borrowed").length || 0

  if (isLoading) {
    return (
      <BooksLoading />
    )
  }

  if (isError) {
    return (
      <div className="container mx-auto py-12 text-center">
        <p className="text-destructive mb-4">Error loading book</p>
      </div>
    )
  }

  if (!book && !isLoading) {
    notFound()
  }

  return (
    <BookDetails
      book={book}
      hasBorrowed={hasBorrowed || false}
      currentBorrows={currentBorrows}
      user={user}
    />
  )
}

