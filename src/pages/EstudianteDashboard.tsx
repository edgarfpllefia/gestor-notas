import { useNavigate } from "react-router-dom"
import { useAuth } from "@/contexts/AuthContext"
import { CICLOS_FORMATIVOS } from "@/data/constants"
import { User, Mail, BookOpen, Shield } from "lucide-react"

export const EstudianteDashboard = () => {
  const { user } = useAuth()
  const navigate = useNavigate()

  const cicloInfo = CICLOS_FORMATIVOS.find((c) => c.id === user?.ciclo)

  const campos = [
    { icon: User,     label: "Nombre",          value: user?.nombre },
    { icon: Mail,     label: "Email",            value: user?.email },
    { icon: BookOpen, label: "Ciclo formativo",  value: cicloInfo ? `${cicloInfo.id} — ${cicloInfo.nombre}` : user?.ciclo },
    { icon: Shield,   label: "Rol",              value: user?.rol },
  ]

  return (
    <div className="w-full max-w-lg mx-auto px-4 md:px-0 py-10 md:py-16 flex flex-col gap-6 md:gap-8">

      <div className="flex flex-col gap-1">
        <h1 style={{ fontFamily: "Sora, sans-serif", color: "var(--text-primary)" }}
          className="text-xl md:text-2xl font-bold">
          Mi perfil
        </h1>
        <p style={{ color: "var(--text-secondary)" }} className="text-sm">
          Información de tu cuenta
        </p>
      </div>

      <div style={{ backgroundColor: "var(--bg-surface)", border: "1px solid var(--border)" }}
        className="rounded-2xl overflow-hidden">
        {campos.map(({ icon: Icon, label, value }, index) => (
          <div key={label}
            style={{ borderBottom: index < campos.length - 1 ? "1px solid var(--border)" : "none" }}
            className="flex items-center gap-4 px-5 md:px-6 py-4 md:py-5">
            <div style={{ backgroundColor: "var(--bg-surface-2)", color: "var(--accent)" }}
              className="size-9 rounded-lg flex items-center justify-center shrink-0">
              <Icon className="size-4" />
            </div>
            <div className="flex flex-col gap-0.5 flex-1 min-w-0">
              <span style={{ color: "var(--text-secondary)" }}
                className="text-xs font-medium uppercase tracking-wider">
                {label}
              </span>
              <span style={{ color: "var(--text-primary)" }}
                className="text-sm font-medium capitalize truncate">
                {value}
              </span>
            </div>
          </div>
        ))}
      </div>

      <button onClick={() => navigate("/estudiante/modulos")}
        style={{ backgroundColor: "var(--accent)" }}
        className="w-full py-3 rounded-xl text-white font-semibold text-sm hover:opacity-90 transition-opacity">
        Ver mis módulos
      </button>

    </div>
  )
}
