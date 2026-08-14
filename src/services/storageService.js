export const guardarDatos = (
  clave,
  datos
) => {
  localStorage.setItem(
    clave,
    JSON.stringify(datos)
  );
};

export const obtenerDatos = (
  clave,
  valorInicial = []
) => {
  const datos =
    localStorage.getItem(clave);

  if (!datos) {
    return valorInicial;
  }

  try {
    return JSON.parse(datos);
  } catch (error) {
    console.error(
      "Error al leer los datos:",
      error
    );

    return valorInicial;
  }
};

export const eliminarDatos = (
  clave
) => {
  localStorage.removeItem(clave);
};

export const limpiarAlmacenamiento =
  () => {
    localStorage.clear();
  };

export const obtenerConfiguracion =
  () => {
    return obtenerDatos(
      "sistema_configuracion",
      {
        modo: "infantil",
        tema: "claro",
      }
    );
  };

export const guardarConfiguracion =
  (configuracion) => {
    guardarDatos(
      "sistema_configuracion",
      configuracion
    );
  };