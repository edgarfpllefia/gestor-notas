/**
 * ModuloCard
 * Tarjeta de presentación de un módulo para usuarios no autenticados
 * (vista pública del catálogo de módulos).
 * Muestra el curso, nombre, descripción opcional, código y horas del módulo.
 * Al pasar el ratón resalta el borde con el color de acento.
 */
export const ModuloCard = ({ nombre, curso, codigo, horas, descripcion }) => {
  return (
    <div style={{
      backgroundColor: "var(--bg-surface)",
      border: "1px solid var(--border)",
      transition: "border-color 0.2s, transform 0.2s"
    }}
      className="rounded-xl p-5 flex flex-col gap-3 hover:scale-[1.02] group cursor-default"
      // Efecto hover: cambia el color del borde al acento al entrar y lo restaura al salir
      onMouseEnter={e => e.currentTarget.style.borderColor = "var(--accent)"}
      onMouseLeave={e => e.currentTarget.style.borderColor = "var(--border)"}
    >
      {/* Badge que indica el número de curso del módulo */}
      <span style={{
        backgroundColor: "var(--bg-surface-2)",
        color: "var(--accent)",
        border: "1px solid var(--border)",
        fontFamily: "DM Sans, sans-serif"
      }} className="self-start text-xs font-semibold px-2.5 py-0.5 rounded-full">
        {curso}º curso
      </span>

      {/* Título del módulo */}
      <h3 style={{ color: "var(--text-primary)", fontFamily: "Sora, sans-serif" }}
        className="font-semibold text-base leading-snug">
        {nombre}
      </h3>

      {/* Descripción del módulo (solo se renderiza si existe) */}
      {descripcion && (
        <p style={{ color: "var(--text-secondary)" }} className="text-sm leading-relaxed">
          {descripcion}
        </p>
      )}

      {/* Pie de tarjeta: código del módulo a la izquierda y horas a la derecha */}
      <div style={{ borderTop: "1px solid var(--border)", color: "var(--text-secondary)" }}
        className="flex justify-between text-xs pt-3 mt-auto">
        <span>{codigo}</span>
        <span>{horas}h</span>
      </div>
    </div>
  )
}
