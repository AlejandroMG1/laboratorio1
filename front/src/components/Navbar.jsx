import React from 'react';
import ButtonNav from 'components/ButtonNav';
import logo from 'assets/2.svg';
import { Link } from 'react-router-dom';

const Navbar = (props) => {
  const { user } = props;
  return (
    <nav className='flex flex-row w-full bg-colorNegro items-center px-4 justify-between '>
      <div className='flex items-center'>
        <img
          className='h-12 w-12 stroke-colorBlanco'
          src={logo}
          alt='logo Bit software'
        />
        <span className='text-colorBlanco text-2xl pl-4'>Bit software</span>
      </div>
      <div className='flex flex-row gap-x-3 '>
        {user.role === 'Administrador' && (
          <ButtonNav
            names={['crear Empresa']}
            rutas={['/CrearEmpresa']}
            title='Empresa'
          />
        )}
        <ButtonNav
          names={['ver proyectos', 'crear proyectos']}
          rutas={['/proyectos', '/CrearProyecto']}
          title='Proyecto'
        />
        <ButtonNav
          names={['ver Usuarios', 'crear Usuario']}
          rutas={['/Usuarios', '/CrearUsuario']}
          title='Usuario'
        />
        <ButtonNav
          names={['ver Issues', 'crear Issue']}
          rutas={['/Issues', '/CrearIssue']}
          title='Issue'
        />
      </div>
      <div className='flex flex-row gap-5 mr-4'>
        <span className='text-colorBlanco text-2xl justify-self-end'>
          {user.email}
        </span>
        <Link to='/'>
          <span className='my-2 text-2xl text-colorBlanco px-2 py-2 hover:bg-[#565555] rounded-[5px]'>
            Salir
          </span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
