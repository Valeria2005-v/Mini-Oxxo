import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import trece from "../imagenes/TRECE.jpg";
import doce from "../imagenes/DOCE.webp";

export default function Login({ empleados }) {
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
      if (!resultado.exito) setError(resultado.error);
      setCargando(false);
    }, 300);
  }

  const empleadosActivos = empleados.filter((e) => e.activo);

  return (
    <>
      <style>{`
        .login-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          position: relative;
          overflow: hidden;

          background-image:
            linear-gradient(rgba(255,255,255,0.45), rgba(255,255,255,0.45)),
            url(${trece});

          background-size: cover, cover;
          background-position: center, center;
          background-repeat: no-repeat, no-repeat;
        }

        .login-container::after {
          content: "";
          position: absolute;
          width: 650px;
          height: 750px;
          background-image: url(${doce});
          background-size: contain;
          background-repeat: no-repeat;
          right: 1000px;
          bottom: 0px;
          z-index: 2;
        }

        .login-card {
          background: rgb(255, 255, 255);
          border-radius: 20px;
          padding: 50px;
          width: 100%;
          max-width: 420px;
          margin-left: 180px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.3);
          z-index: 3;
          position: relative;
        }

        .login-header {
          text-align: center;
          margin-bottom: 40px;
        }

        .login-logo {
          width: 80px;
          height: 80px;
          margin: 0 auto 20px;
          background: linear-gradient(135deg, #ffb300, #ffd829);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2.5em;
          box-shadow: 0 8px 24px rgba(212,20,27,0.3);
        }

        .login-header h1 {
          font-size: 2.5rem;
          margin: 0 0 8px;
          color: #d4141b;
          font-weight: 800;
          letter-spacing: 2px;
        }

        .login-header h2 {
          font-size: 1rem;
          margin: 0;
          color: #666;
          font-weight: 500;
        }

        .login-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .form-group label {
          font-weight: 600;
          color: #333;
          font-size: 0.95rem;
        }

        .form-group input,
        .form-group select {
          padding: 14px 16px;
          border: 2px solid rgba(0,0,0,0.12);
          border-radius: 12px;
          font-size: 1rem;
          background: white;
          outline: none;
          transition: border-color 0.2s;
        }

        .form-group input:focus,
        .form-group select:focus {
          border-color: #d4141b;
        }

        .error-message {
          background: #fff0f0;
          color: #c33;
          padding: 12px 16px;
          border-radius: 10px;
          font-size: 0.9rem;
          text-align: center;
          border-left: 4px solid #ff4444;
        }

        .login-button {
          padding: 16px;
          background: #ff0000;
          color: #fffefe;
          border: none;
          border-radius: 12px;
          font-size: 1.1rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .login-button:hover:not(:disabled) {
          background: #ff2929;
          transform: translateY(-2px);
        }

        .login-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
      `}</style>

      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <div className="login-logo">🏪</div>
            <h1>OXXO</h1>
            <h2>Portal de Empleados</h2>
          </div>

          <form onSubmit={handleLogin} className="login-form">
            <div className="form-group">
              <label>Empleado</label>
              <select
                value={empleadoId}
                onChange={(e) => {
                  setEmpleadoId(e.target.value);
                  setError("");
                }}
                disabled={cargando}
              >
                <option value="">Selecciona un empleado</option>
                {empleadosActivos.map((emp) => (
                  <option key={emp.id} value={emp.id}>
                    {emp.nombre} — {emp.puesto} ({emp.turno})
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Contraseña</label>
              <input
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
    </>
  );
}