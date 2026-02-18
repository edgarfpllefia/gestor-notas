
// FiltroModulos - Componente para filtrar módulos por curso

export const FiltroModulos = ({ filtroActivo, onFiltroChange }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
      <div className="flex items-center gap-4">
        <label className="font-semibold text-gray-700">Filtrar por curso:</label>
        
        <select 
          value={filtroActivo}
          onChange={(e) => onFiltroChange(e.target.value)}
          className="border rounded-lg px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="todos">Todos los cursos</option>
          <option value="1">1º Curso</option>
          <option value="2">2º Curso</option>
        </select>
      </div>
    </div>
  )
}
