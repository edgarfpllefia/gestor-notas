import { useNavigate } from "react-router-dom"
import { useAuth } from "@/contexts/AuthContext"
import { CICLOS_FORMATIVOS } from "@/data/constants"

export const EstudianteDashboard = () => {
  const { user } = useAuth()
  const navigate = useNavigate()

  // Buscar el nombre completo del ciclo
  const cicloInfo = CICLOS_FORMATIVOS.find((c) => c.id === user?.ciclo)

  return (
    <div className="max-w-xl mx-auto px-4 py-8 flex flex-col gap-6">
      <h1 className="text-2xl font-bold text-gray-900">Mi perfil</h1>

      {/* Tarjeta con datos del estudiante */}
      <div className="bg-white border rounded-lg p-6 shadow-sm flex flex-col gap-4">

        <div className="flex flex-col gap-1">
          <span className="text-sm font-medium text-gray-500">Nombre</span>
          <span className="text-gray-900">{user?.nombre}</span>
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-sm font-medium text-gray-500">Email</span>
          <span className="text-gray-900">{user?.email}</span>
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-sm font-medium text-gray-500">Ciclo formativo</span>
          <span className="text-gray-900">
            {cicloInfo ? `${cicloInfo.id} - ${cicloInfo.nombre}` : user?.ciclo}
          </span>
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-sm font-medium text-gray-500">Rol</span>
          <span className="text-gray-900 capitalize">{user?.rol}</span>
        </div>

      </div>

      {/* Botón para ir a módulos */}
      <button
        onClick={() => navigate("/estudiante/modulos")}
        className="w-full px-4 py-3 rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700"
      >
        Ver mis módulos
      </button>
    </div>
  )
}
