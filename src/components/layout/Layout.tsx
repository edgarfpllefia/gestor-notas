import { Outlet } from "react-router-dom"
import { Header } from "./Header"
import { Footer } from "./Footer"

/**
 * Layout
 * Estructura base de la aplicación: cabecera fija, contenido de ruta y pie.
 * `Outlet` renderiza la página activa según el enrutador.
 */
export const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "var(--bg-base)" }}>
      <Header />
      {/* Contenido dinámico de la ruta actual */}
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
