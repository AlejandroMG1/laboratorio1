/* eslint-disable no-console */
const { default: axios } = require('axios');

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
    url: 'http://localhost:4000/projectById',
    headers: { 'Content-type': 'application/json', user },
    data: { proyectoId },
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
