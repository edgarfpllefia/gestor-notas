//Con esta función, pasandole el valor en key, podemos devolver el valor de localStorage que le pido.

//En el futuro tenemos que pasarlo a TypeScript
//Con el try, si tenemos un error, lo gestionamos en el catch
//Con el ternario del return, si data es verdadero, hacemos un JSON.parse a data

export const readLocalStorage = (key) => {
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

export const writeLocalStorage = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(`Error guardando ${key}:`, error);
  }
};

//Si key o data salen en rojo es porque estás en el archivo .ts y aun no están tipadas
