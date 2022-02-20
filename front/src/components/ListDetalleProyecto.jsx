import Issues from 'pages/issue/Issues';
import Usuarios from 'pages/usuario/Usuarios';
import React from 'react';

const ListDetalleProyecto = ({ opt, id }) => {
  switch (opt) {
    case 1:
      return <Usuarios opt={1} id={id} />;
    case 2:
      return <Usuarios opt={2} id={id} />;
    default:
      return <Issues opt={1} id={id} />;
  }
};

export default ListDetalleProyecto;
