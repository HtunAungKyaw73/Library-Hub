import { NextResponse } from "next/server"
import { getBook } from "@/lib/baserow/client"

export async function GET(
    _request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params
        const book = await getBook(id)

        if (!book) {
            return NextResponse.json({ error: "Book not found" }, { status: 404 })
        }

        return NextResponse.json(book)
    } catch (error) {
        console.error("API Error:", error)
        return NextResponse.json({ error: "Failed to fetch book" }, { status: 500 })
    }
}
