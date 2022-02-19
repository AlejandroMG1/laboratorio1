/* eslint-disable no-unused-vars */
/* eslint-disable spaced-comment */
/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import Image from 'assets/1.svg';
import { NavLink } from 'react-router-dom';
import { Dropdown } from 'rsuite';

const ButtonNav = ({ title, names, rutas }) => {
  const prueba = () => (
    <div className='flex flex-row gap-x-3 my-2 px-2 hover:bg-[#565555] rounded-[5px]'>
      <span className='my-2 text-[20px] text-colorBlanco'>{title}</span>
      <img className='stroke-colorBlanco' src={Image} width='20' height='20' />
    </div>
  );

  return (
    <div>
      <Dropdown renderToggle={prueba} title='dos' trigger='hover'>
        <Dropdown.Item>
          {names.map((name, index) => (
            <DropdownItem
              key={`${index + 1}`}
              ruta={rutas[index]}
              name={name}
            />
          ))}
        </Dropdown.Item>
      </Dropdown>
    </div>
  );
};

const DropdownItem = ({ ruta, name }) => (
  <NavLink to={ruta}>
    <span className='flex py-2 px-2 text-[18px] text-colorBlanco hover:bg-[#565555] rounded-[5px]'>
      {name}
    </span>
  </NavLink>
);

export default ButtonNav;
