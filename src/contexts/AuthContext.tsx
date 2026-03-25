import { createContext, useContext, useState, useEffect } from "react"
import { authApi } from "@/api/auth"

// Contexto global de autenticación (sesión, errores y estado de carga)
const AuthContext = createContext()

/**
 * AuthProvider
 * Proveedor de autenticación para toda la app.
 * Expone usuario actual, login, logout, error y loading.
 */
export function AuthProvider({ children }) {
  // Usuario autenticado (null cuando no hay sesión)
  const [user, setUser] = useState(null)
  // Último error de autenticación para mostrar en formularios
  const [error, setError] = useState(null)
  // Indica si se está restaurando sesión al montar la app
  const [loading, setLoading] = useState(true)

  // Al iniciar, intenta restaurar sesión desde localStorage
  useEffect(() => {
    const token = localStorage.getItem("token")
    const storedUser = localStorage.getItem("user")
    if (token && storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setLoading(false)
  }, [])

  // Login contra API. Si tiene éxito, guarda el usuario en estado.
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

  // Logout en API y limpieza local de sesión aunque falle la petición
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

// Hook de conveniencia para consumir AuthContext
export function useAuth() {
  return useContext(AuthContext)
}