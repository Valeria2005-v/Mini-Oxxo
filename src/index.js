import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import { empleadosIniciales } from "./data/empleados";
import reportWebVitals from "./reportWebVitals";

function Root() {
  const [empleados, setEmpleados] = useState(() => {
    const guardado = localStorage.getItem("empleados");
    return guardado ? JSON.parse(guardado) : empleadosIniciales;
  });

  useEffect(() => {
    localStorage.setItem("empleados", JSON.stringify(empleados));
  }, [empleados]);

  return (
    <AuthProvider empleados={empleados}>
      <App empleados={empleados} setEmpleados={setEmpleados} />
    </AuthProvider>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);

reportWebVitals();