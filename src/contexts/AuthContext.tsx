import { createContext, useContext, useState, useEffect } from "react"
import { authApi } from "@/api/auth"

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem("token")
    const storedUser = localStorage.getItem("user")
    if (token && storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setLoading(false)
  }, [])

  const login = async (email, password) => {
    try {
      setError(null)
      const data = await authApi.login(email, password)
      setUser(data.usuario)
      return true
    } catch (err) {
      setError(err.message || "Error al iniciar sesión")
      return false
    }
  }

  const logout = async () => {
    try {
      await authApi.logout()
    } catch (err) {
      console.error("Error al cerrar sesión:", err)
    } finally {
      setUser(null)
      localStorage.removeItem("token")
      localStorage.removeItem("user")
    }
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, error, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}