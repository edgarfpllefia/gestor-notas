import { TareaCard } from "./TareaCard"

// TareaList - Lista de tareas

export const TareaList = ({ tareas, onEdit, onDelete, onEstadoChange }) => {
  
  // Si no hay tareas, mostrar mensaje
  if (tareas.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg mb-2">No hay tareas en este módulo</p>
        <p className="text-gray-400 text-sm">¡Crea tu primera tarea!</p>
      </div>
    )
  }

  // Renderizar grid de tarjetas
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {tareas.map((tarea) => (
        <TareaCard
          key={tarea.id}
          tarea={tarea}
          onEdit={onEdit}
          onDelete={onDelete}
          onEstadoChange={onEstadoChange}
        />
      ))}
    </div>
  )
}
