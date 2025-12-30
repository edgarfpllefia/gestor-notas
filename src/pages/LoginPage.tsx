import { useAuth } from "@/contexts/AuthContext"

export const LoginPage = () => {
  const { login } = useAuth()

  return (
    <div className="flex flex-col justify-center items-center gap-6">
      <h2 className=" text-center text-5xl font-bold">Login</h2>
      <button className="bg-slate-800 text-white px-10 py-3 rounded-lg cursor-pointer " onClick={() =>login({ id: "1", name: "Alumno", role: "estudiante" })}>Login</button>
    </div>
  )
  
}
