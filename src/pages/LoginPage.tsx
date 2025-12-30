import { useAuth } from "@/contexts/AuthContext"

export const LoginPage = () => {
  const { login } = useAuth()

  return (
    <div>
      <h2>Login</h2>
      <button onClick={() =>login({ id: "1", name: "Alumno", role: "estudiante" })}></button>
    </div>
  )
}
