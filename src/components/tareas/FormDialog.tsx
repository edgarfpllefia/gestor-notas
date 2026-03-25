/**
 * FormDialog
 * Modal genérico para envolver formularios de tareas (crear/editar).
 * Renderiza título, botón de cierre y contenido inyectado por `children`.
 */
export const FormDialog = ({ isOpen, title, children, onClose }) => {
  // Si no está abierto, no se monta el modal
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div style={{
        backgroundColor: "var(--bg-surface)",
        border: "1px solid var(--border)",
      }} className="rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-xl">

        <div className="flex justify-between items-center mb-6">
          <h2 style={{ fontFamily: "Sora, sans-serif", color: "var(--text-primary)" }}
            className="text-xl font-bold">
            {title}
          </h2>
          <button onClick={onClose}
            style={{ color: "var(--text-secondary)" }}
            className="text-2xl leading-none hover:text-white transition-colors">
            ×
          </button>
        </div>

        {/* Contenido del formulario recibido desde el componente padre */}
        {children}
      </div>
    </div>
  )
}
