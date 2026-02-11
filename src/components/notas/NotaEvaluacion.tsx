// NotaEvaluacion - Input para cada evaluación

export const NotaEvaluacion = ({ label, value, onChange, name }) => {
  const handleChange = (e) => {
    const valor = e.target.value;
    
    // Permitir vacío
    if (valor === "") {
      onChange(name, "");
      return;
    }
    
    // Validar que sea número entre 0-10
    const numero = parseFloat(valor);
    if (!isNaN(numero) && numero >= 0 && numero <= 10) {
      onChange(name, numero);
    }
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <input
        type="number"
        min="0"
        max="10"
        step="0.1"
        value={value ?? ""}
        onChange={handleChange}
        placeholder="0-10"
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};
