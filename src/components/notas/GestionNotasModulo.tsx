import { useState } from "react";
import { NotaEvaluacion } from "./NotaEvaluacion";
import { EstadoModuloSelector } from "./EstadoModuloSelector";
import { localStorageModuloEstudianteRepo } from "@/data/repositories/moduloEstudianteRepository";

// GestionNotasModulo - Componente contenedor para gestionar notas y estado del módulo

export const GestionNotasModulo = ({ moduloEstudiante, onActualizar }) => {
  const [editando, setEditando] = useState(false);
  const [notasEditando, setNotasEditando] = useState(moduloEstudiante?.notas || {});
  const [estadoEditando, setEstadoEditando] = useState(moduloEstudiante?.estado || "cursando");

  // Manejar cambio en una nota específica
  const handleNotaChange = (nombreEvaluacion, valor) => {
    setNotasEditando((prev) => ({
      ...prev,
      [nombreEvaluacion]: valor === "" ? undefined : valor,
    }));
  };

  // Guardar cambios
  const handleGuardar = () => {
    const datosActualizados = {
      notas: notasEditando,
      estado: estadoEditando,
    };

    // Actualizar en LocalStorage
    localStorageModuloEstudianteRepo.update(moduloEstudiante.id, datosActualizados);

    // Notificar al componente padre
    if (onActualizar) {
      onActualizar();
    }

    setEditando(false);
  };

  // Cancelar edición
  const handleCancelar = () => {
    setNotasEditando(moduloEstudiante?.notas || {});
    setEstadoEditando(moduloEstudiante?.estado || "cursando");
    setEditando(false);
  };

  if (!moduloEstudiante) {
    return (
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <p className="text-gray-500">No hay información de notas para este módulo</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Gestión de Notas</h2>
        {!editando && (
          <button
            onClick={() => setEditando(true)}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Editar Notas
          </button>
        )}
      </div>

      {/* Selector de Estado */}
      <EstadoModuloSelector
        estado={editando ? estadoEditando : moduloEstudiante.estado}
        onChange={setEstadoEditando}
        disabled={!editando}
      />

      {/* Visualización de todas las notas */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-4">Notas por Evaluación</h3>
        
        {editando ? (
          // Modo edición: inputs
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <NotaEvaluacion
              label="Trimestre 1"
              name="trimestre1"
              value={notasEditando.trimestre1}
              onChange={handleNotaChange}
            />
            <NotaEvaluacion
              label="Trimestre 2"
              name="trimestre2"
              value={notasEditando.trimestre2}
              onChange={handleNotaChange}
            />
            <NotaEvaluacion
              label="Trimestre 3"
              name="trimestre3"
              value={notasEditando.trimestre3}
              onChange={handleNotaChange}
            />
            <NotaEvaluacion
              label="Ordinaria"
              name="ordinaria"
              value={notasEditando.ordinaria}
              onChange={handleNotaChange}
            />
            <NotaEvaluacion
              label="Extraordinaria"
              name="extraordinaria"
              value={notasEditando.extraordinaria}
              onChange={handleNotaChange}
            />
          </div>
        ) : (
          // Modo visualización: mostrar notas
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border rounded-lg p-4">
              <span className="font-medium">Trimestre 1:</span>{" "}
              <span className="text-lg">{moduloEstudiante.notas.trimestre1 ?? "-"}</span>
            </div>
            <div className="border rounded-lg p-4">
              <span className="font-medium">Trimestre 2:</span>{" "}
              <span className="text-lg">{moduloEstudiante.notas.trimestre2 ?? "-"}</span>
            </div>
            <div className="border rounded-lg p-4">
              <span className="font-medium">Trimestre 3:</span>{" "}
              <span className="text-lg">{moduloEstudiante.notas.trimestre3 ?? "-"}</span>
            </div>
            <div className="border rounded-lg p-4">
              <span className="font-medium">Ordinaria:</span>{" "}
              <span className="text-lg">{moduloEstudiante.notas.ordinaria ?? "-"}</span>
            </div>
            <div className="border rounded-lg p-4">
              <span className="font-medium">Extraordinaria:</span>{" "}
              <span className="text-lg">{moduloEstudiante.notas.extraordinaria ?? "-"}</span>
            </div>
          </div>
        )}
      </div>

      {/* Botones de acción */}
      {editando && (
        <div className="flex gap-4">
          <button
            onClick={handleGuardar}
            className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
          >
            Guardar
          </button>
          <button
            onClick={handleCancelar}
            className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
          >
            Cancelar
          </button>
        </div>
      )}
    </div>
  );
};
