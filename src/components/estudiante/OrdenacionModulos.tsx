export const OrdenacionModulos = ({ criterioOrden, onOrdenChange }) => {
  return (
    <div className="flex items-center gap-3 mb-6">
      <span style={{ color: "var(--text-secondary)" }} className="text-sm font-medium">
        Ordenar por:
      </span>
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
        <option value="nombre">Nombre</option>
        <option value="curso">Curso</option>
        <option value="estado">Estado</option>
      </select>
    </div>
  )
}
