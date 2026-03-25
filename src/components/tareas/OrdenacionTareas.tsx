/**
 * OrdenacionTareas
 * Controles de ordenación de tareas por criterio y dirección.
 * Delega la actualización del estado al componente padre.
 */
export const OrdenacionTareas = ({ ordenActivo, onOrdenChange }) => {
  // Criterios disponibles para ordenar la colección
  const criterios = [
    { value: "titulo", label: "Título" },
    { value: "fechaCreacion", label: "Fecha creación" },
    { value: "fechaVencimiento", label: "Fecha vencimiento" },
    { value: "estado", label: "Estado" },
    { value: "nota", label: "Nota" },
  ]

  const selectStyle = {
    backgroundColor: "var(--bg-surface)",
    border: "1px solid var(--border)",
    color: "var(--text-primary)",
  }

  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-4">
      <span style={{ color: "var(--text-secondary)" }} className="text-sm font-medium">
        Ordenar por:
      </span>

      <div className="flex gap-2 flex-1 sm:flex-none">
        <select value={ordenActivo.criterio}
          onChange={(e) => onOrdenChange({ ...ordenActivo, criterio: e.target.value })}
          style={selectStyle}
          className="flex-1 sm:flex-none rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
          {criterios.map(c => (
            <option key={c.value} value={c.value}>{c.label}</option>
          ))}
        </select>

        <button
          // Alterna entre ascendente y descendente conservando el criterio actual
          onClick={() => onOrdenChange({ ...ordenActivo, direccion: ordenActivo.direccion === "asc" ? "desc" : "asc" })}
          style={{ border: "1px solid var(--border)", color: "var(--text-secondary)" }}
          className="px-3 py-1.5 rounded-md text-sm hover:text-white hover:border-white transition-colors shrink-0">
          {ordenActivo.direccion === "asc" ? "↑ Asc" : "↓ Desc"}
        </button>
      </div>
    </div>
  )
}
