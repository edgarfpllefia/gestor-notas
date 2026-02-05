import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { localStorageTareaRepo } from "@/data/repositories/tareaRepository"
import { useState } from "react"

const ESTADOS = [
  { value: "pendiente", label: "Pendiente" },
  { value: "en-progreso", label: "En Progreso" },
  { value: "completada", label: "Completada" },
]

export const EstadoSelector = ({ tareaId, estadoActual, onEstadoChange }) => {
 

  return (
    
  )
}

export default EstadoSelector
