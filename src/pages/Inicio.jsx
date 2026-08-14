import { useEffect, useState } from "react";

import StatCard from "../components/StatCard";
import AlumnoCard from "../components/AlumnoCard";

import { obtenerAlumnos } from "../services/alumnosService";
import { obtenerCalificaciones } from "../services/calificacionesService";
import { calcularPromedio, obtenerEstado } from "../utils/calculos";

function Inicio({ modo }) {
  const esInfantil = modo === "infantil";

  const [alumnos, setAlumnos] = useState([]);

  useEffect(() => {
    setAlumnos(obtenerAlumnos());
  }, []);

  const calificaciones =
    obtenerCalificaciones();

  const promedios = alumnos.map((alumno) => {
    const notas = calificaciones
      .filter(
        (item) =>
          item.alumnoId === alumno.id
      )
      .map((item) => item.calificacion);

    return {
      ...alumno,
      promedio: calcularPromedio(notas),
    };
  });

  const aprobados = promedios.filter(
    (alumno) =>
      obtenerEstado(alumno.promedio) ===
      "Aprobado"
  ).length;

  const riesgo = promedios.filter(
    (alumno) =>
      obtenerEstado(alumno.promedio) ===
      "En riesgo"
  ).length;

  const reprobados = promedios.filter(
    (alumno) =>
      obtenerEstado(alumno.promedio) ===
      "Reprobado"
  ).length;

  const todosLosPromedios = promedios
    .map((alumno) => alumno.promedio)
    .filter((promedio) => promedio > 0);

  const promedioGeneral =
    todosLosPromedios.length > 0
      ? calcularPromedio(
          todosLosPromedios
        ).toFixed(1)
      : "0.0";

  return (
    <div className="pagina">
      <section className="bienvenida">
        <div>
          <span className="etiqueta">
            {esInfantil
              ? "📚 Mi salón"
              : "Mi salón"}
          </span>

          <h1>
            {esInfantil
              ? "¡Hola, Maestra! 👋"
              : "Hola, Maestra"}
          </h1>

          <p>
            Aquí tienes un resumen de lo que está
            pasando con tus alumnos.
          </p>
        </div>

        {esInfantil && (
          <div className="bienvenida-icono">
            🎒
          </div>
        )}
      </section>

      <section className="estadisticas">
        <StatCard
          icono="👨‍🎓"
          numero={alumnos.length}
          titulo="Alumnos"
          tipo="azul"
          modo={modo}
        />

        <StatCard
          icono="🟢"
          numero={aprobados}
          titulo="Aprobados"
          tipo="verde"
          modo={modo}
        />

        <StatCard
          icono="🟡"
          numero={riesgo}
          titulo="En riesgo"
          tipo="amarillo"
          modo={modo}
        />

        <StatCard
          icono="🔴"
          numero={reprobados}
          titulo="Reprobados"
          tipo="rojo"
          modo={modo}
        />
      </section>

      <section className="dashboard-grid">
        <div className="panel">
          <div className="panel-header">
            <div>
              <h2>
                {esInfantil
                  ? "Alumnos recientes"
                  : "Alumnos"}
              </h2>

              <p>
                Últimos alumnos registrados
              </p>
            </div>

            {esInfantil && (
              <span className="panel-icon">
                👥
              </span>
            )}
          </div>

          <div className="lista-alumnos">
            {promedios.length === 0 ? (
              <div className="estado-vacio">
                No hay alumnos registrados.
              </div>
            ) : (
              promedios
                .slice(0, 5)
                .map((alumno) => (
                  <AlumnoCard
                    key={alumno.id}
                    alumno={alumno}
                    modo={modo}
                  />
                ))
            )}
          </div>
        </div>

        <div className="panel promedio-panel">
          <div className="panel-header">
            <div>
              <h2>Promedio general</h2>

              <p>
                Rendimiento del grupo
              </p>
            </div>

            {esInfantil && (
              <span className="panel-icon">
                📊
              </span>
            )}
          </div>

          <div className="promedio-grande">
            <strong>{promedioGeneral}</strong>

            <span>
              Promedio general
            </span>
          </div>

          <div className="barra-promedio">
            <div
              className="barra-progreso"
              style={{
                width: `${
                  Math.min(
                    Number(promedioGeneral) * 10,
                    100
                  )
                }%`,
              }}
            />
          </div>

          <p className="promedio-descripcion">
            {esInfantil
              ? "El grupo tiene un buen rendimiento académico. 📚"
              : "Rendimiento académico del grupo."}
          </p>
        </div>
      </section>
    </div>
  );
}

export default Inicio;