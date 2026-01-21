// TareaCard - Tarjeta para mostrar información de una tarea

export const TareaCard = ({ tarea, onEdit, onDelete }) => {
  
  // Función para formatear fechas
  const formatearFecha = (fechaString) => {
    if (!fechaString) return null
    const fecha = new Date(fechaString)
    return fecha.toLocaleDateString('es-ES', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  }

  // Función para obtener el color del badge según el estado
  const getEstadoColor = (estado) => {
    switch (estado) {
      case "completada":
        return "bg-green-100 text-green-800"
      case "en-progreso":
        return "bg-yellow-100 text-yellow-800"
      case "pendiente":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  // Función para obtener el texto del estado
  const getEstadoTexto = (estado) => {
    switch (estado) {
      case "completada":
        return "Completada"
      case "en-progreso":
        return "En Progreso"
      case "pendiente":
        return "Pendiente"
      default:
        return estado
    }
  }

  return (
    <div className="border rounded-lg p-4 shadow bg-white">
      {/* Header: Título y Estado */}
      <div className="flex justify-between items-start mb-3">
        <h3 className="font-bold text-lg flex-1">{tarea.titulo}</h3>
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getEstadoColor(tarea.estado)}`}>
          {getEstadoTexto(tarea.estado)}
        </span>
      </div>
      
      {/* Descripción */}
      <p className="text-sm text-gray-700 mb-3">{tarea.descripcion}</p>
      
      {/* Información de fechas */}
      <div className="text-xs text-gray-600 space-y-1 mb-3">
        <p>
          <span className="font-semibold">Creada:</span> {formatearFecha(tarea.fechaCreacion)}
        </p>
        {tarea.fechaVencimiento && (
          <p>
            <span className="font-semibold">Vence:</span> {formatearFecha(tarea.fechaVencimiento)}
          </p>
        )}
      </div>

      {/* Nota (si existe) */}
      {tarea.nota !== undefined && tarea.nota !== null && (
        <div className="mb-3 p-2 bg-blue-50 rounded">
          <p className="text-sm font-semibold text-blue-700">
            Nota: <span className="text-blue-600">{tarea.nota}</span>
          </p>
        </div>
      )}

      {/* Botones de acción */}
      <div className="flex gap-2 mt-4">
        <button
          onClick={() => onEdit(tarea)}
          className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium"
        >
          Editar
        </button>
        <button
          onClick={() => onDelete(tarea)}
          className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm font-medium"
        >
          Eliminar
        </button>
      </div>
    </div>
  )
}
