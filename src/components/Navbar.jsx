import React from 'react';
import { Menu } from 'lucide-react';

const Navbar = ({ toggleMenu }) => {
  return (
    <header className="bg-gray-900 text-white p-4 flex items-center justify-between md:justify-center shadow-md">
      {/* Botão menu: só aparece em telas pequenas */}
      <button
        className="md:hidden text-white hover:text-blue-400 transition-colors"
        onClick={toggleMenu}
        aria-label="Abrir menu lateral"
      >
        <Menu size={24} />
      </button>

      {/* Título centralizado em telas médias e maiores */}
      <h1 className="text-xl font-bold md:absolute md:left-1/2 md:transform md:-translate-x-1/2">
        Jaoo
      </h1>

      {/* Espaço para equilibrar o layout no desktop (pode ser vazio) */}
      <div className="hidden md:block w-6" />
    </header>
  );
};

export default Navbar;
