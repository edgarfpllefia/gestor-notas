import { Navigate } from "react-router-dom"
import { useAuth } from "@/contexts/AuthContext"
import { ReactNode } from "react"


//Props para el componente ProtectedRoute

 
interface Props {
  children: ReactNode;
  role?: "estudiante" | "admin"
}


// ProtectedRoute - Componente de ruta protegida
//
// Valida que el usuario esté autenticado antes de permitir el acceso.
// También verifica que el usuario tenga el rol requerido si se especifica.

export const ProtectedRoute = ({ children, role }: Props) => {
  // Hook para obtener el usuario actual del contexto
  const { user } = useAuth()

  // Si no hay usuario autenticado, redirigir al login
  if (!user) {
    return <Navigate to="/login" replace />
  }

  // Si se requiere un rol específico y el usuario no lo tiene, redirigir al home
  if (role && user.role !== role) {
    return <Navigate to="/" replace />
  }

  return children
}

