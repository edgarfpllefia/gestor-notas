import { useState } from "react"
import { CICLOS_FORMATIVOS } from "@/data/constants"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function ModuloForm({ moduloInicial, onGuardar, onCancelar }) {
  const [nombre, setNombre] = useState(moduloInicial?.nombre || "")
  const [curso, setCurso] = useState(moduloInicial?.curso?.toString() || "")
  const [ciclo, setCiclo] = useState(moduloInicial?.ciclo || "")
  const [error, setError] = useState("")

  const modoEdicion = !!moduloInicial

  const handleGuardar = () => {
    if (!nombre.trim()) { setError("El nombre es obligatorio"); return }
    if (!curso) { setError("El curso es obligatorio"); return }
    if (!ciclo) { setError("El ciclo formativo es obligatorio"); return }
    setError("")
    onGuardar({ nombre: nombre.trim(), curso: parseInt(curso), ciclo })
  }

  const selectStyle = {
    backgroundColor: "var(--bg-base)",
    border: "1px solid var(--border)",
    color: "var(--text-primary)",
  }

  return (
    <div style={{ backgroundColor: "var(--bg-surface)", border: "1px solid var(--border)" }}
      className="rounded-xl p-5 md:p-6 flex flex-col gap-4">

      <h2 style={{ fontFamily: "Sora, sans-serif", color: "var(--text-primary)" }}
        className="text-lg font-semibold">
        {modoEdicion ? "Editar módulo" : "Nuevo módulo"}
      </h2>

      {/* Nombre */}
      <div className="flex flex-col gap-1">
        <label style={{ color: "var(--text-secondary)" }} className="text-sm font-medium">
          Nombre <span className="text-red-400">*</span>
        </label>
        <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)}
          placeholder="Ej: Bases de Datos"
          style={selectStyle}
          className="rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
      </div>

      {/* Curso */}
      <div className="flex flex-col gap-1">
        <label style={{ color: "var(--text-secondary)" }} className="text-sm font-medium">
          Curso <span className="text-red-400">*</span>
        </label>
        <Select value={curso} onValueChange={setCurso}>
          <SelectTrigger className="w-full" style={selectStyle}>
            <SelectValue placeholder="Selecciona curso" />
          </SelectTrigger>
          <SelectContent position="popper"
            style={{ backgroundColor: "var(--bg-surface)", border: "1px solid var(--border)" }}>
            <SelectItem value="1" style={{ color: "var(--text-primary)" }}>1º curso</SelectItem>
            <SelectItem value="2" style={{ color: "var(--text-primary)" }}>2º curso</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Ciclo */}
      <div className="flex flex-col gap-1">
        <label style={{ color: "var(--text-secondary)" }} className="text-sm font-medium">
          Ciclo formativo <span className="text-red-400">*</span>
        </label>
        <Select value={ciclo} onValueChange={setCiclo}>
          <SelectTrigger className="w-full" style={selectStyle}>
            <SelectValue placeholder="Selecciona ciclo" />
          </SelectTrigger>
          <SelectContent position="popper"
            style={{ backgroundColor: "var(--bg-surface)", border: "1px solid var(--border)" }}>
            {CICLOS_FORMATIVOS.map((c) => (
              <SelectItem key={c.id} value={c.id} style={{ color: "var(--text-primary)" }}>
                {c.id} - {c.nombre}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {error && <p className="text-sm text-red-400">{error}</p>}

      <div className="flex gap-3 justify-end">
        <button onClick={onCancelar}
          style={{ border: "1px solid var(--border)", color: "var(--text-secondary)" }}
          className="px-4 py-2 text-sm rounded-md hover:text-white hover:border-white transition-colors">
          Cancelar
        </button>
        <button onClick={handleGuardar}
          style={{ backgroundColor: "var(--accent)" }}
          className="px-4 py-2 text-sm rounded-md text-white hover:opacity-90 transition-opacity font-medium">
          {modoEdicion ? "Guardar cambios" : "Crear módulo"}
        </button>
      </div>
    </div>
  )
}
