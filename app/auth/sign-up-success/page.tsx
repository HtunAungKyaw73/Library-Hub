import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Library } from "lucide-react"

export default function SignUpSuccessPage() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] w-full items-center justify-center p-6">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6">
          <div className="flex justify-center">
            <Library className="h-12 w-12 text-primary" />
          </div>
          <Card className="border-border">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-2">
                <CheckCircle className="h-12 w-12 text-primary" />
              </div>
              <CardTitle className="text-2xl text-foreground">Check Your Email</CardTitle>
              <CardDescription>We&apos;ve sent you a confirmation link</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground text-center">
                Please check your email inbox and click the confirmation link to activate your account. Once confirmed,
                you can sign in and start borrowing books.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
