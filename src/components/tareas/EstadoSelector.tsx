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
      alert("No se pudo actualizar el estado de la tarea")
    }
  }

  return (
    
  )
}

export default EstadoSelector

