import { useNavigate } from "react-router-dom"

// ModuloEstudianteCard - Tarjeta para mostrar módulos del estudiante con estado y notas

export const ModuloEstudianteCard = ({ id, nombre, curso, codigo, horas, descripcion, estado, notas }) => {
  
  const navigate = useNavigate()
  
  // Función para navegar al detalle del módulo
  const handleClick = () => {
    navigate(`/estudiante/modulos/${id}/tareas`)
  }
  
  // Función para obtener el color del badge según el estado
  const getEstadoColor = (estado) => {
    switch (estado) {
      case "aprobado":
        return "bg-green-100 text-green-800"
      case "cursando":
        return "bg-blue-100 text-blue-800"
      case "pendiente":
        return "bg-yellow-100 text-yellow-800"
      case "no-cursa":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  // Función para obtener el texto del estado
  const getEstadoTexto = (estado) => {
    switch (estado) {
      case "aprobado":
        return "Aprobado"
      case "cursando":
        return "Cursando"
      case "pendiente":
        return "Pendiente"
      case "no-cursa":
        return "No Cursa"
      default:
        return estado
    }
  }

  // Calcular promedio de notas si existen
  const calcularPromedio = () => {
    if (!notas || Object.keys(notas).length === 0) return null
    
    const notasValidas = Object.values(notas).filter(nota => nota !== undefined && nota !== null)
    if (notasValidas.length === 0) return null
    
    const suma = notasValidas.reduce((acc, nota) => acc + nota, 0)
    return (suma / notasValidas.length).toFixed(2)
  }

  const promedio = calcularPromedio()

  return (
    <div 
      onClick={handleClick}
      className="border rounded-lg p-4 shadow hover:shadow-lg transition-shadow bg-white cursor-pointer hover:border-blue-400"
    >
      {/* Header: Nombre y Estado */}
      <div className="flex justify-between items-start mb-3">
        <h3 className="font-bold text-lg flex-1">{nombre}</h3>
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getEstadoColor(estado)}`}>
          {getEstadoTexto(estado)}
        </span>
      </div>
      
      {/* Curso */}
      <p className="text-sm text-gray-600 mb-2">
        Curso: {curso}º
      </p>
      
      {/* Información del módulo */}
      <div className="text-sm text-gray-700 space-y-1 mb-3">
        <p><span className="font-semibold">Código:</span> {codigo}</p>
        <p><span className="font-semibold">Horas:</span> {horas}h</p>
      </div>

      {/* Notas (si existen) */}
      {promedio && (
        <div className="mb-3 p-2 bg-gray-50 rounded">
          <p className="text-sm font-semibold text-gray-700">
            Nota media: <span className="text-blue-600">{promedio}</span>
          </p>
          <div className="text-xs text-gray-600 mt-1">
            {notas.trimestre1 && <span className="mr-2">T1: {notas.trimestre1}</span>}
            {notas.trimestre2 && <span className="mr-2">T2: {notas.trimestre2}</span>}
            {notas.trimestre3 && <span className="mr-2">T3: {notas.trimestre3}</span>}
          </div>
        </div>
      )}

      {/* Descripción */}
      <p className="text-sm text-gray-600 mt-2">{descripcion}</p>
    </div>
  )
}
