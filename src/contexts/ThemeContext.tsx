import { createContext, useContext, useState, useEffect } from "react"

// Contexto global de tema (dark/light)
const ThemeContext = createContext()

/**
 * ThemeProvider
 * Gestiona el tema visual de la aplicación y lo persiste en localStorage.
 */
export function ThemeProvider({ children }) {
  // Valor inicial: tema persistido o "dark" por defecto
  const [tema, setTema] = useState(() => {
    return localStorage.getItem("tema") || "dark"
  })

  // Sincroniza atributo HTML y almacenamiento cada vez que cambia el tema
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", tema === "light" ? "light" : "")
    localStorage.setItem("tema", tema)
  }, [tema])

  // Alterna entre modo oscuro y claro
  const toggleTema = () => {
    setTema(prev => prev === "dark" ? "light" : "dark")
  }

  return (
    <ThemeContext.Provider value={{ tema, toggleTema }}>
      {children}
    </ThemeContext.Provider>
  )
}

// Hook de conveniencia para consumir ThemeContext
export function useTheme() {
  return useContext(ThemeContext)
}
