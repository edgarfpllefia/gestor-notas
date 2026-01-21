import { ModuloEstudianteCard } from "./ModuloEstudianteCard"

// ModuloEstudianteList - Lista de módulos del estudiante

export const ModuloEstudianteList = ({ modulos }) => {
  // Si no hay módulos, mostrar mensaje
  if (modulos.length === 0) {
    return (
      <p className="text-center text-gray-500 py-8">
        No hay módulos que cumplan los criterios de filtrado
      </p>
    )
  }

  // Renderizar grid de tarjetas
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {modulos.map((modulo) => (
        <ModuloEstudianteCard
          key={modulo.id}
          id={modulo.id}
          nombre={modulo.nombre}
          curso={modulo.curso}
          codigo={modulo.codigo}
          horas={modulo.horas}
          descripcion={modulo.descripcion}
          estado={modulo.estado}
          notas={modulo.notas}
        />
      ))}
    </div>
  )
}
