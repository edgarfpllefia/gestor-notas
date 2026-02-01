import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { CICLOS_FORMATIVOS } from "@/data/constants"

// CicloSelector - Selector de ciclos formativos con Shadcn/ui

export const CicloSelector = ({ cicloSeleccionado, onCicloChange }) => {
  return (
    <div className="mb-6">
      <label className="block text-sm font-medium mb-2">
        Selecciona un ciclo formativo:
      </label>
      
      <Select value={cicloSeleccionado} onValueChange={onCicloChange}>
        <SelectTrigger className="w-full md:w-96">
          <SelectValue placeholder="-- Selecciona un ciclo --" />
        </SelectTrigger>
        
        <SelectContent position="popper" sideOffset={5} className="bg-white dark:bg-gray-900">
          {CICLOS_FORMATIVOS.map((ciclo) => (
            <SelectItem key={ciclo.id} value={ciclo.id}>
              {ciclo.nombre} ({ciclo.grado})
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
