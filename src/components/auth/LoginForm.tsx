import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "@/contexts/AuthContext"

export function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [formError, setFormError] = useState("")
  const { login, error } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!email || !password) {
      setFormError("Todos los campos son obligatorios")
      return
    }

    setFormError("")
    const success = await login(email, password)

    if (success) {
      const storedUser = JSON.parse(localStorage.getItem("user"))
      if (storedUser?.rol === "admin") {
        navigate("/admin")
      } else {
        navigate("/estudiante")
      }
    }
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div style={{ backgroundColor: "var(--bg-surface)", border: "1px solid var(--border)" }}
        className="w-full max-w-md rounded-xl p-8 flex flex-col gap-6">

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

          {(formError || error) && (
            <p className="text-red-400 text-sm">{formError || error}</p>
          )}

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