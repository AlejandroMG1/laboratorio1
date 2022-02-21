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
    url: 'http://localhost:4000/issue',
    headers: { 'Content-type': 'application/json', user },
  };

  const respuesta = await axios.request(options);
  return respuesta.data.issues;
};

export const getIssue = async (id, user) => {
  const options = {
    method: 'GET',
    url: `http://localhost:4000/issue/${id}`,
    headers: { 'Content-type': 'application/json', user },
  };

  const respuesta = await axios.request(options);
  return respuesta.data.issue;
};

export const createIssue = async (issue, user) => {
  const options = {
    method: 'POST',
    url: 'http://localhost:4000/issue',
    data: issue,
    headers: { 'Content-type': 'application/json', user },
  };

  const respuesta = await axios.request(options);
  return respuesta.data.issues;
};

export const createComment = async (comment, user) => {
  const options = {
    method: 'POST',
    url: 'http://localhost:4000/comment/',
    data: comment,
    headers: { 'Content-type': 'application/json', user },
  };

  const respuesta = await axios.request(options);
  return respuesta.data;
};

export const updateIssue = async (id, issue, user) => {
  const options = {
    method: 'PATCH',
    url: `http://localhost:4000/issue/${id}`,
    data: issue,
    headers: { 'Content-type': 'application/json', user },
  };

  const respuesta = await axios.request(options);
  return respuesta.data;
};
