function Header({ modo, tema, setTema }) {
  const esInfantil = modo === "infantil";

  const cambiarTema = () => {
    setTema(
      tema === "claro"
        ? "oscuro"
        : "claro"
    );
  };

  return (
    <header className="header">
      <div>
        <h2>
          {esInfantil
            ? "Mi Aula 🎓"
            : "Mi Aula"}
        </h2>

        <p>
          Administra tu grupo de manera sencilla
        </p>
      </div>

      <div className="header-derecha">
        <button
          className="boton-tema"
          onClick={cambiarTema}
          title="Cambiar tema"
        >
          {tema === "claro"
            ? esInfantil
              ? "🌙"
              : "Oscuro"
            : esInfantil
            ? "☀️"
            : "Claro"}
        </button>

        <div className="perfil">
          {esInfantil && (
            <div className="perfil-avatar">
              👩‍🏫
            </div>
          )}

          <div>
            <strong>Maestra</strong>
            <span>Docente</span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;