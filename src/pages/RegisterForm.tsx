import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { CICLOS_FORMATIVOS } from "@/data/constants"
import { authApi } from "@/api/auth"

export default function RegisterForm() {
  const navigate = useNavigate()

  const [form, setForm] = useState({
    nombre: "",
    email: "",
    password: "",
    confirmPassword: "",
    ciclo: ""
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [success, setSuccess] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const validate = () => {
    const newErrors = {}
    if (!form.nombre.trim()) newErrors.nombre = "El nombre es obligatorio"
    if (!form.email.trim()) newErrors.email = "El email es obligatorio"
    if (!form.password) {
      newErrors.password = "La contraseña es obligatoria"
    } else if (form.password.length < 6) {
      newErrors.password = "Mínimo 6 caracteres"
    }
    if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = "Las contraseñas no coinciden"
    }
    if (!form.ciclo) newErrors.ciclo = "Selecciona un ciclo formativo"
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    try {
      await authApi.register({
        nombre: form.nombre.trim(),
        email: form.email.trim(),
        password: form.password,
        ciclo: form.ciclo
      })

      setSuccess(true)
      setTimeout(() => navigate("/login"), 1500)
    } catch (err: any) {
      setErrors({ email: err.message || "Error al registrar" })
    }
  }

  const inputStyle = {
    backgroundColor: "var(--bg-base)",
    border: "1px solid var(--border)",
    color: "var(--text-primary)",
  }

  const labelStyle = { color: "var(--text-secondary)" }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div style={{ backgroundColor: "var(--bg-surface)", border: "1px solid var(--border)" }}
        className="w-full max-w-md rounded-xl p-8 flex flex-col gap-6">

        <div className="flex flex-col gap-1">
          <h2 style={{ fontFamily: "Sora, sans-serif", color: "var(--text-primary)" }}
            className="text-2xl font-bold">
            Crear cuenta
          </h2>
          <p style={{ color: "var(--text-secondary)" }} className="text-sm">
            Regístrate como estudiante
          </p>
        </div>

        {success && (
          <p className="text-green-400 text-sm">
            Cuenta creada correctamente. Redirigiendo al login...
          </p>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          <div className="flex flex-col gap-1">
            <label style={labelStyle} className="text-sm font-medium">Nombre</label>
            <input type="text" name="nombre" value={form.nombre} onChange={handleChange}
              style={inputStyle} className="rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            {errors.nombre && <p className="text-red-400 text-xs">{errors.nombre}</p>}
          </div>

          <div className="flex flex-col gap-1">
            <label style={labelStyle} className="text-sm font-medium">Email</label>
            <input type="email" name="email" value={form.email} onChange={handleChange}
              style={inputStyle} className="rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            {errors.email && <p className="text-red-400 text-xs">{errors.email}</p>}
          </div>

          <div className="flex flex-col gap-1">
            <label style={labelStyle} className="text-sm font-medium">Contraseña</label>
            <input type="password" name="password" value={form.password} onChange={handleChange}
              style={inputStyle} className="rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            {errors.password && <p className="text-red-400 text-xs">{errors.password}</p>}
          </div>

          <div className="flex flex-col gap-1">
            <label style={labelStyle} className="text-sm font-medium">Confirmar contraseña</label>
            <input type="password" name="confirmPassword" value={form.confirmPassword} onChange={handleChange}
              style={inputStyle} className="rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            {errors.confirmPassword && <p className="text-red-400 text-xs">{errors.confirmPassword}</p>}
          </div>

          <div className="flex flex-col gap-1">
            <label style={labelStyle} className="text-sm font-medium">Ciclo formativo</label>
            <select name="ciclo" value={form.ciclo} onChange={handleChange}
              style={inputStyle} className="rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">-- Selecciona un ciclo --</option>
              {CICLOS_FORMATIVOS.map((c) => (
                <option key={c.id} value={c.id}>{c.id} - {c.nombre}</option>
              ))}
            </select>
            {errors.ciclo && <p className="text-red-400 text-xs">{errors.ciclo}</p>}
          </div>

          <button type="submit"
            style={{ backgroundColor: "var(--accent)" }}
            className="w-full py-2 rounded-md text-white font-medium hover:opacity-90 transition-opacity mt-2">
            Registrarse
          </button>

        </form>
      </div>
    </div>
  )
}