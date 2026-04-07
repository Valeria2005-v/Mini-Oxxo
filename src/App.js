import { useState } from "react";
import "./App.css";
import Empleados from "./pages/Empleados";
import Productos from "./pages/Productos";
import Cobro from "./pages/Cobro";

export default function App() {
  const [pagina, setPagina] = useState("inicio");

  return (
    <div className="container">
      {pagina === "inicio" && (
        <div style={{ textAlign: "center" }}>
          <h1>Sistema OXXO</h1>

          <button onClick={() => setPagina("empleados")}>
            Empleados
          </button>

          <button onClick={() => setPagina("productos")}>
            Productos
          </button>

          <button onClick={() => setPagina("cobro")}>
            Cobro
          </button>
        </div>
      )}

      {pagina === "empleados" && (
        <Empleados regresar={() => setPagina("inicio")} />
      )}

      {pagina === "productos" && (
        <Productos regresar={() => setPagina("inicio")} />
      )}

      {pagina === "cobro" && (
        <Cobro regresar={() => setPagina("inicio")} />
      )}
    </div>
  );
}