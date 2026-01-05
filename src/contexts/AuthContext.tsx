import { createContext, useContext, useState, ReactNode } from "react"

export type UserRole = "estudiante" | "admin"


export interface User {
  id: string
  name: string
  role: UserRole
}

interface AuthContextType {
  user: User | null
  login: (user: User) => void
  logout: () => void
}

// Crear el contexto de autenticación
const AuthContext = createContext<AuthContextType | undefined>(undefined);


//AuthProvider - Proveedor de contexto de autenticación

//Componente que envuelve la aplicación y proporciona el estado de autenticación
//a todos los componentes hijos. Mantiene el estado del usuario autenticado.

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  
  const [user, setUser] = useState<User | null>(null)

  
  //Función para autenticar un usuario
  //Actualiza el estado con los datos del usuario proporcionado
  const login = (userData: User) => {
    setUser(userData)
  }


  //Función para cerrar la sesión del usuario actual
  //Limpia el estado del usuario
  
  const logout = () => {
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}


//Hook personalizado para acceder al contexto de autenticación

export const useAuth = () => {
  const context = useContext(AuthContext)
  // Validar que el hook se use dentro del proveedor
  if (!context) {
    throw new Error("useAuth debe usarse dentro de AuthProvider")
  }
  return context
}
