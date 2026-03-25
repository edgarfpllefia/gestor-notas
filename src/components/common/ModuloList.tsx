import { ModuloCard } from "./ModuloCard"  // Tarjeta individual de módulo (vista pública)

/**
 * ModuloList
 * Contenedor de la lista pública de módulos de un ciclo formativo.
 * Renderiza un grid responsivo de tarjetas ModuloCard.
 * Si el array está vacío, muestra un mensaje informativo en su lugar.
 */
export const ModuloList = ({ modulos }) => {
  // Estado vacío: no hay módulos en el ciclo seleccionado
  if (modulos.length === 0) {
    return (
      <p className="text-center text-gray-500 py-8">
        No hay módulos disponibles para este ciclo
      </p>
    )
  }

  // Grid responsivo: 1 columna en móvil, 2 en tablet, 3 en escritorio
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {modulos.map((modulo) => (
        // Cada tarjeta recibe solo las props que necesita para la vista pública
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
