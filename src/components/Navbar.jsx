import React from 'react';
import { Menu } from 'lucide-react';

const Navbar = ({ toggleMenu }) => {
  return (
    <header className="bg-gray-800 p-4 flex items-center justify-between md:justify-end">
      <button className="md:hidden" onClick={toggleMenu}>
        <Menu size={24} />
      </button>
      <h1 className="hidden md:block text-lg font-semibold">Dashboard</h1>
    </header>
  );
};

export default Navbar;
