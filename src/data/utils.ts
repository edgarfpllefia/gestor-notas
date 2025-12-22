//Con esta función, pasandole el valor en key, podemos devolver el valor de localStorage que le pido.

//En el futuro tenemos que pasarlo a TypeScript
//Con el try, si tenemos un error, lo gestionamos en el catch
//Con el ternario del return, si data es verdadero, hacemos un JSON.parse a data

export const readLocalStorage = (key: string) => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error(`Error leyendo ${key}:`, error);
    return [];
  }
};

//Con esta función podemos escribir en el localStorage
//El primer valor es la clave donde quiero entrar de localStorage
//El segundo valor es lo que quiero guardar

export const writeLocalStorage = (key: string, data: string) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(`Error guardando ${key}:`, error);
  }
};

export const generarId = () => {
  // AQUÍ DEJO QUE HACE LA FUNCION generarID YA QUE NO ME QUEDABA CLARO

  // Date.now() obtiene milisegundos desde 1970 (ej: 1734812456789) y lo convierte a string
  // Math.random() genera número aleatorio (ej: 0.7392847), lo pasa a base 36 (0-9 y a-z)
  // .substr(2,9) elimina el "0." inicial y toma 9 caracteres (ej: "k7f3g2h9j")
  // Concatena ambos: "1734812456789" + "k7f3g2h9j" = "1734812456789k7f3g2h9j" (ID único)
  return Date.now().toString() + Math.random().toString(36).substr(2, 9);
};

//Si key o data salen en rojo es porque estoy en el archivo .ts y aun no está tipado.
