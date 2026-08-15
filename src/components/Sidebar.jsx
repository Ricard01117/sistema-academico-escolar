function IconoProfesional({ tipo }) {
  const props = {
    width: 21,
    height: 21,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.9,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": "true",
  };

  switch (tipo) {
    case "inicio":
      return (
        <svg {...props}>
          <path d="M3 10.5 12 3l9 7.5" />
          <path d="M5 9.5V21h14V9.5" />
          <path d="M9 21v-6h6v6" />
        </svg>
      );

    case "alumnos":
      return (
        <svg {...props}>
          <circle cx="9" cy="8" r="3" />
          <path d="M3 21c0-3.3 2.7-6 6-6s6 2.7 6 6" />
          <path d="M16 5.5a3 3 0 0 1 0 5.8" />
          <path d="M18 15c1.8.8 3 2.7 3 5" />
        </svg>
      );

    case "materias":
      return (
        <svg {...props}>
          <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v16H6.5A2.5 2.5 0 0 0 4 21.5z" />
          <path d="M4 5.5v16" />
          <path d="M8 7h8" />
          <path d="M8 11h8" />
          <path d="M8 15h5" />
        </svg>
      );

    case "calificaciones":
      return (
        <svg {...props}>
          <rect x="4" y="3" width="16" height="18" rx="2" />
          <path d="M8 7h8" />
          <path d="M8 11h2" />
          <path d="M14 11h2" />
          <path d="M8 15h2" />
          <path d="M14 15h2" />
          <path d="M8 18h8" />
        </svg>
      );

    case "reportes":
      return (
        <svg {...props}>
          <path d="M4 20V10" />
          <path d="M10 20V4" />
          <path d="M16 20v-7" />
          <path d="M22 20H2" />
        </svg>
      );

    case "configuracion":
      return (
        <svg {...props}>
          <path d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z" />
          <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-1.8 1.8-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6v.2h-2.6V20a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1-1.8-1.8.1-.1A1.7 1.7 0 0 0 8 15a1.7 1.7 0 0 0-1.6-1H6v-2.6h.4A1.7 1.7 0 0 0 8 10a1.7 1.7 0 0 0-.3-1.9l-.1-.1 1.8-1.8.1.1a1.7 1.7 0 0 0 1.9.3 1.7 1.7 0 0 0 1-1.6v-.2h2.6V5a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1 1.8 1.8-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.6 1h.2v2.6H21a1.7 1.7 0 0 0-1.6 1Z" />
        </svg>
      );

    default:
      return null;
  }
}

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
    <aside className={`sidebar ${esInfantil ? "sidebar-infantil" : "sidebar-normal"}`}>
      <div className="logo">
        {esInfantil ? (
          <div className="logo-icon">
            🎓
          </div>
        ) : (
          <div className="logo-icon logo-icon-profesional">
            <IconoProfesional tipo="inicio" />
          </div>
        )}

        <div className="logo-texto">
          <h1>Mi Aula</h1>

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
            title={item.nombre}
          >
            <span className="menu-icon">
              {esInfantil ? (
                item.icono
              ) : (
                <IconoProfesional tipo={item.id} />
              )}
            </span>

            <span className="menu-texto">
              {item.nombre}
            </span>
          </button>
        ))}
      </nav>

      <div className="sidebar-footer">
        {esInfantil ? (
          <div className="maestra-avatar">
            👩‍🏫
          </div>
        ) : (
          <div className="maestra-avatar avatar-profesional">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="12" cy="8" r="3.5" />
              <path d="M5 21c0-3.8 3.1-6.5 7-6.5s7 2.7 7 6.5" />
            </svg>
          </div>
        )}

        <div className="sidebar-footer-texto">
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