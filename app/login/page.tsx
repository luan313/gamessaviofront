"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Gamepad2, Sparkles, AlertCircle } from "lucide-react"
import { api } from "@/lib/axios"
import { useRouter } from "next/navigation"
import { useEffect } from "react"


import { loginAction } from "@/app/actions/auth"

export default function LoginPage() {
  // Removed legacy useEffect checking localStorage to allow re-login and cookie sync

  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({})
  const [touched, setTouched] = useState<{ email?: boolean; password?: boolean }>({})

  const validateEmail = (email: string) => {
    if (!email) return "Email é obrigatório"
    if (email.length > 40) return "Email muito longo"
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) return "Email inválido"
    return ""
  }

  const validatePassword = (password: string) => {
    if (!password) return "Senha é obrigatória"
    if (password.length < 6) return "Senha deve ter no mínimo 6 caracteres"
    if (password.length > 40) return "Senha muito longa"
    return ""
  }

  const handleBlur = (field: "email" | "password", value: string) => {
    setTouched({ ...touched, [field]: true })
    const error = field === "email" ? validateEmail(value) : validatePassword(value)
    setErrors({ ...errors, [field]: error })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const emailError = validateEmail(email)
    const passwordError = validatePassword(password)

    setTouched({ email: true, password: true })
    setErrors({ email: emailError, password: passwordError })

    if (emailError || passwordError) return

    setIsLoading(true)

    const formData = new FormData()
    formData.append("email", email)
    formData.append("password", password)

    const result = await loginAction(formData)

    if (result?.error) {
      if (result.error.includes("inválidos")) {
        setErrors((prev) => ({
          ...prev,
          password: result.error,
        }))
      } else {
        setErrors((prev) => ({
          ...prev,
          email: result.error,
        }))
      }
      setIsLoading(false)
    } else if (result?.success && result?.token) {
      // Sync localStorage for client-side components (like Header)
      localStorage.setItem("token", result.token)
      router.push("/")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />

      <div className="absolute inset-0 bg-[linear-gradient(rgba(96,165,250,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(96,165,250,0.05)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000,transparent)]" />

      <Card className="w-full max-w-md relative z-10 border-border/50 backdrop-blur-sm bg-card/95 shadow-2xl">
        <CardHeader className="space-y-3 text-center pb-8">
          <div className="flex justify-center mb-2">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/30 rounded-2xl blur-xl" />
              <div className="relative rounded-2xl bg-gradient-to-br from-primary to-accent p-4">
                <Gamepad2 className="h-10 w-10 text-white" strokeWidth={2.5} />
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">
              Bem-vindo de volta
            </CardTitle>
            <CardDescription className="text-base">Entre para continuar sua jornada gamer</CardDescription>
          </div>
        </CardHeader>

        <CardContent className="space-y-5 px-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="email" className="font-medium">
                  Email
                </Label>
                <span className="text-xs text-muted-foreground">{email.length}/40</span>
              </div>
              <Input
                id="email"
                name="email"
                type="email"
                maxLength={40}
                placeholder="seu@email.com"
                className={`h-11 bg-secondary/50 border-border/50 focus:border-primary/50 focus:ring-primary/20 transition-colors ${touched.email && errors.email
                  ? "border-destructive focus:border-destructive focus:ring-destructive/20"
                  : ""
                  }`}
                value={email}
                onChange={(e) => setEmail(e.target.value.slice(0, 40))}
                onBlur={(e) => handleBlur("email", e.target.value)}
                aria-invalid={touched.email && !!errors.email}
                aria-describedby={errors.email ? "email-error" : undefined}
              />
              {touched.email && errors.email && (
                <p id="email-error" className="text-sm text-destructive flex items-center gap-1">
                  <AlertCircle className="h-3.5 w-3.5" />
                  {errors.email}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="font-medium">
                  Senha
                </Label>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-muted-foreground">{password.length}/40</span>
                  <Link
                    href="/forgot-password"
                    className="text-sm text-primary hover:text-primary/80 transition-colors font-medium"
                  >
                    Esqueceu?
                  </Link>
                </div>
              </div>
              <Input
                id="password"
                name="password"
                type="password"
                maxLength={40}
                placeholder="••••••••"
                className={`h-11 bg-secondary/50 border-border/50 focus:border-primary/50 focus:ring-primary/20 transition-colors ${touched.password && errors.password
                  ? "border-destructive focus:border-destructive focus:ring-destructive/20"
                  : ""
                  }`}
                value={password}
                onChange={(e) => setPassword(e.target.value.slice(0, 40))}
                onBlur={(e) => handleBlur("password", e.target.value)}
                aria-invalid={touched.password && !!errors.password}
                aria-describedby={errors.password ? "password-error" : undefined}
              />
              {touched.password && errors.password && (
                <p id="password-error" className="text-sm text-destructive flex items-center gap-1">
                  <AlertCircle className="h-3.5 w-3.5" />
                  {errors.password}
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
                  Entrando...
                </>
              ) : (
                <>
                  Entrar
                  <Sparkles className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border/50" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">ou</span>
            </div>
          </div>

          <Button
            variant="outline"
            className="w-full h-11 border-border/50 hover:bg-secondary/50 transition-colors bg-transparent"
            type="button"
            disabled={isLoading}
          >
            <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
            </svg>
            Continuar com Google
          </Button>
        </CardContent>

        <CardFooter className="flex flex-col space-y-4 pt-6 pb-8">
          <div className="text-sm text-center text-muted-foreground">
            Novo por aqui?{" "}
            <Link href="/signup" className="text-primary hover:text-primary/80 transition-colors font-semibold">
              Criar conta gratuita
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div >
  )
}
