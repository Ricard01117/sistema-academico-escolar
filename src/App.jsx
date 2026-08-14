import { useEffect, useState } from "react";

import Sidebar from "./components/Sidebar";
import Header from "./components/Header";

import Inicio from "./pages/Inicio";
import Alumnos from "./pages/Alumnos";
import Materias from "./pages/Materias";
import Calificaciones from "./pages/Calificaciones";
import Reportes from "./pages/Reportes";
import Configuracion from "./pages/Configuracion";

import { obtenerConfiguracion, guardarConfiguracion } from "./services/storageService";

import "./styles/global.css";
import "./styles/variables.css";
import "./styles/themes.css";

function App() {
  const configuracionInicial = obtenerConfiguracion();

  const [paginaActual, setPaginaActual] = useState("inicio");
  const [modo, setModo] = useState(configuracionInicial.modo);
  const [tema, setTema] = useState(configuracionInicial.tema);

  useEffect(() => {
    guardarConfiguracion({
      modo,
      tema,
    });
  }, [modo, tema]);

  const renderizarPagina = () => {
    switch (paginaActual) {
      case "inicio":
        return <Inicio modo={modo} />;

      case "alumnos":
        return <Alumnos modo={modo} />;

      case "materias":
        return <Materias modo={modo} />;

      case "calificaciones":
        return <Calificaciones modo={modo} />;

      case "reportes":
        return <Reportes modo={modo} />;

      case "configuracion":
        return (
          <Configuracion
            modo={modo}
            setModo={setModo}
            tema={tema}
            setTema={setTema}
          />
        );

      default:
        return <Inicio modo={modo} />;
    }
  };

  return (
    <div
      className={`app ${
        modo === "infantil" ? "modo-infantil" : "modo-normal"
      } ${tema === "oscuro" ? "tema-oscuro" : "tema-claro"}`}
    >
      <Sidebar
        paginaActual={paginaActual}
        cambiarPagina={setPaginaActual}
        modo={modo}
      />

      <div className="contenido-principal">
        <Header
          modo={modo}
          tema={tema}
          setTema={setTema}
        />

        <main className="contenido">
          {renderizarPagina()}
        </main>
      </div>
    </div>
  );
}

export default App;