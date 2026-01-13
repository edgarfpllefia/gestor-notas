
export const RegisterForm = () => {

function validarNombre(): string | true {
    const input = document.querySelector<HTMLInputElement>("#nombre")

    if (!input) {
        return "El campo nombre no existe"
    }

    if (input.value.trim() === "") {
        return "Nombre obligatorio"
    }

    return true
}




return (

    <form action="">

        <label>Nombre</label>
        <input id="nombre" type="text" onChange={validarNombre} required/>
        

        <label>Email</label>
        <input type="email" required/>

        <label>Contraseña</label>
        <input type="password" required/>

        <label>Confirmar contraseña</label>
        <input type="text" required/>

        <select name="" id="" required>
            <option value="M0616">M0616</option>
            <option value="M0615">M0615</option>
            <option value="M0612">M0612</option>
        </select>

        <input type="submit" />
    </form>
)

}