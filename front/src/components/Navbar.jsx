import React from 'react';
import ButtonNav from 'components/ButtonNav';
import logo from 'assets/2.svg';
// import { Link } from 'react-router-dom';

const navBarOptionsByRole = {
  Administrator: [
    {
      title: 'Empresa',
      rutas: [
        {
          name: 'Crear Empresa',
          link: 'CrearEmpresa',
        },
      ],
    },
    {
      title: 'Proyecto',
      rutas: [
        {
          name: 'Crear Proyectos',
          link: '/CrearProyecto',
        },
        {
          name: 'Ver Proyectos',
          link: '/Proyectos',
        },
      ],
    },
    {
      title: 'Usuario',
      rutas: [
        {
          name: 'Crear Usuarios',
          link: '/CrearUsuario',
        },
      ],
    },
    {
      title: 'Issue',
      rutas: [
        {
          name: 'Ver Issues',
          link: '/Issues',
        },
        {
          name: 'Crear Issue',
          link: '/CrearIssue',
        },
      ],
    },
  ],
  Cliente: [
    {
      title: 'Empresa',
      rutas: [
        {
          name: 'Ver Empresa',
          link: 'VerEmpresa',
        },
      ],
    },
    {
      title: 'Usuario',
      rutas: [
        {
          name: 'Ver Usuarios', // ver usuarios asociados a la empresa
          link: '/Usuarios',
        },
        {
          name: 'Crear Usuario', // Crear usuario a mi empresa
          link: '/CrearUsuario',
        },
      ],
    },
    {
      title: 'Issue',
      rutas: [
        {
          name: 'Ver Issues', //  visualizar issues por empresa y visualizar por proyecto
          link: '/Issues',
        },
        {
          name: 'Crear Issue',
          link: '/CrearIssue',
        },
      ],
    },
  ],
  Desarrollador: [
    {
      title: 'Issue',
      rutas: [
        {
          name: 'Ver Issues', //  visualizar issues por asignadas
          link: '/Issues',
        },
      ],
    },
  ],
};

const Navbar = (props) => {
  const { Logout, user } = props;
  return (
    <nav className='Toastify-full bg-colorNegro text-white items-center justify-between '>
      <div className='max-w-7xl lg:mx-auto px-4 sm:px-6 lg:px-8 flex items-center w-full justify-between'>
        <div className='flex items-center align-start'>
          <div className='flex items-center'>
            <img
              className='h-12 w-12 stroke-colorBlanco'
              src={logo}
              alt='logo Bit software'
            />
            <span className='text-colorBlanco text-sm md:text-2xl pl-4'>
              Bit software
            </span>
          </div>
        </div>

        <div className='flex items-center justify-center hidden md:flex'>
          {user.role === 'Administrador' && (
            <>
              {navBarOptionsByRole.Administrator.map((botones, i) => (
                <ButtonNav
                  key={`${i + 1}`}
                  rutas={botones.rutas}
                  title={botones.title}
                />
              ))}
            </>
          )}
          {user.role === 'Cliente' && (
            <>
              {navBarOptionsByRole.Cliente.map((botones, i) => (
                <ButtonNav
                  key={`${i + 1}`}
                  rutas={botones.rutas}
                  title={botones.title}
                />
              ))}
            </>
          )}
          {user.role === 'Desarrollador' && (
            <>
              {navBarOptionsByRole.Desarrollador.map((botones, i) => (
                <ButtonNav
                  key={`${i + 1}`}
                  rutas={botones.rutas}
                  title={botones.title}
                />
              ))}
            </>
          )}
        </div>

        <div className='flex flex-row gap-5 mr-4'>
          <span className='text-colorBlanco text-sm md:text-2xl justify-self-end'>
            {user.email}
          </span>
          <button type='button' onClick={() => Logout()}>
            <span className='my-2 text-sm md:text-2xl text-colorBlanco px-2 py-2 hover:bg-[#565555] rounded-[5px]'>
              Salir
            </span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
