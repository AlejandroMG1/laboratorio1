const { default: axios } = require('axios');

export const getAllProyectos = async () => {
  const options = {
    method: 'GET',
    url: 'http://localhost:4000/project',
    headers: { 'Content-type': 'application/json', user: 'sfgb' },
  };

  const respuesta = await axios.request(options);
  return respuesta.data.proyectos;
};

export const getbyidProyecto = async (id) => {
  const options = {
    method: 'GET',
    url: 'http://localhost:4000/proyectos',
    headers: { 'Content-type': 'application/json', user: 'sfgb' },
    data: id,
  };

  const respuesta = await axios.request(options);
  return respuesta.data.proyecto;
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
