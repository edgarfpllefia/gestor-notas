import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Layout } from "@/components/layout/Layout"
import { AuthProvider } from "@/contexts/AuthContext"
import { ThemeProvider } from "@/contexts/ThemeContext"
import ProtectedRoute from "@/components/auth/ProtectedRoute"

import { HomePage, LoginPage, RegisterPage, EstudianteDashboard, AdminDashboard, ModulosEstudiante, DetalleModulo } from "@/pages"

/**
 * App
 * Punto de entrada de la aplicación.
 * Define el árbol global de providers y el enrutado principal.
 */
export default function App() {
  return (
    // ThemeProvider gestiona modo claro/oscuro en toda la app
    <ThemeProvider>
      {/* AuthProvider comparte sesión de usuario y acciones auth globales */}
      <AuthProvider>
        {/* BrowserRouter habilita navegación basada en URL */}
        <BrowserRouter>
          <Routes>
            {/* Layout envuelve todas las páginas con Header/Footer */}
            <Route element={<Layout />}>
              {/* Rutas públicas */}
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />

              {/* Área estudiante: perfil */}
              <Route
                path="/estudiante"
                element={
                  <ProtectedRoute role="estudiante">
                    <EstudianteDashboard />
                  </ProtectedRoute>
                }
              />

              {/* Área estudiante: listado de módulos */}
              <Route
                path="/estudiante/modulos"
                element={
                  <ProtectedRoute role="estudiante">
                    <ModulosEstudiante />
                  </ProtectedRoute>
                }
              />

              {/* Área estudiante: detalle de módulo y tareas */}
              <Route
                path="/estudiante/modulos/:moduloId/tareas"
                element={
                  <ProtectedRoute role="estudiante">
                    <DetalleModulo />
                  </ProtectedRoute>
                }
              />

              {/* Área administración: gestión global de módulos */}
              <Route
                path="/admin"
                element={
                  <ProtectedRoute role="admin">
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  )
}
