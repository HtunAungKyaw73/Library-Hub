"use client"

import { useRef } from "react"
import { Provider } from "react-redux"
import { makeStore, AppStore } from "./store"
import { setCredentials } from "./slices/authSlice"
import { SessionUser } from "../baserow/types"

export default function ReduxProvider({
    children,
    user,
}: {
    children: React.ReactNode
    user: SessionUser | null
}) {
    const storeRef = useRef<AppStore | null>(null)
    if (!storeRef.current) {
        // Create the store instance the first time this renders
        storeRef.current = makeStore()

        // Hydrate the store with the initial user session
        if (user) {
            storeRef.current.dispatch(setCredentials({ user }))
        }
    }

    return <Provider store={storeRef.current}>{children}</Provider>
}
