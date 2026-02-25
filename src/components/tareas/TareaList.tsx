import { TareaCard } from "./TareaCard"

export const TareaList = ({ tareas, onEdit, onDelete, onEstadoChange }) => {
  if (tareas.length === 0) {
    return (
      <div className="text-center py-16">
        <p style={{ color: "var(--text-secondary)" }} className="text-lg mb-1">
          No hay tareas en este módulo
        </p>
        <p style={{ color: "var(--text-secondary)" }} className="text-sm opacity-60">
          ¡Crea tu primera tarea!
        </p>
      </div>
    )
  }

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
