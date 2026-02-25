export const Footer = () => {
  return (
    <footer style={{ backgroundColor: "var(--bg-surface)", borderTop: "1px solid var(--border)" }}
      className="px-5 md:px-8 py-5 flex justify-between items-center text-sm">
      <span style={{ fontFamily: "Sora, sans-serif", color: "var(--text-primary)" }}
        className="font-bold text-lg tracking-tight">
        Gestor<span style={{ color: "var(--accent)" }}>Tareas</span>
      </span>
      <span style={{ color: "var(--text-secondary)" }} className="text-xs md:text-sm">
        © 2025 Edgar & Arnau
      </span>
    </footer>
  )
}
