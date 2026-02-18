import { useState, useEffect } from "react"
import { CICLOS_FORMATIVOS } from "@/data/constants"
import { localStorageModuloRepo } from "@/data/repositories/moduloRepository"
import { localStorageModuloEstudianteRepo } from "@/data/repositories/moduloEstudianteRepository"
import { localStorageUsuarioRepo } from "@/data/repositories/usuarioRepository"
import { ModuloForm } from "./ModuloForm"
import { ListaModulosAdmin } from "./ListaModulosAdmin"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function GestionModulos() {
  const [cicloSeleccionado, setCicloSeleccionado] = useState("")
  const [modulos, setModulos] = useState([])
  const [mostrarFormulario, setMostrarFormulario] = useState(false)
  const [moduloAEditar, setModuloAEditar] = useState(null)
  const [moduloAEliminar, setModuloAEliminar] = useState(null)
  const [error, setError] = useState("")

  useEffect(() => {
    if (cicloSeleccionado) {
      cargarModulos()
    } else {
      setModulos([])
    }
  }, [cicloSeleccionado])

  const cargarModulos = () => {
    const modulosCiclo = localStorageModuloRepo.getByCiclo(cicloSeleccionado)
    setModulos(modulosCiclo)
  }

  // --- CREAR ---
  const handleCrear = (datos) => {
    const existe = modulos.some(
      (m) => m.nombre.toLowerCase() === datos.nombre.toLowerCase() && m.ciclo === datos.ciclo
    )
    if (existe) {
      setError("Ya existe un módulo con ese nombre en este ciclo formativo.")
      return
    }

    const nuevoModulo = localStorageModuloRepo.create(datos)

    const estudiantes = localStorageUsuarioRepo.getEstudiantesByCiclo(datos.ciclo)
    estudiantes.forEach((estudiante) => {
      localStorageModuloEstudianteRepo.create({
        estudianteId: estudiante.id,
        moduloId: nuevoModulo.id,
        fechaInscripcion: new Date().toISOString().split("T")[0],
        estado: "cursando",
        notas: {},
      })
    })

    setError("")
    setMostrarFormulario(false)
    cargarModulos()
  }

  // --- EDITAR ---
  const handleEditar = (modulo) => {
    setModuloAEditar(modulo)
    setMostrarFormulario(true)
    setError("")
  }

  const handleGuardarEdicion = (datos) => {
    const cicloAnterior = moduloAEditar.ciclo
    const cicloNuevo = datos.ciclo

    const existe = modulos.some(
      (m) =>
        m.id !== moduloAEditar.id &&
        m.nombre.toLowerCase() === datos.nombre.toLowerCase() &&
        m.ciclo === datos.ciclo
    )
    if (existe) {
      setError("Ya existe un módulo con ese nombre en este ciclo formativo.")
      return
    }

    localStorageModuloRepo.update(moduloAEditar.id, datos)

    if (cicloAnterior !== cicloNuevo) {
      localStorageModuloEstudianteRepo.deleteByModuloId(moduloAEditar.id)

      const estudiantesNuevoCiclo = localStorageUsuarioRepo.getEstudiantesByCiclo(cicloNuevo)
      estudiantesNuevoCiclo.forEach((estudiante) => {
        localStorageModuloEstudianteRepo.create({
          estudianteId: estudiante.id,
          moduloId: moduloAEditar.id,
          fechaInscripcion: new Date().toISOString().split("T")[0],
          estado: "cursando",
          notas: {},
        })
      })
    }

    setError("")
    setMostrarFormulario(false)
    setModuloAEditar(null)
    cargarModulos()
  }

  // --- ELIMINAR ---
  const handleEliminar = (moduloId) => {
    setModuloAEliminar(moduloId)
  }

  const confirmarEliminar = () => {
    localStorageModuloRepo.delete(moduloAEliminar)
    localStorageModuloEstudianteRepo.deleteByModuloId(moduloAEliminar)
    setModuloAEliminar(null)
    cargarModulos()
  }

  const cancelarEliminar = () => {
    setModuloAEliminar(null)
  }

  const handleCancelarFormulario = () => {
    setMostrarFormulario(false)
    setModuloAEditar(null)
    setError("")
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 flex flex-col gap-6">
      <h1 className="text-2xl font-bold text-gray-900">Gestión de módulos</h1>

      {/* Selector de ciclo */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">
          Ciclo formativo
        </label>
        <Select value={cicloSeleccionado} onValueChange={setCicloSeleccionado}>
          <SelectTrigger className="w-72">
            <SelectValue placeholder="Selecciona un ciclo" />
          </SelectTrigger>
          <SelectContent position="popper">
            {CICLOS_FORMATIVOS.map((c) => (
              <SelectItem key={c.id} value={c.id}>
                {c.id} - {c.nombre}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Contenido principal */}
      {cicloSeleccionado && (
        <>
          {!mostrarFormulario && (
            <div className="flex justify-end">
              <button
                onClick={() => {
                  setModuloAEditar(null)
                  setMostrarFormulario(true)
                  setError("")
                }}
                className="px-4 py-2 text-sm rounded-md bg-blue-600 text-white hover:bg-blue-700"
              >
                + Nuevo módulo
              </button>
            </div>
          )}

          {mostrarFormulario && (
            <ModuloForm
              moduloInicial={moduloAEditar}
              onGuardar={moduloAEditar ? handleGuardarEdicion : handleCrear}
              onCancelar={handleCancelarFormulario}
            />
          )}

          {error && (
            <p className="text-sm text-red-500">{error}</p>
          )}

          <ListaModulosAdmin
            modulos={modulos}
            onEditar={handleEditar}
            onEliminar={handleEliminar}
          />
        </>
      )}

      {/* Diálogo confirmación eliminar */}
      {moduloAEliminar && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 shadow-lg max-w-sm w-full mx-4 flex flex-col gap-4">
            <h2 className="text-lg font-semibold text-gray-900">Eliminar módulo</h2>
            <p className="text-sm text-gray-600">
              ¿Estás seguro de que quieres eliminar este módulo? Se eliminará
              también de todos los estudiantes del ciclo. Esta acción no se puede deshacer.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={cancelarEliminar}
                className="px-4 py-2 text-sm rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                Cancelar
              </button>
              <button
                onClick={confirmarEliminar}
                className="px-4 py-2 text-sm rounded-md bg-red-600 text-white hover:bg-red-700"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
