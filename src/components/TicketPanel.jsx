import { useState } from "react";

function PagoSection({ total, onLimpiar, ticket }) {
  const [recibido, setRecibido] = useState("");
  const [vendido, setVendido] = useState(false);

  const cambio = recibido ? parseFloat(recibido) - total : 0;

  function finalizar() {
    if (ticket.length === 0) return;
    setVendido(true);
    setTimeout(() => {
      onLimpiar();
      setRecibido("");
      setVendido(false);
    }, 2200);
  }

  if (vendido) {
    return (
      <div style={{ textAlign: "center", padding: "20px 0" }}>
        <div style={{ fontSize: "2rem" }}>✅</div>
        <p style={{ color: "#ffb300", fontWeight: 700, margin: "8px 0 0" }}>¡Venta finalizada!</p>
      </div>
    );
  }

  return (
    <div style={{ marginTop: 16, display: "grid", gap: 10 }}>
      <div>
        <label style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.85rem", display: "block", marginBottom: 6 }}>
          Dinero recibido
        </label>
        <input
          type="number"
          value={recibido}
          onChange={(e) => setRecibido(e.target.value)}
          placeholder="$0.00"
          style={{
            width: "100%", background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)",
            borderRadius: 14, padding: "12px 14px", color: "white", fontSize: "1rem", boxSizing: "border-box"
          }}
        />
      </div>
      {recibido && parseFloat(recibido) >= total && (
        <div style={{
          background: "rgba(255,179,0,0.15)", borderRadius: 14,
          padding: "12px 16px", display: "flex", justifyContent: "space-between"
        }}>
          <span style={{ color: "rgba(255,255,255,0.8)" }}>Cambio</span>
          <strong style={{ color: "#ffb300", fontSize: "1.1rem" }}>${cambio.toFixed(2)}</strong>
        </div>
      )}
      <div className="ticket-actions">
        <button
          onClick={finalizar}
          disabled={ticket.length === 0 || !recibido || parseFloat(recibido) < total}
          style={{ opacity: ticket.length === 0 || !recibido || parseFloat(recibido) < total ? 0.5 : 1 }}
        >
          Finalizar venta
        </button>
        <button onClick={() => window.print()} className="secondary">
          Imprimir ticket
        </button>
        <button className="secondary" onClick={onLimpiar}>
          Cancelar
        </button>
      </div>
    </div>
  );
}

export default function TicketPanel({ ticket, setTicket, onLimpiar, mostrarPago = false }) {
  const subtotal = ticket.reduce((s, i) => s + i.precio * i.qty, 0);
  const iva = subtotal * 0.16;
  const total = subtotal + iva;

  // Debug
  console.log("Ticket actual:", ticket);

  function cambiarQty(id, delta) {
    setTicket((prev) =>
      prev
        .map((i) => i.id === id ? { ...i, qty: i.qty + delta } : i)
        .filter((i) => i.qty > 0)
    );
  }

  return (
    <div className="ticket-card">
      <div className="ticket-panel">
        <div className="ticket-header" style={{ marginBottom: 20 }}>
          <h2>Ticket</h2>
          <span className="ticket-count">
            {ticket.reduce((s, i) => s + i.qty, 0)} items
          </span>
        </div>

        {ticket.length === 0 ? (
          <div className="ticket-empty">Sin productos</div>
        ) : (
          <div className="ticket-list">
            {ticket.map((item) => (
              <div className="ticket-item" key={item.id}>
                <div className="ticket-item-name">
                  <strong>{item.nombre}</strong>
                  <span style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.82rem" }}>
                    {item.tipo === "recarga" ? "Recarga" : item.tipo === "cafe" ? "Café" : `$${item.precio.toFixed(2)} c/u`}
                  </span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6 }}>
                  <span style={{ color: "#ffb300", fontWeight: 700 }}>
                    ${(item.precio * item.qty).toFixed(2)}
                  </span>
                  <div className="ticket-qty">
                    <button onClick={() => cambiarQty(item.id, -1)}>−</button>
                    <span>{item.qty}</span>
                    <button onClick={() => cambiarQty(item.id, +1)}>+</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="ticket-summary" style={{ marginTop: 20 }}>
          <p><span>Subtotal</span><strong>${subtotal.toFixed(2)}</strong></p>
          <p><span>IVA (16%)</span><strong>${iva.toFixed(2)}</strong></p>
          <p style={{ borderTop: "1px solid rgba(255,255,255,0.15)", paddingTop: 12, marginTop: 4 }}>
            <span style={{ fontSize: "1.1rem" }}>TOTAL</span>
            <strong style={{ fontSize: "1.3rem", color: "#ffb300" }}>${total.toFixed(2)}</strong>
          </p>
        </div>

        {mostrarPago && (
          <PagoSection total={total} onLimpiar={onLimpiar} ticket={ticket} />
        )}
      </div>
    </div>
  );
}