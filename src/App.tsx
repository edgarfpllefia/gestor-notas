import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Layout } from "@/components/layout/Layout"
import { AuthProvider } from "@/contexts/AuthContext"
import { ThemeProvider } from "@/contexts/ThemeContext"
import ProtectedRoute from "@/components/auth/ProtectedRoute"

import {HomePage,LoginPage,RegisterPage,EstudianteDashboard,AdminDashboard,ModulosEstudiante,DetalleModulo} from "@/pages"

export default function App() {
  return (
    <ThemeProvider>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            <Route
              path="/estudiante"
              element={
                <ProtectedRoute role="estudiante">
                  <EstudianteDashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/estudiante/modulos"
              element={
                <ProtectedRoute role="estudiante">
                  <ModulosEstudiante />
                </ProtectedRoute>
              }
            />

            <Route
              path="/estudiante/modulos/:moduloId/tareas"
              element={
                <ProtectedRoute role="estudiante">
                  <DetalleModulo />
                </ProtectedRoute>
              }
            />

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
