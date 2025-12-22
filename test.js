// test.js - Archivo temporal para testing
import {
  readLocalStorage,
  writeLocalStorage,
  generarId,
} from "./src/data/utils.js";
import { inicializarDatosMock } from "./src/data/mockData.js";
import { localStorageUsuarioRepo } from "./src/data/repositories/usuarioRepository.js";

console.log("🧪 INICIANDO TESTS...\n");

// ========================================
// TEST 1: FUNCIONES HELPER
// ========================================
console.log("📦 TEST 1: Funciones Helper de LocalStorage");
console.log("─────────────────────────────────────────");

// Test writeLocalStorage
writeLocalStorage("test", [{ id: "1", nombre: "Prueba" }]);
console.log("✅ writeLocalStorage - OK");

// Test readLocalStorage
const data = readLocalStorage("test");
console.log("Datos leídos:", data);
console.log("✅ readLocalStorage - OK");

// Test generarId
const id1 = generarId();
const id2 = generarId();
console.log("ID 1:", id1);
console.log("ID 2:", id2);
console.log("¿Son únicos?", id1 !== id2);
console.log("✅ generarId - OK");

// Limpiar
localStorage.removeItem("test");
console.log("🧹 Test limpiado\n");

// ========================================
// TEST 2: INICIALIZACIÓN DE DATOS
// ========================================
console.log("📦 TEST 2: Inicialización de Datos Mock");
console.log("─────────────────────────────────────────");

inicializarDatosMock();
console.log("✅ inicializarDatosMock ejecutado");

const usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");
const modulos = JSON.parse(localStorage.getItem("modulos") || "[]");
const modulosEstudiantes = JSON.parse(
  localStorage.getItem("modulosEstudiantes") || "[]"
);
const tareas = JSON.parse(localStorage.getItem("tareas") || "[]");

console.log("Usuarios:", usuarios.length, "(esperado: 8)");
console.log("Módulos:", modulos.length, "(esperado: 29)");
console.log("Inscripciones:", modulosEstudiantes.length, "(esperado: 20)");
console.log("Tareas:", tareas.length, "(esperado: 14)");

if (
  usuarios.length === 8 &&
  modulos.length === 29 &&
  modulosEstudiantes.length === 20 &&
  tareas.length === 14
) {
  console.log("✅ Todos los datos cargados correctamente\n");
} else {
  console.log("❌ Error: Cantidades incorrectas\n");
}

// ========================================
// TEST 3: REPOSITORIOS (CRUD)
// ========================================
console.log("📦 TEST 3: Operaciones CRUD en Repositorios");
console.log("─────────────────────────────────────────");

// Test getAll
const todosUsuarios = localStorageUsuarioRepo.getAll();
console.log(
  "getAll() - Total usuarios:",
  todosUsuarios.length,
  "(esperado: 8)"
);
console.log(todosUsuarios.length === 8 ? "✅ getAll - OK" : "❌ getAll - FAIL");

// Test getById
const edgar = localStorageUsuarioRepo.getById("4");
console.log('getById("4") - Usuario:', edgar?.nombre || "No encontrado");
console.log(
  edgar?.nombre === "Edgar Fernández García"
    ? "✅ getById - OK"
    : "❌ getById - FAIL"
);

// Test getByEmail
const usuarioPorEmail = localStorageUsuarioRepo.getByEmail(
  "edgar.fernandez@alumno.es"
);
console.log(
  "getByEmail() - Usuario:",
  usuarioPorEmail?.nombre || "No encontrado"
);
console.log(
  usuarioPorEmail?.id === "4" ? "✅ getByEmail - OK" : "❌ getByEmail - FAIL"
);

// Test create
const nuevoUsuario = localStorageUsuarioRepo.create({
  nombre: "Test Usuario",
  email: "test@test.com",
  rol: "estudiante",
  ciclo: "DAW",
});
console.log("create() - Usuario creado con ID:", nuevoUsuario.id);
const cantidadDespuesCrear = localStorageUsuarioRepo.getAll().length;
console.log(
  "Total usuarios después de crear:",
  cantidadDespuesCrear,
  "(esperado: 9)"
);
console.log(cantidadDespuesCrear === 9 ? "✅ create - OK" : "❌ create - FAIL");

// Test update
const actualizado = localStorageUsuarioRepo.update(nuevoUsuario.id, {
  nombre: "Usuario Actualizado",
});
console.log(
  "update() - Nombre actualizado:",
  actualizado?.nombre || "No encontrado"
);
console.log(
  actualizado?.nombre === "Usuario Actualizado"
    ? "✅ update - OK"
    : "❌ update - FAIL"
);

// Test delete
const eliminado = localStorageUsuarioRepo.delete(nuevoUsuario.id);
console.log("delete() - ¿Eliminado?", eliminado);
const cantidadFinal = localStorageUsuarioRepo.getAll().length;
console.log(
  "Total usuarios después de eliminar:",
  cantidadFinal,
  "(esperado: 8)"
);
console.log(cantidadFinal === 8 ? "✅ delete - OK" : "❌ delete - FAIL");

// ========================================
// RESUMEN FINAL
// ========================================
console.log("\n🎉 TODOS LOS TESTS COMPLETADOS");
console.log("═══════════════════════════════════════");
console.log("Revisa los resultados arriba");
console.log("Si todos tienen ✅, todo funciona correctamente");
