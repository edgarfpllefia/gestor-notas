/**
 * OrdenacionModulos
 * Control de ordenación para la lista de módulos del estudiante.
 * Permite elegir el criterio por el que se ordenan los módulos: nombre, curso o estado.
 * La ordenación real se aplica en el componente padre que gestiona el estado.
 */
export const OrdenacionModulos = ({ criterioOrden, onOrdenChange }) => {
  return (
    <div className="flex items-center gap-3 mb-6">
      <span style={{ color: "var(--text-secondary)" }} className="text-sm font-medium">
        Ordenar por:
      </span>
      {/* Select nativo con los criterios de ordenación disponibles */}
      <select
        value={criterioOrden}
        onChange={(e) => onOrdenChange(e.target.value)}
        style={{
          backgroundColor: "var(--bg-surface)",
          border: "1px solid var(--border)",
          color: "var(--text-primary)",
        }}
        className="rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="nombre">Nombre</option>   {/* Orden alfabético por nombre */}
        <option value="curso">Curso</option>     {/* Agrupa por número de curso */}
        <option value="estado">Estado</option>   {/* Agrupa por estado académico */}
      </select>
    </div>
  )
}
