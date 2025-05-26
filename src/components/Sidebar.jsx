import { FaHome, FaUser, FaCog, FaSignOutAlt } from 'react-icons/fa';

const menuItems = [
  {
    id: 'dashboard',
    icon: <FaHome size={20} />,
    label: 'Dashboard',
    submenu: [
      { label: 'Visão Geral', path: '/dashboard/overview' },
      { label: 'Estatísticas', path: '/dashboard/stats' },
    ],
  },
  {
    id: 'perfil',
    icon: <FaUser size={20} />,
    label: 'Perfil',
    submenu: [
      { label: 'Meu Perfil', path: '/perfil/meu-perfil' },
      { label: 'Editar Perfil', path: '/perfil/editar' },
    ],
  },
  {
    id: 'configuracoes',
    icon: <FaCog size={20} />,
    label: 'Configurações',
    submenu: [
      { label: 'Preferências', path: '/configuracoes/preferencias' },
      { label: 'Segurança', path: '/configuracoes/seguranca' },
    ],
  },
];

export default function Sidebar({ activeMenu, setActiveMenu, sair, sidebarOpen, setSidebarOpen }) {
  const toggleMenu = (id) => {
    setActiveMenu((prev) => (prev === id ? null : id));
  };

  return (
    <div
      className={`
        fixed inset-y-0 left-0 bg-blue-700 text-white w-16
        flex flex-col items-center py-4
        transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        transition-transform duration-300 ease-in-out
        md:translate-x-0 md:static md:flex-shrink-0
        z-40
      `}
    >
      {menuItems.map(({ id, icon, label }) => (
        <button
          key={id}
          title={label}
          onClick={() => toggleMenu(id)}
          className={`
            mb-4 p-2 rounded hover:bg-blue-600 transition
            ${activeMenu === id ? 'bg-blue-800' : ''}
            focus:outline-none
          `}
        >
          {icon}
        </button>
      ))}

      <button
        onClick={sair}
        title="Sair"
        className="mt-auto mb-4 p-2 rounded hover:bg-blue-600 transition focus:outline-none"
      >
        <FaSignOutAlt size={20} />
      </button>
    </div>
  );
}

export { menuItems };
