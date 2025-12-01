"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Gamepad2, AlertCircle, CheckCircle2 } from "lucide-react"
import { api } from "@/lib/axios"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function SignupPage() {
  useEffect(() => {
    const token = localStorage.getItem("token")

    if (token) {
      router.push("/")
    }
  }, [])

  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<{ name?: string; email?: string; password?: string; confirmPassword?: string }>(
    {},
  )
  const [touched, setTouched] = useState<{
    name?: boolean
    email?: boolean
    password?: boolean
    confirmPassword?: boolean
  }>({})
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")

  const validateName = (name: string) => {
    if (!name) return "Nome é obrigatório"
    if (name.length < 3) return "Nome deve ter no mínimo 3 caracteres"
    if (name.length > 40) return "Nome muito longo"
    return ""
  }

  const validateEmail = (email: string) => {
    if (!email) return "Email é obrigatório"
    if (email.length > 40) return "Email muito longo"
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) return "Email inválido"
    return ""
  }

  const validatePassword = (pass: string) => {
    if (!pass) return "Senha é obrigatória"
    if (pass.length < 6) return "Senha deve ter no mínimo 6 caracteres"
    if (pass.length > 40) return "Senha muito longa"
    return ""
  }

  const validateConfirmPassword = (confirmPass: string) => {
    if (!confirmPass) return "Confirme sua senha"
    if (confirmPass !== password) return "As senhas não coincidem"
    return ""
  }

  const getPasswordStrength = (pass: string) => {
    if (pass.length === 0) return { strength: 0, label: "", color: "" }
    if (pass.length < 6) return { strength: 1, label: "Fraca", color: "bg-destructive" }
    if (pass.length < 10) return { strength: 2, label: "Média", color: "bg-yellow-500" }
    return { strength: 3, label: "Forte", color: "bg-green-500" }
  }

  const handleBlur = (field: "name" | "email" | "password" | "confirmPassword", value: string) => {
    setTouched({ ...touched, [field]: true })
    let error = ""
    switch (field) {
      case "name":
        error = validateName(value)
        break
      case "email":
        error = validateEmail(value)
        break
      case "password":
        error = validatePassword(value)
        break
      case "confirmPassword":
        error = validateConfirmPassword(value)
        break
    }
    setErrors({ ...errors, [field]: error })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const newErrors = {
      name: validateName(name),
      email: validateEmail(email),
      password: validatePassword(password),
      confirmPassword: validateConfirmPassword(confirmPassword),
    }

    setTouched({ name: true, email: true, password: true, confirmPassword: true })
    setErrors(newErrors)

    if (Object.values(newErrors).some((error) => error)) return

    setIsLoading(true)

    try {
      const response = await api.post("/auth/register", {
        "nome": name,
        "email": email,
        "password": password
      })
      const { access_token, user } = response.data
      localStorage.setItem("token", access_token)
      console.log("chegeu aqui")
      router.push("/login")

    }
    catch (error: any) {
      console.log("entrei no erro")
      if (error.response?.status === 401) {
        setErrors((prev) => ({
          ...prev,
        }))
      } else {
        setErrors((prev) => ({
          ...prev,
          email: "Email já está em uso",
        }))
      }

    }
    finally {
      setIsLoading(false)
    }
  }

  const passwordStrength = getPasswordStrength(password)

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
            <CardTitle className="text-3xl font-bold">Criar conta</CardTitle>
            <CardDescription className="text-base">
              Cadastre-se para começar a avaliar seus jogos favoritos
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="space-y-4 px-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="name" className="font-medium">
                  Nome
                </Label>
                <span className="text-xs text-muted-foreground">{name.length}/40</span>
              </div>
              <Input
                id="name"
                name="name"
                type="text"
                maxLength={40}
                placeholder="Seu nome completo"
                className={`h-11 bg-secondary/50 border-border/50 focus:border-primary/50 focus:ring-primary/20 transition-colors ${touched.name && errors.name
                  ? "border-destructive focus:border-destructive focus:ring-destructive/20"
                  : ""
                  }`}
                value={name}
                onChange={(e) => setName(e.target.value.slice(0, 40))}
                onBlur={(e) => handleBlur("name", e.target.value)}
              />
              {touched.name && errors.name && (
                <p className="text-sm text-destructive flex items-center gap-1">
                  <AlertCircle className="h-3.5 w-3.5" />
                  {errors.name}
                </p>
              )}
            </div>

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
              />
              {touched.email && errors.email && (
                <p className="text-sm text-destructive flex items-center gap-1">
                  <AlertCircle className="h-3.5 w-3.5" />
                  {errors.email}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="password" className="font-medium">
                  Senha
                </Label>
                <span className="text-xs text-muted-foreground">{password.length}/40</span>
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
              />
              {password.length > 0 && (
                <div className="space-y-1.5">
                  <div className="flex gap-1">
                    {[1, 2, 3].map((level) => (
                      <div
                        key={level}
                        className={`h-1.5 flex-1 rounded-full transition-colors ${level <= passwordStrength.strength ? passwordStrength.color : "bg-muted"
                          }`}
                      />
                    ))}
                  </div>
                  {passwordStrength.label && (
                    <p className="text-xs text-muted-foreground">
                      Força da senha: <span className="font-medium">{passwordStrength.label}</span>
                    </p>
                  )}
                </div>
              )}
              {touched.password && errors.password && (
                <p className="text-sm text-destructive flex items-center gap-1">
                  <AlertCircle className="h-3.5 w-3.5" />
                  {errors.password}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="confirm-password" className="font-medium">
                  Confirmar senha
                </Label>
                <span className="text-xs text-muted-foreground">{confirmPassword.length}/40</span>
              </div>
              <Input
                id="confirm-password"
                name="confirm-password"
                type="password"
                maxLength={40}
                placeholder="••••••••"
                className={`h-11 bg-secondary/50 border-border/50 focus:border-primary/50 focus:ring-primary/20 transition-colors ${touched.confirmPassword && errors.confirmPassword
                  ? "border-destructive focus:border-destructive focus:ring-destructive/20"
                  : touched.confirmPassword && !errors.confirmPassword
                    ? "border-green-500 focus:border-green-500 focus:ring-green-500/20"
                    : ""
                  }`}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value.slice(0, 40))}
                onBlur={(e) => handleBlur("confirmPassword", e.target.value)}
              />
              {touched.confirmPassword && !errors.confirmPassword && (
                <p className="text-sm text-green-500 flex items-center gap-1">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  As senhas coincidem
                </p>
              )}
              {touched.confirmPassword && errors.confirmPassword && (
                <p className="text-sm text-destructive flex items-center gap-1">
                  <AlertCircle className="h-3.5 w-3.5" />
                  {errors.confirmPassword}
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
                  Criando conta...
                </>
              ) : (
                "Criar conta"
              )}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex flex-col space-y-4 pt-4 pb-8">
          <div className="text-sm text-center text-muted-foreground">
            Já tem uma conta?{" "}
            <Link href="/login" className="text-primary hover:text-primary/80 transition-colors font-semibold">
              Entrar
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
