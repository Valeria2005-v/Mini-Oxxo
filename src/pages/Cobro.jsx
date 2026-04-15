import { useState, useRef } from "react";
import TicketPanel from "../components/TicketPanel";

export default function Cobro({ catalogo, ticket, setTicket, onAgregar, onLimpiar }) {
  const [idInput, setIdInput] = useState("");
  const inputRef = useRef(null);

  function agregarPorId(e) {
    e.preventDefault();
    const id = idInput.trim().padStart(3, "0");
    const producto = catalogo.find((p) => p.id === id);
    if (!producto) {
      alert(`Producto con ID "${id}" no encontrado.`);
      setIdInput("");
      return;
    }
    onAgregar({ ...producto, tipo: "producto" });
    setIdInput("");
    inputRef.current?.focus();
  }

  return (
    <div className="cobro-grid">
      <div className="card selection-card">
        <div className="selection-header">
          <h1>Cobro</h1>
          <form onSubmit={agregarPorId} style={{ display: "flex", gap: 10 }}>
            <input
              ref={inputRef}
              value={idInput}
              onChange={(e) => setIdInput(e.target.value)}
              placeholder="Ingresa ID del producto (ej. 001)"
              autoFocus
              style={{ flex: 1 }}
            />
            <button type="submit" style={{
              background: "#d4141b", color: "white", border: "none",
              borderRadius: 16, padding: "12px 22px", fontWeight: 700, cursor: "pointer"
            }}>
              + Agregar
            </button>
          </form>
        </div>

        <div style={{ marginTop: 8 }}>
          <p style={{ color: "#6b7280", fontSize: "0.9rem", margin: "0 0 12px" }}>
            Referencia rápida de IDs
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8 }}>
            {catalogo.slice(0, 9).map((p) => (
              <div key={p.id} style={{
                background: "#f9f9f9", border: "1px solid rgba(0,0,0,0.08)",
                borderRadius: 14, padding: "10px 12px", fontSize: "0.82rem",
                cursor: "pointer"
              }} onClick={() => onAgregar({ ...p, tipo: "producto" })}>
                <strong style={{ color: "#d4141b" }}>{p.id}</strong>
                <div style={{ marginTop: 2, color: "#111", fontWeight: 600 }}>{p.nombre}</div>
                <div style={{ color: "#6b7280" }}>${p.precio.toFixed(2)}</div>
              </div>
            ))}
          </div>
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