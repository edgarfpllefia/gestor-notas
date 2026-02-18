import { Pencil, Trash2 } from "lucide-react"

// Props:
// - modulos: array de módulos a mostrar
// - onEditar: función que recibe el módulo a editar
// - onEliminar: función que recibe el id del módulo a eliminar

export function ListaModulosAdmin({ modulos, onEditar, onEliminar }) {
  if (modulos.length === 0) {
    return (
      <p className="text-gray-500 text-sm text-center py-8">
        No hay módulos para este ciclo formativo.
      </p>
    )
  }

  return (
    <div className="flex flex-col gap-3">
      {modulos.map((modulo) => (
        <div
          key={modulo.id}
          className="flex items-center justify-between bg-white border rounded-lg px-4 py-3 shadow-sm"
        >
          {/* Info del módulo */}
          <div className="flex flex-col gap-1">
            <span className="font-medium text-gray-900">{modulo.nombre}</span>
            <span className="text-sm text-gray-500">
              {modulo.curso}º curso · {modulo.ciclo}
            </span>
          </div>

          {/* Botones */}
          <div className="flex gap-2">
            <button
              onClick={() => onEditar(modulo)}
              className="flex items-center gap-1 px-3 py-1.5 text-sm rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              <Pencil className="size-4" />
              Editar
            </button>
            <button
              onClick={() => onEliminar(modulo.id)}
              className="flex items-center gap-1 px-3 py-1.5 text-sm rounded-md border border-red-300 text-red-600 hover:bg-red-50"
            >
              <Trash2 className="size-4" />
              Eliminar
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
