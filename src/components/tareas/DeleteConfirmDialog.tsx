/**
 * DeleteConfirmDialog
 * Modal de confirmación para borrar una tarea.
 */
export const DeleteConfirmDialog = ({ isOpen, tarea, onConfirm, onCancel }) => {
  // Si el diálogo está cerrado, no se renderiza nada
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div style={{
        backgroundColor: "var(--bg-surface)",
        border: "1px solid var(--border)",
      }} className="rounded-xl p-6 max-w-sm w-full shadow-xl flex flex-col gap-4">

        <h3 style={{ fontFamily: "Sora, sans-serif", color: "var(--text-primary)" }}
          className="text-lg font-bold">
          Eliminar tarea
        </h3>

        <p style={{ color: "var(--text-secondary)" }} className="text-sm">
          {/* Se muestra el título para que el usuario confirme exactamente qué tarea elimina */}
          ¿Estás seguro de que quieres eliminar{" "}
          <span style={{ color: "var(--text-primary)" }} className="font-medium">
            "{tarea?.titulo}"
          </span>?
          Esta acción no se puede deshacer.
        </p>

        <div className="flex gap-3">
          <button onClick={onCancel}
            style={{ border: "1px solid var(--border)", color: "var(--text-secondary)" }}
            className="flex-1 py-2 rounded-md text-sm hover:text-white hover:border-white transition-colors">
            Cancelar
          </button>
          <button onClick={onConfirm}
            className="flex-1 py-2 rounded-md text-sm bg-red-600 text-white hover:bg-red-700 transition-colors">
            Eliminar
          </button>
        </div>
      </div>
    </div>
  )
}
