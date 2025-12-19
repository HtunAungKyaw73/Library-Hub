import { NextResponse } from "next/server"
import { createUser, getUserByEmail } from "@/lib/baserow/client"

export async function POST(request: Request) {
    try {
        const { email, password, username } = await request.json()

        if (!email || !password || !username) {
            return NextResponse.json(
                { success: false, error: "Email, password and username are required" },
                { status: 400 }
            )
        }

        // Check if user already exists
        const existingUser = await getUserByEmail(email)
        if (existingUser) {
            return NextResponse.json(
                { success: false, error: "A user with this email already exists" },
                { status: 400 }
            )
        }

        // Create new user
        const user = await createUser({
            email,
            password,
            username,
        })

        if (!user) {
            return NextResponse.json(
                { success: false, error: "Failed to create user" },
                { status: 500 }
            )
        }

        return NextResponse.json({ success: true, user })
    } catch (error) {
        console.error("Sign-up API error:", error)
        return NextResponse.json(
            { success: false, error: "Internal server error" },
            { status: 500 }
        )
    }
}
