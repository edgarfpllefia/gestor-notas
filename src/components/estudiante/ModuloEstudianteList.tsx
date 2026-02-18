import { ModuloEstudianteCard } from "./ModuloEstudianteCard"

export const ModuloEstudianteList = ({ modulos }) => {
  if (modulos.length === 0) {
    return (
      <p style={{ color: "var(--text-secondary)" }} className="text-center py-12 text-sm">
        No hay módulos que cumplan los criterios de filtrado.
      </p>
    )
  }

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
