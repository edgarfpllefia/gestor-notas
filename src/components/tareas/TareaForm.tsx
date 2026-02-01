import { useState, useEffect } from "react"

// TareaForm - Formulario para crear o editar tareas

export const TareaForm = ({ tarea, onSave, onCancel }) => {
  
  // Determinar si estamos en modo edición o creación
  const modoEdicion = !!tarea
  
  // Estado del formulario
  const [formData, setFormData] = useState({
    titulo: "",
    descripcion: "",
    fechaVencimiento: "",
    estado: "pendiente",
    nota: ""
  })

  // Errores de validación
  const [errores, setErrores] = useState({})

  // Cargar datos de la tarea si estamos editando
  useEffect(() => {
    if (tarea) {
      setFormData({
        titulo: tarea.titulo || "",
        descripcion: tarea.descripcion || "",
        fechaVencimiento: tarea.fechaVencimiento || "",
        estado: tarea.estado || "pendiente",
        nota: tarea.nota !== undefined && tarea.nota !== null ? tarea.nota.toString() : ""
      })
    }
  }, [tarea])

  // Manejar cambios en los campos
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Limpiar error del campo cuando el usuario escribe
    if (errores[name]) {
      setErrores(prev => ({
        ...prev,
        [name]: null
      }))
    }
  }

  // Validar formulario
  const validarFormulario = () => {
    const nuevosErrores = {}
    
    if (!formData.titulo.trim()) {
      nuevosErrores.titulo = "El título es obligatorio"
    }
    
    if (formData.nota && (isNaN(formData.nota) || formData.nota < 0 || formData.nota > 10)) {
      nuevosErrores.nota = "La nota debe ser un número entre 0 y 10"
    }

    setErrores(nuevosErrores)
    return Object.keys(nuevosErrores).length === 0
  }

  // Manejar submit del formulario
  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!validarFormulario()) {
      return
    }

    // Preparar datos para guardar
    const datosParaGuardar = {
      titulo: formData.titulo.trim(),
      descripcion: formData.descripcion.trim(),
      fechaVencimiento: formData.fechaVencimiento || undefined,
      estado: formData.estado,
      nota: formData.nota ? parseFloat(formData.nota) : undefined
    }

    onSave(datosParaGuardar)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Título */}
      <div>
        <label htmlFor="titulo" className="block text-sm font-semibold text-gray-700 mb-1">
          Título <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="titulo"
          name="titulo"
          value={formData.titulo}
          onChange={handleChange}
          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errores.titulo ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="Ej: Implementar login con JWT"
        />
        {errores.titulo && (
          <p className="text-red-500 text-xs mt-1">{errores.titulo}</p>
        )}
      </div>

      {/* Descripción */}
      <div>
        <label htmlFor="descripcion" className="block text-sm font-semibold text-gray-700 mb-1">
          Descripción
        </label>
        <textarea
          id="descripcion"
          name="descripcion"
          value={formData.descripcion}
          onChange={handleChange}
          rows="4"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Describe los detalles de la tarea..."
        />
      </div>

      {/* Fecha de vencimiento */}
      <div>
        <label htmlFor="fechaVencimiento" className="block text-sm font-semibold text-gray-700 mb-1">
          Fecha de vencimiento
        </label>
        <input
          type="date"
          id="fechaVencimiento"
          name="fechaVencimiento"
          value={formData.fechaVencimiento}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Estado */}
      <div>
        <label htmlFor="estado" className="block text-sm font-semibold text-gray-700 mb-1">
          Estado
        </label>
        <select
          id="estado"
          name="estado"
          value={formData.estado}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="pendiente">Pendiente</option>
          <option value="en-progreso">En Progreso</option>
          <option value="completada">Completada</option>
        </select>
      </div>

      {/* Nota */}
      <div>
        <label htmlFor="nota" className="block text-sm font-semibold text-gray-700 mb-1">
          Nota (0-10)
        </label>
        <input
          type="number"
          id="nota"
          name="nota"
          value={formData.nota}
          onChange={handleChange}
          min="0"
          max="10"
          step="0.1"
          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errores.nota ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="Ej: 8.5"
        />
        {errores.nota && (
          <p className="text-red-500 text-xs mt-1">{errores.nota}</p>
        )}
      </div>

      {/* Botones */}
      <div className="flex gap-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
        >
          {modoEdicion ? "Guardar Cambios" : "Crear Tarea"}
        </button>
      </div>
    </form>
  )
}
