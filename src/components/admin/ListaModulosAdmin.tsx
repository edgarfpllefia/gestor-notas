// Iconos de acción de la fila: lápiz para editar, papelera para eliminar
import { Pencil, Trash2 } from "lucide-react"

/**
 * ListaModulosAdmin
 * Muestra la lista de módulos de un ciclo formativo en forma de tarjetas.
 * Cada tarjeta expone el nombre y el curso del módulo, junto con los botones
 * de edición y eliminación que delegan la acción al componente padre.
 */
export function ListaModulosAdmin({ modulos, onEditar, onEliminar }) {
  // Estado vacío: mensaje informativo cuando no hay módulos en el ciclo
  if (modulos.length === 0) {
    return (
      <p style={{ color: "var(--text-secondary)" }} className="text-sm text-center py-8">
        No hay módulos para este ciclo formativo.
      </p>
    )
  }

  return (
    <div className="flex flex-col gap-3">
      {/* Itera sobre cada módulo y renderiza una tarjeta */}
      {modulos.map((modulo) => (
        <div key={modulo.id}
          style={{ backgroundColor: "var(--bg-surface)", border: "1px solid var(--border)" }}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 rounded-xl px-4 py-4">

          {/* Info: nombre del módulo y curso al que pertenece */}
          <div className="flex flex-col gap-0.5">
            <span style={{ color: "var(--text-primary)" }} className="font-medium text-sm">
              {modulo.nombre}
            </span>
            <span style={{ color: "var(--text-secondary)" }} className="text-xs">
              {modulo.curso}º curso · {modulo.ciclo}
            </span>
          </div>

          {/* Acciones: editar y eliminar el módulo */}
          <div className="flex gap-2 sm:shrink-0">
            {/* Botón editar: pasa el objeto completo para que el padre precargue el formulario */}
            <button onClick={() => onEditar(modulo)}
              style={{ border: "1px solid var(--border)", color: "var(--text-secondary)" }}
              className="flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-md hover:text-white hover:border-white transition-colors flex-1 sm:flex-none justify-center">
              <Pencil className="size-3.5" />
              Editar
            </button>
            {/* Botón eliminar: pasa solo el id para que el padre abra el modal de confirmación */}
            <button onClick={() => onEliminar(modulo.id)}
              style={{ border: "1px solid #7f1d1d", color: "#f87171" }}
              className="flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-md hover:bg-red-900/20 transition-colors flex-1 sm:flex-none justify-center">
              <Trash2 className="size-3.5" />
              Eliminar
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
