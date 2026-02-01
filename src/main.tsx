import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { inicializarDatosMock } from './data/mockData'

// Inicializar datos mock en LocalStorage solo si no existen
if (!localStorage.getItem('usuarios')) {
  inicializarDatosMock()
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
