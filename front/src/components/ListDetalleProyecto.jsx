import Issues from 'pages/issue/Issues';
import Usuarios from 'pages/usuario/Usuarios';
import React from 'react';

const ListDetalleProyecto = ({ opt, id, clientes, developers }) => {
  switch (opt) {
    case 1:
      return <Usuarios opt={1} usuarios={clientes} id={id} />;
    case 2:
      return <Usuarios opt={2} usuarios={developers} id={id} />;
    default:
      return <Issues id={id} />;
  }
};

export default ListDetalleProyecto;
