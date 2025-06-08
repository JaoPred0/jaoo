import React from 'react';
import { Menu } from 'lucide-react';
import { Layout, Typography } from 'antd';

const { Header } = Layout;
const { Title } = Typography;

const Navbar = ({ toggleMenu }) => {
  return (
    <Header
      style={{ backgroundColor: '#040814' }}
      className="backdrop-blur-lg text-white shadow-md px-4 flex items-center justify-between md:justify-center h-16"
    >
      {/* Botão menu (mobile) */}
      <button style={{color: '#ffffff'}}
        className="md:hidden text-white hover:text-blue-400 transition-colors"
        onClick={toggleMenu}
        aria-label="Abrir menu lateral"
      >
        <Menu size={24} />
      </button>

      {/* Título centralizado no desktop */}
      <Title
        level={4}
        className="!text-white !m-0 text-xl font-bold md:absolute md:left-1/2 md:-translate-x-1/2 md:block"
      >
        Jaoo
      </Title>

      {/* Espaço vazio (desktop) */}
      <div className="hidden md:block w-6" />
    </Header>
  );
};

export default Navbar;
