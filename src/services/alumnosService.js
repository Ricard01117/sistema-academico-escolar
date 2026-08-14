import {
  guardarDatos,
  obtenerDatos,
} from "./storageService";

const CLAVE =
  "sistema_alumnos";

const alumnosIniciales = [
  {
    id: "alumno-001",
    nombre: "Ana López",
    matricula: "A001",
    grupo: "4° A",
    grado: "4",
    genero: "F",
  },
  {
    id: "alumno-002",
    nombre: "Carlos Pérez",
    matricula: "A002",
    grupo: "4° A",
    grado: "4",
    genero: "M",
  },
  {
    id: "alumno-003",
    nombre: "Sofía García",
    matricula: "A003",
    grupo: "4° A",
    grado: "4",
    genero: "F",
  },
];

export const obtenerAlumnos = () => {
  const existentes =
    localStorage.getItem(CLAVE);

  if (!existentes) {
    guardarDatos(
      CLAVE,
      alumnosIniciales
    );

    return alumnosIniciales;
  }

  return obtenerDatos(
    CLAVE,
    []
  );
};

export const guardarAlumnos = (
  alumnos
) => {
  guardarDatos(
    CLAVE,
    alumnos
  );
};

export const agregarAlumno = (
  alumno
) => {
  const alumnos =
    obtenerAlumnos();

  const nuevosAlumnos = [
    ...alumnos,
    alumno,
  ];

  guardarAlumnos(
    nuevosAlumnos
  );

  return nuevosAlumnos;
};

export const actualizarAlumno = (
  id,
  datos
) => {
  const alumnos =
    obtenerAlumnos();

  const actualizados =
    alumnos.map(
      (alumno) =>
        alumno.id === id
          ? {
              ...alumno,
              ...datos,
            }
          : alumno
    );

  guardarAlumnos(
    actualizados
  );

  return actualizados;
};

export const eliminarAlumno = (
  id
) => {
  const alumnos =
    obtenerAlumnos();

  const actualizados =
    alumnos.filter(
      (alumno) =>
        alumno.id !== id
    );

  guardarAlumnos(
    actualizados
  );

  return actualizados;
};