const { default: axios } = require('axios');

export const getAllEmpresas = async () => {
  const options = {
    method: 'GET',
    url: 'http://localhost:4000/enterprise',
    headers: { 'Content-type': 'application/json', user: 'sfgb' },
  };

  const respuesta = await axios.request(options);
  return respuesta.data.Empresas;
};