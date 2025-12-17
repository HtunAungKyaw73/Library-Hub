import { NextResponse } from "next/server"
import { getBooks } from "@/lib/baserow/client"

export async function GET() {
    try {
        const books = await getBooks()
        return NextResponse.json(books)
    } catch (error) {
        console.error("Get Books API error:", error)
        return NextResponse.json({ error: error?.toString() }, { status: 500 })
    }
}