import { ModuloEstudianteCard } from "./ModuloEstudianteCard"  // Tarjeta individual con estado y nota media

/**
 * ModuloEstudianteList
 * Contenedor de la cuadrícula de módulos en la vista del estudiante.
 * Renderiza un ModuloEstudianteCard por cada módulo del array recibido.
 * Si el array está vacío (por filtros activos o sin datos), muestra un mensaje informativo.
 */
export const ModuloEstudianteList = ({ modulos }) => {
  // Estado vacío: ningún módulo cumple los criterios de filtrado actuales
  if (modulos.length === 0) {
    return (
      <p style={{ color: "var(--text-secondary)" }} className="text-center py-12 text-sm">
        No hay módulos que cumplan los criterios de filtrado.
      </p>
    )
  }

  // Grid responsivo: 1 columna en móvil, 2 en tablet, 3 en escritorio
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {modulos.map((modulo) => (
        // Pasa todas las props necesarias, incluidas estado y notas para la vista del estudiante
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
