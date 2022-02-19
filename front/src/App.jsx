/* eslint-disable no-restricted-imports */
/* eslint-disable no-console */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CrearEmpresa from 'pages/empresa/CrearEmpresa';
import FormProyecto from 'pages/proyecto/FormProyecto';
import CrearUsuario from 'pages/usuario/CrearUsuario';
import FormIssue from 'pages/issue/FormIssue';
import LoginForm from 'pages/Login';
import Proyectos from 'pages/proyecto/Proyectos';
import PublicLayout from 'layouts/PublicLayout';
import 'styles/globals.css';
import Issues from 'pages/issue/Issues';
import Usuarios from 'pages/usuario/Usuarios';
import DetallesProyecto from 'pages/proyecto/DetallesProyecto';
import { getAuthData } from 'servicios/auth';
import DetallesIssue from 'pages/issue/DetallesIssue';

async function login(data) {
  return fetch('http://localhost:4000/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((er) => er);
}

const App = () => {
  const [auth, setAuth] = useState(null);
  const [error, setError] = useState('');

  const Login = (email) => {
    login({ email }).then((response) => {
      if (response.status === 'ok') {
        setAuth(response.user);
        getAuthData(response.user);
      } else {
        setError('Usuario no valido');
      }
    });
  };

  if (!auth) {
    return <LoginForm Login={Login} error={error} />;
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<PublicLayout user={auth} />}>
          {auth.role === 'Administrador' && (
            <Route path='CrearEmpresa' element={<CrearEmpresa />} />
          )}
          <Route path='CrearProyecto' element={<FormProyecto />} />
          <Route path='CrearUsuario' element={<CrearUsuario />} />
          <Route path='/CrearIssue/' element={<FormIssue />} />
          <Route path='/CrearIssue/:id' element={<FormIssue />} />
          <Route path='Proyectos' element={<Proyectos />} />
          <Route path='Issues' element={<Issues />} />
          <Route path='Issues/DetallesIssue/:id' element={<DetallesIssue />} />
          <Route path='Usuarios' element={<Usuarios />} />
          <Route
            path='Proyectos/DetallesProyecto/:id'
            element={<DetallesProyecto />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
