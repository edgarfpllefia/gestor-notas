import { Link } from "react-router-dom"
import { useAuth } from "@/contexts/AuthContext"

//Header - Encabezado de la aplicación

export const Header = () => {
  // Hook para obtener el usuario actual y la función logout
  const { user, logout } = useAuth()

  return (
    <header className="bg-slate-800 text-white px-6 py-4 flex justify-between">

      <h1 className="font-bold text-lg">Gestor Tareas</h1>

      <nav className="flex gap-4 items-center">
        <Link to="/">Inicio</Link>

        {/* Enlaces de autenticación - visibles solo si no hay usuario */}
        {!user && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Registro</Link>
          </>
        )}

        {/* Enlace al dashboard del estudiante - visible solo para estudiantes */}
        {user?.role === "estudiante" && (
          <Link to="/estudiante">Estudiante</Link>
        )}

        {/* Enlace al dashboard del admin - visible solo para administradores */}
        {user?.role === "admin" && (
          <Link to="/admin">Admin</Link>
        )}

        {/* Botón de logout - visible solo cuando hay usuario autenticado */}
        {user && (
          <button onClick={logout} className="underline">
            Logout
          </button>
        )}
      </nav>
    </header>
  )
}
