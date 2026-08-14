function Modal({
  abierto,
  titulo,
  children,
  cerrar,
  guardar,
  textoGuardar = "Guardar",
}) {
  if (!abierto) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h3>{titulo}</h3>

          <button
            className="modal-cerrar"
            onClick={cerrar}
          >
            ✕
          </button>
        </div>

        <div className="modal-contenido">
          {children}
        </div>

        <div className="modal-footer">
          <button
            className="boton secundario"
            onClick={cerrar}
          >
            Cancelar
          </button>

          <button
            className="boton principal"
            onClick={guardar}
          >
            {textoGuardar}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;