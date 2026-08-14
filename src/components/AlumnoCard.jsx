function AlumnoCard({ alumno, modo }) {
  const esInfantil = modo === "infantil";

  const obtenerEstado = (promedio) => {
    if (promedio >= 7) {
      return {
        texto: "Aprobado",
        clase: "aprobado",
      };
    }

    if (promedio >= 6) {
      return {
        texto: "En riesgo",
        clase: "riesgo",
      };
    }

    return {
      texto: "Reprobado",
      clase: "reprobado",
    };
  };

  const estado = obtenerEstado(alumno.promedio);

  return (
    <div className="alumno-card">
      {esInfantil && (
        <div className="alumno-avatar">
          {alumno.genero === "F"
            ? "👧"
            : "👦"}
        </div>
      )}

      <div className="alumno-info">
        <strong>{alumno.nombre}</strong>

        <span>
          Matrícula: {alumno.matricula}
        </span>
      </div>

      <div className="alumno-promedio">
        <strong>
          {Number(alumno.promedio).toFixed(1)}
        </strong>

        <span
          className={`estado ${estado.clase}`}
        >
          {esInfantil &&
            (estado.clase === "aprobado"
              ? "🟢 "
              : estado.clase === "riesgo"
              ? "🟡 "
              : "🔴 ")}

          {estado.texto}
        </span>
      </div>
    </div>
  );
}

export default AlumnoCard;