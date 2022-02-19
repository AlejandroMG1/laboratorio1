/* eslint-disable no-console */
import axios from 'axios';

export const getAllIssuesByProyect = async (id, user) => {
  const options = {
    method: 'GET',
    url: `http://localhost:4000/projectIssues/${id}`,
    headers: { 'Content-type': 'application/json', user },
  };
  const respuesta = await axios.request(options);
  return respuesta.data;
};

export const getAllIssuesByUser = async (user) => {
  const options = {
    method: 'GET',
    url: 'http://localhost:4000/issues',
    headers: { 'Content-type': 'application/json', user },
  };

  const respuesta = await axios.request(options);
  return respuesta.data.issues;
};

export const getAllIssues = async (user) => {
  const options = {
    method: 'GET',
    url: 'http://localhost:4000/issue',
    headers: { 'Content-type': 'application/json', user },
  };

  const respuesta = await axios.request(options);
  return respuesta.data.issues;
};
