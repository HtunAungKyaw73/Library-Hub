'use client'
import { BookDetails } from "@/components/book-details"
import { useGetBookByIdQuery } from "@/lib/redux/services/baserowApi"
import { notFound, useParams } from "next/navigation"
import BooksLoading from "../loading"

export default function BookPage() {
  const { id } = useParams<{ id: string }>()

  const { data: book, isLoading, isError } = useGetBookByIdQuery(id, {
    skip: !id
  })

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
    />
  )
}

