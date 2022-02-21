import axios from 'axios';

export const getAllEmpresas = async (user) => {
  const options = {
    method: 'GET',
    url: 'http://localhost:4000/getAllEnterprises',
    headers: { 'Content-type': 'application/json', user },
  };

  const respuesta = await axios.request(options);
  return respuesta.data.empresas;
};

export const getEmpresaById = async (id, user) => {
  const options = {
    method: 'GET',
    url: `http://localhost:4000/enterprise/${id}`,
    headers: { 'Content-type': 'application/json', user },
  };

  const respuesta = await axios.request(options);
  return respuesta.data.empresa;
};

export const saveEmpresa = async (data, userId) => {
  const options = {
    method: data.user ? 'POST' : 'PATCH',
    url: `http://localhost:4000/enterprise${
      data.enterprise.id ? `/${data.enterprise.id}` : ''
    }`,
    headers: { 'Content-type': 'application/json', user: userId },
    data,
  };

  const respuesta = await axios.request(options);
  return respuesta.data;
};
