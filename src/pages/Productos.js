import { useState } from "react";

const generarProductos = () => {
  let productos = [];
  for (let i = 1000; i < 1300; i++) {
    productos.push({
      id: i.toString(),
      nombre: `Producto ${i}`,
      precio: 50,
      disponible: true,
    });
  }
  return productos;
};

export default function Productos({ regresar }) {
  const [productos, setProductos] = useState(generarProductos());
  const [vista, setVista] = useState("lista");
  const [nuevo, setNuevo] = useState({});

  const agregar = () => {
    setProductos([...productos, { ...nuevo, disponible: true }]);
    setVista("lista");
  };

  const toggle = (i) => {
    const copia = [...productos];
    copia[i].disponible = !copia[i].disponible;
    setProductos(copia);
  };

  if (vista === "lista") {
    return (
      <div>
        <button onClick={regresar}>Regresar</button>

        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Estado</th>
              <th>Acción</th>
            </tr>
          </thead>

          <tbody>
            {productos.map((p, i) => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.nombre}</td>
                <td>${p.precio}</td>
                <td>{p.disponible ? "Disponible" : "No disponible"}</td>
                <td>
                  <button onClick={() => toggle(i)}>Cambiar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <button onClick={() => setVista("agregar")}>Agregar</button>
      </div>
    );
  }

  return (
    <div>
      <h2>Nuevo Producto</h2>

      <p>ID:</p>
      <input onChange={(e) => setNuevo({ ...nuevo, id: e.target.value })} />

      <p>Nombre:</p>
      <input onChange={(e) => setNuevo({ ...nuevo, nombre: e.target.value })} />

      <p>Precio:</p>
      <input onChange={(e) => setNuevo({ ...nuevo, precio: Number(e.target.value) })} />

      <button onClick={agregar}>Guardar</button>
    </div>
  );
}