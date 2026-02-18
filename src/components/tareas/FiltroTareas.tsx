import { useState } from "react"

// FiltroTareas - Componente para filtrar tareas por estado y fecha

export const FiltroTareas = ({ filtroActivo, onFiltroChange }) => {
  const [mostrarFechas, setMostrarFechas] = useState(false)

  const handleEstadoChange = (estado: any) => {
    onFiltroChange({
      ...filtroActivo,
      estado,
    })
  }

  const handleFechaInicioChange = (fecha: string) => {
    onFiltroChange({
      ...filtroActivo,
      fechaInicio: fecha,
    })
  }

  const handleFechaFinChange = (fecha: string) => {
    onFiltroChange({
      ...filtroActivo,
      fechaFin: fecha,
    })
  }

  const handleLimpiarFiltros = () => {
    onFiltroChange({
      estado: "todos",
      fechaInicio: undefined,
      fechaFin: undefined,
    })
    setMostrarFechas(false)
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
      <div className="flex flex-col gap-4">
        {/* Filtro por estado */}
        <div className="flex items-center gap-4">
          <label className="font-semibold text-gray-700 min-w-fit">Filtrar por estado:</label>
          <select
            value={filtroActivo.estado || "todos"}
            onChange={(e) => handleEstadoChange(e.target.value)}
            className="border rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="todos">Todos los estados</option>
            <option value="pendiente">Pendiente</option>
            <option value="en-progreso">En progreso</option>
            <option value="completada">Completada</option>
          </select>
        </div>

        {/* Filtro por fecha */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setMostrarFechas(!mostrarFechas)}
            className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors font-medium"
          >
            {mostrarFechas ? "Ocultar filtro de fecha" : "Mostrar filtro de fecha"}
          </button>

          {mostrarFechas && (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium text-gray-700">Desde:</label>
                <input
                  type="date"
                  value={filtroActivo.fechaInicio || ""}
                  onChange={(e) => handleFechaInicioChange(e.target.value)}
                  className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex items-center gap-2">
                <label className="text-sm font-medium text-gray-700">Hasta:</label>
                <input
                  type="date"
                  value={filtroActivo.fechaFin || ""}
                  onChange={(e) => handleFechaFinChange(e.target.value)}
                  className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          )}
        </div>

        {/* Botón para limpiar filtros */}
        {(filtroActivo.estado !== "todos" ||
          filtroActivo.fechaInicio ||
          filtroActivo.fechaFin) && (
          <button
            onClick={handleLimpiarFiltros}
            className="self-start px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
          >
            Limpiar filtros
          </button>
        )}
      </div>
    </div>
  )
}
