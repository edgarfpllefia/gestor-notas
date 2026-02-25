import { useAuth } from "@/contexts/AuthContext"
import { useNavigate } from "react-router-dom"

export function LogoutPage() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Benvingut/da, {user?.nombre || user?.name}</h1>

      <button
        onClick={handleLogout}
        className="mt-4 bg-red-600 text-white px-4 py-2 rounded"
      >
        Tancar sessió
      </button>
    </div>
  )
}
