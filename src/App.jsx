import { useEffect, useState } from "react";
import "./App.css";
import Login from "./pages/Login";
import Empleados from "./pages/Empleados";
import Productos from "./pages/Productos";
import Cobro from "./pages/Cobro";
import Recargas from "./pages/Recargas";
import Cafes from "./pages/Cafes";
import { useAuth } from "./context/AuthContext";
import { catalogoInicial } from "./data/productos";

const tabs = [
  { id: "cobro", label: "COBRO" },
  { id: "productos", label: "PRODUCTOS" },
  { id: "recargas", label: "RECARGAS" },
  { id: "cafes", label: "CAFÉ & BEBIDAS" },
  { id: "empleados", label: "EMPLEADOS" },
  { id: "reportes", label: "REPORTES" },
];

export default function App() {
  const { empleadoLoggeado, logout } = useAuth();
  const [pagina, setPagina] = useState("cobro");
  const [hora, setHora] = useState(new Date());
  const [catalogo, setCatalogo] = useState(catalogoInicial);
  const [ticket, setTicket] = useState([]);

  useEffect(() => {
    const intervalo = setInterval(() => setHora(new Date()), 1000);
    return () => clearInterval(intervalo);
  }, []);

  const horaFormateada = hora.toLocaleTimeString("es-MX", {
    hour: "2-digit",
    minute: "2-digit",
  });

  function agregarAlTicket(item) {
    setTicket((prev) => {
      const existe = prev.find((i) => i.id === item.id);
      if (existe)
        return prev.map((i) =>
          i.id === item.id ? { ...i, qty: i.qty + 1 } : i
        );
      return [...prev, { ...item, qty: 1 }];
    });
  }

  function limpiarTicket() {
    setTicket([]);
  }

  if (!empleadoLoggeado) {
    return <Login />;
  }

  return (
    <div className="app-container">
      <header className="top-bar">
        <div className="brand-block">
          <div className="brand-logo">OXXO</div>
          <div className="brand-copy">PUNTO DE VENTA</div>
        </div>
        <div className="top-right">
          <div className="cashier-info">
            <div className="cashier-label">{empleadoLoggeado.nombre} • {empleadoLoggeado.puesto}</div>
            <div className="time-badge">{horaFormateada}</div>
            <button className="logout-btn" onClick={logout} title="Cerrar sesión">
              Cerrar sesión
            </button>
          </div>
        </div>
      </header>

      <nav className="nav-bar">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`nav-tab ${pagina === tab.id ? "active" : ""}`}
            onClick={() => setPagina(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      <main className="page-body">
        {pagina === "cobro" && (
          <Cobro
            catalogo={catalogo}
            ticket={ticket}
            setTicket={setTicket}
            onAgregar={agregarAlTicket}
            onLimpiar={limpiarTicket}
          />
        )}
        {pagina === "productos" && (
          <Productos catalogo={catalogo} setCatalogo={setCatalogo} />
        )}
        {pagina === "recargas" && (
          <Recargas
            ticket={ticket}
            setTicket={setTicket}
            onAgregar={agregarAlTicket}
            onLimpiar={limpiarTicket}
          />
        )}
        {pagina === "cafes" && (
          <Cafes
            ticket={ticket}
            setTicket={setTicket}
            onAgregar={agregarAlTicket}
            onLimpiar={limpiarTicket}
          />
        )}
        {pagina === "empleados" && <Empleados />}
        {pagina === "reportes" && (
          <div className="card report-card">
            <div>
              <h2>Reportes</h2>
              <p>Apenas la estamos haciendo profe.</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}