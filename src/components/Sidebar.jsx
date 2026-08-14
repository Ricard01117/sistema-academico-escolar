function Sidebar({ paginaActual, cambiarPagina, modo }) {
  const esInfantil = modo === "infantil";

  const menu = [
    {
      id: "inicio",
      icono: "🏠",
      nombre: "Inicio",
    },
    {
      id: "alumnos",
      icono: "👨‍🎓",
      nombre: "Alumnos",
    },
    {
      id: "materias",
      icono: "📚",
      nombre: "Materias",
    },
    {
      id: "calificaciones",
      icono: "📝",
      nombre: "Calificaciones",
    },
    {
      id: "reportes",
      icono: "📊",
      nombre: "Reportes",
    },
    {
      id: "configuracion",
      icono: "⚙️",
      nombre: "Configuración",
    },
  ];

  return (
    <aside className="sidebar">
      <div className="logo">
        {esInfantil && <div className="logo-icon">🎓</div>}

        <div>
          <h1>
            {esInfantil ? "Mi Aula" : "Mi Aula"}
          </h1>

          <span>Sistema Académico</span>
        </div>
      </div>

      <nav className="menu">
        {menu.map((item) => (
          <button
            key={item.id}
            className={`menu-item ${
              paginaActual === item.id ? "activo" : ""
            }`}
            onClick={() => cambiarPagina(item.id)}
          >
            {esInfantil && (
              <span className="menu-icon">
                {item.icono}
              </span>
            )}

            <span>{item.nombre}</span>
          </button>
        ))}
      </nav>

      <div className="sidebar-footer">
        {esInfantil && (
          <div className="maestra-avatar">
            👩‍🏫
          </div>
        )}

        <div>
          <strong>Maestra</strong>

          <small>
            {esInfantil
              ? "Modo infantil"
              : "Modo normal"}
          </small>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;