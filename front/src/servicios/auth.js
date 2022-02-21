/* eslint-disable import/no-mutable-exports */
import axios from 'axios';

export let auth;

export const setAuthData = (a) => {
  auth = a;
};

export const login = async (email) => {
  const options = {
    url: 'http://localhost:4000/login',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: {
      email,
    },
  };

  const respuesta = await axios.request(options);
  return respuesta;
};
