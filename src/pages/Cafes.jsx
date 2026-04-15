import { useState } from "react";
import TicketPanel from "../components/TicketPanel";

const CAFES = [
  { id: "CAF001", nombre: "Café Americano", precio: 25, tipo: "cafe", temp: "caliente" },
  { id: "CAF002", nombre: "Café Americano Frío", precio: 28, tipo: "cafe", temp: "frio" },
  { id: "CAF003", nombre: "Cappuccino", precio: 35, tipo: "cafe", temp: "caliente" },
  { id: "CAF004", nombre: "Café Latte", precio: 38, tipo: "cafe", temp: "caliente" },
  { id: "CAF005", nombre: "Café Latte Frío", precio: 40, tipo: "cafe", temp: "frio" },
  { id: "CAF006", nombre: "Frappé", precio: 45, tipo: "cafe", temp: "frio" },
];

export default function Cafes({ ticket, setTicket, onAgregar, onLimpiar }) {
  const [filtro, setFiltro] = useState("todos");

  const cafesFiltrados = CAFES.filter((c) =>
    filtro === "todos" ? true : c.temp === filtro
  );

  return (
    <div className="cobro-grid">
      <div className="card selection-card">
        <div className="selection-header">
          <h1>Café & Bebidas</h1>
        </div>

        <div className="categories">
          {[["todos", "Todos"], ["caliente", "Calientes"], ["frio", "Fríos"]].map(([val, label]) => (
            <button
              key={val}
              className={`category-pill ${filtro === val ? "active" : ""}`}
              onClick={() => setFiltro(val)}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="products-grid">
          {cafesFiltrados.map((cafe) => (
            <div key={cafe.id} className="product-card">
              <div>
                <div style={{ marginBottom: 6 }}>
                  <span style={{
                    background: cafe.temp === "caliente" ? "#fff3e0" : "#e3f2fd",
                    color: cafe.temp === "caliente" ? "#e65100" : "#1565c0",
                    borderRadius: 999, padding: "3px 10px",
                    fontSize: "0.78rem", fontWeight: 700
                  }}>
                    {cafe.temp === "caliente" ? "Caliente" : "Frío"}
                  </span>
                </div>
                <h3>{cafe.nombre}</h3>
              </div>
              <div>
                <div className="product-meta">
                  <span className="product-price">${cafe.precio.toFixed(2)}</span>
                </div>
                <button onClick={() => onAgregar(cafe)}>
                  + Agregar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <TicketPanel
        ticket={ticket}
        setTicket={setTicket}
        onLimpiar={onLimpiar}
        mostrarPago={true}
      />
    </div>
  );
}