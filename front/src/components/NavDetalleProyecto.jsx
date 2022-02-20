/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';
import ButtonForm from 'components/ButtonForm';
import ListDetalleProyecto from 'components/ListDetalleProyecto';

const NavDetalleProyecto = ({ id, clientes, developers }) => {
  const [opt, setOpt] = useState(3);

  return (
    <div className='flex flex-col w-full pt-28'>
      <div className='flex flex-row w-[1000px] items-center mx-20 justify-between '>
        <ButtonForm
          text='Issues'
          submit={false}
          onclick={() => {
            setOpt(3);
          }}
        />

        <ButtonForm
          text='Clientes'
          submit={false}
          onclick={() => {
            setOpt(1);
          }}
        />

        <ButtonForm
          text='Desarrolladores'
          submit={false}
          onclick={() => {
            setOpt(2);
          }}
        />
      </div>
      <ListDetalleProyecto
        opt={opt}
        id={id}
        clientes={clientes}
        developers={developers}
      />
    </div>
  );
};

export default NavDetalleProyecto;
