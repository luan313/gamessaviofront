"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Gamepad2, AlertCircle, Mail, CheckCircle2 } from "lucide-react"

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [emailSent, setEmailSent] = useState(false)
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")
  const [touched, setTouched] = useState(false)

  const validateEmail = (email: string) => {
    if (!email) return "Email é obrigatório"
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) return "Email inválido"
    return ""
  }

  const handleBlur = () => {
    setTouched(true)
    setError(validateEmail(email))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const emailError = validateEmail(email)

    setTouched(true)
    setError(emailError)

    if (emailError) return

    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsLoading(false)
    setEmailSent(true)
  }

  if (emailSent) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(96,165,250,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(96,165,250,0.05)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000,transparent)]" />

        <Card className="w-full max-w-md relative z-10 border-border/50 backdrop-blur-sm bg-card/95 shadow-2xl">
          <CardHeader className="space-y-3 text-center pb-6">
            <div className="flex justify-center mb-2">
              <div className="relative">
                <div className="absolute inset-0 bg-green-500/30 rounded-2xl blur-xl" />
                <div className="relative rounded-2xl bg-gradient-to-br from-green-500 to-green-600 p-4">
                  <CheckCircle2 className="h-10 w-10 text-white" strokeWidth={2.5} />
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <CardTitle className="text-2xl font-bold">Email enviado!</CardTitle>
              <CardDescription className="text-base leading-relaxed">
                Enviamos as instruções de recuperação para{" "}
                <span className="font-semibold text-foreground">{email}</span>
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent className="space-y-4 px-6">
            <div className="rounded-lg bg-primary/10 border border-primary/20 p-4 space-y-2">
              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <div className="space-y-1 text-sm">
                  <p className="font-medium text-foreground">Verifique sua caixa de entrada</p>
                  <p className="text-muted-foreground leading-relaxed">
                    O email pode levar alguns minutos para chegar. Não esqueça de verificar sua pasta de spam.
                  </p>
                </div>
              </div>
            </div>

            <Button
              onClick={() => {
                setEmailSent(false)
                setEmail("")
                setTouched(false)
                setError("")
              }}
              variant="outline"
              className="w-full h-11 border-border/50 hover:bg-secondary/50 transition-colors"
            >
              Enviar para outro email
            </Button>
          </CardContent>

          <CardFooter className="pt-4 pb-8">
            <Link
              href="/login"
              className="flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors w-full"
            >
              <ArrowLeft className="h-4 w-4" />
              Voltar para login
            </Link>
          </CardFooter>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(96,165,250,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(96,165,250,0.05)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000,transparent)]" />

      <Card className="w-full max-w-md relative z-10 border-border/50 backdrop-blur-sm bg-card/95 shadow-2xl">
        <CardHeader className="space-y-3 text-center pb-6">
          <div className="flex justify-center mb-2">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/30 rounded-2xl blur-xl" />
              <div className="relative rounded-2xl bg-gradient-to-br from-primary to-accent p-4">
                <Gamepad2 className="h-10 w-10 text-white" strokeWidth={2.5} />
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <CardTitle className="text-2xl font-bold">Recuperar senha</CardTitle>
            <CardDescription className="text-base leading-relaxed">
              Digite seu email e enviaremos instruções para redefinir sua senha
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="space-y-5 px-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="font-medium">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`h-11 bg-secondary/50 border-border/50 focus:border-primary/50 focus:ring-primary/20 transition-colors ${
                  touched && error ? "border-destructive focus:border-destructive focus:ring-destructive/20" : ""
                }`}
                onBlur={handleBlur}
              />
              {touched && error && (
                <p className="text-sm text-destructive flex items-center gap-1">
                  <AlertCircle className="h-3.5 w-3.5" />
                  {error}
                </p>
              )}
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-11 bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity shadow-lg shadow-primary/25 font-semibold disabled:opacity-50"
              size="lg"
            >
              {isLoading ? (
                <>
                  <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Enviando...
                </>
              ) : (
                "Enviar instruções"
              )}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="pt-4 pb-8">
          <Link
            href="/login"
            className="flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors w-full"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar para login
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}
