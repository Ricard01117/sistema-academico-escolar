import {
  guardarDatos,
  obtenerDatos,
} from "./storageService";

const CLAVE =
  "sistema_materias";

const materiasIniciales = [
  {
    id: "materia-001",
    nombre: "Matemáticas",
  },
  {
    id: "materia-002",
    nombre: "Español",
  },
  {
    id: "materia-003",
    nombre: "Ciencias",
  },
  {
    id: "materia-004",
    nombre: "Inglés",
  },
  {
    id: "materia-005",
    nombre: "Historia",
  },
];

export const obtenerMaterias = () => {
  const existentes =
    localStorage.getItem(CLAVE);

  if (!existentes) {
    guardarDatos(
      CLAVE,
      materiasIniciales
    );

    return materiasIniciales;
  }

  return obtenerDatos(
    CLAVE,
    []
  );
};

export const guardarMaterias = (
  materias
) => {
  guardarDatos(
    CLAVE,
    materias
  );
};

export const agregarMateria = (
  materia
) => {
  const materias =
    obtenerMaterias();

  const existe =
    materias.some(
      (item) =>
        item.nombre.toLowerCase() ===
        materia.nombre.toLowerCase()
    );

  if (existe) {
    alert(
      "Ya existe una materia con ese nombre."
    );

    return materias;
  }

  const nuevasMaterias = [
    ...materias,
    materia,
  ];

  guardarMaterias(
    nuevasMaterias
  );

  return nuevasMaterias;
};

export const actualizarMateria = (
  id,
  nombre
) => {
  const materias =
    obtenerMaterias();

  const duplicada =
    materias.some(
      (materia) =>
        materia.id !== id &&
        materia.nombre.toLowerCase() ===
          nombre.toLowerCase()
    );

  if (duplicada) {
    alert(
      "Ya existe otra materia con ese nombre."
    );

    return materias;
  }

  const actualizadas =
    materias.map(
      (materia) =>
        materia.id === id
          ? {
              ...materia,
              nombre,
            }
          : materia
    );

  guardarMaterias(
    actualizadas
  );

  return actualizadas;
};

export const eliminarMateria = (
  id
) => {
  const materias =
    obtenerMaterias();

  const actualizadas =
    materias.filter(
      (materia) =>
        materia.id !== id
    );

  guardarMaterias(
    actualizadas
  );

  return actualizadas;
};