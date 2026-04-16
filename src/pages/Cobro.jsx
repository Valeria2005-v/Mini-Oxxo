import { useState, useRef, useEffect } from "react";
import TicketPanel from "../components/TicketPanel";

import uno from "../imagenes/UNO.jpeg";
import dos from "../imagenes/DOS.jpeg";
import tres from "../imagenes/TRES.jpeg";
import cuatro from "../imagenes/CUATRO.jpeg";
import cinco from "../imagenes/CINCO.jpeg";
import seis from "../imagenes/SEIS.jpeg";
import siete from "../imagenes/SIETE.jpeg";
import ocho from "../imagenes/OCHO.jpeg";
import nueve from "../imagenes/NUEVE.jpeg";
import diez from "../imagenes/DIEZ.jpeg";

export default function Cobro({ catalogo, ticket, setTicket, onAgregar, onLimpiar }) {
  const [idInput, setIdInput] = useState("");
  const inputRef = useRef(null);

  const imagenes = [uno, dos, tres, cuatro, cinco, seis, siete, ocho, nueve, diez];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const intervalo = setInterval(() => {
      setIndex((prev) => (prev + 1) % imagenes.length);
    }, 5000); // cada 5 segundos

    return () => clearInterval(intervalo);
  }, []);

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

            <button
              type="submit"
              style={{
                background: "#d4141b",
                color: "white",
                border: "none",
                borderRadius: 16,
                padding: "12px 22px",
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              + Agregar
            </button>
          </form>

          <div
            style={{
              marginTop: 20,
              width: "100%",
              height: "200px",
              overflow: "hidden",
              borderRadius: 12,
            }}
          >
            <img
              src={imagenes[index]}
              alt="Publicidad"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
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