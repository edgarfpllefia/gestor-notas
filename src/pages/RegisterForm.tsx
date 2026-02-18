import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { CICLOS_FORMATIVOS } from "@/data/constants"
import { localStorageUsuarioRepo } from "@/data/repositories/usuarioRepository"
import { localStorageModuloRepo } from "@/data/repositories/moduloRepository"
import { localStorageModuloEstudianteRepo } from "@/data/repositories/moduloEstudianteRepository"

export default function RegisterForm() {
  const navigate = useNavigate()

  const [form, setForm] = useState({
    nombre: "",
    email: "",
    password: "",
    confirmPassword: "",
    ciclo: ""
  })

  const [errors, setErrors] = useState({})
  const [success, setSuccess] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const validate = () => {
    const newErrors = {}

    if (!form.nombre.trim()) newErrors.nombre = "El nombre es obligatorio"

    if (!form.email.trim()) {
      newErrors.email = "El email es obligatorio"
    }

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

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return

    // Comprobar si el email ya existe
    const existe = localStorageUsuarioRepo.getByEmail(form.email)
    if (existe) {
      setErrors({ email: "El email ya está registrado" })
      return
    }

    // Crear el usuario
    const nuevoUsuario = localStorageUsuarioRepo.create({
      nombre: form.nombre.trim(),
      email: form.email.trim(),
      password: form.password,
      ciclo: form.ciclo,
      rol: "estudiante"
    })

    // Asignar todos los módulos del ciclo al nuevo estudiante
    const modulosCiclo = localStorageModuloRepo.getByCiclo(form.ciclo)
    modulosCiclo.forEach((modulo) => {
      localStorageModuloEstudianteRepo.create({
        estudianteId: nuevoUsuario.id,
        moduloId: modulo.id,
        fechaInscripcion: new Date().toISOString().split("T")[0],
        estado: "cursando",
        notas: {},
      })
    })

    setSuccess(true)
    setTimeout(() => {
      navigate("/login")
    }, 1500)
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-2xl shadow">
      <h1 className="text-2xl font-bold mb-6">Registro de Estudiante</h1>

      {success && (
        <p className="text-green-600 text-sm mb-4">
          Usuario creado correctamente. Redirigiendo al login...
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">

        <div>
          <label className="block text-sm font-medium mb-1">Nombre</label>
          <input
            type="text"
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
            className="w-full border rounded-md p-2"
          />
          {errors.nombre && <p className="text-red-500 text-sm">{errors.nombre}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full border rounded-md p-2"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Contraseña</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            className="w-full border rounded-md p-2"
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Confirmar contraseña</label>
          <input
            type="password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            className="w-full border rounded-md p-2"
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Ciclo formativo</label>
          <select
            name="ciclo"
            value={form.ciclo}
            onChange={handleChange}
            className="w-full border rounded-md p-2"
          >
            <option value="">-- Selecciona un ciclo --</option>
            {CICLOS_FORMATIVOS.map((c) => (
              <option key={c.id} value={c.id}>
                {c.id} - {c.nombre}
              </option>
            ))}
          </select>
          {errors.ciclo && <p className="text-red-500 text-sm">{errors.ciclo}</p>}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-medium py-2 rounded-md hover:bg-blue-700"
        >
          Registrarse
        </button>

      </form>
    </div>
  )
}
