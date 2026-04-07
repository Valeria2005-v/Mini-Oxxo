import { useState } from "react";

export default function Cobro({ regresar }) {
  const [carrito, setCarrito] = useState([]);
  const [id, setId] = useState("");
  const [mostrarPago, setMostrarPago] = useState(false);
  const [pago, setPago] = useState("");
  const [ticket, setTicket] = useState(null);

  const agregar = () => {
    const producto = { nombre: `Producto ${id}`, precio: 50 };
    setCarrito([...carrito, producto]);
    setId("");
  };

  const total = carrito.reduce((acc, p) => acc + p.precio, 0);
  const iva = total * 0.16;

  const generarTicket = () => {
    const cambio = Number(pago) - (total + iva);

    setTicket({
      fecha: new Date().toLocaleString(),
      lugar: "ITSUR",
      carrito,
      total,
      iva,
      pago,
      cambio,
    });

    setCarrito([]);
    setMostrarPago(false);
    setPago("");
  };

  return (
    <div>
      <button onClick={regresar}>Regresar</button>

      <div style={{ display: "flex", gap: "20px" }}>
        <div>
          <h3>Productos</h3>
          {carrito.map((p, i) => (
            <div key={i}>{p.nombre} - ${p.precio}</div>
          ))}
        </div>

        <div>
          <p>Producto (ID):</p>
          <input
            value={id}
            onChange={(e) => setId(e.target.value)}
          />

          <button onClick={agregar}>Agregar</button>

          <p>IVA: ${iva.toFixed(2)}</p>
          <p>Total: ${(total + iva).toFixed(2)}</p>

          {!mostrarPago ? (
            <button onClick={() => setMostrarPago(true)}>Pagar</button>
          ) : (
            <>
              <p>Dinero recibido:</p>
              <input
                value={pago}
                onChange={(e) => setPago(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") generarTicket();
                }}
              />

              <button onClick={generarTicket}>Enter</button>
            </>
          )}
        </div>
      </div>

      {ticket && (
        <div className="ticket">
          <h3>TICKET</h3>
          <p>{ticket.fecha}</p>
          <p>{ticket.lugar}</p>

          {ticket.carrito.map((p, i) => (
            <div key={i}>{p.nombre} - ${p.precio}</div>
          ))}

          <p>IVA: ${ticket.iva.toFixed(2)}</p>
          <p>Total: ${(ticket.total + ticket.iva).toFixed(2)}</p>
          <p>Pago: ${ticket.pago}</p>
          <p>Cambio: ${ticket.cambio.toFixed(2)}</p>
        </div>
      )}
    </div>
  );
}