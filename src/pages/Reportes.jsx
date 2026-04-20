import { useState, useEffect } from "react";

export default function Reportes() {
  const [reporte, setReporte] = useState({ ventas: [], totalVentas: 0 });

  useEffect(() => {
    const data = localStorage.getItem("reporteTurno");
    if (data) setReporte(JSON.parse(data));
  }, []);

  const totalVentas = reporte.totalVentas || 0;

  if (reporte.ventas.length === 0) {
    return (
      <div className="card report-card">
        <div>
          <h2>Reporte del turno</h2>
          <p style={{ color: "#6b7280" }}>No hay ventas registradas en este turno.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="card selection-card">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12, marginBottom: 24 }}>
        <h1 style={{ margin: 0 }}>Reporte del turno</h1>
        <div style={{
          background: "#d4141b", color: "white", borderRadius: 18,
          padding: "14px 24px", fontWeight: 800, fontSize: "1.2rem"
        }}>
          Total: ${totalVentas.toFixed(2)}
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {reporte.ventas.map((venta) => (
          <div key={venta.id} style={{
            background: "#f9f9f9", borderRadius: 18, padding: "18px 20px",
            border: "1px solid rgba(0,0,0,0.07)"
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <div>
                <span style={{ fontWeight: 700, fontSize: "1rem" }}>{venta.cajero}</span>
                <span style={{
                  marginLeft: 10, background: "#f3f4f6", color: "#6b7280",
                  borderRadius: 999, padding: "3px 10px", fontSize: "0.78rem", fontWeight: 700
                }}>
                  {venta.hora}
                </span>
              </div>
              <strong style={{ color: "#d4141b", fontSize: "1.1rem" }}>${venta.total.toFixed(2)}</strong>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {venta.productos.map((p, i) => (
                <div key={i} style={{
                  display: "flex", justifyContent: "space-between",
                  fontSize: "0.88rem", color: "#374151",
                  borderBottom: "1px solid rgba(0,0,0,0.05)", paddingBottom: 4
                }}>
                  <span>{p.nombre} <span style={{ color: "#6b7280" }}>x{p.qty}</span></span>
                  <span style={{ fontWeight: 700 }}>${p.subtotal.toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}