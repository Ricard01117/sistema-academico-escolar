export const calcularPromedio = (
  calificaciones
) => {
  if (
    !calificaciones ||
    calificaciones.length === 0
  ) {
    return 0;
  }

  const valores =
    calificaciones.map(
      Number
    );

  const suma =
    valores.reduce(
      (total, valor) =>
        total + valor,
      0
    );

  return suma / valores.length;
};

export const obtenerEstado = (
  promedio
) => {
  const valor =
    Number(promedio);

  if (valor >= 7) {
    return "Aprobado";
  }

  if (valor >= 6) {
    return "En riesgo";
  }

  return "Reprobado";
};