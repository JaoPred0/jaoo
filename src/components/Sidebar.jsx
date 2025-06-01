import React from 'react';
import {
  FiFileText,
  FiCheckCircle,
  FiBriefcase,
  FiBell,
  FiMessageSquare,
  FiGlobe,
  FiList,
  FiShoppingCart,
  FiBook,
  FiBarChart2,
  FiCode,
  FiDatabase,
  FiTerminal,
  FiCloud,
  FiZap,
  FiTool,
  FiCpu,
  FiGitBranch,
  FiPackage,
  FiActivity
} from 'react-icons/fi';
import {
  AlarmClock, BarChart2, CalendarDays, Code,
  DiamondIcon, HeartPulse, Home, ListOrdered,
  School, School2Icon, User, X, Settings, MessageCircle,
  BookOpen, CalendarCheck,
  Medal,
} from 'lucide-react';
import clsx from 'clsx';
import { Link, useLocation } from 'react-router-dom';


const navItems = [
  { label: 'Início', icon: <Home size={20} />, path: '/' },
  { label: 'Estudos', icon: <School size={20} />, path: '/estudos' },
  { label: 'Diário', icon: <DiamondIcon size={20} />, path: '/diario' },
  { label: 'Agenda', icon: <CalendarDays size={20} />, path: '/agenda' },
  { label: 'Pomodoro', icon: <AlarmClock size={20} />, path: '/pomodoro' },
  { label: 'Bem-estar', icon: <HeartPulse size={20} />, path: '/bem-estar' },
  { label: 'Progresso', icon: <BarChart2 size={20} />, path: '/progresso' },
  { label: 'Medalhas', icon: <Medal size={20} />, path: '/medalhas' },
  { label: 'Projetos', icon: <Code size={20} />, path: '/projetos' },
  { label: 'Perfil', icon: <User size={20} />, path: '/perfil' },


  // Falta terminar
  { label: 'Tarefas', icon: <FiList size={20} />, path: '/tarefas' },
  { label: 'Compras', icon: <FiShoppingCart size={20} />, path: '/compras' },
  { label: 'Leituras', icon: <FiBook size={20} />, path: '/leituras' },
  { label: 'Relatórios', icon: <FiBarChart2 size={20} />, path: '/relatorios' },

  // Dev tools
  { label: 'IDE', icon: <FiCode size={20} />, path: '/ide' },
  { label: 'Banco de Dados', icon: <FiDatabase size={20} />, path: '/banco-de-dados' },
  { label: 'Terminal', icon: <FiTerminal size={20} />, path: '/terminal' },
  { label: 'Cloud', icon: <FiCloud size={20} />, path: '/cloud' },
  { label: 'Otimização', icon: <FiZap size={20} />, path: '/otimizacao' },
  { label: 'Ferramentas', icon: <FiTool size={20} />, path: '/ferramentas' },
  { label: 'Monitoramento', icon: <FiCpu size={20} />, path: '/monitoramento' },
  { label: 'Git', icon: <FiGitBranch size={20} />, path: '/git' },
  { label: 'Pacotes', icon: <FiPackage size={20} />, path: '/pacotes' },
  { label: 'Logs', icon: <FiActivity size={20} />, path: '/logs' },
];


const Sidebar = ({ isOpen, setIsOpen }) => {
  const location = useLocation();

  const linkClass = (path) =>
    clsx(
      'flex items-center gap-3 px-4 py-2 rounded-lg transition-colors duration-200',
      'hover:bg-blue-600/20 hover:text-blue-400',
      location.pathname === path ? 'bg-blue-600/10 text-blue-400 font-semibold' : 'text-gray-300'
    );

  return (
    <>
      {/* Backdrop */}
      <div
        className={clsx(
          ' fixed inset-0 bg-black bg-opacity-50 z-20 transition-opacity md:hidden',
          {
            'opacity-100 pointer-events-auto': isOpen,
            'opacity-0 pointer-events-none': !isOpen
          }
        )}
        onClick={() => setIsOpen(false)}
        aria-label="Fechar menu lateral"
      />

      {/* Sidebar */}
      <aside
        className={clsx(
          'fixed top-0 left-0 z-30 h-screen w-64 bg-gray-900 shadow-xl p-4 transition-transform transform',
          'md:translate-x-0',
          {
            '-translate-x-full': !isOpen,
            'translate-x-0': isOpen
          }
        )}
        aria-label="Menu lateral"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl text-white font-bold tracking-wide">Painel</h2>
          <button className="md:hidden text-gray-400 hover:text-red-500" onClick={() => setIsOpen(false)}>
            <X size={22} />
          </button>
        </div>

        <div className="overflow-y-auto max-h-[calc(100vh-100px)] hide-scrollbar">
          <nav>
            <ul className="space-y-1">
              {navItems.map((item, index) => (
                <li key={index} onClick={() => setIsOpen(false)}>
                  <Link to={item.path} className={linkClass(item.path)}>
                    {item.icon}
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </aside>

    </>
  );
};

export default Sidebar;
