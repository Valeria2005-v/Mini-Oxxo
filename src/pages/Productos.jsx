import { useState } from "react";

const CATEGORIAS = ["Todas", "Bebidas", "Botanas", "Panadería", "Lácteos", "Cigarros", "Café", "Charcutería", "Dulces", "Otros"];

export default function Productos({ catalogo, setCatalogo }) {
  const [categoriaActiva, setCategoriaActiva] = useState("Todas");
  const [busqueda, setBusqueda] = useState("");
  const [modo, setModo] = useState(null);
  const [productoEditando, setProductoEditando] = useState(null);
  const [form, setForm] = useState({ id: "", nombre: "", precio: "", categoria: "Bebidas", puntos: "" });

  const productosFiltrados = catalogo.filter((p) => {
    const matchCat = categoriaActiva === "Todas" || p.categoria === categoriaActiva;
    const matchBus = p.nombre.toLowerCase().includes(busqueda.toLowerCase()) || p.id.includes(busqueda);
    return matchCat && matchBus;
  });

  function abrirNuevo() {
    const siguienteId = String(catalogo.length + 1).padStart(3, "0");
    setForm({ id: siguienteId, nombre: "", precio: "", categoria: "Bebidas", puntos: "" });
    setProductoEditando(null);
    setModo("nuevo");
  }

  function abrirEditar(p) {
    setForm({ ...p, precio: String(p.precio), puntos: String(p.puntos || "") });
    setProductoEditando(p.id);
    setModo("editar");
  }

  function guardar() {
    if (!form.nombre || !form.precio) return;
    const nuevo = {
      ...form,
      precio: parseFloat(form.precio),
      puntos: form.puntos ? parseInt(form.puntos) : 0,
    };
    if (modo === "nuevo") {
      if (catalogo.find((p) => p.id === form.id)) {
        alert("Ya existe un producto con ese ID.");
        return;
      }
      setCatalogo((prev) => [...prev, nuevo]);
    } else {
      setCatalogo((prev) => prev.map((p) => p.id === productoEditando ? nuevo : p));
    }
    setModo(null);
  }

  function eliminar(id) {
    if (window.confirm("¿Eliminar este producto?")) {
      setCatalogo((prev) => prev.filter((p) => p.id !== id));
    }
  }

  return (
    <div className="card selection-card">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
        <h1 style={{ margin: 0 }}>Productos</h1>
        <button onClick={abrirNuevo} style={{
          background: "#d4141b", color: "white", border: "none",
          borderRadius: 999, padding: "10px 22px", fontWeight: 700, cursor: "pointer"
        }}>
          + Nuevo producto
        </button>
      </div>

      {modo && (
        <div style={{
          background: "#f9f9f9", border: "1px solid rgba(0,0,0,0.1)",
          borderRadius: 20, padding: 24, display: "grid", gap: 14
        }}>
          <h3 style={{ margin: 0 }}>{modo === "nuevo" ? "Nuevo producto" : "Editar producto"}</h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div>
              <label style={{ display: "block", fontWeight: 700, marginBottom: 6, fontSize: "0.9rem" }}>ID</label>
              <input value={form.id} onChange={(e) => setForm({ ...form, id: e.target.value })}
                disabled={modo === "editar"} placeholder="001" />
            </div>
            <div>
              <label style={{ display: "block", fontWeight: 700, marginBottom: 6, fontSize: "0.9rem" }}>Precio ($)</label>
              <input type="number" value={form.precio} onChange={(e) => setForm({ ...form, precio: e.target.value })}
                placeholder="0.00" />
            </div>
          </div>
          <div>
            <label style={{ display: "block", fontWeight: 700, marginBottom: 6, fontSize: "0.9rem" }}>Nombre</label>
            <input value={form.nombre} onChange={(e) => setForm({ ...form, nombre: e.target.value })}
              placeholder="Nombre del producto" />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div>
              <label style={{ display: "block", fontWeight: 700, marginBottom: 6, fontSize: "0.9rem" }}>Categoría</label>
              <select value={form.categoria} onChange={(e) => setForm({ ...form, categoria: e.target.value })}
                style={{ width: "100%", border: "1px solid rgba(0,0,0,0.15)", borderRadius: 18, padding: "14px 16px" }}>
                {CATEGORIAS.filter((c) => c !== "Todas").map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label style={{ display: "block", fontWeight: 700, marginBottom: 6, fontSize: "0.9rem" }}>
                Puntos
              </label>
              <input
                type="number"
                min="0"
                value={form.puntos}
                onChange={(e) => setForm({ ...form, puntos: e.target.value })}
                placeholder="0"
              />
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

      <div className="categories">
        {CATEGORIAS.map((c) => (
          <button key={c} className={`category-pill ${categoriaActiva === c ? "active" : ""}`}
            onClick={() => setCategoriaActiva(c)}>
            {c}
          </button>
        ))}
      </div>

      <div className="products-grid">
        {productosFiltrados.map((p) => (
          <div key={p.id} className="product-card">
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 4 }}>
                <span style={{
                  background: "#fff0f0", color: "#d4141b", borderRadius: 999,
                  padding: "3px 10px", fontSize: "0.78rem", fontWeight: 800
                }}>
                  ID: {p.id}
                </span>
                <span style={{
                  background: "#f3f4f6", color: "#6b7280", borderRadius: 999,
                  padding: "3px 10px", fontSize: "0.78rem", fontWeight: 700
                }}>
                  {p.categoria}
                </span>
              </div>
              <h3 style={{ marginTop: 10, marginBottom: 4 }}>{p.nombre}</h3>
              {p.puntos > 0 && (
                <span style={{
                  background: "#fffbeb", color: "#b45309", borderRadius: 999,
                  padding: "3px 10px", fontSize: "0.78rem", fontWeight: 700
                }}>
                  {p.puntos} pts
                </span>
              )}
            </div>
            <div>
              <div className="product-meta">
                <span className="product-price">${p.precio.toFixed(2)}</span>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                <button onClick={() => abrirEditar(p)}
                  style={{ background: "#111", borderRadius: 14, padding: "10px", fontWeight: 700, border: "none", color: "white", cursor: "pointer" }}>
                  Editar
                </button>
                <button onClick={() => eliminar(p.id)}
                  style={{ background: "transparent", border: "1px solid #d4141b", color: "#d4141b", borderRadius: 14, padding: "10px", fontWeight: 700, cursor: "pointer" }}>
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        ))}
        {productosFiltrados.length === 0 && (
          <div style={{ gridColumn: "1/-1", textAlign: "center", color: "#6b7280", padding: 40, fontWeight: 700 }}>
            No se encontraron productos
          </div>
        )}
      </div>
    </div>
  );
}