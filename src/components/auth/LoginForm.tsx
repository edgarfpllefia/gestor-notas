// Importaciones necesarias de React, enrutador y contexto de autenticación
import { useState } from "react"
import { useNavigate } from "react-router-dom"   // Para redirigir tras el login
import { useAuth } from "@/contexts/AuthContext"  // Contexto global de autenticación

/**
 * LoginForm
 * Formulario de inicio de sesión.
 * Valida que los campos no estén vacíos, llama al método `login` del contexto
 * y redirige al panel correspondiente según el rol del usuario
 */
export function LoginForm() {
  // Valor del campo email
  const [email, setEmail] = useState("")
  // Valor del campo contraseña
  const [password, setPassword] = useState("")
  // Error de validación local (campos vacíos)
  const [formError, setFormError] = useState("")
  // `login` ejecuta la autenticación; `error` contiene el error devuelto por la API
  const { login, error } = useAuth()
  const navigate = useNavigate()

  /**
   * handleSubmit
   * Gestiona el envío del formulario:
   * Previene el comportamiento por defecto del navegador.
   * Valida que email y contraseña no estén vacíos.
   * Llama a `login` si tiene éxito, lee el rol almacenado y redirige.
   */
  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validación básica: ambos campos son obligatorios
    if (!email || !password) {
      setFormError("Todos los campos son obligatorios")
      return
    }

    setFormError("")  // Limpia errores previos antes de intentar el login
    const success = await login(email, password)

    if (success) {
      // Lee el usuario persistido en localStorage para determinar la redirección por rol
      const storedUser = JSON.parse(localStorage.getItem("user"))
      if (storedUser?.rol === "admin") {
        navigate("/admin")       // Panel de administración
      } else {
        navigate("/estudiante")  // Panel del estudiante
      }
    }
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      {/* Tarjeta contenedora del formulario */}
      <div style={{ backgroundColor: "var(--bg-surface)", border: "1px solid var(--border)" }}
        className="w-full max-w-md rounded-xl p-8 flex flex-col gap-6">

        {/* Encabezado con título y subtítulo */}
        <div className="flex flex-col gap-1">
          <h2 style={{ fontFamily: "Sora, sans-serif", color: "var(--text-primary)" }}
            className="text-2xl font-bold">
            Iniciar sesión
          </h2>
          <p style={{ color: "var(--text-secondary)" }} className="text-sm">
            Accede con tu cuenta del instituto
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          {/* Campo: Email del usuario */}
          <div className="flex flex-col gap-1">
            <label style={{ color: "var(--text-secondary)" }} className="text-sm font-medium">
              Email
            </label>
            <input
              type="email"
              placeholder="tu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                backgroundColor: "var(--bg-base)",
                border: "1px solid var(--border)",
                color: "var(--text-primary)",
              }}
              className="rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Campo: Contraseña del usuario */}
          <div className="flex flex-col gap-1">
            <label style={{ color: "var(--text-secondary)" }} className="text-sm font-medium">
              Contraseña
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                backgroundColor: "var(--bg-base)",
                border: "1px solid var(--border)",
                color: "var(--text-primary)",
              }}
              className="rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Mensaje de error: prioriza el error de validación local sobre el error de la API */}
          {(formError || error) && (
            <p className="text-red-400 text-sm">{formError || error}</p>
          )}

          {/* Botón de envío del formulario */}
          <button
            type="submit"
            style={{ backgroundColor: "var(--accent)" }}
            className="w-full py-2 rounded-md text-white font-medium hover:opacity-90 transition-opacity mt-2"
          >
            Entrar
          </button>

        </form>
      </div>
    </div>
  )
}