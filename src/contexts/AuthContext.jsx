import { createContext, useContext, useState, useEffect } from "react"

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, []);

  const login = (email, password) => {
 
    const mockUsers = [
      { email: "alumne@test.com", password: "1234", name: "Alumne Test" }
    ]

    const foundUser = mockUsers.find(u => u.email === email)

    if (!foundUser) {
      setError("Usuari no trobat");
      return false
    }

    if (foundUser.password !== password) {
      setError("Contrasenya incorrecta")
      return false
    }

    setUser(foundUser)
    localStorage.setItem("user", JSON.stringify(foundUser));
    setError(null)
    return true
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, error }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
