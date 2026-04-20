import { useState } from "react";
import { useAuth } from "../context/AuthContext";

function PagoSection({ total, onLimpiar, ticket }) {
  const [recibido, setRecibido] = useState("");
  const [vendido, setVendido] = useState(false);
  const { empleadoLoggeado } = useAuth();

  const cambio = recibido ? parseFloat(recibido) - total : 0;

  function guardarEnReporte(ticket, total) {
    const reporte = JSON.parse(localStorage.getItem("reporteTurno") || '{"ventas":[],"totalVentas":0}');
    const venta = {
      id: Date.now(),
      cajero: empleadoLoggeado?.nombre || "Empleado",
      hora: new Date().toLocaleTimeString("es-MX", { hour: "2-digit", minute: "2-digit" }),
      productos: ticket.map((i) => ({ nombre: i.nombre, qty: i.qty, precio: i.precio, subtotal: i.precio * i.qty })),
      total,
    };
    reporte.ventas.push(venta);
    reporte.totalVentas = (reporte.totalVentas || 0) + total;
    localStorage.setItem("reporteTurno", JSON.stringify(reporte));
  }

  function imprimirTicket() {
    const fechaActual = new Date().toLocaleString("es-MX");
    const contenido = `
      <div style="font-family: monospace; font-size: 12px; width: 300px; padding: 16px; background: white; color: black;">
        <div style="text-align: center; margin-bottom: 16px;">
          <h2 style="margin: 0; font-size: 18px;">OXXO</h2>
          <p style="margin: 4px 0; font-size: 10px;">Punto de Venta</p>
          <p style="margin: 4px 0; font-size: 10px;">${fechaActual}</p>
          <p style="margin: 4px 0; font-size: 10px;">Atendió: ${empleadoLoggeado?.nombre || "Empleado"}</p>
          <div style="border-top: 1px dashed #000; margin: 8px 0;"></div>
        </div>
        <div>
          ${ticket.map((item) => `
            <div style="margin-bottom: 8px;">
              <div style="display: flex; justify-content: space-between;">
                <span>${item.nombre}</span>
                <span>$${(item.precio * item.qty).toFixed(2)}</span>
              </div>
              <div style="display: flex; justify-content: space-between; font-size: 10px; color: #666;">
                <span>${item.qty} x $${item.precio.toFixed(2)}</span>
                ${item.puntos > 0 ? `<span>${item.puntos} pts</span>` : ""}
              </div>
            </div>
          `).join("")}
        </div>
        <div style="border-top: 1px dashed #000; margin: 12px 0;"></div>
        <div>
          <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
            <span>Subtotal:</span>
            <span>$${(total / 1.16).toFixed(2)}</span>
          </div>
          <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
            <span>IVA (16%):</span>
            <span>$${(total - total / 1.16).toFixed(2)}</span>
          </div>
          <div style="display: flex; justify-content: space-between; font-size: 14px; font-weight: bold;">
            <span>TOTAL:</span>
            <span>$${total.toFixed(2)}</span>
          </div>
        </div>
        <div style="text-align: center; margin-top: 16px; border-top: 1px dashed #000; padding-top: 8px;">
          <p style="margin: 4px 0; font-size: 10px;">¡Gracias por su compra!</p>
          <p style="margin: 4px 0; font-size: 10px;">Vuelva pronto</p>
        </div>
      </div>
    `;
    const ventana = window.open("", "_blank", "width=400,height=600");
    ventana.document.write(`
      <html><head><title>Ticket OXXO</title>
      <style>body { margin: 0; padding: 20px; display: flex; justify-content: center; font-family: monospace; background: #f0f0f0; }
      @media print { body { margin: 0; padding: 0; background: white; } }</style>
      </head><body>${contenido}
      <script>window.onload = () => { window.print(); setTimeout(() => window.close(), 1000); };</script>
      </body></html>
    `);
    ventana.document.close();
  }

  function finalizar() {
    if (ticket.length === 0) return;
    setVendido(true);
    guardarEnReporte(ticket, total);
    imprimirTicket();
    setTimeout(() => {
      onLimpiar();
      setRecibido("");
      setVendido(false);
    }, 2200);
  }

  if (vendido) {
    return (
      <div style={{ textAlign: "center", padding: "20px 0" }}>
        <p style={{ color: "#ffb300", fontWeight: 700, margin: "8px 0 0" }}>¡Gracias por su compra!</p>
        <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.85rem", margin: "4px 0 0" }}>Imprimiendo ticket...</p>
      </div>
    );
  }

  const subtotalCalc = ticket.reduce((s, i) => s + (i.precio || 0) * (i.qty || 1), 0);
  const ivaCalc = subtotalCalc * 0.16;
  const totalCalc = subtotalCalc + ivaCalc;

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
        <button className="secondary" onClick={onLimpiar}>
          Cancelar
        </button>
      </div>
    </div>
  );
}

export default function TicketPanel({ ticket, setTicket, onLimpiar, mostrarPago = false }) {
  const subtotal = ticket.reduce((s, i) => s + (i.precio || 0) * (i.qty || 1), 0);
  const iva = subtotal * 0.16;
  const total = subtotal + iva;
  const totalPuntos = ticket.reduce((s, i) => s + ((i.puntos || 0) * (i.qty || 1)), 0);

  function cambiarQty(id, delta) {
    setTicket((prev) =>
      prev
        .map((i) => i.id === id ? { ...i, qty: (i.qty || 1) + delta } : i)
        .filter((i) => i.qty > 0)
    );
  }

  return (
    <div className="ticket-card">
      <div className="ticket-panel">
        <div className="ticket-header" style={{ marginBottom: 20 }}>
          <h2>Ticket</h2>
          <span className="ticket-count">
            {ticket.reduce((s, i) => s + (i.qty || 1), 0)} items
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
                    {item.tipo === "recarga" ? "Recarga" : item.tipo === "cafe" ? "Café" : `$${(item.precio || 0).toFixed(2)} c/u`}
                    {item.puntos ? ` · ${item.puntos} pts` : ""}
                  </span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6 }}>
                  <span style={{ color: "#ffb300", fontWeight: 700 }}>
                    ${((item.precio || 0) * (item.qty || 1)).toFixed(2)}
                  </span>
                  <div className="ticket-qty">
                    <button onClick={() => cambiarQty(item.id, -1)}>−</button>
                    <span>{item.qty || 1}</span>
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

        {totalPuntos > 0 && (
          <div style={{
            marginTop: 12, background: "rgba(255,179,0,0.12)", borderRadius: 14,
            padding: "12px 16px", display: "flex", justifyContent: "space-between", alignItems: "center"
          }}>
            <span style={{ color: "rgba(255,255,255,0.8)", fontSize: "0.9rem" }}>Puntos acumulados</span>
            <strong style={{ color: "#ffb300", fontSize: "1.2rem" }}>{totalPuntos} pts</strong>
          </div>
        )}

        {mostrarPago && (
          <PagoSection total={total} onLimpiar={onLimpiar} ticket={ticket} />
        )}
      </div>
    </div>
  );
}