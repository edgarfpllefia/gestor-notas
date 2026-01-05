import { useAuth } from "@/contexts/AuthContext"


//LoginPage - Página de inicio de sesión

//Componente que permite a los usuarios autenticarse en la aplicación.
export const LoginPage = () => {
  // Hook para acceder a la función de login del contexto
  const { login } = useAuth()

  return (
    <div className="flex flex-col justify-center items-center gap-6">
      <h2 className=" text-center text-5xl font-bold">Login</h2>
      {/* Botón que simula el login de un estudiante */}
      <button className="bg-slate-800 text-white px-10 py-3 rounded-lg cursor-pointer " onClick={() =>login({ id: "1", name: "Alumno", role: "estudiante" })}>Login</button>
    </div>
  )
  
}

