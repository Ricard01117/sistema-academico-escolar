import { useEffect, useState } from "react";

import {
  obtenerAlumnos,
} from "../services/alumnosService";

import {
  obtenerMaterias,
} from "../services/materiasService";

import {
  obtenerCalificaciones,
  guardarCalificacion,
  eliminarCalificacion,
} from "../services/calificacionesService";

import {
  calcularPromedio,
  obtenerEstado,
} from "../utils/calculos";

function Calificaciones({ modo }) {
  const esInfantil = modo === "infantil";

  const [alumnos, setAlumnos] =
    useState([]);

  const [materias, setMaterias] =
    useState([]);

  const [calificaciones, setCalificaciones] =
    useState([]);

  const cargarDatos = () => {
    setAlumnos(obtenerAlumnos());
    setMaterias(obtenerMaterias());
    setCalificaciones(
      obtenerCalificaciones()
    );
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  const obtenerNota = (
    alumnoId,
    materiaId
  ) => {
    const registro =
      calificaciones.find(
        (item) =>
          item.alumnoId === alumnoId &&
          item.materiaId === materiaId
      );

    return registro
      ? registro.calificacion
      : "";
  };

  const cambiarCalificacion = (
    alumnoId,
    materiaId,
    valor
  ) => {
    if (valor === "") {
      eliminarCalificacion(
        alumnoId,
        materiaId
      );

      setCalificaciones(
        obtenerCalificaciones()
      );

      return;
    }

    const numero = Number(valor);

    if (
      Number.isNaN(numero) ||
      numero < 0 ||
      numero > 10
    ) {
      return;
    }

    guardarCalificacion(
      alumnoId,
      materiaId,
      numero
    );

    setCalificaciones(
      obtenerCalificaciones()
    );
  };

  const obtenerPromedioAlumno = (
    alumnoId
  ) => {
    const notas = calificaciones
      .filter(
        (item) =>
          item.alumnoId === alumnoId
      )
      .map(
        (item) => item.calificacion
      );

    return calcularPromedio(notas);
  };

  return (
    <div className="pagina">
      <div className="pagina-titulo">
        <div>
          <h1>
            {esInfantil
              ? "📝 Calificaciones"
              : "Calificaciones"}
          </h1>

          <p>
            Modifica las calificaciones directamente
            desde la tabla.
          </p>
        </div>
      </div>

      <div className="tabla-container">
        {alumnos.length === 0 ? (
          <div className="estado-vacio grande">
            Primero debes registrar alumnos.
          </div>
        ) : materias.length === 0 ? (
          <div className="estado-vacio grande">
            Primero debes registrar materias.
          </div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Alumno</th>

                {materias.map(
                  (materia) => (
                    <th key={materia.id}>
                      {materia.nombre}
                    </th>
                  )
                )}

                <th>Promedio</th>

                <th>Estado</th>
              </tr>
            </thead>

            <tbody>
              {alumnos.map(
                (alumno) => {
                  const promedio =
                    obtenerPromedioAlumno(
                      alumno.id
                    );

                  const estado =
                    obtenerEstado(
                      promedio
                    );

                  return (
                    <tr
                      key={alumno.id}
                    >
                      <td>
                        <strong>
                          {esInfantil &&
                            (alumno.genero ===
                            "F"
                              ? "👧 "
                              : "👦 ")}

                          {alumno.nombre}
                        </strong>
                      </td>

                      {materias.map(
                        (materia) => (
                          <td
                            key={
                              materia.id
                            }
                          >
                            <input
                              className="input-calificacion"
                              type="number"
                              min="0"
                              max="10"
                              step="0.1"
                              value={obtenerNota(
                                alumno.id,
                                materia.id
                              )}
                              onChange={(e) =>
                                cambiarCalificacion(
                                  alumno.id,
                                  materia.id,
                                  e.target
                                    .value
                                )
                              }
                            />
                          </td>
                        )
                      )}

                      <td>
                        <strong>
                          {promedio > 0
                            ? promedio.toFixed(
                                1
                              )
                            : "-"}
                        </strong>
                      </td>

                      <td>
                        {promedio > 0 ? (
                          <span
                            className={`estado ${estado
                              .toLowerCase()
                              .replace(
                                " ",
                                "-"
                              )}`}
                          >
                            {esInfantil &&
                              (estado ===
                              "Aprobado"
                                ? "🟢 "
                                : estado ===
                                  "En riesgo"
                                ? "🟡 "
                                : "🔴 ")}

                            {estado}
                          </span>
                        ) : (
                          <span className="estado sin-calificacion">
                            Sin calificaciones
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Calificaciones;