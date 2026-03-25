import { Navigate } from "react-router-dom"  // Componente de redirección declarativa
import { useAuth } from "@/contexts/AuthContext" // Contexto global de autenticación

/**
 * ProtectedRoute
 * Componente guardia que protege rutas de acceso no autorizado.
 * Envuelve cualquier página o componente que requiera autenticación y,
 * opcionalmente, un rol específico.
 *
 * Comportamiento:
 * Si la sesión está cargando  → muestra un indicador de carga.
 * Si no hay usuario autenticado → redirige a /login.
 * Si el usuario no tiene el rol requerido → redirige a / (inicio).
 * Si pasa todas las comprobaciones → renderiza el contenido hijo.
 */
export default function ProtectedRoute({ children, role }) {
  // `user` contiene los datos del usuario autenticado (null si no hay sesión)
  // `loading` indica que el contexto todavía está restaurando la sesión
  const { user, loading } = useAuth()

  // Mientras se restaura la sesión, se evita redirigir prematuramente
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl text-gray-600">Cargando...</p>
      </div>
    )
  }

  // Sin sesión activa: redirige al formulario de login
  if (!user) {
    return <Navigate to="/login" />
  }

  // Rol requerido no coincide con el del usuario: redirige a la página de inicio
  if (role && user.rol !== role) {
    return <Navigate to="/" />
  }

  // Acceso permitido: renderiza el contenido protegido
  return children
}
