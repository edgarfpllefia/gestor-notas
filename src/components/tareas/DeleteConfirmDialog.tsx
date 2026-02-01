// DeleteConfirmDialog - Diálogo de confirmación para eliminar tarea

export const DeleteConfirmDialog = ({ isOpen, tarea, onConfirm, onCancel }) => {
  
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-xl">
        {/* Título */}
        <h3 className="text-xl font-bold text-gray-900 mb-4">
          Confirmar eliminación
        </h3>
        
        {/* Mensaje */}
        <p className="text-gray-700 mb-2">
          ¿Estás seguro de que quieres eliminar la tarea:
        </p>
        <p className="font-semibold text-gray-900 mb-6">
          "{tarea?.titulo}"
        </p>
        
        <p className="text-sm text-red-600 mb-6">
          Esta acción no se puede deshacer.
        </p>

        {/* Botones */}
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  )
}
