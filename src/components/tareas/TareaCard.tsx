import { EstadoSelector } from "./EstadoSelector"

// Configuración visual del badge por estado de tarea
const estadoConfig = {
  completada: { label: "Completada", bg: "#14532d", color: "#86efac" },
  "en-progreso": { label: "En progreso", bg: "#78350f", color: "#fcd34d" },
  pendiente: { label: "Pendiente", bg: "#1f2937", color: "#9ca3af" },
}

/**
 * TareaCard
 * Tarjeta de una tarea individual con datos principales, estado editable, acciones de editar y eliminar.
 */
export const TareaCard = ({ tarea, onEdit, onDelete, onEstadoChange }) => {
  // Formatea fechas a español para mejorar legibilidad en UI
  const formatearFecha = (fechaString) => {
    if (!fechaString) return null
    return new Date(fechaString).toLocaleDateString("es-ES", {
      year: "numeric", month: "long", day: "numeric"
    })
  }

  // Si llega un estado inesperado, usa "pendiente" como fallback visual
  const cfg = estadoConfig[tarea.estado] || estadoConfig.pendiente

  return (
    <div style={{
      backgroundColor: "var(--bg-surface)",
      border: "1px solid var(--border)",
    }} className="rounded-xl p-5 flex flex-col gap-3 h-full">

      {/* Header */}
      <div className="flex justify-between items-start gap-2">
        <h3 style={{ color: "var(--text-primary)", fontFamily: "Sora, sans-serif" }}
          className="font-semibold text-base leading-snug flex-1">
          {tarea.titulo}
        </h3>
        <span style={{ backgroundColor: cfg.bg, color: cfg.color }}
          className="text-xs font-semibold px-2.5 py-0.5 rounded-full shrink-0">
          {cfg.label}
        </span>
      </div>

      {/* Descripción */}
      <p style={{ color: "var(--text-secondary)" }} className="text-sm leading-relaxed flex-1">
        {tarea.descripcion}
      </p>

      {/* Fechas */}
      <div style={{ color: "var(--text-secondary)" }} className="text-xs flex flex-col gap-1">
        <span>Creada: {formatearFecha(tarea.fechaCreacion)}</span>
        {tarea.fechaVencimiento && (
          <span>Vence: {formatearFecha(tarea.fechaVencimiento)}</span>
        )}
      </div>

      {/* Nota */}
      {tarea.nota !== undefined && tarea.nota !== null && (
        <div style={{ backgroundColor: "var(--bg-surface-2)", border: "1px solid var(--border)" }}
          className="rounded-md px-3 py-2 flex justify-between items-center">
          <span style={{ color: "var(--text-secondary)" }} className="text-xs">Nota</span>
          <span style={{ color: "var(--accent)" }} className="text-sm font-bold">{tarea.nota}</span>
        </div>
      )}

      {/* Selector de estado */}
      <EstadoSelector
        tareaId={tarea.id}
        estadoActual={tarea.estado}
        // Propaga cambios de estado al contenedor superior
        onEstadoChange={onEstadoChange}
      />

      {/* Botones */}
      <div style={{ borderTop: "1px solid var(--border)" }} className="flex gap-2 pt-3">
        <button onClick={() => onEdit(tarea)}
          style={{ border: "1px solid var(--border)", color: "var(--text-secondary)" }}
          className="flex-1 py-1.5 rounded-md text-sm hover:text-white hover:border-white transition-colors">
          Editar
        </button>
        <button onClick={() => onDelete(tarea)}
          style={{ border: "1px solid #7f1d1d", color: "#f87171" }}
          className="flex-1 py-1.5 rounded-md text-sm hover:bg-red-900/20 transition-colors">
          Eliminar
        </button>
      </div>
    </div>
  )
}
