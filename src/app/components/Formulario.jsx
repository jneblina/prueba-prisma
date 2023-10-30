"use client";
import React, { useEffect, useState } from "react";

export const Formulario = () => {
  const [data, setData] = useState({});
  const [estudiantes, setEstudiantes] = useState([]);
  const [actualizarEstudiante, setActualizarEstudiante] = useState(null);
  const [filtro, setFiltro] = useState("");

  useEffect(() => {
    fetch("/api/registros")
      .then((res) => res.json())
      .then((res) => {
        setEstudiantes(res);
      });
  }, []);

  async function agregarEstudiante(e) {
    e.preventDefault();

    if (actualizarEstudiante) {
      await fetch(`/api/registros/${actualizarEstudiante.id}`, {
        method: "PUT",
        body: JSON.stringify(data),
      });
      setActualizarEstudiante(false);

      const estudiantesActualizados = await fetch("/api/registros").then(
        (res) => res.json()
      );
      setEstudiantes(estudiantesActualizados);

      setData({});
    } else {
      const respuesta = await fetch("/api/registros", {
        method: "POST",
        body: JSON.stringify(data),
      });
      setEstudiantes(estudiantes.concat(await respuesta.json()));
      setData({});
    }
  }

  const modificarEstudiante = (estudiante) => {
    setActualizarEstudiante(estudiante);
    setData(estudiante);
  };

  async function eliminarEstudiante(estudianteID) {
    await fetch(`/api/registros/${estudianteID}`, { method: "DELETE" });
    setEstudiantes(
      estudiantes.filter((estudiante) => estudiante.id != estudianteID)
    );
  }

  function limpiarFormulario() {
    setData({});
  }

  return (
    <div className="bg-gray-800 h-full">
      <h1 className="text-center lg:text-4xl text-2xl font-bold text-purple-200 p-4">
        Lista de estudiantes
      </h1>
      <div className="grid lg:grid-cols-3 grid-cols-1 gap-8 lg:p-12 p-4">
        <form
          onSubmit={agregarEstudiante}
          className="col-span-1 bg-gray-400 rounded-md p-4 lg:w-full w-11/12 mx-auto lg:mx-auto"
        >
          <p className="text-xl font-bold text-gray-900 mb-4 text-center">
            Nuevo Estudiante
          </p>
          <label htmlFor="name" className="labels">
            Nombre
          </label>
          <input
            onChange={(e) => {
              const inputValue = e.target.value.replace(/[^a-zA-Z\s]/g, "");
              setData({ ...data, nombre: inputValue });
            }}
            id="name"
            name="name"
            type="text"
            value={data.nombre || ""}
            className="inputs"
            placeholder="Escribe tu nombre completo"
            required
          />
          <label htmlFor="age" className="labels">
            Edad
          </label>
          <input
            onChange={(e) => {
              setData({ ...data, edad: Number(e.target.value) });
            }}
            id="age"
            name="age"
            type="number"
            value={data.edad || ""}
            className="inputs"
            placeholder="Escribe tu edad"
            max={99}
            maxLength={2}
            required
          />
          <label htmlFor="gender" className="labels">
            Género
          </label>
          <select
            onChange={(e) => {
              const inputValue = e.target.value;
              setData({ ...data, genero: inputValue });
            }}
            id="gender"
            name="gender"
            value={data.genero || ""}
            className="inputs"
            required
          >
            <option value="">Selecciona tu género</option>
            <option value="Hombre">Hombre</option>
            <option value="Mujer">Mujer</option>
          </select>

          <label htmlFor="career" className="labels">
            Carrera
          </label>
          <input
            onChange={(e) => {
              const inputValue = e.target.value.replace(/[^a-zA-Z\s]/g, "");
              setData({ ...data, carrera: inputValue });
            }}
            id="career"
            name="career"
            type="text"
            value={data.carrera || ""}
            className="inputs"
            placeholder="Escribe tu carrera"
            required
          />
          <div className="w-full grid grid-cols-4 gap-4 ">
            <button
              type="submit"
              className="buttonEstudiante col-span-2 bg-blue-500 hover:bg-blue-700"
            >
              {actualizarEstudiante
                ? "Actualizar Estudiante"
                : "Agregar Estudiante"}
            </button>
            <button
              type="reset"
              className="buttonEstudiante col-span-2 bg-purple-500 hover:bg-purple-700"
              onClick={limpiarFormulario}
            >
              Limpiar
            </button>
          </div>
        </form>
        <div className="col-span-2">
          <label
            htmlFor="filtro"
            className="text-white font-bold gap-4 pl-4 pr-4 lg:text-base text-xs"
          >
            Filtrar por Nombre
          </label>
          <input
            onChange={(e) => setFiltro(e.target.value)}
            id="filtro"
            name="filtro"
            type="text"
            value={filtro}
            className="p-1 mb-2 rounded-lg lg:text-base text-xs "
            placeholder="Busca un nombre"
          />
          <table className="tabla">
            <thead className="bg-gray-900">
              <tr className="font-semibold lg:text-lg text-sm text-white">
                <td>ID</td>
                <td>Nombre</td>
                <td>Género</td>
                <td>Edad</td>
                <td>Carrera</td>
                <td>Opciones</td>
              </tr>
            </thead>
            <tbody className="lg:text-base text-xs">
              {estudiantes
                .filter((estudiante) =>
                  estudiante.nombre.toLowerCase().includes(filtro.toLowerCase())
                )
                .map((estudiante) => (
                  <tr
                    className="border-y border-slate-600/10 align-middle justify-center items-center"
                    key={estudiante.id}
                  >
                    <td>{estudiante.id}</td>
                    <td>{estudiante.nombre}</td>
                    <td>{estudiante.genero}</td>
                    <td>{estudiante.edad}</td>
                    <td>{estudiante.carrera}</td>
                    <td className="flex lg:gap-4 gap-1 justify-center items-center">
                      <button
                        className="bg-green-400 buttonTabla"
                        onClick={() => modificarEstudiante(estudiante)}
                      >
                        Modificar
                      </button>
                      <button
                        className="bg-red-500 buttonTabla"
                        onClick={() => eliminarEstudiante(estudiante.id)}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Formulario;
