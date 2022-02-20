/* eslint-disable no-unused-vars */
import axios from 'axios';

export const crearUser = async (newUser, user) => {
  const options = {
    method: 'POST',
    url: 'http://localhost:4000/user',
    headers: { 'Content-type': 'application/json', user },
    data: {
      user: {
        email: newUser.email,
        role: newUser.role,
        enterpriseId: newUser.empresa,
      },
    },
  };
  const respuesta = await axios.request(options);
  return respuesta;
};

export const getAllUsers = async (user) => {
  const options = {
    method: 'GET',
    url: 'http://localhost:4000/users',
    headers: { 'Content-type': 'application/json', user },
  };

  const respuesta = await axios.request(options);
  return respuesta.data.usuarios;
};

export const getAllClientesbyProyect = async (user, id) => {
  const options = {
    method: 'GET',
    url: `http://localhost:4000/getAllClientesbyProyect/${id}`,
    headers: { 'Content-type': 'application/json', user },
  };

  const respuesta = await axios.request(options);
  return respuesta.data.usuarios;
};

export const getAllDevelopersbyProyect = async (user, id) => {
  const options = {
    method: 'GET',
    url: `http://localhost:4000/getAllDevelopersbyProyect/${id}`,
    headers: { 'Content-type': 'application/json', user },
  };

  const respuesta = await axios.request(options);
  return respuesta.data.usuarios;
};
