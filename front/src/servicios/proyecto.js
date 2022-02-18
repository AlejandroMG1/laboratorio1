/* eslint-disable no-console */
const { default: axios } = require('axios');

export const getAllProyectos = async () => {
  const options = {
    method: 'GET',
    url: 'http://localhost:4000/project',
    headers: { 'Content-type': 'application/json', user: 'sfgb' },
  };

  const respuesta = await axios.request(options);
  console.log(respuesta.data.proyectos);
  return respuesta.data.proyectos;
};

export const crearProyecto = async (proyecto) => {
  const options = {
    method: 'POST',
    url: 'http://localhost:4000/project',
    headers: { 'Content-type': 'application/json', user: 'sfgb' },
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
