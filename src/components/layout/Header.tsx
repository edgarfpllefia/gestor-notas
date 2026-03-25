import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "@/contexts/AuthContext"
import { useTheme } from "@/contexts/ThemeContext"
import { Sun, Moon, LogOut, Menu, X } from "lucide-react"

/**
 * Header
 * Cabecera global con navegación adaptada por rol y por tamaño de pantalla.
 * Incluye cambio de tema, acceso rápido a rutas y cierre de sesión.
 */
export const Header = () => {
  // Datos de sesión del usuario autenticado y acción de logout
  const { user, logout } = useAuth()
  // Estado visual del tema (claro/oscuro) y acción para alternarlo
  const { tema, toggleTema } = useTheme()
  const navigate = useNavigate()
  // Controla si el menú móvil está desplegado
  const [menuAbierto, setMenuAbierto] = useState(false)

  // Cierra sesión, redirige al inicio y repliega el menú móvil
  const handleLogout = () => {
    logout()
    navigate("/")
    setMenuAbierto(false)
  }

  // Utilidad para cerrar el menú móvil al navegar
  const cerrarMenu = () => setMenuAbierto(false)

  // Clases compartidas para enlaces de navegación en escritorio
  const navLinkClass = "hover:opacity-80 transition-opacity text-base font-medium"

  return (
    <header style={{ backgroundColor: "var(--bg-surface)", borderBottom: "1px solid var(--border)" }}
      className="px-5 md:px-8 py-4 flex justify-between items-center sticky top-0 z-40">

      {/* Logo */}
      <Link to="/" onClick={cerrarMenu}
        style={{ fontFamily: "Sora, sans-serif" }}
        className="text-xl font-bold tracking-tight hover:opacity-80 transition-opacity">
        <span style={{ color: "var(--text-primary)" }}>Gestor</span>
        <span style={{ color: "var(--accent)" }}>Tareas</span>
      </Link>

      {/* Nav desktop */}
      <nav className="hidden md:flex gap-5 items-center">
        {/* Enlace siempre visible */}
        <Link to="/" style={{ color: "var(--text-secondary)" }} className={navLinkClass}>
          Inicio
        </Link>

        {/* Enlaces para visitantes no autenticados */}
        {!user && (
          <>
            <Link to="/login" style={{ color: "var(--text-secondary)" }} className={navLinkClass}>
              Login
            </Link>
            <Link to="/register"
              style={{ backgroundColor: "var(--accent)" }}
              className="px-4 py-1.5 rounded-md text-white text-base font-medium hover:opacity-90 transition-opacity">
              Registro
            </Link>
          </>
        )}

        {/* Acceso al panel del estudiante */}
        {user?.rol === "estudiante" && (
          <Link to="/estudiante" style={{ color: "var(--text-secondary)" }} className={navLinkClass}>
            Mi panel
          </Link>
        )}

        {/* Acceso al panel de administración */}
        {user?.rol === "admin" && (
          <Link to="/admin" style={{ color: "var(--text-secondary)" }} className={navLinkClass}>
            Admin
          </Link>
        )}

        {/* Bloque de usuario autenticado: nombre + botón salir */}
        {user && (
          <>
            <span style={{
              backgroundColor: "var(--bg-surface-2)",
              border: "1px solid var(--border)",
              color: "var(--text-primary)",
            }} className="px-3 py-1.5 rounded-md text-base font-medium">
              {user.nombre}
            </span>
            <button onClick={handleLogout}
              style={{ backgroundColor: "var(--bg-surface-2)", border: "1px solid var(--border)", color: "var(--text-secondary)" }}
              className="flex items-center gap-2 px-3 py-1.5 rounded-md text-base font-medium hover:border-red-400 hover:text-red-400 transition-colors">
              <LogOut className="size-4" />
              Salir
            </button>
          </>
        )}

        {/* Toggle de tema en escritorio */}
        <button onClick={toggleTema}
          style={{ backgroundColor: "var(--bg-surface-2)", border: "1px solid var(--border)", color: "var(--text-secondary)" }}
          className="flex items-center justify-center p-2 rounded-md hover:border-white hover:text-white transition-colors"
          title={tema === "dark" ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}>
          {tema === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
        </button>
      </nav>

      {/* Botones móvil: tema + hamburguesa */}
      <div className="flex md:hidden items-center gap-2">
        {/* Toggle de tema en móvil */}
        <button onClick={toggleTema}
          style={{ backgroundColor: "var(--bg-surface-2)", border: "1px solid var(--border)", color: "var(--text-secondary)" }}
          className="flex items-center justify-center p-2 rounded-md">
          {tema === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
        </button>
        {/* Botón que abre/cierra el menú móvil */}
        <button onClick={() => setMenuAbierto(!menuAbierto)}
          style={{ backgroundColor: "var(--bg-surface-2)", border: "1px solid var(--border)", color: "var(--text-secondary)" }}
          className="flex items-center justify-center p-2 rounded-md">
          {menuAbierto ? <X className="size-4" /> : <Menu className="size-4" />}
        </button>
      </div>

      {/* Menú móvil desplegable */}
      {menuAbierto && (
        <div style={{ backgroundColor: "var(--bg-surface)", borderBottom: "1px solid var(--border)" }}
          className="absolute top-full left-0 right-0 flex flex-col md:hidden z-50">

          {/* Enlace siempre visible */}
          <Link to="/" onClick={cerrarMenu}
            style={{ color: "var(--text-secondary)", borderBottom: "1px solid var(--border)" }}
            className="px-6 py-4 text-base font-medium hover:opacity-80">
            Inicio
          </Link>

          {/* Enlaces para visitantes no autenticados */}
          {!user && (
            <>
              <Link to="/login" onClick={cerrarMenu}
                style={{ color: "var(--text-secondary)", borderBottom: "1px solid var(--border)" }}
                className="px-6 py-4 text-base font-medium hover:opacity-80">
                Login
              </Link>
              <Link to="/register" onClick={cerrarMenu}
                style={{ color: "var(--text-secondary)", borderBottom: "1px solid var(--border)" }}
                className="px-6 py-4 text-base font-medium hover:opacity-80">
                Registro
              </Link>
            </>
          )}

          {/* Acceso del estudiante autenticado */}
          {user?.rol === "estudiante" && (
            <Link to="/estudiante" onClick={cerrarMenu}
              style={{ color: "var(--text-secondary)", borderBottom: "1px solid var(--border)" }}
              className="px-6 py-4 text-base font-medium hover:opacity-80">
              Mi panel
            </Link>
          )}

          {/* Acceso del administrador autenticado */}
          {user?.rol === "admin" && (
            <Link to="/admin" onClick={cerrarMenu}
              style={{ color: "var(--text-secondary)", borderBottom: "1px solid var(--border)" }}
              className="px-6 py-4 text-base font-medium hover:opacity-80">
              Admin
            </Link>
          )}

          {/* Información y acción de sesión del usuario autenticado */}
          {user && (
            <>
              <div style={{ color: "var(--text-primary)", borderBottom: "1px solid var(--border)" }}
                className="px-6 py-4 text-base font-medium">
                {user.nombre}
              </div>
              <button onClick={handleLogout}
                style={{ color: "var(--text-secondary)" }}
                className="flex items-center gap-2 px-6 py-4 text-base font-medium hover:text-red-400 transition-colors text-left">
                <LogOut className="size-4" />
                Salir
              </button>
            </>
          )}

        </div>
      )}

    </header>
  )
}
