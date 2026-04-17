import { useState } from "react";
import { useAuth } from "../context/AuthContext";

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
    setTimeout(() => {
      const resultado = login(empleadoId, password);
      if (!resultado.exito) {
        setError(resultado.error);
      }
      setCargando(false);
    }, 300);
  }

  return (
    <>
      <style>{`
        .login-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          background: linear-gradient(135deg, #ff0000 0%, #ff0000 100%);
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          position: relative;
          overflow: hidden;
        }

        .login-container::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image:
            radial-gradient(circle at 20% 80%, rgba(255,255,255,0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(255,255,255,0.1) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(255,255,255,0.05) 0%, transparent 50%);
        }

        .login-card {
          background: rgba(255,255,255,0.95);
          border-radius: 20px;
          padding: 50px;
          width: 100%;
          max-width: 420px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.3);
          z-index: 1;
        }

        .login-header {
          text-align: center;
          margin-bottom: 40px;
        }

        .login-logo {
          width: 80px;
          height: 80px;
          margin: 0 auto 20px;
          background: linear-gradient(135deg, #ffff00, #ffd829);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2.5em;
        }

        .login-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
        }

        .form-group input,
        .form-group select {
          padding: 12px;
          border-radius: 10px;
          border: 1px solid #ccc;
        }

        .error-message {
          color: red;
          text-align: center;
        }

        .login-button {
          padding: 14px;
          background: yellow;
          border: none;
          border-radius: 10px;
          font-weight: bold;
          cursor: pointer;
        }
      `}</style>

      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <div className="login-logo">🏪</div>
            <h1>Mini Oxxo</h1>
            <h2>Portal de Empleados</h2>
          </div>

          <form onSubmit={handleLogin} className="login-form">
            <div className="form-group">
              <label>Empleado:</label>
              <select
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
              <label>Contraseña:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError("");
                }}
                placeholder="Ingresa tu contraseña"
                disabled={cargando}
              />
            </div>

            {error && <div className="error-message">{error}</div>}

            <button type="submit" disabled={cargando} className="login-button">
              {cargando ? "Iniciando sesión..." : "Iniciar Sesión"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}