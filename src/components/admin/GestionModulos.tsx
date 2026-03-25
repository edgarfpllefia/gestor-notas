// Importaciones necesarias de React y librerías externas
import { useState, useEffect } from "react"
import { CICLOS_FORMATIVOS } from "@/data/constants"  
import { modulosApi } from "@/api/modulos"            
import { ModuloForm } from "./ModuloForm"               
import { ListaModulosAdmin } from "./ListaModulosAdmin" 
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

/**
 * GestionModulos
 * Componente principal de la sección de administración de módulos.
 * Permite al administrador seleccionar un ciclo formativo y, dentro de él,
 * crear, editar y eliminar módulos.
 */
export function GestionModulos() {
  // Ciclo formativo actualmente seleccionado en el selector
  const [cicloSeleccionado, setCicloSeleccionado] = useState("")
  // Lista de módulos del ciclo seleccionado
  const [modulos, setModulos] = useState([])
  // Controla si el formulario de creación/edición está visible
  const [mostrarFormulario, setMostrarFormulario] = useState(false)
  // Módulo que se está editando (null si se está creando uno nuevo)
  const [moduloAEditar, setModuloAEditar] = useState(null)
  // ID del módulo pendiente de confirmación de borrado (null si no hay ninguno)
  const [moduloAEliminar, setModuloAEliminar] = useState(null)
  // Mensaje de error de validación o de API
  const [error, setError] = useState("")

  // Recarga los módulos cada vez que cambia el ciclo seleccionado.
  // Si se deselecciona el ciclo, vacía la lista.
  useEffect(() => {
    if (cicloSeleccionado) cargarModulos()
    else setModulos([])
  }, [cicloSeleccionado])

  // Obtiene los módulos del ciclo seleccionado desde la API y actualiza el estado.
  const cargarModulos = async () => {
    try {
      const data = await modulosApi.getByCiclo(cicloSeleccionado)
      setModulos(data)
    } catch (err) {
      console.error("Error al cargar módulos:", err)
    }
  }

  /**
   * handleCrear
   * Valida que no exista ya un módulo con el mismo nombre en el mismo ciclo
   * antes de llamar a la API de creación. Si hay duplicado, muestra error.
   */
  const handleCrear = async (datos) => {
    // Comprobación de duplicado (comparación sin distinguir mayúsculas)
    const existe = modulos.some(m => m.nombre.toLowerCase() === datos.nombre.toLowerCase() && m.ciclo === datos.ciclo)
    if (existe) { setError("Ya existe un módulo con ese nombre en este ciclo formativo."); return }

    try {
      await modulosApi.create(datos)
      // Limpia el error, cierra el formulario y refresca la lista
      setError(""); setMostrarFormulario(false); cargarModulos()
    } catch (err) {
      setError(err.message || "Error al crear módulo")
    }
  }

  // Abre el formulario precargado con los datos del módulo seleccionado para editar.
  const handleEditar = (modulo) => { setModuloAEditar(modulo); setMostrarFormulario(true); setError("") }

  /**
   * handleGuardarEdicion
   * Valida que el nuevo nombre no colisione con otro módulo del mismo ciclo
   * (excluyendo el propio módulo editado) antes de persistir los cambios.
   */
  const handleGuardarEdicion = async (datos) => {
    // Excluye el módulo actual de la comprobación de duplicados
    const existe = modulos.some(m => m.id !== moduloAEditar.id && m.nombre.toLowerCase() === datos.nombre.toLowerCase() && m.ciclo === datos.ciclo)
    if (existe) { setError("Ya existe un módulo con ese nombre en este ciclo formativo."); return }

    try {
      await modulosApi.update(moduloAEditar.id, datos)
      // Limpia el estado de edición, cierra el formulario y refresca la lista
      setError(""); setMostrarFormulario(false); setModuloAEditar(null); cargarModulos()
    } catch (err) {
      setError(err.message || "Error al editar módulo")
    }
  }

  /**
   * confirmarEliminar
   * Ejecuta el borrado del módulo cuyo ID está en `moduloAEliminar`
   * tras la confirmación del usuario en el diálogo modal.
   */
  const confirmarEliminar = async () => {
    try {
      await modulosApi.delete(moduloAEliminar)
      // Cierra el modal y refresca la lista
      setModuloAEliminar(null); cargarModulos()
    } catch (err) {
      console.error("Error al eliminar módulo:", err)
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-4 md:px-6 py-8 md:py-10 flex flex-col gap-6">

      {/* Título de la sección */}
      <h1 style={{ fontFamily: "Sora, sans-serif", color: "var(--text-primary)" }}
        className="text-xl md:text-2xl font-bold">
        Gestión de módulos
      </h1>

      {/* Selector de ciclo formativo — filtra los módulos mostrados */}
      <div className="flex flex-col gap-1">
        <label style={{ color: "var(--text-secondary)" }} className="text-sm font-medium">
          Ciclo formativo
        </label>
        <Select value={cicloSeleccionado} onValueChange={setCicloSeleccionado}>
          <SelectTrigger className="w-full md:w-72"
            style={{ backgroundColor: "var(--bg-surface)", border: "1px solid var(--border)", color: "var(--text-primary)" }}>
            <SelectValue placeholder="Selecciona un ciclo" />
          </SelectTrigger>
          <SelectContent position="popper"
            style={{ backgroundColor: "var(--bg-surface)", border: "1px solid var(--border)" }}>
            {/* Genera una opción por cada ciclo formativo disponible en los datos */}
            {CICLOS_FORMATIVOS.map((c) => (
              <SelectItem key={c.id} value={c.id} style={{ color: "var(--text-primary)" }}>
                {c.id} - {c.nombre}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Contenido que solo se muestra cuando hay un ciclo seleccionado */}
      {cicloSeleccionado && (
        <>
          {/* Botón para abrir el formulario de creación (oculto mientras el formulario está abierto) */}
          {!mostrarFormulario && (
            <div className="flex justify-end">
              <button onClick={() => { setModuloAEditar(null); setMostrarFormulario(true); setError("") }}
                style={{ backgroundColor: "var(--accent)" }}
                className="px-4 py-2 text-sm rounded-md text-white hover:opacity-90 transition-opacity font-medium">
                + Nuevo módulo
              </button>
            </div>
          )}

          {/* Formulario de creación o edición de módulo */}
          {mostrarFormulario && (
            <ModuloForm
              moduloInicial={moduloAEditar}  // null → modo creación, objeto → modo edición
              onGuardar={moduloAEditar ? handleGuardarEdicion : handleCrear}
              onCancelar={() => { setMostrarFormulario(false); setModuloAEditar(null); setError("") }}
            />
          )}

          {/* Mensaje de error de validación o de API */}
          {error && <p className="text-sm text-red-400">{error}</p>}

          {/* Tabla de módulos del ciclo con botones de editar y eliminar */}
          <ListaModulosAdmin modulos={modulos} onEditar={handleEditar} onEliminar={setModuloAEliminar} />
        </>
      )}

      {/* Modal de confirmación de borrado — aparece solo cuando hay un módulo pendiente de eliminar */}
      {moduloAEliminar && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div style={{ backgroundColor: "var(--bg-surface)", border: "1px solid var(--border)" }}
            className="rounded-xl p-6 max-w-sm w-full flex flex-col gap-4">
            <h2 style={{ fontFamily: "Sora, sans-serif", color: "var(--text-primary)" }}
              className="text-lg font-bold">
              Eliminar módulo
            </h2>
            <p style={{ color: "var(--text-secondary)" }} className="text-sm">
              ¿Estás seguro? Se eliminará también de todos los estudiantes del ciclo. Esta acción no se puede deshacer.
            </p>
            <div className="flex gap-3 justify-end">
              {/* Cancelar: cierra el modal sin realizar ninguna acción */}
              <button onClick={() => setModuloAEliminar(null)}
                style={{ border: "1px solid var(--border)", color: "var(--text-secondary)" }}
                className="px-4 py-2 text-sm rounded-md hover:text-white hover:border-white transition-colors">
                Cancelar
              </button>
              {/* Confirmar: llama a la API de borrado */}
              <button onClick={confirmarEliminar}
                className="px-4 py-2 text-sm rounded-md bg-red-600 text-white hover:bg-red-700 transition-colors">
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}