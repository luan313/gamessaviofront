"use server"

import { cookies } from "next/headers"
import { api } from "@/lib/axios"
import { redirect } from "next/navigation"


export async function loginAction(formData: FormData) {
    const email = formData.get("email")
    const password = formData.get("password")

    if (!email || !password) {
        return { error: "Email e senha são obrigatórios" }
    }

    try {
        const response = await api.post("/auth/login", {
            email,
            password,
        })

        const { access_token } = response.data

        if (access_token) {
            (await cookies()).set("token", access_token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                path: "/",
                maxAge: 60 * 60 * 24 * 7,
            })
            return { success: true, token: access_token }
        }

    } catch (error: any) {
        if (error?.response?.status === 401) {
            return { error: "Email ou senha inválidos" }
        }
        return { error: "Ocorreu um erro inesperado" }
    }

    return { error: "Falha no login" }
}

export async function logoutAction() {
    (await cookies()).delete("token")
    redirect("/login")
}
