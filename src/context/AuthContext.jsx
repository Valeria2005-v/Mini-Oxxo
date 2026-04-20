import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children, empleados }) {
  const [empleadoLoggeado, setEmpleadoLoggeado] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const sesion = localStorage.getItem("empleadoLoggeado");
    if (sesion) setEmpleadoLoggeado(JSON.parse(sesion));
    setLoading(false);
  }, []);

  function login(empleadoId, password) {
    const empleado = empleados.find((e) => e.id === empleadoId);
    if (!empleado) return { exito: false, error: "Empleado no encontrado" };
    if (empleado.password !== password) return { exito: false, error: "Contraseña incorrecta" };
    if (!empleado.activo) return { exito: false, error: "Empleado inactivo, contacta al gerente" };

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
    localStorage.removeItem("reporteTurno");
    localStorage.removeItem("empleadoLoggeado");
    setEmpleadoLoggeado(null);
  }

  return (
    <AuthContext.Provider value={{ empleadoLoggeado, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth debe usarse dentro de AuthProvider");
  return context;
}