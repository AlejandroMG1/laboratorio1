import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import EmpresaForm from 'pages/empresa/EmpresaForm';
import FormProyecto from 'pages/proyecto/FormProyecto';
import FormUsuario from 'pages/usuario/FormUsuario';
import FormIssue from 'pages/issue/FormIssue';
import LoginForm from 'pages/Login';
import Proyectos from 'pages/proyecto/Proyectos';
import PublicLayout from 'layouts/PublicLayout';
import 'styles/globals.css';
import Issues from 'pages/issue/Issues';
import Usuarios from 'pages/usuario/Usuarios';
import DetallesProyecto from 'pages/proyecto/DetallesProyecto';
import { login, setAuthData } from 'servicios/auth';
import Loading from 'components/Loading';
import Home from 'pages/home/home';

const App = () => {
  const [auth, setAuth] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const Login = async (email) => {
    if (email) {
      try {
        setLoading(true);
        const res = await login(email);
        setLoading(false);
        if (res.data.status === 'ok') {
          setAuth(res.data.user);
          setAuthData(res.data.user);
        } else {
          setError('Usuario no válido');
        }
      } catch {
        setLoading(false);
        setError('Usuario no válido');
      }
    } else {
      setError('Ingrese un email');
    }
  };

  const Logout = () => {
    setAuth(null);
  };
  if (loading) {
    return <Loading />;
  }

  if (!auth) {
    return <LoginForm Login={Login} error={error} />;
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<PublicLayout user={auth} Logout={Logout} />}>
          <Route path='' element={<Home />} />
          {auth.role === 'Administrador' && (
            <>
              <Route
                path='CrearEmpresa'
                element={<EmpresaForm auth={auth} />}
              />
              <Route path='CrearProyecto' element={<FormProyecto />} />
              <Route path='CrearUsuario' element={<FormUsuario />} />
              <Route path='CrearIssue/' element={<FormIssue />} />
              <Route path='CrearIssue/:id' element={<FormIssue />} />
              <Route path='Proyectos' element={<Proyectos />} />
              <Route path='Usuarios' element={<Usuarios />} />
              <Route
                path='Proyectos/DetallesProyecto/:id'
                element={<DetallesProyecto />}
              />
            </>
          )}

          {auth.role === 'Cliente' && (
            <>
              <Route
                path='VerEmpresa'
                element={
                  <EmpresaForm empresaId={auth.enterpriseId} auth={auth} />
                }
              />
              <Route path='CrearUsuario' element={<FormUsuario />} />
              <Route path='Usuarios' element={<Usuarios />} />
              <Route path='CrearIssue/' element={<FormIssue />} />
              <Route path='CrearIssue/:id' element={<FormIssue />} />
            </>
          )}
          <Route path='*' element={<Issues />} />
          <Route path='Issues/DetallesIssue/:id' element={<FormIssue />} />
          <Route path='Issues' element={<Issues />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
