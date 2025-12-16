import { NextResponse } from "next/server"
import { createBorrowRecord, getBook } from "@/lib/baserow/client"

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const { bookId, userId, dueDate } = body

        if (!bookId || !userId || !dueDate) {
            return NextResponse.json(
                { success: false, error: "Book ID and User ID are required" },
                { status: 400 }
            )
        }

        // Get current book to verify it exists
        const book = await getBook(bookId)
        if (!book) {
            return NextResponse.json(
                { success: false, error: "Book not found" },
                { status: 404 }
            )
        }

        // Create borrow record
        const borrowRecord = await createBorrowRecord({
            bookId: String(bookId),
            userId: String(userId),
            dueDate: dueDate,
        })

        if (!borrowRecord) {
            return NextResponse.json(
                { success: false, error: "Failed to create borrow record" },
                { status: 500 }
            )
        }

        return NextResponse.json({ success: true, borrowRecord })
    } catch (error) {
        console.error("Borrow API error:", error)
        return NextResponse.json(
            { success: false, error: "Internal server error" },
            { status: 500 }
        )
    }
}

