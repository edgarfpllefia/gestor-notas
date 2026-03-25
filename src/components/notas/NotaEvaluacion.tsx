/**
 * NotaEvaluacion
 * Campo reutilizable para introducir la nota de una evaluación concreta.
 * Valida rango [0,10] y admite vacío para indicar "sin nota".
 */
export const NotaEvaluacion = ({ label, value, onChange, name }) => {
  // Normaliza y valida el valor antes de propagar cambios al componente padre
  const handleChange = (e) => {
    const valor = e.target.value
    if (valor === "") { onChange(name, ""); return }
    const numero = parseFloat(valor)
    // Solo permite notas numéricas entre 0 y 10
    if (!isNaN(numero) && numero >= 0 && numero <= 10) onChange(name, numero)
  }

  return (
    <div className="flex flex-col gap-1">
      <label style={{ color: "var(--text-secondary)" }} className="text-sm font-medium">
        {label}
      </label>
      {/* Input numérico decimal acotado entre 0 y 10 */}
      <input
        type="number" min="0" max="10" step="0.1"
        value={value ?? ""} onChange={handleChange} placeholder="0 - 10"
        style={{
          backgroundColor: "var(--bg-base)",
          border: "1px solid var(--border)",
          color: "var(--text-primary)",
        }}
        className="rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  )
}
