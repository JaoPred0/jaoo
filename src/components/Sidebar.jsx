import React from 'react';
import { BookAIcon, Home, School, School2Icon, Settings, User, X } from 'lucide-react';
import clsx from 'clsx';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = ({ isOpen, setIsOpen }) => {
  const location = useLocation();

  const linkClass = (path) =>
    clsx(
      'flex items-center gap-2 hover:text-blue-400 cursor-pointer',
      location.pathname === path && 'text-blue-400 font-bold'
    );

  return (
    <>
      <div
        className={clsx(
          'fixed inset-0 bg-black bg-opacity-50 z-20 transition-opacity md:hidden',
          { 'opacity-100 pointer-events-auto': isOpen, 'opacity-0 pointer-events-none': !isOpen }
        )}
        onClick={() => setIsOpen(false)}
      />

      <aside
        className={clsx(
          'fixed z-30 top-0 left-0 h-full w-64 bg-gray-800 p-4 transition-transform transform md:translate-x-0',
          {
            '-translate-x-full': !isOpen,
            'translate-x-0': isOpen,
          }
        )}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Painel</h2>
          <button className="md:hidden" onClick={() => setIsOpen(false)}>
            <X size={20} />
          </button>
        </div>
        <ul className="space-y-4">
          <li onClick={() => setIsOpen(false)}>
            <Link to="/" className={linkClass('/')}>
              <Home size={20} /> Início
            </Link>
          </li>
          <li onClick={() => setIsOpen(false)}>
            <Link to="/estudos" className={linkClass('/estudos')}>
              <School size={20} /> Estudos
            </Link>
          </li>
          <li onClick={() => setIsOpen(false)}>
            <Link to="/perfil" className={linkClass('/perfil')}>
              <User size={20} /> Perfil
            </Link>
          </li>
        </ul>
      </aside>
    </>
  );
};

export default Sidebar;
