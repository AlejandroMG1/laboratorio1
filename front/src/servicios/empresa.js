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
