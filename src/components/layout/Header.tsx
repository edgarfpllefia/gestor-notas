import { Link } from "react-router-dom"
import { useAuth } from "@/contexts/AuthContext"

export const Header = () => {
  const { user, logout } = useAuth()

  return (
    <header className="bg-slate-800 text-white px-6 py-4 flex justify-between">
      <h1 className="font-bold text-lg">Gestor Tareas</h1>

      <nav className="flex gap-4 items-center">
        <Link to="/">Inicio</Link>

        {!user && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Registro</Link>
          </>
        )}

        {user?.role === "estudiante" && (
          <Link to="/estudiante">Estudiante</Link>
        )}

        {user?.role === "admin" && (
          <Link to="/admin">Admin</Link>
        )}

        {user && (
          <button onClick={logout} className="underline">
            Logout
          </button>
        )}
      </nav>
    </header>
  )
}
