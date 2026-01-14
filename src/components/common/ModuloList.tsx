import { ModuloCard } from "./ModuloCard"

// ModuloList - Lista de módulos que renderiza tarjetas

export const ModuloList = ({ modulos }) => {
  // Si no hay módulos, mostrar mensaje
  if (modulos.length === 0) {
    return (
      <p className="text-center text-gray-500 py-8">
        No hay módulos disponibles para este ciclo
      </p>
    )
  }

  // Renderizar grid de tarjetas
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {modulos.map((modulo) => (
        <ModuloCard
          key={modulo.id}
          nombre={modulo.nombre}
          curso={modulo.curso}
          codigo={modulo.codigo}
          horas={modulo.horas}
          descripcion={modulo.descripcion}
        />
      ))}
    </div>
  )
}
