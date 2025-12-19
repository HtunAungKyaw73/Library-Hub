"use client"

import { Button } from "@/components/ui/button"
import { useLogoutMutation } from "@/lib/redux/services/baserowApi"
import { useRouter } from "next/navigation"

export function SignOutButton() {

  const router = useRouter()
  const [logout] = useLogoutMutation()

  const handleSignOut = async () => {
    await logout();
    router.push("/auth/login")
  }

  return (
    <Button variant="outline" size="sm" onClick={handleSignOut}>
      Sign Out
    </Button>
  )
}
