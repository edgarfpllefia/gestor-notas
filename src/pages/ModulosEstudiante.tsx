import { useState, useEffect } from "react"
import { useAuth } from "@/contexts/AuthContext"
import { moduloEstudianteApi } from "@/api/moduloEstudiante"
import { FiltroModulos } from "@/components/estudiante/FiltroModulos"
import { OrdenacionModulos } from "@/components/estudiante/OrdenacionModulos"
import { ModuloEstudianteList } from "@/components/estudiante/ModuloEstudianteList"

export const ModulosEstudiante = () => {
  const { user } = useAuth()
  const [loading, setLoading] = useState(true)
  const [modulosCompletos, setModulosCompletos] = useState<any[]>([])
  const [filtroActivo, setFiltroActivo] = useState("todos")
  const [criterioOrden, setCriterioOrden] = useState("nombre")

  useEffect(() => {
    const cargarModulosEstudiante = async () => {
      try {
        setLoading(true)
        const data = await moduloEstudianteApi.getByEstudianteId(user.id)
        setModulosCompletos(data)
        setLoading(false)
      } catch (error) {
        console.error("Error al cargar módulos:", error)
        setLoading(false)
      }
    }
    if (user) cargarModulosEstudiante()
  }, [user])

  const modulosFiltrados = modulosCompletos.filter(m => {
    if (filtroActivo === "todos") return true
    return m.curso?.toString() === filtroActivo
  })

  const modulosOrdenados = [...modulosFiltrados].sort((a, b) => {
    switch (criterioOrden) {
      case "nombre": return a.nombre?.localeCompare(b.nombre)
      case "curso": return a.curso - b.curso
      case "estado":
        const orden = { aprobado: 1, cursando: 2, pendiente: 3, "no-cursa": 4 }
        return (orden[a.estado] || 99) - (orden[b.estado] || 99)
      default: return 0
    }
  })

  if (loading) return (
    <div className="flex justify-center items-center min-h-[60vh]">
      <p style={{ color: "var(--text-secondary)" }}>Cargando módulos...</p>
    </div>
  )

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-10">

      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-6 md:mb-8">
        <h1 style={{ fontFamily: "Sora, sans-serif", color: "var(--text-primary)" }}
          className="text-xl md:text-2xl font-bold">
          Mis módulos
        </h1>
        <span style={{ color: "var(--text-secondary)" }} className="text-sm">
          {modulosOrdenados.length} de {modulosCompletos.length} módulos
        </span>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <FiltroModulos filtroActivo={filtroActivo} onFiltroChange={setFiltroActivo} />
        <OrdenacionModulos criterioOrden={criterioOrden} onOrdenChange={setCriterioOrden} />
      </div>

      <ModuloEstudianteList modulos={modulosOrdenados} />
    </div>
  )
}