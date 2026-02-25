export const ModuloCard = ({ nombre, curso, codigo, horas, descripcion }) => {
  return (
    <div style={{
      backgroundColor: "var(--bg-surface)",
      border: "1px solid var(--border)",
      transition: "border-color 0.2s, transform 0.2s"
    }}
      className="rounded-xl p-5 flex flex-col gap-3 hover:scale-[1.02] group cursor-default"
      onMouseEnter={e => e.currentTarget.style.borderColor = "var(--accent)"}
      onMouseLeave={e => e.currentTarget.style.borderColor = "var(--border)"}
    >
      {/* Badge curso */}
      <span style={{
        backgroundColor: "var(--bg-surface-2)",
        color: "var(--accent)",
        border: "1px solid var(--border)",
        fontFamily: "DM Sans, sans-serif"
      }} className="self-start text-xs font-semibold px-2.5 py-0.5 rounded-full">
        {curso}º curso
      </span>

      {/* Nombre */}
      <h3 style={{ color: "var(--text-primary)", fontFamily: "Sora, sans-serif" }}
        className="font-semibold text-base leading-snug">
        {nombre}
      </h3>

      {/* Descripción */}
      {descripcion && (
        <p style={{ color: "var(--text-secondary)" }} className="text-sm leading-relaxed">
          {descripcion}
        </p>
      )}

      {/* Footer de la card */}
      <div style={{ borderTop: "1px solid var(--border)", color: "var(--text-secondary)" }}
        className="flex justify-between text-xs pt-3 mt-auto">
        <span>{codigo}</span>
        <span>{horas}h</span>
      </div>
    </div>
  )
}
