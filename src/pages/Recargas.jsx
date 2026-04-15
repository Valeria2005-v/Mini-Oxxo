import { useState } from "react";
import TicketPanel from "../components/TicketPanel";

const operadoras = ["Telcel", "AT&T", "Movistar", "Unefon"];
const montos = [30, 50, 100, 150, 200, 300, 500];

export default function Recargas({ ticket, setTicket, onAgregar, onLimpiar }) {
  const [telefono, setTelefono] = useState("");
  const [operadora, setOperadora] = useState("Telcel");
  const [monto, setMonto] = useState(null);

  function agregarRecarga() {
    if (telefono.length < 10 || !monto) return;
    onAgregar({
      id: `REC-${Date.now()}`,
      nombre: `Recarga ${operadora} ${telefono}`,
      precio: monto,
      tipo: "recarga",
    });
    setTelefono("");
    setMonto(null);
  }

  return (
    <div className="cobro-grid">
      <div className="card selection-card">
        <div className="selection-header">
          <h1>Recargas</h1>
        </div>

        <div style={{ display: "grid", gap: 16 }}>
          <div>
            <label style={{ display: "block", fontWeight: 700, marginBottom: 8 }}>
              Número de teléfono
            </label>
            <input
              type="tel"
              maxLength={10}
              value={telefono}
              onChange={(e) => setTelefono(e.target.value.replace(/\D/g, ""))}
              placeholder="10 dígitos"
            />
          </div>

          <div>
            <label style={{ display: "block", fontWeight: 700, marginBottom: 8 }}>
              Operadora
            </label>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {operadoras.map((op) => (
                <button key={op} onClick={() => setOperadora(op)} style={{
                  border: `2px solid ${operadora === op ? "#d4141b" : "rgba(0,0,0,0.12)"}`,
                  background: operadora === op ? "#d4141b" : "white",
                  color: operadora === op ? "white" : "#111",
                  borderRadius: 999, padding: "8px 16px",
                  fontWeight: 700, cursor: "pointer", transition: "all 0.2s"
                }}>
                  {op}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label style={{ display: "block", fontWeight: 700, marginBottom: 8 }}>
              Monto
            </label>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {montos.map((m) => (
                <button key={m} onClick={() => setMonto(m)} style={{
                  border: `2px solid ${monto === m ? "#ffb300" : "rgba(0,0,0,0.12)"}`,
                  background: monto === m ? "#ffb300" : "white",
                  color: "#111", borderRadius: 999, padding: "10px 18px",
                  fontWeight: 800, cursor: "pointer", fontSize: "1rem", transition: "all 0.2s"
                }}>
                  ${m}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={agregarRecarga}
            disabled={telefono.length < 10 || !monto}
            style={{
              background: "#d4141b", color: "white", border: "none",
              borderRadius: 18, padding: "14px", fontWeight: 700,
              fontSize: "1rem", cursor: "pointer",
              opacity: telefono.length < 10 || !monto ? 0.5 : 1,
              transition: "opacity 0.2s"
            }}>
            Agregar recarga al ticket
          </button>
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