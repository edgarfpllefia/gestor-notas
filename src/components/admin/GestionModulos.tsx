import { useState, useEffect } from "react"
import { CICLOS_FORMATIVOS } from "@/data/constants"
import { localStorageModuloRepo } from "@/data/repositories/moduloRepository"
import { localStorageModuloEstudianteRepo } from "@/data/repositories/moduloEstudianteRepository"
import { localStorageUsuarioRepo } from "@/data/repositories/usuarioRepository"
import { ModuloForm } from "./ModuloForm"
import { ListaModulosAdmin } from "./ListaModulosAdmin"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function GestionModulos() {
  const [cicloSeleccionado, setCicloSeleccionado] = useState("")
  const [modulos, setModulos] = useState([])
  const [mostrarFormulario, setMostrarFormulario] = useState(false)
  const [moduloAEditar, setModuloAEditar] = useState(null)
  const [moduloAEliminar, setModuloAEliminar] = useState(null)
  const [error, setError] = useState("")

  useEffect(() => {
    if (cicloSeleccionado) cargarModulos()
    else setModulos([])
  }, [cicloSeleccionado])

  const cargarModulos = () => setModulos(localStorageModuloRepo.getByCiclo(cicloSeleccionado))

  const handleCrear = (datos) => {
    const existe = modulos.some(m => m.nombre.toLowerCase() === datos.nombre.toLowerCase() && m.ciclo === datos.ciclo)
    if (existe) { setError("Ya existe un módulo con ese nombre en este ciclo formativo."); return }
    const nuevoModulo = localStorageModuloRepo.create(datos)
    localStorageUsuarioRepo.getEstudiantesByCiclo(datos.ciclo).forEach(est => {
      localStorageModuloEstudianteRepo.create({ estudianteId: est.id, moduloId: nuevoModulo.id, fechaInscripcion: new Date().toISOString().split("T")[0], estado: "cursando", notas: {} })
    })
    setError(""); setMostrarFormulario(false); cargarModulos()
  }

  const handleEditar = (modulo) => { setModuloAEditar(modulo); setMostrarFormulario(true); setError("") }

  const handleGuardarEdicion = (datos) => {
    const existe = modulos.some(m => m.id !== moduloAEditar.id && m.nombre.toLowerCase() === datos.nombre.toLowerCase() && m.ciclo === datos.ciclo)
    if (existe) { setError("Ya existe un módulo con ese nombre en este ciclo formativo."); return }
    localStorageModuloRepo.update(moduloAEditar.id, datos)
    if (moduloAEditar.ciclo !== datos.ciclo) {
      localStorageModuloEstudianteRepo.deleteByModuloId(moduloAEditar.id)
      localStorageUsuarioRepo.getEstudiantesByCiclo(datos.ciclo).forEach(est => {
        localStorageModuloEstudianteRepo.create({ estudianteId: est.id, moduloId: moduloAEditar.id, fechaInscripcion: new Date().toISOString().split("T")[0], estado: "cursando", notas: {} })
      })
    }
    setError(""); setMostrarFormulario(false); setModuloAEditar(null); cargarModulos()
  }

  const confirmarEliminar = () => {
    localStorageModuloRepo.delete(moduloAEliminar)
    localStorageModuloEstudianteRepo.deleteByModuloId(moduloAEliminar)
    setModuloAEliminar(null); cargarModulos()
  }

  return (
    <div className="max-w-3xl mx-auto px-4 md:px-6 py-8 md:py-10 flex flex-col gap-6">

      <h1 style={{ fontFamily: "Sora, sans-serif", color: "var(--text-primary)" }}
        className="text-xl md:text-2xl font-bold">
        Gestión de módulos
      </h1>

      {/* Selector de ciclo */}
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
            {CICLOS_FORMATIVOS.map((c) => (
              <SelectItem key={c.id} value={c.id} style={{ color: "var(--text-primary)" }}>
                {c.id} - {c.nombre}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {cicloSeleccionado && (
        <>
          {!mostrarFormulario && (
            <div className="flex justify-end">
              <button onClick={() => { setModuloAEditar(null); setMostrarFormulario(true); setError("") }}
                style={{ backgroundColor: "var(--accent)" }}
                className="px-4 py-2 text-sm rounded-md text-white hover:opacity-90 transition-opacity font-medium">
                + Nuevo módulo
              </button>
            </div>
          )}

          {mostrarFormulario && (
            <ModuloForm
              moduloInicial={moduloAEditar}
              onGuardar={moduloAEditar ? handleGuardarEdicion : handleCrear}
              onCancelar={() => { setMostrarFormulario(false); setModuloAEditar(null); setError("") }}
            />
          )}

          {error && <p className="text-sm text-red-400">{error}</p>}

          <ListaModulosAdmin modulos={modulos} onEditar={handleEditar} onEliminar={setModuloAEliminar} />
        </>
      )}

      {/* Diálogo eliminar */}
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
              <button onClick={() => setModuloAEliminar(null)}
                style={{ border: "1px solid var(--border)", color: "var(--text-secondary)" }}
                className="px-4 py-2 text-sm rounded-md hover:text-white hover:border-white transition-colors">
                Cancelar
              </button>
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
