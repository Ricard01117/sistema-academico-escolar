function Configuracion({
  modo,
  setModo,
  tema,
  setTema,
}) {
  const esInfantil =
    modo === "infantil";

  return (
    <div className="pagina">

      {/* =====================================================
          TITULO
          ===================================================== */}

      <div className="pagina-titulo">

        <div>

          <h1>
            {esInfantil
              ? "⚙️ Configuración"
              : "Configuración"}
          </h1>

          <p>
            Personaliza la apariencia de Mi Aula.
          </p>

        </div>

      </div>


      {/* =====================================================
          CONFIGURACION
          ===================================================== */}

      <div className="configuracion-grid">


        {/* ===================================================
            ESTILO DE INTERFAZ
            =================================================== */}

        <div className="config-card">

          {esInfantil && (
            <div className="config-icono">
              🎨
            </div>
          )}

          <div>

            <h2>
              Estilo de interfaz
            </h2>

            <p>
              Selecciona cómo quieres visualizar
              el sistema.
            </p>

          </div>


          <div className="opciones">


            {/* MODO INFANTIL */}

            <button
              className={
                modo === "infantil"
                  ? "opcion activa"
                  : "opcion"
              }
              onClick={() =>
                setModo("infantil")
              }
            >

              {esInfantil
                ? "👦 Modo infantil"
                : "Modo infantil"}

            </button>


            {/* MODO NORMAL */}

            <button
              className={
                modo === "normal"
                  ? "opcion activa"
                  : "opcion"
              }
              onClick={() =>
                setModo("normal")
              }
            >

              {esInfantil
                ? "💼 Modo normal"
                : "Modo normal"}

            </button>


          </div>

        </div>


        {/* ===================================================
            TEMA
            =================================================== */}

        <div className="config-card">

          {esInfantil && (
            <div className="config-icono">

              {tema === "claro"
                ? "☀️"
                : "🌙"}

            </div>
          )}


          <div>

            <h2>
              Tema
            </h2>

            <p>
              Selecciona entre modo claro y oscuro.
            </p>

          </div>


          <div className="opciones">


            {/* CLARO */}

            <button
              className={
                tema === "claro"
                  ? "opcion activa"
                  : "opcion"
              }
              onClick={() =>
                setTema("claro")
              }
            >

              {esInfantil
                ? "☀️ Claro"
                : "Claro"}

            </button>


            {/* OSCURO */}

            <button
              className={
                tema === "oscuro"
                  ? "opcion activa"
                  : "opcion"
              }
              onClick={() =>
                setTema("oscuro")
              }
            >

              {esInfantil
                ? "🌙 Oscuro"
                : "Oscuro"}

            </button>


          </div>

        </div>

      </div>

    </div>
  );
}

export default Configuracion;