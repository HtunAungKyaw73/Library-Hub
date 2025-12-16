import { NextResponse } from "next/server"
import { updateBorrowRecord, updateBookCopies } from "@/lib/baserow/client"

export async function POST(request: Request) {
    try {
        const { borrowId, bookId, availableCopies } = await request.json()

        if (!borrowId || !bookId) {
            return NextResponse.json(
                { success: false, error: "Borrow ID and Book ID are required" },
                { status: 400 }
            )
        }

        // Update borrow record to returned
        const borrowRecord = await updateBorrowRecord(String(borrowId), {
            Status: "returned",
            Returned_At: new Date().toISOString(),
        })

        if (!borrowRecord) {
            return NextResponse.json(
                { success: false, error: "Failed to update borrow record" },
                { status: 500 }
            )
        }

        // Update available copies
        await updateBookCopies(String(bookId), availableCopies + 1)

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error("Return API error:", error)
        return NextResponse.json(
            { success: false, error: "Internal server error" },
            { status: 500 }
        )
    }
}
