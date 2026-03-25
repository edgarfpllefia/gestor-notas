import { useNavigate } from "react-router-dom"  // Para navegar al detalle del módulo al hacer clic

/**
 * Mapa de configuración visual por estado del módulo.
 * Define el color de fondo y de texto del badge según el estado académico.
 */
const estadoConfig = {
  aprobado: { label: "Aprobado", bg: "#14532d", color: "#86efac" },
  cursando: { label: "Cursando", bg: "#1e3a5f", color: "#93c5fd" },
  pendiente: { label: "Pendiente", bg: "#78350f", color: "#fcd34d" },
  "no-cursa": { label: "No Cursa", bg: "#1f2937", color: "#9ca3af" },
}

/**
 * ModuloEstudianteCard
 * Tarjeta interactiva de un módulo en la vista del estudiante.
 * Muestra el estado académico, la nota media calculada y los datos básicos del módulo.
 * Al hacer clic navega a la página de tareas de ese módulo.
 */
export const ModuloEstudianteCard = ({ id, nombre, curso, codigo, horas, descripcion, estado, notas }) => {
  const navigate = useNavigate()

  // Obtiene la configuración visual del badge; si el estado es desconocido, usa "no-cursa"
  const cfg = estadoConfig[estado] || estadoConfig["no-cursa"]

  /**
   * calcularPromedio
   * Calcula la media aritmética de todas las notas disponibles del módulo.
   * Devuelve el valor con un decimal o null si no hay notas registradas.
   */
  const calcularPromedio = () => {
    if (!notas || Object.keys(notas).length === 0) return null
    // Filtra valores undefined/null para no distorsionar la media
    const valores = Object.values(notas).filter(n => n !== undefined && n !== null)
    if (valores.length === 0) return null
    return (valores.reduce((a, b) => a + b, 0) / valores.length).toFixed(1)
  }

  const promedio = calcularPromedio()

  return (
    <div
      // Al hacer clic navega a la página de tareas del módulo
      onClick={() => navigate(`/estudiante/modulos/${id}/tareas`)}
      style={{
        backgroundColor: "var(--bg-surface)",
        border: "1px solid var(--border)",
        transition: "border-color 0.2s, transform 0.2s",
        cursor: "pointer",
      }}
      className="rounded-xl p-5 flex flex-col gap-3 hover:scale-[1.02]"
      // Efecto hover: resalta el borde con el color de acento
      onMouseEnter={e => e.currentTarget.style.borderColor = "var(--accent)"}
      onMouseLeave={e => e.currentTarget.style.borderColor = "var(--border)"}
    >
      {/* Cabecera: nombre del módulo y badge de estado académico */}
      <div className="flex justify-between items-start gap-2">
        <h3 style={{ color: "var(--text-primary)", fontFamily: "Sora, sans-serif" }}
          className="font-semibold text-base leading-snug flex-1">
          {nombre}
        </h3>
        <span style={{ backgroundColor: cfg.bg, color: cfg.color }}
          className="text-xs font-semibold px-2.5 py-0.5 rounded-full shrink-0">
          {cfg.label}
        </span>
      </div>

      {/* Descripción del módulo (solo se renderiza si existe) */}
      {descripcion && (
        <p style={{ color: "var(--text-secondary)" }} className="text-sm leading-relaxed">
          {descripcion}
        </p>
      )}

      {/* Nota media calculada (solo se muestra si hay al menos una nota registrada) */}
      {promedio && (
        <div style={{ backgroundColor: "var(--bg-surface-2)", border: "1px solid var(--border)" }}
          className="rounded-md px-3 py-2 flex justify-between items-center">
          <span style={{ color: "var(--text-secondary)" }} className="text-xs">Nota media</span>
          <span style={{ color: "var(--accent)" }} className="text-sm font-bold">{promedio}</span>
        </div>
      )}

      {/* Pie de tarjeta: curso, código y horas */}
      <div style={{ borderTop: "1px solid var(--border)", color: "var(--text-secondary)" }}
        className="flex justify-between text-xs pt-3 mt-auto">
        <span>{curso}º curso · {codigo}</span>
        <span>{horas}h</span>
      </div>
    </div>
  )
}
