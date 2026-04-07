import { useState } from "react";

const empleadosIniciales = [
  { nombre: "Ana", apellidos: "Lopez", ciudad: "Acámbaro", celular: "1234567890", edad: 25, sueldo: 2500 },
  { nombre: "Luis", apellidos: "Martinez", ciudad: "Celaya", celular: "2223334444", edad: 30, sueldo: 3000 },
  { nombre: "Carla", apellidos: "Hernandez", ciudad: "Salamanca", celular: "5556667777", edad: 22, sueldo: 2200 },
  { nombre: "Diego", apellidos: "Ramirez", ciudad: "Irapuato", celular: "8889990000", edad: 28, sueldo: 2800 },
];

export default function Empleados({ regresar }) {
  const [empleados, setEmpleados] = useState(empleadosIniciales);
  const [vista, setVista] = useState("lista");
  const [form, setForm] = useState({});

  const agregar = () => {
    setEmpleados([...empleados, form]);
    setVista("lista");
  };

  const eliminar = (index) => {
    const copia = [...empleados];
    copia.splice(index, 1);
    setEmpleados(copia);
  };

  if (vista === "lista") {
    return (
      <div>
        <button onClick={regresar}>Regresar</button>

        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Apellidos</th>
              <th>Ciudad</th>
              <th>Celular</th>
              <th>Edad</th>
              <th>Sueldo</th>
              <th>Acción</th>
            </tr>
          </thead>

          <tbody>
            {empleados.map((e, i) => (
              <tr key={i}>
                <td>{e.nombre}</td>
                <td>{e.apellidos}</td>
                <td>{e.ciudad}</td>
                <td>{e.celular}</td>
                <td>{e.edad}</td>
                <td>${e.sueldo}</td>
                <td>
                  <button onClick={() => eliminar(i)}>Eliminar</button>
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
      <h2>Nuevo Empleado</h2>

      <p>Nombre:</p>
      <input onChange={(e) => setForm({ ...form, nombre: e.target.value })} />

      <p>Apellidos:</p>
      <input onChange={(e) => setForm({ ...form, apellidos: e.target.value })} />

      <p>Ciudad:</p>
      <input onChange={(e) => setForm({ ...form, ciudad: e.target.value })} />

      <p>Celular:</p>
      <input onChange={(e) => setForm({ ...form, celular: e.target.value })} />

      <p>Edad:</p>
      <input onChange={(e) => setForm({ ...form, edad: e.target.value })} />

      <p>Sueldo:</p>
      <input onChange={(e) => setForm({ ...form, sueldo: e.target.value })} />

      <button onClick={agregar}>Guardar</button>
    </div>
  );
}