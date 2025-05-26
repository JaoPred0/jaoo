import React, { useState, useEffect, useRef } from 'react';
import { FaHome, FaUser, FaCog, FaSignOutAlt, FaBars, FaBook } from 'react-icons/fa';
import { Link } from 'react-router-dom';
const menuItems = [
  {
    id: 'dashboard',
    icon: <FaHome size={20} />,
    label: 'Dashboard',
    submenu: [
      { label: 'Visão Geral', path: '/' },
      { label: 'Estatísticas', path: '/home/estatisticas' },
    ],
  },
  {
    id: 'ifms',
    icon: <FaBook size={20} />,
    label: 'IFMS',
    submenu: [
      { label: 'Horários', path: '/escola/horarios' },
      { label: 'Rascunho', path: '/escola/boletim' },
      { label: 'Calendário Escolar', path: '/escola/calendario' },
      { label: 'PE', path: '/escola/pe' },
      { label: 'Site do IFMS', path: 'https://www.ifms.edu.br', external: true },
    ],
  },
  {
    id: 'perfil',
    icon: <FaUser size={20} />,
    label: 'Perfil',
    submenu: [
      { label: 'Meu Perfil', path: 'perfil/meu-perfil' },
      { label: 'Editar Perfil', path: 'perfil/editar' },
    ],
  },

];

function Sidebar({ activeMenu, setActiveMenu, sair, sidebarOpen, setSidebarOpen }) {
  const sidebarRef = useRef();

  // Fecha sidebar e submenu se clicar fora
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        sidebarOpen
      ) {
        setSidebarOpen(false);
        setActiveMenu(null); // fecha submenu
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [sidebarOpen, setSidebarOpen, setActiveMenu]);

  return (
    <div
      ref={sidebarRef}
      style={{ zIndex: 100 }}
      className={`
        fixed inset-y-0 left-0 bg-blue-700 text-white w-16
        flex flex-col items-center py-4
        transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        transition-transform duration-300 ease-in-out
        md:translate-x-0 md:static md:flex-shrink-0
        z-40
      `}
    >
      {menuItems.map(({ id, icon, label, submenu }) => (
        <div key={id} className="relative w-full flex justify-center mb-4">
          <button
            title={label}
            onClick={() => setActiveMenu(activeMenu === id ? null : id)} // Toggle clique para abrir/fechar submenu
            className={`
              p-2 rounded hover:bg-blue-600 transition
              ${activeMenu === id ? 'bg-blue-800' : ''}
              focus:outline-none
            `}
          >
            {icon}
          </button>

          {/* Submenu aparece por clique, só em desktop */}
          {submenu && activeMenu === id && (
            <div
              className="
      absolute left-full top-0 ml-2 bg-blue-600 text-white rounded-md shadow-lg overflow-hidden
      z-50
    "
            >
              {submenu.map(({ label, path }) => (
                <Link
                  key={path}
                  to={path}
                  className="block px-4 py-2 hover:bg-blue-500 whitespace-nowrap"
                  onClick={() => {
                    setSidebarOpen(false);
                    setActiveMenu(null);
                  }}
                >
                  {label}
                </Link>
              ))}
            </div>
          )}
        </div>
      ))}

      {/* Botão Sair no rodapé */}
      <button
        onClick={() => {
          sair();
          setSidebarOpen(false);
          setActiveMenu(null);
        }}
        className="mt-auto p-2 rounded hover:bg-red-600 transition focus:outline-none"
        title="Sair"
      >
        <FaSignOutAlt size={20} />
      </button>
    </div>
  );
}

export default function SidebarWrapper() {
  const [activeMenu, setActiveMenu] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  function sair() {
    alert('Saindo...');
  }

  return (
    <>
      {/* Botão hamburguer só no celular para abrir/fechar sidebar */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="fixed top-4 left-4 z-50 md:hidden p-2 bg-blue-700 text-white rounded"
        aria-label="Abrir menu"
      >
        <FaBars size={24} />
      </button>

      <Sidebar
        activeMenu={activeMenu}
        setActiveMenu={setActiveMenu}
        sair={sair}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />
    </>
  );
}

export { menuItems };
