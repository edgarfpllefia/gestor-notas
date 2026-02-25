import { useState } from "react"
import { NotaEvaluacion } from "./NotaEvaluacion"
import { EstadoModuloSelector } from "./EstadoModuloSelector"
import { localStorageModuloEstudianteRepo } from "@/data/repositories/moduloEstudianteRepository"

export const GestionNotasModulo = ({ moduloEstudiante, onActualizar }) => {
  const [editando, setEditando] = useState(false)
  const [notasEditando, setNotasEditando] = useState(moduloEstudiante?.notas || {})
  const [estadoEditando, setEstadoEditando] = useState(moduloEstudiante?.estado || "cursando")

  const handleNotaChange = (nombre, valor) => {
    setNotasEditando(prev => ({ ...prev, [nombre]: valor === "" ? undefined : valor }))
  }

  const handleGuardar = () => {
    localStorageModuloEstudianteRepo.update(moduloEstudiante.id, { notas: notasEditando, estado: estadoEditando })
    if (onActualizar) onActualizar()
    setEditando(false)
  }

  const handleCancelar = () => {
    setNotasEditando(moduloEstudiante?.notas || {})
    setEstadoEditando(moduloEstudiante?.estado || "cursando")
    setEditando(false)
  }

  if (!moduloEstudiante) {
    return (
      <div style={{ backgroundColor: "var(--bg-surface)", border: "1px solid var(--border)" }}
        className="rounded-xl p-5 mb-5">
        <p style={{ color: "var(--text-secondary)" }} className="text-sm">
          No hay información de notas para este módulo.
        </p>
      </div>
    )
  }

  const evaluaciones = [
    { name: "trimestre1",     label: "Trimestre 1" },
    { name: "trimestre2",     label: "Trimestre 2" },
    { name: "trimestre3",     label: "Trimestre 3" },
    { name: "ordinaria",      label: "Ordinaria" },
    { name: "extraordinaria", label: "Extraordinaria" },
  ]

  return (
    <div style={{ backgroundColor: "var(--bg-surface)", border: "1px solid var(--border)" }}
      className="rounded-xl p-4 md:p-6 mb-5 md:mb-6 flex flex-col gap-4 md:gap-5">

      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 style={{ fontFamily: "Sora, sans-serif", color: "var(--text-primary)" }}
          className="text-lg md:text-xl font-bold">
          Notas del módulo
        </h2>
        {!editando && (
          <button onClick={() => setEditando(true)}
            style={{ border: "1px solid var(--border)", color: "var(--text-secondary)" }}
            className="px-3 md:px-4 py-1.5 rounded-md text-sm hover:text-white hover:border-white transition-colors">
            Editar notas
          </button>
        )}
      </div>

      <EstadoModuloSelector
        estado={editando ? estadoEditando : moduloEstudiante.estado}
        onChange={setEstadoEditando}
        disabled={!editando}
      />

      {/* Grid notas: 1 col móvil → 2 col tablet → 3 col PC */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {editando ? (
          evaluaciones.map(ev => (
            <NotaEvaluacion key={ev.name} label={ev.label} name={ev.name}
              value={notasEditando[ev.name]} onChange={handleNotaChange} />
          ))
        ) : (
          evaluaciones.map(ev => (
            <div key={ev.name}
              style={{ backgroundColor: "var(--bg-surface-2)", border: "1px solid var(--border)" }}
              className="rounded-lg px-4 py-3 flex justify-between items-center">
              <span style={{ color: "var(--text-secondary)" }} className="text-sm">
                {ev.label}
              </span>
              <span style={{ color: moduloEstudiante.notas[ev.name] !== undefined ? "var(--accent)" : "var(--text-secondary)" }}
                className="text-sm font-bold">
                {moduloEstudiante.notas[ev.name] ?? "—"}
              </span>
            </div>
          ))
        )}
      </div>

      {editando && (
        <div className="flex gap-3">
          <button onClick={handleGuardar}
            style={{ backgroundColor: "var(--accent)" }}
            className="px-5 py-2 rounded-md text-sm text-white hover:opacity-90 transition-opacity font-medium">
            Guardar
          </button>
          <button onClick={handleCancelar}
            style={{ border: "1px solid var(--border)", color: "var(--text-secondary)" }}
            className="px-5 py-2 rounded-md text-sm hover:text-white hover:border-white transition-colors">
            Cancelar
          </button>
        </div>
      )}
    </div>
  )
}
