import React from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/solid';

const ButtonNav = ({ title, names, rutas }) => {
  const prueba = () => (
    <div className='flex flex-row gap-x-3 my-2 px-2 hover:bg-[#565555] rounded-[5px]'>
      <span className='my-2 text-[20px] text-colorBlanco'>{title}</span>
      <img
        className='stroke-colorBlanco'
        src={Image}
        width='20'
        height='20'
        alt='icono'
      />
    </div>
  );

  return (
    <Menu as='div' className='relative inline-block text-left'>
      <div>
        <Menu.Button className='inline-flex items-center justify-center w-full px-4 py-2 font-medium text-colorNegro md:text-colorBlanco rounded-md bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75'>
          {title}
          <ChevronDownIcon
            className='w-5 h-5 ml-2 -mr-1 text-violet-200 hover:text-violet-100'
            aria-hidden='true'
          />
        </Menu.Button>
      </div>
      <Transition
        as={React.Fragment}
        enter='transition ease-out duration-100'
        enterFrom='transform opacity-0 scale-95'
        enterTo='transform opacity-100 scale-100'
        leave='transition ease-in duration-75'
        leaveFrom='transform opacity-100 scale-100'
        leaveTo='transform opacity-0 scale-95'
      >
        <Menu.Items className='absolute right-0 w-56 mt-2 origin-top-right bg-colorBlanco divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-colorNegro focus:outline-none'>
          <div className='px-1 py-1 '>
            {rutas.map((ruta, i) => (
              <Menu.Item key={`${i + 1}`}>
                {() => (
                  <NavLink to={ruta.link}>
                    <span className='flex py-2 px-2 text-colorNegro hover:text-colorBlanco hover:bg-[#565555] rounded-[5px]'>
                      {ruta.name}
                    </span>
                  </NavLink>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default ButtonNav;
