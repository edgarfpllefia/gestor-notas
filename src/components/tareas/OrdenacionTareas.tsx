import { useState } from "react"

// OrdenacionTareas - Componente para ordenar tareas por diferentes criterios

export const OrdenacionTareas = ({ ordenActivo, onOrdenChange }) => {
  const handleCriterioChange = (criterio: any) => {
    onOrdenChange({
      ...ordenActivo,
      criterio,
    })
  }

  const handleDireccionChange = () => {
    onOrdenChange({
      ...ordenActivo,
      direccion: ordenActivo.direccion === "asc" ? "desc" : "asc",
    })
  }

  const obtenerNombreCriterio = (criterio: string) => {
    const criterios: Record<string, string> = {
      titulo: "Título (alfabético)",
      fechaCreacion: "Fecha de creación",
      fechaVencimiento: "Fecha de vencimiento",
      estado: "Estado",
      nota: "Nota",
    }
    return criterios[criterio] || criterio
  }

  const obtenerNombreDireccion = (direccion: string) => {
    return direccion === "asc" ? "Ascendente ↑" : "Descendente ↓"
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        {/* Selector de criterio */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <label className="font-semibold text-gray-700 min-w-fit">Ordenar por:</label>
          <select
            value={ordenActivo.criterio}
            onChange={(e) => handleCriterioChange(e.target.value)}
            className="border rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 flex-1 sm:flex-none"
          >
            <option value="titulo">Título (alfabético)</option>
            <option value="fechaCreacion">Fecha de creación</option>
            <option value="fechaVencimiento">Fecha de vencimiento</option>
            <option value="estado">Estado</option>
            <option value="nota">Nota</option>
          </select>
        </div>

        {/* Botón para cambiar dirección */}
        <button
          onClick={handleDireccionChange}
          className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors font-medium flex items-center gap-2"
          title={`Dirección actual: ${obtenerNombreDireccion(ordenActivo.direccion)}`}
        >
          {obtenerNombreDireccion(ordenActivo.direccion)}
        </button>

        {/* Indicador del orden actual */}
        <div className="text-sm text-gray-500">
          Actual: {obtenerNombreCriterio(ordenActivo.criterio)} {obtenerNombreDireccion(ordenActivo.direccion)}
        </div>
      </div>
    </div>
  )
}