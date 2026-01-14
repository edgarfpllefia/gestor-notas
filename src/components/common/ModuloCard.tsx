// ModuloCard - Tarjeta individual para mostrar información de un módulo

export const ModuloCard = ({ nombre, curso, codigo, horas, descripcion }) => {
  return (
    <div className="border rounded-lg p-4 shadow hover:shadow-lg transition-shadow">
      {/* Nombre del módulo */}
      <h3 className="font-bold text-lg mb-2">{nombre}</h3>
      
      {/* Curso */}
      <p className="text-sm text-gray-600 mb-2">
        Curso: {curso}º
      </p>
      
      {/* Información adicional */}
      <div className="text-sm text-gray-700 space-y-1">
        <p><span className="font-semibold">Código:</span> {codigo}</p>
        <p><span className="font-semibold">Horas:</span> {horas}h</p>
        <p className="mt-2 text-gray-600">{descripcion}</p>
      </div>
    </div>
  )
}
