import RegisterForm from "@/pages/RegisterForm"

/**
 * RegisterPage
 * Página de registro que envuelve el formulario de alta de usuarios.
 */

export const RegisterPage = () => {
  return (
    <div>
      <h2 className=" text-center text-5xl font-bold">Registro</h2>
      <RegisterForm></RegisterForm>
    </div>
  )
}