import { removeToken } from "./token"

export const logout = () => {
    localStorage.clear()
    removeToken()
}