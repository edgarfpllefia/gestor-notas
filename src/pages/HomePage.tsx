import { useState, useEffect } from "react"
import { CicloSelector } from "@/components/common/CicloSelector"
import { ModuloList } from "@/components/common/ModuloList"
import { localStorageModuloRepo } from "@/data/repositories/moduloRepository"

export const HomePage = () => {
  const [cicloSeleccionado, setCicloSeleccionado] = useState("")
  const [modulos, setModulos] = useState([])

  useEffect(() => {
    if (cicloSeleccionado) {
      setModulos(localStorageModuloRepo.getByCiclo(cicloSeleccionado))
    } else {
      setModulos([])
    }
  }, [cicloSeleccionado])

  return (
    <div>
      {/* Hero */}
      <section style={{ borderBottom: "1px solid var(--border)" }}
        className="px-5 md:px-8 py-16 md:py-24 flex flex-col items-center text-center gap-5 md:gap-6">

        <span style={{
          backgroundColor: "var(--bg-surface-2)",
          border: "1px solid var(--border)",
          color: "var(--accent)",
        }} className="text-xs font-semibold px-3 py-1 rounded-full tracking-widest uppercase">
          Formación Profesional
        </span>

        <h1 style={{ fontFamily: "Sora, sans-serif", color: "var(--text-primary)" }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight max-w-2xl">
          Gestiona tus módulos y tareas
        </h1>

        <p style={{ color: "var(--text-secondary)" }}
          className="text-base md:text-lg max-w-xl leading-relaxed px-2">
          Consulta los módulos de cada ciclo formativo, haz seguimiento de tus tareas y lleva el control de tu progreso académico.
        </p>

        <div className="w-full max-w-xs sm:max-w-sm mt-2 md:mt-4">
          <CicloSelector cicloSeleccionado={cicloSeleccionado} onCicloChange={setCicloSeleccionado} />
        </div>
      </section>

      {/* Lista de módulos */}
      {cicloSeleccionado && (
        <section className="px-5 md:px-8 py-10 md:py-12 max-w-7xl mx-auto">
          <h2 style={{ color: "var(--text-primary)", fontFamily: "Sora, sans-serif" }}
            className="text-xl md:text-2xl font-bold mb-6 md:mb-8">
            Módulos del ciclo
          </h2>
          <ModuloList modulos={modulos} />
        </section>
      )}
    </div>
  )
}
