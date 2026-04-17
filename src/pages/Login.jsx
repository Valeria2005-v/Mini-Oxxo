import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import "./Login.css";

const EMPLEADOS_DEMO = [
  { id: "E001", nombre: "María García" },
  { id: "E002", nombre: "Juan Pérez" },
  { id: "E003", nombre: "Luis Torres" },
];

export default function Login() {
  const { login } = useAuth();
  const [empleadoId, setEmpleadoId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);

  function handleLogin(e) {
    e.preventDefault();
    setError("");

    if (!empleadoId) {
      setError("Selecciona un empleado");
      return;
    }

    if (!password) {
      setError("Ingresa la contraseña");
      return;
    }

    setCargando(true);
    // Simular pequeño delay
    setTimeout(() => {
      const resultado = login(empleadoId, password);
      if (!resultado.exito) {
        setError(resultado.error);
      }
      setCargando(false);
    }, 300);
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <div className="login-logo">🏪</div>
          <h1>Mini Oxxo</h1>
          <h2>Portal de Empleados</h2>
        </div>

        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <label htmlFor="empleado">Empleado:</label>
            <select
              id="empleado"
              value={empleadoId}
              onChange={(e) => {
                setEmpleadoId(e.target.value);
                setError("");
              }}
              disabled={cargando}
            >
              <option value="">Selecciona un empleado</option>
              {EMPLEADOS_DEMO.map((emp) => (
                <option key={emp.id} value={emp.id}>
                  {emp.nombre} ({emp.id})
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña:</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
              placeholder="Ingresa tu contraseña"
              disabled={cargando}
              autoComplete="current-password"
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" disabled={cargando} className="login-button">
            {cargando ? "Iniciando sesión..." : "Iniciar Sesión"}
          </button>
        </form>


      </div>
    </div>
  );
}
