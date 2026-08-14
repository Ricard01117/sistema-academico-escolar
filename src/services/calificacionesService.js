import {
  guardarDatos,
  obtenerDatos,
} from "./storageService";

const CLAVE =
  "sistema_calificaciones";

export const obtenerCalificaciones =
  () => {
    return obtenerDatos(
      CLAVE,
      []
    );
  };

export const guardarCalificaciones =
  (calificaciones) => {
    guardarDatos(
      CLAVE,
      calificaciones
    );
  };

export const guardarCalificacion =
  (
    alumnoId,
    materiaId,
    calificacion
  ) => {
    const calificaciones =
      obtenerCalificaciones();

    const existente =
      calificaciones.find(
        (item) =>
          item.alumnoId ===
            alumnoId &&
          item.materiaId ===
            materiaId
      );

    if (existente) {
      const actualizadas =
        calificaciones.map(
          (item) =>
            item.alumnoId ===
              alumnoId &&
            item.materiaId ===
              materiaId
              ? {
                  ...item,
                  calificacion:
                    Number(
                      calificacion
                    ),
                }
              : item
        );

      guardarCalificaciones(
        actualizadas
      );

      return actualizadas;
    }

    const nueva = {
      id: `${alumnoId}-${materiaId}`,
      alumnoId,
      materiaId,
      calificacion:
        Number(calificacion),
    };

    const actualizadas = [
      ...calificaciones,
      nueva,
    ];

    guardarCalificaciones(
      actualizadas
    );

    return actualizadas;
  };

export const eliminarCalificacion =
  (
    alumnoId,
    materiaId
  ) => {
    const calificaciones =
      obtenerCalificaciones();

    const actualizadas =
      calificaciones.filter(
        (item) =>
          !(
            item.alumnoId ===
              alumnoId &&
            item.materiaId ===
              materiaId
          )
      );

    guardarCalificaciones(
      actualizadas
    );

    return actualizadas;
  };

export const eliminarCalificacionesDeAlumno =
  (alumnoId) => {
    const calificaciones =
      obtenerCalificaciones();

    const actualizadas =
      calificaciones.filter(
        (item) =>
          item.alumnoId !==
          alumnoId
      );

    guardarCalificaciones(
      actualizadas
    );

    return actualizadas;
  };

export const eliminarCalificacionesDeMateria =
  (materiaId) => {
    const calificaciones =
      obtenerCalificaciones();

    const actualizadas =
      calificaciones.filter(
        (item) =>
          item.materiaId !==
          materiaId
      );

    guardarCalificaciones(
      actualizadas
    );

    return actualizadas;
  };