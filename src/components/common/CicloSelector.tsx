// Componentes del Select de la librería UI reutilizable
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { CICLOS_FORMATIVOS } from "@/data/constants"  // Lista estática de ciclos formativos

/**
 * CicloSelector
 * Selector desplegable reutilizable que muestra todos los ciclos formativos
 * disponibles. Se usa en múltiples páginas para filtrar el contenido por ciclo.
 */
export const CicloSelector = ({ cicloSeleccionado, onCicloChange }) => {
  return (
    <Select value={cicloSeleccionado} onValueChange={onCicloChange}>
      {/* Botón que muestra el ciclo activo o el placeholder si no hay ninguno */}
      <SelectTrigger className="w-full"
        style={{
          backgroundColor: "var(--bg-surface)",
          border: "1px solid var(--border)",
          color: "var(--text-primary)",
        }}>
        <SelectValue placeholder="Selecciona un ciclo formativo" />
      </SelectTrigger>

      {/* Listado desplegable con una opción por cada ciclo formativo */}
      <SelectContent position="popper"
        style={{
          backgroundColor: "var(--bg-surface)",
          border: "1px solid var(--border)",
          color: "var(--text-primary)",
        }}>
        {CICLOS_FORMATIVOS.map((ciclo) => (
          <SelectItem key={ciclo.id} value={ciclo.id}
            style={{ color: "var(--text-primary)" }}>
            {ciclo.id} — {ciclo.nombre}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
