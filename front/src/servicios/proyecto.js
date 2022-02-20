import axios from 'axios';

export const getAllProyectos = async (user) => {
  const options = {
    method: 'GET',
    url: 'http://localhost:4000/projects',
    headers: { 'Content-type': 'application/json', user },
  };

  const respuesta = await axios.request(options);
  return respuesta.data.proyectos;
};

export const getbyidProyecto = async (proyectoId, user) => {
  const options = {
    method: 'GET',
    url: `http://localhost:4000/project/${proyectoId}`,
    headers: { 'Content-type': 'application/json', user },
  };

  const respuesta = await axios.request(options);
  return respuesta.data.proyecto;
};

export const crearProyecto = async (proyecto, user) => {
  const options = {
    method: 'POST',
    url: 'http://localhost:4000/project',
    headers: { 'Content-type': 'application/json', user },
    data: {
      proyecto: {
        name: proyecto.nombre,
        clientEnterpriseId: proyecto.empresa,
        description: proyecto.descripción,
      },
    },
  };

  const respuesta = await axios.request(options);
  return respuesta;
};

export const addCliente = async (idProyecto, idUser, user) => {
  const options = {
    method: 'PATCH',
    url: 'http://localhost:4000/addCliente',
    headers: { 'Content-type': 'application/json', user },
    data: {
      idProyecto,
      idUser,
    },
  };

  const respuesta = await axios.request(options);
  return respuesta;
};

export const addDeveloper = async (idProyecto, idUser, user) => {
  const options = {
    method: 'PATCH',
    url: 'http://localhost:4000/addDeveloper',
    headers: { 'Content-type': 'application/json', user },
    data: {
      idProyecto,
      idUser,
    },
  };

  const respuesta = await axios.request(options);
  return respuesta;
};
