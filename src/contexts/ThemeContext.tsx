import { createContext, useContext, useState, useEffect } from "react"

const ThemeContext = createContext()

export function ThemeProvider({ children }) {
  const [tema, setTema] = useState(() => {
    return localStorage.getItem("tema") || "dark"
  })

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", tema === "light" ? "light" : "")
    localStorage.setItem("tema", tema)
  }, [tema])

  const toggleTema = () => {
    setTema(prev => prev === "dark" ? "light" : "dark")
  }

  return (
    <ThemeContext.Provider value={{ tema, toggleTema }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  return useContext(ThemeContext)
}
