export const EstadoModuloSelector = ({ estado, onChange, disabled = false }) => {
  const estados = [
    { value: "aprobado",  label: "Aprobado" },
    { value: "cursando",  label: "Cursando" },
    { value: "no-cursa",  label: "No Cursa" },
    { value: "pendiente", label: "Pendiente" },
  ]

  return (
    <div className="flex flex-col gap-1 mb-4">
      <label style={{ color: "var(--text-secondary)" }} className="text-sm font-medium">
        Estado del módulo
      </label>
      <select value={estado} onChange={(e) => onChange(e.target.value)} disabled={disabled}
        style={{
          backgroundColor: "var(--bg-base)",
          border: "1px solid var(--border)",
          color: "var(--text-primary)",
          opacity: disabled ? 0.5 : 1,
          cursor: disabled ? "not-allowed" : "auto",
        }}
        className="rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-64">
        {estados.map((e) => (
          <option key={e.value} value={e.value}>{e.label}</option>
        ))}
      </select>
    </div>
  )
}
