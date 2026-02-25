import { useState, useEffect } from "react"

export const TareaForm = ({ tarea, onSave, onCancel }) => {
  const modoEdicion = !!tarea

  const [formData, setFormData] = useState({
    titulo: "",
    descripcion: "",
    fechaVencimiento: "",
    estado: "pendiente",
    nota: ""
  })

  const [errores, setErrores] = useState({})

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

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errores[name]) setErrores(prev => ({ ...prev, [name]: null }))
  }

  const validarFormulario = () => {
    const nuevosErrores = {}
    if (!formData.titulo.trim()) nuevosErrores.titulo = "El título es obligatorio"
    if (formData.nota && (isNaN(formData.nota) || formData.nota < 0 || formData.nota > 10)) {
      nuevosErrores.nota = "La nota debe ser entre 0 y 10"
    }
    setErrores(nuevosErrores)
    return Object.keys(nuevosErrores).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validarFormulario()) return
    onSave({
      titulo: formData.titulo.trim(),
      descripcion: formData.descripcion.trim(),
      fechaVencimiento: formData.fechaVencimiento || undefined,
      estado: formData.estado,
      nota: formData.nota ? parseFloat(formData.nota) : undefined
    })
  }

  const inputStyle = {
    backgroundColor: "var(--bg-base)",
    border: "1px solid var(--border)",
    color: "var(--text-primary)",
  }
  const labelStyle = { color: "var(--text-secondary)" }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">

      <div className="flex flex-col gap-1">
        <label style={labelStyle} className="text-sm font-medium">
          Título <span className="text-red-400">*</span>
        </label>
        <input type="text" name="titulo" value={formData.titulo} onChange={handleChange}
          placeholder="Ej: Implementar login con JWT"
          style={{ ...inputStyle, borderColor: errores.titulo ? "#ef4444" : "var(--border)" }}
          className="rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
        {errores.titulo && <p className="text-red-400 text-xs">{errores.titulo}</p>}
      </div>

      <div className="flex flex-col gap-1">
        <label style={labelStyle} className="text-sm font-medium">Descripción</label>
        <textarea name="descripcion" value={formData.descripcion} onChange={handleChange}
          rows="4" placeholder="Describe los detalles de la tarea..."
          style={inputStyle}
          className="rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
      </div>

      <div className="flex flex-col gap-1">
        <label style={labelStyle} className="text-sm font-medium">Fecha de vencimiento</label>
        <input type="date" name="fechaVencimiento" value={formData.fechaVencimiento} onChange={handleChange}
          style={inputStyle}
          className="rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
      </div>

      <div className="flex flex-col gap-1">
        <label style={labelStyle} className="text-sm font-medium">Estado</label>
        <select name="estado" value={formData.estado} onChange={handleChange}
          style={inputStyle}
          className="rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option value="pendiente">Pendiente</option>
          <option value="en-progreso">En Progreso</option>
          <option value="completada">Completada</option>
        </select>
      </div>

      <div className="flex flex-col gap-1">
        <label style={labelStyle} className="text-sm font-medium">Nota (0-10)</label>
        <input type="number" name="nota" value={formData.nota} onChange={handleChange}
          min="0" max="10" step="0.1" placeholder="Ej: 8.5"
          style={{ ...inputStyle, borderColor: errores.nota ? "#ef4444" : "var(--border)" }}
          className="rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
        {errores.nota && <p className="text-red-400 text-xs">{errores.nota}</p>}
      </div>

      <div className="flex gap-3 pt-2">
        <button type="button" onClick={onCancel}
          style={{ border: "1px solid var(--border)", color: "var(--text-secondary)" }}
          className="flex-1 py-2 rounded-md text-sm hover:text-white hover:border-white transition-colors">
          Cancelar
        </button>
        <button type="submit"
          style={{ backgroundColor: "var(--accent)" }}
          className="flex-1 py-2 rounded-md text-sm text-white hover:opacity-90 transition-opacity font-medium">
          {modoEdicion ? "Guardar cambios" : "Crear tarea"}
        </button>
      </div>

    </form>
  )
}
