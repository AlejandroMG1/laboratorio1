import axios from 'axios';

export const getAllIssuesByProyect = async (id) => {
  const options = {
    method: 'GET',
    url: 'http://localhost:4000/issues',
    headers: { 'Content-type': 'application/json' },
    data: id,
  };

  const respuesta = await axios.request(options);
  return respuesta.data.issues;
};

export const getAllIssuesByUser = async (id) => {
  const options = {
    method: 'GET',
    url: 'http://localhost:4000/issues',
    headers: { 'Content-type': 'application/json' },
    data: id,
  };

  const respuesta = await axios.request(options);
  return respuesta.data.issues;
};

export const getAllIssues = async () => {
  const options = {
    method: 'GET',
    url: 'http://localhost:4000/issues',
    headers: { 'Content-type': 'application/json' },
  };

  const respuesta = await axios.request(options);
  return respuesta.data.issues;
};
