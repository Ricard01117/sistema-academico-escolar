import { useEffect, useState } from "react";

import Modal from "../components/Modal";

import {
  obtenerMaterias,
  agregarMateria,
  actualizarMateria,
  eliminarMateria,
} from "../services/materiasService";

import { generarId } from "../utils/generarId";

function Materias({ modo }) {
  const esInfantil = modo === "infantil";

  const [materias, setMaterias] =
    useState([]);

  const [modalAbierto, setModalAbierto] =
    useState(false);

  const [materiaEditando, setMateriaEditando] =
    useState(null);

  const [nombre, setNombre] =
    useState("");

  useEffect(() => {
    setMaterias(obtenerMaterias());
  }, []);

  const abrirNueva = () => {
    setMateriaEditando(null);

    setNombre("");

    setModalAbierto(true);
  };

  const abrirEditar = (materia) => {
    setMateriaEditando(materia);

    setNombre(materia.nombre);

    setModalAbierto(true);
  };

  const cerrarModal = () => {
    setModalAbierto(false);

    setMateriaEditando(null);

    setNombre("");
  };

  const guardar = () => {
    if (!nombre.trim()) {
      alert(
        "Escribe el nombre de la materia."
      );

      return;
    }

    if (materiaEditando) {

      const actualizadas =
        actualizarMateria(
          materiaEditando.id,
          nombre.trim()
        );

      setMaterias(actualizadas);

    } else {

      const nueva = {
        id: generarId(),
        nombre: nombre.trim(),
      };

      const actualizadas =
        agregarMateria(nueva);

      setMaterias(actualizadas);
    }

    cerrarModal();
  };

  const eliminar = (id) => {

    const confirmar = window.confirm(
      "¿Seguro que deseas eliminar esta materia? Las calificaciones asociadas también dejarán de mostrarse para esta materia."
    );

    if (!confirmar) {
      return;
    }

    const actualizadas =
      eliminarMateria(id);

    setMaterias(actualizadas);
  };

  return (
    <div className="pagina">

      {/* =====================================================
          TITULO
          ===================================================== */}

      <div className="pagina-titulo">

        <div>

          <h1>
            {esInfantil
              ? "📚 Materias"
              : "Materias"}
          </h1>

          <p>
            Administra las materias de tu grupo.
          </p>

        </div>


        <button
          className="boton principal"
          onClick={abrirNueva}
        >
          {esInfantil
            ? "+ Agregar materia"
            : "Agregar materia"}
        </button>

      </div>


      {/* =====================================================
          MATERIAS
          ===================================================== */}

      <div className="materias-grid">

        {materias.map(
          (materia) => (

            <div
              className="materia-card"
              key={materia.id}
            >

              {esInfantil && (
                <div className="materia-icono">
                  📚
                </div>
              )}


              <div>

                <h3>
                  {materia.nombre}
                </h3>

                <span>
                  Materia
                </span>

              </div>


              {/* =================================================
                  BOTONES CRUD
                  ================================================= */}

              <div className="materia-acciones">

                <button
                  className="accion"
                  onClick={() =>
                    abrirEditar(materia)
                  }
                  title="Editar materia"
                >
                  {esInfantil
                    ? "✏️"
                    : "Editar"}
                </button>


                <button
                  className="accion eliminar"
                  onClick={() =>
                    eliminar(materia.id)
                  }
                  title="Eliminar materia"
                >
                  {esInfantil
                    ? "🗑️"
                    : "Eliminar"}
                </button>

              </div>

            </div>

          )
        )}

      </div>


      {/* =====================================================
          SIN MATERIAS
          ===================================================== */}

      {materias.length === 0 && (

        <div className="estado-vacio grande">
          No hay materias registradas.
        </div>

      )}


      {/* =====================================================
          MODAL
          ===================================================== */}

      <Modal

        abierto={modalAbierto}

        titulo={
          materiaEditando
            ? "Editar materia"
            : "Nueva materia"
        }

        cerrar={cerrarModal}

        guardar={guardar}

        textoGuardar={
          materiaEditando
            ? "Actualizar"
            : "Guardar"
        }

      >

        <div className="formulario">

          <label>

            Nombre de la materia

            <input
              value={nombre}
              onChange={(e) =>
                setNombre(
                  e.target.value
                )
              }
              placeholder="Ej. Matemáticas"
              autoFocus
            />

          </label>

        </div>

      </Modal>

    </div>
  );
}

export default Materias;