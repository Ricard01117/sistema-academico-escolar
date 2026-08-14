import {
  obtenerAlumnos,
} from "../services/alumnosService";

import {
  obtenerMaterias,
} from "../services/materiasService";

import {
  obtenerCalificaciones,
} from "../services/calificacionesService";

import {
  calcularPromedio,
  obtenerEstado,
} from "../utils/calculos";

import { exportarExcel } from "../utils/excel";

function Reportes({ modo }) {
  const esInfantil = modo === "infantil";

  const generarExcel = () => {
    const alumnos =
      obtenerAlumnos();

    const materias =
      obtenerMaterias();

    const calificaciones =
      obtenerCalificaciones();

    if (alumnos.length === 0) {
      alert(
        "No hay alumnos registrados."
      );
      return;
    }

    const datos = alumnos.map(
      (alumno) => {
        const fila = {
          "Nombre completo":
            alumno.nombre,

          Matrícula:
            alumno.matricula,

          Grupo:
            alumno.grupo,

          Grado:
            alumno.grado || "",
        };

        const notas = [];

        materias.forEach(
          (materia) => {
            const registro =
              calificaciones.find(
                (item) =>
                  item.alumnoId ===
                    alumno.id &&
                  item.materiaId ===
                    materia.id
              );

            const nota =
              registro
                ? registro.calificacion
                : "";

            fila[materia.nombre] =
              nota;

            if (nota !== "") {
              notas.push(nota);
            }
          }
        );

        const promedio =
          calcularPromedio(notas);

        fila.Promedio =
          notas.length > 0
            ? Number(
                promedio.toFixed(1)
              )
            : "";

        fila.Estado =
          notas.length > 0
            ? obtenerEstado(
                promedio
              )
            : "Sin calificaciones";

        return fila;
      }
    );

    exportarExcel(
      datos,
      "reporte-academico.xlsx"
    );
  };

  return (
    <div className="pagina">
      <div className="pagina-titulo">
        <div>
          <h1>
            {esInfantil
              ? "📊 Reportes"
              : "Reportes"}
          </h1>

          <p>
            Genera reportes académicos de tu grupo.
          </p>
        </div>
      </div>

      <div className="reportes-grid">
        <div className="reporte-card">
          {esInfantil && (
            <div className="reporte-icono">
              📗
            </div>
          )}

          <h2>
            Reporte de calificaciones
          </h2>

          <p>
            Descarga todas las calificaciones,
            materias, promedios y estados de los
            alumnos en formato Excel.
          </p>

          <button
            className="boton principal"
            onClick={generarExcel}
          >
            {esInfantil
              ? "📥 Descargar Excel"
              : "Descargar Excel"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Reportes;