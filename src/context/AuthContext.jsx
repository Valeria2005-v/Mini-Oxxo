import { createContext, useContext, useState, useEffect } from "react";
import { empleadosIniciales } from "../pages/Empleados";
const AuthContext = createContext();

// Empleados con credenciales (en una app real, esto vendría del backend)
const EMPLEADOS_CREDENCIALES = [
  { id: "E001", nombre: "José Ortiz", puesto: "Cajero", turno: "Matutino", password: "1234" },
  { id: "E002", nombre: "Diego Mejía", puesto: "Gerente", turno: "Matutino", password: "4567" },
  { id: "E003", nombre: "Valeria Salinas", puesto: "Cajero", turno: "Vespertino", password: "3210" },
  { id: "E004", nombre: "Aylin Lobato", puesto: "Cajero", turno: "Vespertino", password: "2222" },
];

export function AuthProvider({ children }) {
  const [empleadoLoggeado, setEmpleadoLoggeado] = useState(null);
  const [loading, setLoading] = useState(true);

  // Cargar sesión al montar el componente
  useEffect(() => {
    const sesion = localStorage.getItem("empleadoLoggeado");
    if (sesion) {
      setEmpleadoLoggeado(JSON.parse(sesion));
    }
    setLoading(false);
  }, []);

  function login(empleadoId, password) {
    const empleado = EMPLEADOS_CREDENCIALES.find((e) => e.id === empleadoId);
    
    if (!empleado) {
      return { exito: false, error: "Empleado no encontrado" };
    }
    
    if (empleado.password !== password) {
      return { exito: false, error: "Contraseña incorrecta" };
    }

    const datosEmpleado = {
      id: empleado.id,
      nombre: empleado.nombre,
      puesto: empleado.puesto,
      turno: empleado.turno,
    };

    setEmpleadoLoggeado(datosEmpleado);
    localStorage.setItem("empleadoLoggeado", JSON.stringify(datosEmpleado));
    return { exito: true };
  }

  function logout() {
    setEmpleadoLoggeado(null);
    localStorage.removeItem("empleadoLoggeado");
  }

  const value = {
    empleadoLoggeado,
    login,
    logout,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de AuthProvider");
  }
  return context;
}
