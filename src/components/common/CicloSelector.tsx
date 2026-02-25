import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { CICLOS_FORMATIVOS } from "@/data/constants"

export const CicloSelector = ({ cicloSeleccionado, onCicloChange }) => {
  return (
    <Select value={cicloSeleccionado} onValueChange={onCicloChange}>
      <SelectTrigger className="w-full"
        style={{
          backgroundColor: "var(--bg-surface)",
          border: "1px solid var(--border)",
          color: "var(--text-primary)",
        }}>
        <SelectValue placeholder="Selecciona un ciclo formativo" />
      </SelectTrigger>
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
