import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { localStorageTareaRepo } from "@/data/repositories/tareaRepository"
import { useState } from "react"

const ESTADOS = [
  { value: "pendiente", label: "Pendiente" },
  { value: "en-progreso", label: "En Progreso" },
  { value: "completada", label: "Completada" },
]

export const EstadoSelector = ({ tareaId, estadoActual, onEstadoChange }) => {
  const [valor, setValor] = useState(estadoActual || "pendiente")

  const handleChange = (nuevo) => {
    const previo = valor
    setValor(nuevo)
    if (onEstadoChange) onEstadoChange(tareaId, nuevo)

    try {
      localStorageTareaRepo.update(tareaId, { estado: nuevo })
    } catch (err) {
      console.error("Error actualizando estado:", err)
      setValor(previo)
      if (onEstadoChange) onEstadoChange(tareaId, previo)
    }
  }

  return (
    <Select value={valor} onValueChange={handleChange}>
      <SelectTrigger className="w-full text-sm"
        style={{
          backgroundColor: "var(--bg-surface-2)",
          border: "1px solid var(--border)",
          color: "var(--text-primary)",
        }}>
        <SelectValue placeholder="Estado" />
      </SelectTrigger>
      <SelectContent position="popper" sideOffset={6}
        style={{
          backgroundColor: "var(--bg-surface)",
          border: "1px solid var(--border)",
          color: "var(--text-primary)",
        }}>
        {ESTADOS.map((e) => (
          <SelectItem key={e.value} value={e.value} style={{ color: "var(--text-primary)" }}>
            {e.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export default EstadoSelector
