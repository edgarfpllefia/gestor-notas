
export const RegisterForm = () => {

function validar(){
    let mensajeError = ""
    if(
        document.querySelector("#nombre").value == "a"
    )
}

return (

<form onSubmit={validar} className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow space-y-4">

  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      Nombre
    </label>
    <input id="nombre" type="text" required className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
  </div>

  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      Email
    </label>
    <input type="email" required className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
  </div>

  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      Contraseña
    </label>
    <input type="password" required className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
  </div>

  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      Confirmar contraseña
    </label>
    <input type="password" required className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
  </div>

  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      Ciclo formativo
    </label>
    <select required className="w-full rounded border border-gray-300 px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
      <option value="">Selecciona un módulo</option>
      <option value="M0616">M0616</option>
      <option value="M0615">M0615</option>
      <option value="M0612">M0612</option>
    </select>
  </div>

  <input type="submit" value="Registrarse" className="w-full bg-blue-900 text-white py-2 rounded font-medium hover:bg-blue-700 transition"/>

</form>

)

}