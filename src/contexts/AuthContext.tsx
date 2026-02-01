import { createContext, useContext, useState, useEffect } from "react"
import { localStorageUsuarioRepo } from "@/data/repositories/usuarioRepository"

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true) // ⭐ Estado de carga

  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setLoading(false) // ⭐ Termina la carga
  }, [])

  const login = (email, password) => {
    // Buscar usuario por email
    const foundUser = localStorageUsuarioRepo.getByEmail(email)

    if (!foundUser) {
      setError("Usuari no trobat")
      return false
    }

    // Verificar contraseña
    if (foundUser.password !== password) {
      setError("Contrasenya incorrecta")
      return false
    }

    // Crear sesión de usuario
    setUser(foundUser)
    localStorage.setItem("user", JSON.stringify(foundUser))
    setError(null)
    return true
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
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
