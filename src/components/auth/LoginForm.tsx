import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "@/contexts/AuthContext"

export function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [formError, setFormError] = useState("")
  const { login, error } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!email || !password) {
      setFormError("Tots els camps són obligatoris")
      return
    }

    const success = login(email, password)

    if (success) {
      navigate("/estudiante")
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto mt-10 p-6 bg-white shadow rounded space-y-4"
    >
      <h2 className="text-xl font-bold text-center">Iniciar Sessió</h2>

      <input
        type="email"
        placeholder="Email"
        className="w-full border p-2 rounded"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Contrasenya"
        className="w-full border p-2 rounded"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {(formError || error) && (
        <p className="text-red-500 text-sm">{formError || error}</p>
      )}

      <button
        type="submit"
        className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
      >
        Entrar
      </button>
    </form>
  )
}
