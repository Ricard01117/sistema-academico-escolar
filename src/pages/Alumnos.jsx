import { useEffect, useState } from "react";

import Modal from "../components/Modal";

import {
  obtenerAlumnos,
  agregarAlumno,
  actualizarAlumno,
  eliminarAlumno,
} from "../services/alumnosService";

import { generarId } from "../utils/generarId";

function Alumnos({ modo }) {
  const esInfantil = modo === "infantil";

  const [alumnos, setAlumnos] = useState([]);

  const [busqueda, setBusqueda] = useState("");

  const [modalAbierto, setModalAbierto] =
    useState(false);

  const [alumnoEditando, setAlumnoEditando] =
    useState(null);

  const formularioInicial = {
    nombre: "",
    matricula: "",
    grupo: "",
    grado: "",
    genero: "M",
  };

  const [formulario, setFormulario] =
    useState(formularioInicial);

  useEffect(() => {
    setAlumnos(obtenerAlumnos());
  }, []);

  const abrirNuevo = () => {
    setAlumnoEditando(null);

    setFormulario(formularioInicial);

    setModalAbierto(true);
  };

  const abrirEditar = (alumno) => {
    setAlumnoEditando(alumno);

    setFormulario({
      nombre: alumno.nombre || "",
      matricula: alumno.matricula || "",
      grupo: alumno.grupo || "",
      grado: alumno.grado || "",
      genero: alumno.genero || "M",
    });

    setModalAbierto(true);
  };

  const cerrarModal = () => {
    setModalAbierto(false);

    setAlumnoEditando(null);

    setFormulario(formularioInicial);
  };

  const manejarCambio = (e) => {
    const { name, value } = e.target;

    setFormulario({
      ...formulario,
      [name]: value,
    });
  };

  const guardar = () => {
    if (
      !formulario.nombre.trim() ||
      !formulario.matricula.trim() ||
      !formulario.grupo.trim()
    ) {
      alert(
        "Nombre, matrícula y grupo son obligatorios."
      );

      return;
    }

    if (alumnoEditando) {
      const actualizados =
        actualizarAlumno(
          alumnoEditando.id,
          formulario
        );

      setAlumnos(actualizados);
    } else {
      const nuevoAlumno = {
        id: generarId(),
        ...formulario,
      };

      const actualizados =
        agregarAlumno(nuevoAlumno);

      setAlumnos(actualizados);
    }

    cerrarModal();
  };

  const eliminar = (id) => {
    const confirmar = window.confirm(
      "¿Seguro que deseas eliminar este alumno?"
    );

    if (!confirmar) {
      return;
    }

    const actualizados =
      eliminarAlumno(id);

    setAlumnos(actualizados);
  };

  const alumnosFiltrados =
    alumnos.filter((alumno) =>
      `${alumno.nombre} ${alumno.matricula} ${alumno.grupo}`
        .toLowerCase()
        .includes(
          busqueda.toLowerCase()
        )
    );

  return (
    <div className="pagina">

      {/* =====================================================
          TITULO
          ===================================================== */}

      <div className="pagina-titulo">

        <div>
          <h1>
            {esInfantil
              ? "👨‍🎓 Alumnos"
              : "Alumnos"}
          </h1>

          <p>
            Administra los alumnos de tu grupo.
          </p>
        </div>

        <button
          className="boton principal"
          onClick={abrirNuevo}
        >
          {esInfantil
            ? "+ Nuevo alumno"
            : "Nuevo alumno"}
        </button>

      </div>


      {/* =====================================================
          BUSQUEDA
          ===================================================== */}

      <div className="barra-herramientas">

        <input
          type="text"
          placeholder={
            esInfantil
              ? "🔎 Buscar alumno..."
              : "Buscar alumno..."
          }
          value={busqueda}
          onChange={(e) =>
            setBusqueda(e.target.value)
          }
        />

      </div>


      {/* =====================================================
          TABLA
          ===================================================== */}

      <div className="tabla-container">

        {alumnosFiltrados.length === 0 ? (

          <div className="estado-vacio grande">
            No hay alumnos registrados.
          </div>

        ) : (

          <table>

            <thead>

              <tr>

                <th>
                  Alumno
                </th>

                <th>
                  Matrícula
                </th>

                <th>
                  Grupo
                </th>

                <th>
                  Grado
                </th>

                <th>
                  Acciones
                </th>

              </tr>

            </thead>


            <tbody>

              {alumnosFiltrados.map(
                (alumno) => (

                  <tr
                    key={alumno.id}
                  >

                    <td>

                      <strong>

                        {esInfantil &&
                          (
                            alumno.genero === "F"
                              ? "👧 "
                              : "👦 "
                          )}

                        {alumno.nombre}

                      </strong>

                    </td>


                    <td>
                      {alumno.matricula}
                    </td>


                    <td>
                      {alumno.grupo}
                    </td>


                    <td>
                      {alumno.grado || "-"}
                    </td>


                    <td>

                      {/* EDITAR */}

                      <button
                        className="accion"
                        onClick={() =>
                          abrirEditar(alumno)
                        }
                        title="Editar alumno"
                      >
                        {esInfantil
                          ? "✏️"
                          : "Editar"}
                      </button>


                      {/* ELIMINAR */}

                      <button
                        className="accion eliminar"
                        onClick={() =>
                          eliminar(
                            alumno.id
                          )
                        }
                        title="Eliminar alumno"
                      >
                        {esInfantil
                          ? "🗑️"
                          : "Eliminar"}
                      </button>

                    </td>

                  </tr>

                )
              )}

            </tbody>

          </table>

        )}

      </div>


      {/* =====================================================
          MODAL
          ===================================================== */}

      <Modal

        abierto={modalAbierto}

        titulo={
          alumnoEditando
            ? "Editar alumno"
            : "Nuevo alumno"
        }

        cerrar={cerrarModal}

        guardar={guardar}

        textoGuardar={
          alumnoEditando
            ? "Actualizar"
            : "Guardar"
        }

      >

        <div className="formulario">

          <label>

            Nombre completo

            <input
              name="nombre"
              value={formulario.nombre}
              onChange={manejarCambio}
              placeholder="Ej. Ana López"
            />

          </label>


          <label>

            Matrícula

            <input
              name="matricula"
              value={formulario.matricula}
              onChange={manejarCambio}
              placeholder="Ej. A001"
            />

          </label>


          <div className="formulario-dos">

            <label>

              Grupo

              <input
                name="grupo"
                value={formulario.grupo}
                onChange={manejarCambio}
                placeholder="Ej. 4° A"
              />

            </label>


            <label>

              Grado

              <input
                name="grado"
                value={formulario.grado}
                onChange={manejarCambio}
                placeholder="Ej. 4"
              />

            </label>

          </div>


          <label>

            Género

            <select
              name="genero"
              value={formulario.genero}
              onChange={manejarCambio}
            >

              <option value="M">
                Masculino
              </option>

              <option value="F">
                Femenino
              </option>

            </select>

          </label>

        </div>

      </Modal>

    </div>
  );
}

export default Alumnos;