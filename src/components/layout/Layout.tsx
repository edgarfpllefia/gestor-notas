import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";


//Layout - Diseño principal de la aplicación

//Usa Outlet de React Router para renderizar las páginas específicas.
 
export const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 p-4">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
