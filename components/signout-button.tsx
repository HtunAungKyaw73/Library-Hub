"use client"

import { Button } from "@/components/ui/button"

export function SignOutButton() {
  const handleSignOut = async () => {
    await fetch("/api/auth/logout", { method: "POST" })
    window.location.href = "/auth/login"
  }

  return (
    <Button variant="outline" size="sm" onClick={handleSignOut}>
      Sign Out
    </Button>
  )
}
