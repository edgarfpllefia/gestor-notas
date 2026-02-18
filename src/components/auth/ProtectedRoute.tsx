import { Navigate } from "react-router-dom"
import { useAuth } from "@/contexts/AuthContext"

export default function ProtectedRoute({ children, role }) {
  const { user, loading } = useAuth()

  // Mientras carga, no redirigir
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl text-gray-600">Cargando...</p>
      </div>
    )
  }

  // Si no hay usuario, redirigir al login
  if (!user) {
    return <Navigate to="/login" />
  }

  // Si se especifica un rol y el usuario no lo tiene, redirigir
  if (role && user.rol !== role) {
    return <Navigate to="/" />
  }

  return children
}
