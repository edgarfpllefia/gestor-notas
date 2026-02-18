import { useState } from "react"

export const FiltroTareas = ({ filtroActivo, onFiltroChange }) => {
  const [mostrarFechas, setMostrarFechas] = useState(false)

  const estados = [
    { value: "todos",       label: "Todos" },
    { value: "pendiente",   label: "Pendiente" },
    { value: "en-progreso", label: "En progreso" },
    { value: "completada",  label: "Completada" },
  ]

  const hayFiltrosActivos = filtroActivo.estado !== "todos" || filtroActivo.fechaInicio || filtroActivo.fechaFin

  const inputStyle = {
    backgroundColor: "var(--bg-surface)",
    border: "1px solid var(--border)",
    color: "var(--text-primary)",
  }

  return (
    <div style={{ backgroundColor: "var(--bg-surface)", border: "1px solid var(--border)" }}
      className="rounded-xl p-4 mb-4 flex flex-col gap-3">

      {/* Fila: label + botones estado + botón fecha */}
      <div className="flex flex-wrap items-center gap-2">
        <span style={{ color: "var(--text-secondary)" }} className="text-sm font-medium">
          Estado:
        </span>
        {estados.map((op) => (
          <button key={op.value}
            onClick={() => onFiltroChange({ ...filtroActivo, estado: op.value })}
            style={{
              backgroundColor: filtroActivo.estado === op.value ? "var(--accent)" : "var(--bg-surface-2)",
              border: "1px solid",
              borderColor: filtroActivo.estado === op.value ? "var(--accent)" : "var(--border)",
              color: filtroActivo.estado === op.value ? "white" : "var(--text-secondary)",
            }}
            className="px-3 py-1 rounded-md text-xs font-medium transition-colors">
            {op.label}
          </button>
        ))}

        {/* Botón fecha: en móvil ocupa su propia fila gracias a flex-wrap */}
        <button onClick={() => setMostrarFechas(!mostrarFechas)}
          style={{ border: "1px solid var(--border)", color: "var(--text-secondary)" }}
          className="px-3 py-1 rounded-md text-xs hover:text-white hover:border-white transition-colors">
          {mostrarFechas ? "Ocultar fechas" : "Filtrar por fecha"}
        </button>
      </div>

      {/* Filtros de fecha: apilados en móvil, en fila en tablet+ */}
      {mostrarFechas && (
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex items-center gap-2">
            <label style={{ color: "var(--text-secondary)" }} className="text-xs font-medium w-12">Desde:</label>
            <input type="date" value={filtroActivo.fechaInicio || ""}
              onChange={(e) => onFiltroChange({ ...filtroActivo, fechaInicio: e.target.value })}
              style={inputStyle}
              className="flex-1 rounded-md px-2 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div className="flex items-center gap-2">
            <label style={{ color: "var(--text-secondary)" }} className="text-xs font-medium w-12">Hasta:</label>
            <input type="date" value={filtroActivo.fechaFin || ""}
              onChange={(e) => onFiltroChange({ ...filtroActivo, fechaFin: e.target.value })}
              style={inputStyle}
              className="flex-1 rounded-md px-2 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
        </div>
      )}

      {hayFiltrosActivos && (
        <button
          onClick={() => { onFiltroChange({ estado: "todos", fechaInicio: undefined, fechaFin: undefined }); setMostrarFechas(false) }}
          style={{ color: "var(--text-secondary)", alignSelf: "flex-start" }}
          className="text-xs hover:text-white transition-colors underline">
          Limpiar filtros
        </button>
      )}
    </div>
  )
}
