import { useState } from "react"
import { CICLOS_FORMATIVOS } from "@/data/constants"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// Props:
// - moduloInicial: si se pasa, el formulario está en modo edición
// - onGuardar: función que recibe los datos del formulario
// - onCancelar: función para cerrar el formulario

export function ModuloForm({ moduloInicial, onGuardar, onCancelar }) {
  const [nombre, setNombre] = useState(moduloInicial?.nombre || "")
  const [curso, setCurso] = useState(moduloInicial?.curso?.toString() || "")
  const [ciclo, setCiclo] = useState(moduloInicial?.ciclo || "")
  const [error, setError] = useState("")

  const modoEdicion = !!moduloInicial

  const handleGuardar = () => {
    // Validar campos obligatorios
    if (!nombre.trim()) {
      setError("El nombre es obligatorio")
      return
    }
    if (!curso) {
      setError("El curso es obligatorio")
      return
    }
    if (!ciclo) {
      setError("El ciclo formativo es obligatorio")
      return
    }

    setError("")
    onGuardar({
      nombre: nombre.trim(),
      curso: parseInt(curso),
      ciclo,
    })
  }

  return (
    <div className="bg-white border rounded-lg p-6 shadow-sm">
      <h2 className="text-xl font-semibold mb-6">
        {modoEdicion ? "Editar módulo" : "Nuevo módulo"}
      </h2>

      <div className="flex flex-col gap-4">

        {/* Nombre */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">
            Nombre <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Ej: Bases de Datos"
            className="border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Curso */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">
            Curso <span className="text-red-500">*</span>
          </label>
          <Select value={curso} onValueChange={setCurso}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Selecciona curso" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1º curso</SelectItem>
              <SelectItem value="2">2º curso</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Ciclo formativo */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">
            Ciclo formativo <span className="text-red-500">*</span>
          </label>
          <Select value={ciclo} onValueChange={setCiclo}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Selecciona ciclo" />
            </SelectTrigger>
            <SelectContent>
              {CICLOS_FORMATIVOS.map((c) => (
                <SelectItem key={c.id} value={c.id}>
                  {c.id} - {c.nombre}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Error */}
        {error && (
          <p className="text-sm text-red-500">{error}</p>
        )}

        {/* Botones */}
        <div className="flex gap-3 justify-end mt-2">
          <button
            onClick={onCancelar}
            className="px-4 py-2 text-sm rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50"
          >
            Cancelar
          </button>
          <button
            onClick={handleGuardar}
            className="px-4 py-2 text-sm rounded-md bg-blue-600 text-white hover:bg-blue-700"
          >
            {modoEdicion ? "Guardar cambios" : "Crear módulo"}
          </button>
        </div>

      </div>
    </div>
  )
}
