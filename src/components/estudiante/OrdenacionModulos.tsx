// OrdenacionModulos - Componente para ordenar módulos por diferentes criterios

export const OrdenacionModulos = ({ criterioOrden, onOrdenChange }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
      <div className="flex items-center gap-4">
        <label className="font-semibold text-gray-700">Ordenar por:</label>
        
        <select 
          value={criterioOrden}
          onChange={(e) => onOrdenChange(e.target.value)}
          className="border rounded-lg px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="nombre">Nombre</option>
          <option value="curso">Curso</option>
          <option value="estado">Estado</option>
        </select>
      </div>
    </div>
  )
}
