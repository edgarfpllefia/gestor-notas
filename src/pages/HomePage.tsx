import { useState, useEffect } from "react"
import { CicloSelector } from "@/components/common/CicloSelector"
import { ModuloList } from "@/components/common/ModuloList"
import { localStorageModuloRepo } from "@/data/repositories/moduloRepository"

// HomePage - Página de inicio del gestor de tareas
// Permite a usuarios no registrados ver módulos por ciclo formativo

export const HomePage = () => {
  // Estado para el ciclo seleccionado
  const [cicloSeleccionado, setCicloSeleccionado] = useState("")
  
  // Estado para los módulos filtrados
  const [modulos, setModulos] = useState([])

  // Cuando cambia el ciclo seleccionado, obtener sus módulos
  useEffect(() => {
    if (cicloSeleccionado) {
      // Obtener módulos del ciclo desde el repositorio
      const modulosCiclo = localStorageModuloRepo.getByCiclo(cicloSeleccionado)
      setModulos(modulosCiclo)
    } else {
      // Si no hay ciclo seleccionado, limpiar módulos
      setModulos([])
    }
  }, [cicloSeleccionado])

  return (
    <div className="max-w-7xl mx-auto">
      {/* Título */}
      <h2 className="text-center text-5xl font-bold mb-8">
        Gestor de Tareas
      </h2>

      {/* Selector de ciclos */}
      <CicloSelector
        cicloSeleccionado={cicloSeleccionado}
        onCicloChange={setCicloSeleccionado}
      />

      {/* Lista de módulos */}
      {cicloSeleccionado && (
        <div className="mt-6">
          <h3 className="text-2xl font-semibold mb-4">
            Módulos del ciclo
          </h3>
          <ModuloList modulos={modulos} />
        </div>
      )}
    </div>
  )
}
