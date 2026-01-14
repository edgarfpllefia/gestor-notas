import { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";


interface FormData {
  nombre: string;
  email: string;
  password: string;
  confirmPassword: string;
  ciclo: string;
}

interface FormErrors {
  nombre?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  ciclo?: string;
}

interface Ciclo {
  id: string;
  nombre: string;
  modulos: string[];
}

interface Usuario {
  id: string;
  nombre: string;
  email: string;
  password: string;
  ciclo: string;
  modulos: Modulo[];
}

interface Modulo {
  id: string;
  nombre: string;
  nota: number | null;
  estado: string;
}


const ciclos: Ciclo[] = [
  {
    id: "dam",
    nombre: "Desarrollo de Aplicaciones Multiplataforma",
    modulos: ["Programación", "Bases de Datos", "Sistemas", "Entornos"]
  },
  {
    id: "daw",
    nombre: "Desarrollo de Aplicaciones Web",
    modulos: ["DWEC", "DWES", "DIW", "Despliegue"]
  }
];


const getUsers = (): Usuario[] => {
  const info = localStorage.getItem("users")
  return info ? JSON.parse(info) : []
};

const saveUsers = (users: Usuario[]): void => {
  localStorage.setItem("users", JSON.stringify(users));
};

const generateId = (): string => crypto.randomUUID();

const hashPassword = (password: string): string => {
 
  return btoa(password)
};


export default function RegisterForm() {
  const navigate = useNavigate()

  const [form, setForm] = useState<FormData>({
    nombre: "",
    email: "",
    password: "",
    confirmPassword: "",
    ciclo: ""
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [success, setSuccess] = useState(false)

  const validarErrores = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  };

  const validate = (): boolean => {
    const newErrors: FormErrors = {}

    if (!form.nombre) newErrors.nombre = "El nombre es obligatorio"

    if (!form.email) {
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

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  const validar = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!validate()) return

    const users = getUsers()

    const exists = users.some((u) => u.email === form.email);
    if (exists) {
      setErrors({ email: "El email ya está registrado" });
      return
    }

    const cicloSeleccionado = ciclos.find((c) => c.id === form.ciclo);
    
    if (!cicloSeleccionado) {
      setErrors({ ciclo: "Ciclo no válido" })
      return
    }

    const modulosEstudiante: Modulo[] = cicloSeleccionado.modulos.map((mod) => ({
      id: generateId(),
      nombre: mod,
      nota: null,
      estado: "pendiente"
    }))

    const newUser: Usuario = {
      id: generateId(),
      nombre: form.nombre,
      email: form.email,
      password: hashPassword(form.password),
      ciclo: cicloSeleccionado.id,
      modulos: modulosEstudiante
    }

    users.push(newUser);
    saveUsers(users);

    setSuccess(true);

    setTimeout(() => {
      navigate("/login")
    }, 1500)
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-2xl shadow">
      <h1 className="text-2xl font-bold mb-6">Registro de Estudiante</h1>

      <form onSubmit={validar} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Nombre</label>
          <input
            type="text"
            name="nombre"
            value={form.nombre}
            onChange={validarErrores}
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
            onChange={validarErrores}
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
            onChange={validarErrores}
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
            onChange={validarErrores}
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
            onChange={validarErrores}
            className="w-full border rounded-md p-2"
          >
            <option value="">-- Selecciona un ciclo --</option>
            {ciclos.map((c) => (
              <option key={c.id} value={c.id}>
                {c.nombre}
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

