import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useAuth } from "@/contexts/AuthContext"
import { modulosApi } from "@/api/modulos"
import { tareasApi } from "@/api/tareas"
import { moduloEstudianteApi } from "@/api/moduloEstudiante"
import { TareaList } from "@/components/tareas/TareaList"
import { TareaForm } from "@/components/tareas/TareaForm"
import { FormDialog } from "@/components/tareas/FormDialog"
import { DeleteConfirmDialog } from "@/components/tareas/DeleteConfirmDialog"
import { GestionNotasModulo } from "@/components/notas/GestionNotasModulo"
import { FiltroTareas } from "@/components/tareas/FiltroTareas"
import { OrdenacionTareas } from "@/components/tareas/OrdenacionTareas"

export const DetalleModulo = () => {
  const { moduloId } = useParams()
  const { user } = useAuth()
  const navigate = useNavigate()

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [modulo, setModulo] = useState(null)
  const [tareas, setTareas] = useState([])
  const [moduloEstudiante, setModuloEstudiante] = useState(null)

  const [modalFormularioAbierto, setModalFormularioAbierto] = useState(false)
  const [modalEliminarAbierto, setModalEliminarAbierto] = useState(false)
  const [tareaEditando, setTareaEditando] = useState(null)
  const [tareaEliminar, setTareaEliminar] = useState(null)

  const [filtro, setFiltro] = useState({ estado: "todos", fechaInicio: undefined, fechaFin: undefined })
  const [orden, setOrden] = useState({ criterio: "fechaCreacion", direccion: "desc" })

  useEffect(() => { cargarDatos() }, [moduloId, user])

  const cargarDatos = async () => {
    try {
      setLoading(true); setError(null)

      const moduloData = await modulosApi.getById(moduloId)
      setModulo(moduloData)

      const tareasData = await tareasApi.getByModuloEstudiante(user?.id, moduloId)
      setTareas(tareasData)

      const meData = await moduloEstudianteApi.getDetalle(user?.id, moduloId)
      setModuloEstudiante(meData)

      setLoading(false)
    } catch (err) {
      setError("Error al cargar los datos"); setLoading(false)
    }
  }

  const handleGuardarTarea = async (datosTarea) => {
    try {
      if (tareaEditando) {
        await tareasApi.update(tareaEditando.id, datosTarea)
      } else {
        await tareasApi.create(user?.id, moduloId, datosTarea)
      }
      cargarDatos(); setModalFormularioAbierto(false); setTareaEditando(null)
    } catch (err) { console.error(err) }
  }

  const handleConfirmarEliminar = async () => {
    try {
      if (tareaEliminar) await tareasApi.delete(tareaEliminar.id)
      cargarDatos(); setModalEliminarAbierto(false); setTareaEliminar(null)
    } catch (err) { console.error(err) }
  }

  const handleCambioEstado = async (tareaId, nuevoEstado) => {
    try {
      await tareasApi.update(tareaId, { estado: nuevoEstado })
      setTareas(prev => prev.map(t => t.id === tareaId ? { ...t, estado: nuevoEstado } : t))
    } catch (err) { console.error(err) }
  }

  const aplicarFiltros = (lista) => lista.filter(t => {
    if (filtro.estado !== "todos" && t.estado !== filtro.estado) return false
    if (filtro.fechaInicio || filtro.fechaFin) {
      const fecha = t.fechaVencimiento?.split("T")[0]
      if (!fecha) return true
      if (filtro.fechaInicio && fecha < filtro.fechaInicio) return false
      if (filtro.fechaFin && fecha > filtro.fechaFin) return false
    }
    return true
  })

  const aplicarOrdenacion = (lista) => [...lista].sort((a, b) => {
    let cmp = 0
    switch (orden.criterio) {
      case "titulo": cmp = a.titulo.localeCompare(b.titulo); break
      case "fechaCreacion": cmp = new Date(a.fechaCreacion) - new Date(b.fechaCreacion); break
      case "fechaVencimiento":
        if (!a.fechaVencimiento && !b.fechaVencimiento) cmp = 0
        else if (!a.fechaVencimiento) cmp = 1
        else if (!b.fechaVencimiento) cmp = -1
        else cmp = new Date(a.fechaVencimiento) - new Date(b.fechaVencimiento); break
      case "estado":
        const ord = { pendiente: 1, "en-progreso": 2, completada: 3 }
        cmp = (ord[a.estado] || 99) - (ord[b.estado] || 99); break
      case "nota":
        const nA = a.nota ?? -1, nB = b.nota ?? -1
        cmp = nA === -1 && nB === -1 ? 0 : nA === -1 ? 1 : nB === -1 ? -1 : nA - nB; break
    }
    return orden.direccion === "asc" ? cmp : -cmp
  })

  const tareasFinales = aplicarOrdenacion(aplicarFiltros(tareas))

  if (loading) return (
    <div className="flex justify-center items-center min-h-[60vh]">
      <p style={{ color: "var(--text-secondary)" }}>Cargando...</p>
    </div>
  )

  if (error) return (
    <div className="flex flex-col justify-center items-center min-h-[60vh] gap-4 px-4">
      <p className="text-red-400 text-center">{error}</p>
      <button onClick={() => navigate("/estudiante/modulos")}
        style={{ backgroundColor: "var(--accent)" }}
        className="px-4 py-2 rounded-md text-white text-sm">
        Volver a mis módulos
      </button>
    </div>
  )

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-10">

      <div className="mb-6 md:mb-8">
        <button onClick={() => navigate("/estudiante/modulos")}
          style={{ color: "var(--accent)" }}
          className="text-sm mb-3 md:mb-4 hover:opacity-80 transition-opacity flex items-center gap-1">
          ← Volver a mis módulos
        </button>
        <h1 style={{ fontFamily: "Sora, sans-serif", color: "var(--text-primary)" }}
          className="text-xl md:text-2xl font-bold mb-1">
          {modulo?.nombre}
        </h1>
        <p style={{ color: "var(--text-secondary)" }} className="text-sm">
          {modulo?.codigo} · Curso {modulo?.curso}º · {modulo?.horas} horas
        </p>
      </div>

      <GestionNotasModulo moduloEstudiante={moduloEstudiante} onActualizar={cargarDatos} />

      <div className="flex justify-between items-center mb-4">
        <h2 style={{ fontFamily: "Sora, sans-serif", color: "var(--text-primary)" }}
          className="text-lg font-bold">
          Tareas
        </h2>
        <button onClick={() => { setTareaEditando(null); setModalFormularioAbierto(true) }}
          style={{ backgroundColor: "var(--accent)" }}
          className="px-3 md:px-4 py-2 rounded-md text-sm text-white hover:opacity-90 transition-opacity font-medium">
          + Nueva tarea
        </button>
      </div>

      <FiltroTareas filtroActivo={filtro} onFiltroChange={setFiltro} />
      <OrdenacionTareas ordenActivo={orden} onOrdenChange={setOrden} />

      <p style={{ color: "var(--text-secondary)" }} className="text-sm mb-4">
        Mostrando {tareasFinales.length} de {tareas.length} tareas
      </p>

      <TareaList tareas={tareasFinales}
        onEdit={(t) => { setTareaEditando(t); setModalFormularioAbierto(true) }}
        onDelete={(t) => { setTareaEliminar(t); setModalEliminarAbierto(true) }}
        onEstadoChange={handleCambioEstado} />

      <FormDialog isOpen={modalFormularioAbierto}
        title={tareaEditando ? "Editar tarea" : "Nueva tarea"}
        onClose={() => { setModalFormularioAbierto(false); setTareaEditando(null) }}>
        <TareaForm tarea={tareaEditando} onSave={handleGuardarTarea}
          onCancel={() => { setModalFormularioAbierto(false); setTareaEditando(null) }} />
      </FormDialog>

      <DeleteConfirmDialog isOpen={modalEliminarAbierto} tarea={tareaEliminar}
        onConfirm={handleConfirmarEliminar}
        onCancel={() => { setModalEliminarAbierto(false); setTareaEliminar(null) }} />
    </div>
  )
}