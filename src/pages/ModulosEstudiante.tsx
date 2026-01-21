import { useState, useEffect } from "react"
import { useAuth } from "@/contexts/AuthContext"
import { localStorageUsuarioRepo } from "@/data/repositories/usuarioRepository.js"
import { localStorageModuloEstudianteRepo } from "@/data/repositories/moduloEstudianteRepository.js"
import { localStorageModuloRepo } from "@/data/repositories/moduloRepository.js"
import { FiltroModulos } from "@/components/estudiante/FiltroModulos"
import { OrdenacionModulos } from "@/components/estudiante/OrdenacionModulos"
import { ModuloEstudianteList } from "@/components/estudiante/ModuloEstudianteList"

// ModulosEstudiante - Página para visualizar los módulos del estudiante autenticado

export const ModulosEstudiante = () => {
  const { user } = useAuth()
  
  // Estado de carga
  const [loading, setLoading] = useState(true)
  
  // Datos del estudiante y sus módulos
  const [modulosCompletos, setModulosCompletos] = useState([])
  
  // Estados de filtros y ordenación
  const [filtroActivo, setFiltroActivo] = useState("todos") // "todos", "1", "2"
  const [criterioOrden, setCriterioOrden] = useState("nombre") // "nombre", "curso", "estado"

  // Cargar datos al montar el componente
  useEffect(() => {
    const cargarModulosEstudiante = () => {
      try {
        setLoading(true)
        
        // 1. Obtener datos completos del estudiante desde el repositorio
        const estudiante = localStorageUsuarioRepo.getById(user.id)
        
        if (!estudiante) {
          console.error("Estudiante no encontrado")
          setLoading(false)
          return
        }

        // 2. Obtener las relaciones ModuloEstudiante del estudiante
        const modulosEstudiante = localStorageModuloEstudianteRepo.getByEstudianteId(user.id)
        
        // 3. Para cada relación, obtener los datos completos del módulo
        const modulosConDatos = modulosEstudiante.map(me => {
          const modulo = localStorageModuloRepo.getById(me.moduloId)
          
          // Combinar datos del módulo con datos de la relación (estado, notas)
          return {
            ...modulo,
            estado: me.estado,
            notas: me.notas,
            moduloEstudianteId: me.id
          }
        })
        
        setModulosCompletos(modulosConDatos)
        setLoading(false)
        
      } catch (error) {
        console.error("Error al cargar módulos:", error)
        setLoading(false)
      }
    }

    if (user) {
      cargarModulosEstudiante()
    }
  }, [user])

  // Aplicar filtros
  const modulosFiltrados = modulosCompletos.filter(modulo => {
    if (filtroActivo === "todos") return true
    return modulo.curso.toString() === filtroActivo
  })

  // Aplicar ordenación
  const modulosOrdenados = [...modulosFiltrados].sort((a, b) => {
    switch (criterioOrden) {
      case "nombre":
        return a.nombre.localeCompare(b.nombre)
      
      case "curso":
        return a.curso - b.curso
      
      case "estado":
        const estadosOrden = { "aprobado": 1, "cursando": 2, "pendiente": 3, "no-cursa": 4 }
        return (estadosOrden[a.estado] || 99) - (estadosOrden[b.estado] || 99)
      
      default:
        return 0
    }
  })

  // Mostrar loading
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl text-gray-600">Cargando módulos...</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Título */}
      <h1 className="text-4xl font-bold mb-8">Mis Módulos</h1>

      {/* Controles: Filtros y Ordenación */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        {/* Filtro por curso */}
        <FiltroModulos 
          filtroActivo={filtroActivo}
          onFiltroChange={setFiltroActivo}
        />
        
        {/* Ordenación */}
        <OrdenacionModulos 
          criterioOrden={criterioOrden}
          onOrdenChange={setCriterioOrden}
        />
      </div>

      {/* Información de resultados */}
      <p className="text-gray-600 mb-4">
        Mostrando {modulosOrdenados.length} de {modulosCompletos.length} módulos
      </p>

      {/* Lista de módulos */}
      <ModuloEstudianteList modulos={modulosOrdenados} />
    </div>
  )
}
