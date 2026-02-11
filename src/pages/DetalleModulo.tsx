import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useAuth } from "@/contexts/AuthContext"
import { localStorageModuloRepo } from "@/data/repositories/moduloRepository"
import { localStorageTareaRepo } from "@/data/repositories/tareaRepository"
import { localStorageModuloEstudianteRepo } from "@/data/repositories/moduloEstudianteRepository"
import { TareaList } from "@/components/tareas/TareaList"
import { TareaForm } from "@/components/tareas/TareaForm"
import { FormDialog } from "@/components/tareas/FormDialog"
import { DeleteConfirmDialog } from "@/components/tareas/DeleteConfirmDialog"
import { GestionNotasModulo } from "@/components/notas/GestionNotasModulo"

// DetalleModulo - Página para gestionar tareas de un módulo

export const DetalleModulo = () => {
  const { moduloId } = useParams()
  const { user } = useAuth()
  const navigate = useNavigate()
  
  // Estado de carga y error
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  
  // Datos del módulo, tareas y relación estudiante-módulo
  const [modulo, setModulo] = useState(null)
  const [tareas, setTareas] = useState([])
  const [moduloEstudiante, setModuloEstudiante] = useState(null)
  
  // Estados para los diálogos
  const [modalFormularioAbierto, setModalFormularioAbierto] = useState(false)
  const [modalEliminarAbierto, setModalEliminarAbierto] = useState(false)
  const [tareaEditando, setTareaEditando] = useState(null)
  const [tareaEliminar, setTareaEliminar] = useState(null)

  // Cargar datos al montar el componente
  useEffect(() => {
    cargarDatos()
  }, [moduloId, user])

  // Función para cargar módulo, tareas y notas
  const cargarDatos = () => {
    try {
      setLoading(true)
      setError(null)
      
      // 1. Obtener datos del módulo
      const moduloData = localStorageModuloRepo.getById(moduloId)
      
      if (!moduloData) {
        setError("Módulo no encontrado")
        setLoading(false)
        return
      }
      
      setModulo(moduloData)
      
      // 2. Obtener tareas del módulo para este estudiante
      const todasLasTareas = localStorageTareaRepo.getByModuloId(moduloId)
      const tareasDelEstudiante = todasLasTareas.filter(t => t.estudianteId === user.id)
      
      setTareas(tareasDelEstudiante)
      
      // 3. Obtener relación ModuloEstudiante (para notas y estado)
      const relacionesEstudiante = localStorageModuloEstudianteRepo.getByEstudianteId(user.id)
      const relacionModulo = relacionesEstudiante.find(r => r.moduloId === moduloId)
      
      setModuloEstudiante(relacionModulo)
      setLoading(false)
      
    } catch (err) {
      console.error("Error al cargar datos:", err)
      setError("Error al cargar los datos")
      setLoading(false)
    }
  }

  // Abrir modal para crear nueva tarea
  const handleNuevaTarea = () => {
    setTareaEditando(null)
    setModalFormularioAbierto(true)
  }

  // Abrir modal para editar tarea
  const handleEditarTarea = (tarea) => {
    setTareaEditando(tarea)
    setModalFormularioAbierto(true)
  }

  // Guardar tarea (crear o editar)
  const handleGuardarTarea = (datosTarea) => {
    try {
      if (tareaEditando) {
        // Editar tarea existente
        localStorageTareaRepo.update(tareaEditando.id, datosTarea)
      } else {
        // Crear nueva tarea
        const nuevaTarea = {
          ...datosTarea,
          moduloId: moduloId,
          estudianteId: user.id,
          fechaCreacion: new Date().toISOString()
        }
        localStorageTareaRepo.create(nuevaTarea)
      }
      
      // Recargar tareas y cerrar modal
      cargarDatos()
      setModalFormularioAbierto(false)
      setTareaEditando(null)
      
    } catch (err) {
      console.error("Error al guardar tarea:", err)
      alert("Error al guardar la tarea")
    }
  }

  // Abrir confirmación de eliminación
  const handleEliminarTarea = (tarea) => {
    setTareaEliminar(tarea)
    setModalEliminarAbierto(true)
  }

  // Confirmar eliminación
  const handleConfirmarEliminar = () => {
    try {
      localStorageTareaRepo.delete(tareaEliminar.id)
      
      // Recargar tareas y cerrar modal
      cargarDatos()
      setModalEliminarAbierto(false)
      setTareaEliminar(null)
      
    } catch (err) {
      console.error("Error al eliminar tarea:", err)
      alert("Error al eliminar la tarea")
    }
  }

  // Cancelar formulario
  const handleCancelarFormulario = () => {
    setModalFormularioAbierto(false)
    setTareaEditando(null)
  }

  // Cancelar eliminación
  const handleCancelarEliminar = () => {
    setModalEliminarAbierto(false)
    setTareaEliminar(null)
  }

  // Manejar cambio de estado desde los componentes hijos (actualización optimista local)
  const handleCambioEstado = (tareaId, nuevoEstado) => {
    setTareas((prev) => prev.map((t) => (t.id === tareaId ? { ...t, estado: nuevoEstado } : t)))
  }

  // Volver a la lista de módulos
  const handleVolver = () => {
    navigate('/estudiante/modulos')
  }

  // Mostrar loading
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl text-gray-600">Cargando...</p>
      </div>
    )
  }

  // Mostrar error
  if (error) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen">
        <p className="text-xl text-red-600 mb-4">{error}</p>
        <button
          onClick={handleVolver}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Volver a Mis Módulos
        </button>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        {/* Botón volver */}
        <button
          onClick={handleVolver}
          className="text-blue-500 hover:text-blue-700 mb-4 flex items-center gap-2"
        >
          ← Volver a Mis Módulos
        </button>
        
        {/* Título del módulo */}
        <h1 className="text-4xl font-bold mb-2">{modulo?.nombre}</h1>
        <p className="text-gray-600">
          {modulo?.codigo} - Curso {modulo?.curso}º - {modulo?.horas} horas
        </p>
      </div>

      {/* Gestión de Notas del Módulo */}
      <GestionNotasModulo 
        moduloEstudiante={moduloEstudiante}
        onActualizar={cargarDatos}
      />

      {/* Botón Nueva Tarea */}
      <div className="mb-6">
        <button
          onClick={handleNuevaTarea}
          className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium"
        >
          + Nueva Tarea
        </button>
      </div>

      {/* Lista de tareas */}
      <TareaList 
        tareas={tareas}
        onEdit={handleEditarTarea}
        onDelete={handleEliminarTarea}
        onEstadoChange={handleCambioEstado}
      />

      {/* Modal de formulario */}
      <FormDialog
        isOpen={modalFormularioAbierto}
        title={tareaEditando ? "Editar Tarea" : "Nueva Tarea"}
        onClose={handleCancelarFormulario}
      >
        <TareaForm
          tarea={tareaEditando}
          onSave={handleGuardarTarea}
          onCancel={handleCancelarFormulario}
        />
      </FormDialog>

      {/* Modal de confirmación de eliminación */}
      <DeleteConfirmDialog
        isOpen={modalEliminarAbierto}
        tarea={tareaEliminar}
        onConfirm={handleConfirmarEliminar}
        onCancel={handleCancelarEliminar}
      />
    </div>
  )
}
