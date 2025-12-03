# 🐙 Git, GitHub y Flujo de Trabajo

Este documento explica cómo gestionamos el código fuente. El objetivo es trabajar en equipo sin sobrescribir el trabajo de los demás y manteniendo un historial limpio.

---

## 1. Conceptos Fundamentales

### Repositorio (Repo)
Es tu carpeta de proyecto, pero Git vigila cada cambio.
*   **Local**: La copia en tu ordenador.
*   **Remoto (Origin)**: La copia en GitHub (la "nube").

### Commit (Guardado)
Es una "foto" del código en un momento exacto.
*   No guardes "por si acaso". Guarda cuando tengas una **unidad de trabajo lógica** hecha (ej: "He terminado el diseño del botón").
*   Cada commit tiene un mensaje que debe explicar **qué** hiciste.

### Rama (Branch)
Es una línea temporal paralela.
*   **main**: La realidad oficial. El código estable y probado que está en "producción".
*   **dev**: La rama de desarrollo activo. Aquí se integran todas las nuevas funcionalidades antes de llegar a `main`.
*   **feature/mi-tarea**: Mi realidad alternativa donde estoy creando algo nuevo. Si rompo algo aquí, no afecta a `dev` ni a `main`.

---

## 2. Nuestro Flujo de Trabajo (Workflow)

Usamos una variante simplificada de **Gitflow** con rama `dev`. Sigue estos pasos rigurosamente para cada tarea:

### ¿Por qué dos ramas principales?

*   **`dev`**: Es donde trabajamos día a día. Todas las features nuevas se fusionan aquí primero. Puede tener código en desarrollo que aún no está completamente probado.
*   **`main`**: Es el código "estable" y probado. Solo se actualiza cuando `dev` tiene una versión lista para producción o cuando se completa un sprint importante.

**Flujo visual:**
```
feature/login → dev → main
feature/tareas → dev → main
fix/bug → dev → main
```

Todas las ramas de trabajo se crean desde `dev` y se fusionan de vuelta a `dev`.

### Paso 1: Actualizar
Antes de empezar nada, asegúrate de tener la última versión de la rama de desarrollo.
```bash
git checkout dev
git pull origin dev
```

### Paso 2: Crear Rama
Crea una rama para tu tarea específica desde `dev`. Usa nombres descriptivos.
```bash
# Estructura: tipo/descripcion-corta
git checkout -b feature/login-usuario
git checkout -b fix/error-calculo-notas
git checkout -b docs/actualizar-readme
```

### Paso 3: Trabajar y Confirmar (Commit)
Haces cambios en tus archivos. Git los detecta.
1.  **Staging (`git add`)**: Eliges qué archivos quieres guardar en la foto.
    ```bash
    git add .  # Añade todo lo modificado
    ```
2.  **Commit**: Haces la foto y le pones etiqueta.
    ```bash
    git commit -m "feat: crea formulario de login básico"
    ```

### Paso 4: Publicar (Push)
Subes tu realidad alternativa a la nube para que otros la vean.
```bash
git push origin feature/login-usuario
```

### Paso 5: Integrar (Pull Request)
Vas a GitHub y abres una **Pull Request (PR)**.
*   Estás diciendo: "He terminado mi tarea en `feature/login-usuario`, por favor, revisadla y fusionadla con `dev`".
*   **Importante**: Las PRs siempre van a `dev`, no directamente a `main`.
*   Tu compañero revisa el código. Si todo está bien, se hace **Merge** a `dev`.

### Paso 6: Actualizar Dev (Después del Merge)
Una vez que tu PR se ha fusionado en `dev`, actualiza tu rama local:
```bash
git checkout dev
git pull origin dev
```

### Paso 7: De Dev a Main (Solo cuando esté estable)
Cuando `dev` tenga suficientes funcionalidades estables y probadas, se hace un merge de `dev` a `main`. Esto normalmente lo hace el equipo después de revisar que todo funciona correctamente.

---

## 3. Conventional Commits (Mensajes Profesionales)

No escribas mensajes como "cambios", "asdf" o "arreglado". Usa esta convención para que el historial sea legible:

*   **feat**: Una nueva funcionalidad (feature).
    > `feat: añade componente de tarjeta de modulo`
*   **fix**: Arreglar un error (bug).
    > `fix: corrige cálculo de media incorrecto`
*   **docs**: Cambios solo en documentación.
    > `docs: actualiza instrucciones de instalación`
*   **style**: Cambios de formato (espacios, puntos y coma) que no afectan la lógica.
*   **refactor**: Cambiar código para mejorarlo sin cambiar su comportamiento.

---

## 4. Guía de Emergencia

### "He hecho un lío y quiero volver al último commit"
⚠️ Esto borra tus cambios no guardados.
```bash
git checkout .
```

### "¿En qué rama estoy?"
```bash
git branch
# O simplemente:
git status
```

### "Git me dice que hay conflictos"
Esto pasa cuando dos personas tocan la misma línea de código.
1.  Abre los archivos con conflicto (VS Code los marca en rojo).
2.  Verás algo como:
    ```
    <<<<<<< HEAD
    Código de mi rama
    =======
    Código que llegó de la otra rama
    >>>>>>> dev
    ```
3.  Borra las marcas y deja el código como debería quedar finalmente.
4.  Guarda, haz `git add .` y `git commit`.

### "Quiero actualizar mi rama feature con los últimos cambios de dev"
Si mientras trabajas en tu feature, `dev` ha avanzado y quieres tener esos cambios:
```bash
git checkout feature/mi-tarea
git pull origin dev  # O: git merge dev
# Resuelve conflictos si los hay
git push origin feature/mi-tarea
```

---
[⬅️ Volver al Manual del Alumno](../MANUAL_ALUMNO.md)

