import { useState } from "react";

const PUESTOS = ["Cajero", "Gerente"];
const TURNOS = ["Matutino", "Vespertino", "Nocturno"];

const empleadosIniciales = [
  { id: "E001", nombre: "María García", puesto: "Cajero", turno: "Matutino", activo: true },
  { id: "E002", nombre: "Juan Pérez", puesto: "Gerente", turno: "Matutino", activo: true },
  { id: "E003", nombre: "Luis Torres", puesto: "Cajero", turno: "Vespertino", activo: false },
];

export default function Empleados() {
  const [empleados, setEmpleados] = useState(empleadosIniciales);
  const [modo, setModo] = useState(null);
  const [empleadoEditando, setEmpleadoEditando] = useState(null);
  const [busqueda, setBusqueda] = useState("");
  const [form, setForm] = useState({ id: "", nombre: "", puesto: "Cajero", turno: "Matutino", activo: true });

  const empleadosFiltrados = empleados.filter((e) =>
    e.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
    e.id.toLowerCase().includes(busqueda.toLowerCase())
  );

  function abrirNuevo() {
    const siguienteId = "E" + String(empleados.length + 1).padStart(3, "0");
    setForm({ id: siguienteId, nombre: "", puesto: "Cajero", turno: "Matutino", activo: true });
    setEmpleadoEditando(null);
    setModo("nuevo");
  }

  function abrirEditar(e) {
    setForm({ ...e });
    setEmpleadoEditando(e.id);
    setModo("editar");
  }

  function guardar() {
    if (!form.nombre) return;
    if (modo === "nuevo") {
      setEmpleados((prev) => [...prev, form]);
    } else {
      setEmpleados((prev) => prev.map((e) => e.id === empleadoEditando ? form : e));
    }
    setModo(null);
  }

  function eliminar(id) {
    if (window.confirm("¿Eliminar este empleado?")) {
      setEmpleados((prev) => prev.filter((e) => e.id !== id));
    }
  }

  function toggleActivo(id) {
    setEmpleados((prev) =>
      prev.map((e) => e.id === id ? { ...e, activo: !e.activo } : e)
    );
  }

  return (
    <div className="card selection-card">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
        <h1 style={{ margin: 0 }}>Empleados</h1>
        <button onClick={abrirNuevo} style={{
          background: "#d4141b", color: "white", border: "none",
          borderRadius: 999, padding: "10px 22px", fontWeight: 700, cursor: "pointer"
        }}>
          + Nuevo empleado
        </button>
      </div>

      {modo && (
        <div style={{
          background: "#f9f9f9", border: "1px solid rgba(0,0,0,0.1)",
          borderRadius: 20, padding: 24, display: "grid", gap: 14
        }}>
          <h3 style={{ margin: 0 }}>{modo === "nuevo" ? "Nuevo empleado" : "Editar empleado"}</h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div>
              <label style={{ display: "block", fontWeight: 700, marginBottom: 6, fontSize: "0.9rem" }}>ID</label>
              <input value={form.id} disabled placeholder="E001"
                style={{ background: "#f0f0f0" }} />
            </div>
            <div>
              <label style={{ display: "block", fontWeight: 700, marginBottom: 6, fontSize: "0.9rem" }}>Nombre completo</label>
              <input value={form.nombre} onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                placeholder="Nombre del empleado" />
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div>
              <label style={{ display: "block", fontWeight: 700, marginBottom: 6, fontSize: "0.9rem" }}>Puesto</label>
              <select value={form.puesto} onChange={(e) => setForm({ ...form, puesto: e.target.value })}
                style={{ width: "100%", border: "1px solid rgba(0,0,0,0.15)", borderRadius: 18, padding: "14px 16px" }}>
                {PUESTOS.map((p) => <option key={p}>{p}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: "block", fontWeight: 700, marginBottom: 6, fontSize: "0.9rem" }}>Turno</label>
              <select value={form.turno} onChange={(e) => setForm({ ...form, turno: e.target.value })}
                style={{ width: "100%", border: "1px solid rgba(0,0,0,0.15)", borderRadius: 18, padding: "14px 16px" }}>
                {TURNOS.map((t) => <option key={t}>{t}</option>)}
              </select>
            </div>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <button onClick={guardar} style={{
              background: "#d4141b", color: "white", border: "none",
              borderRadius: 999, padding: "10px 24px", fontWeight: 700, cursor: "pointer"
            }}>
              Guardar
            </button>
            <button onClick={() => setModo(null)} style={{
              background: "transparent", border: "1px solid rgba(0,0,0,0.2)",
              borderRadius: 999, padding: "10px 24px", fontWeight: 700, cursor: "pointer"
            }}>
              Cancelar
            </button>
          </div>
        </div>
      )}

      <input value={busqueda} onChange={(e) => setBusqueda(e.target.value)}
        placeholder="Buscar por nombre o ID..." />

      <div className="products-grid">
        {empleadosFiltrados.map((e) => (
          <div key={e.id} className="product-card">
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 4 }}>
                <span style={{
                  background: "#fff0f0", color: "#d4141b", borderRadius: 999,
                  padding: "3px 10px", fontSize: "0.78rem", fontWeight: 800
                }}>
                  {e.id}
                </span>
                <span style={{
                  background: e.activo ? "#f0fdf4" : "#f3f4f6",
                  color: e.activo ? "#16a34a" : "#d4141b",
                  borderRadius: 999, padding: "3px 10px", fontSize: "0.78rem", fontWeight: 700
                }}>
                  {e.activo ? "Activo" : "Inactivo"}
                </span>
              </div>
              <h3 style={{ marginTop: 10, marginBottom: 4 }}>{e.nombre}</h3>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                <span style={{
                  background: "#f3f4f6", color: "#374151", borderRadius: 999,
                  padding: "3px 10px", fontSize: "0.78rem", fontWeight: 700
                }}>
                  {e.puesto}
                </span>
                <span style={{
                  background: "#eff6ff", color: "#374151", borderRadius: 999,
                  padding: "3px 10px", fontSize: "0.78rem", fontWeight: 700
                }}>
                  {e.turno}
                </span>
              </div>
            </div>
            <div style={{ marginTop: 16, display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
              <button onClick={() => abrirEditar(e)}
                style={{ background: "#111", borderRadius: 14, padding: "10px", fontWeight: 700, border: "none", color: "white", cursor: "pointer", fontSize: "0.82rem" }}>
                Editar
              </button>
              <button onClick={() => toggleActivo(e.id)}
                style={{ background: "transparent", border: "1px solid #111", color: "#111", borderRadius: 14, padding: "10px", fontWeight: 700, cursor: "pointer", fontSize: "0.82rem" }}>
                {e.activo ? "Pausar" : "Activar"}
              </button>
              <button onClick={() => eliminar(e.id)}
                style={{ background: "transparent", border: "1px solid #d4141b", color: "#d4141b", borderRadius: 14, padding: "10px", fontWeight: 700, cursor: "pointer", fontSize: "0.82rem" }}>
                Eliminar
              </button>
            </div>
          </div>
        ))}
        {empleadosFiltrados.length === 0 && (
          <div style={{ gridColumn: "1/-1", textAlign: "center", color: "#6b7280", padding: 40, fontWeight: 700 }}>
            No se encontraron empleados
          </div>
        )}
      </div>
    </div>
  );
}