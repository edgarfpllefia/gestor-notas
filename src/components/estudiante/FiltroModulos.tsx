/**
 * FiltroModulos
 * Barra de filtros de tipo "pill" para la vista de módulos del estudiante.
 * Permite filtrar los módulos por curso: todos, 1º o 2º.
 * El botón activo se resalta visualmente con el color de acento.
 */
export const FiltroModulos = ({ filtroActivo, onFiltroChange }) => {
  // Opciones disponibles para el filtro de curso
  const opciones = [
    { value: "todos", label: "Todos" },
    { value: "1", label: "1º Curso" },
    { value: "2", label: "2º Curso" },
  ]

  return (
    <div className="flex gap-2 mb-6">
      {opciones.map((op) => (
        // Cada botón aplica estilos distintos según si está activo o inactivo
        <button
          key={op.value}
          onClick={() => onFiltroChange(op.value)}
          style={{
            backgroundColor: filtroActivo === op.value ? "var(--accent)" : "var(--bg-surface)",
            border: "1px solid",
            borderColor: filtroActivo === op.value ? "var(--accent)" : "var(--border)",
            color: filtroActivo === op.value ? "white" : "var(--text-secondary)",
          }}
          className="px-4 py-1.5 rounded-md text-sm font-medium transition-colors hover:opacity-90"
        >
          {op.label}
        </button>
      ))}
    </div>
  )
}
