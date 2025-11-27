import { api } from "@/lib/axios"
import { User } from "@/types/user"


export const UserService = {
    getUser: async (): Promise<User> => {
        const response = await api.get("/users/me")
        return response.data
    }
}