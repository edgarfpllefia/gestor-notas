// EstadoModuloSelector - Selector de estado del módulo

export const EstadoModuloSelector = ({ estado, onChange, disabled = false }) => {
  const estados = [
    { value: "aprobado", label: "Aprobado", color: "bg-green-100 text-green-800" },
    { value: "cursando", label: "Cursando", color: "bg-blue-100 text-blue-800" },
    { value: "no-cursa", label: "No Cursa", color: "bg-gray-100 text-gray-800" },
    { value: "pendiente", label: "Pendiente", color: "bg-yellow-100 text-yellow-800" },
  ];

  const estadoActual = estados.find(e => e.value === estado);

  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Estado del Módulo
      </label>
      <select
        value={estado}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${estadoActual?.color || ""} ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        {estados.map((est) => (
          <option key={est.value} value={est.value}>
            {est.label}
          </option>
        ))}
      </select>
    </div>
  );
};
