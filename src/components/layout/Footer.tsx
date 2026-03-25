/**
 * Footer
 * Muestra la marca del proyecto y la información de autoría/curso.
 */
export const Footer = () => {
  return (
    <footer style={{ backgroundColor: "var(--bg-surface)", borderTop: "1px solid var(--border)" }}
      className="px-5 md:px-8 py-5 flex justify-between items-center text-sm">
      {/* Marca del proyecto */}
      <span style={{ fontFamily: "Sora, sans-serif", color: "var(--text-primary)" }}
        className="font-bold text-lg tracking-tight">
        Gestor<span style={{ color: "var(--accent)" }}>Tareas</span>
      </span>
      {/* Texto de crédito */}
      <span style={{ color: "var(--text-secondary)" }} className="text-xs md:text-sm">
        © 2026/27 Edgar & Arnau
      </span>
    </footer>
  )
}
