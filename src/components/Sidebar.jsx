import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import clsx from 'clsx';
import {
  FiList, FiBook, FiBarChart2, FiCode, FiDatabase,
  FiTerminal, FiCloud, FiZap, FiTool, FiCpu,
  FiGitBranch, FiPackage, FiActivity, FiTag,
} from 'react-icons/fi';
import {
  AlarmClock, BarChart2, CalendarDays, Code,
  DiamondIcon, HeartPulse, Home, ListOrdered,
  School, User, X, Medal, Sparkles
} from 'lucide-react';

const navItems = [
  { label: 'Início', icon: <Home size={20} />, path: '/' },
  { label: 'Estudos', icon: <School size={20} />, path: '/estudos' },
  { label: 'Jao X', icon: <FiTag size={20} />, path: '/jaox' },
  { label: 'Diário', icon: <DiamondIcon size={20} />, path: '/diario' },
  { label: 'Agenda', icon: <CalendarDays size={20} />, path: '/agenda' },
  { label: 'Medalhas', icon: <Medal size={20} />, path: '/medalhas' },
  { label: 'Projetos', icon: <Code size={20} />, path: '/projetos' },
  { label: 'Perfil', icon: <User size={20} />, path: '/perfil' },
  { label: 'Tarefas', icon: <FiList size={20} />, path: '/tarefas' },
  { label: 'Leituras', icon: <FiBook size={20} />, path: '/leituras' },
  { label: 'Animes', icon: <Sparkles size={20} />, path: '/animes' }
];

const Sidebar = ({ isOpen, setIsOpen }) => {
  const location = useLocation();

  const linkClass = (path) =>
    clsx(
      'flex items-center gap-3 px-4 py-2 rounded-xl transition-all duration-300 group',
      location.pathname === path
        ? 'bg-gradient-to-r from-blue-600/30 to-blue-400/20 text-blue-300 font-semibold shadow-lg'
        : 'text-gray-300 hover:bg-white/10 hover:text-white hover:shadow-md'
    );

  return (
    <>
      {/* Backdrop */}
      <div
        className={clsx(
          'fixed inset-0 bg-black/50 z-20 md:hidden transition-opacity duration-300',
          {
            'opacity-100 pointer-events-auto': isOpen,
            'opacity-0 pointer-events-none': !isOpen,
          }
        )}
        onClick={() => setIsOpen(false)}
      />

      {/* Sidebar */}
      <aside
        className={clsx(
          'fixed top-0 left-0 z-30 h-screen w-72 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 backdrop-blur-lg shadow-2xl p-5 transition-transform transform',
          'md:translate-x-0',
          {
            '-translate-x-full': !isOpen,
            'translate-x-0': isOpen,
          }
        )}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-extrabold text-white tracking-wide">
            Painel
          </h2>
          <button
            className="md:hidden text-gray-400 hover:text-red-500 transition"
            onClick={() => setIsOpen(false)}
          >
            <X size={22} />
          </button>
        </div>

        {/* Navigation */}
        <div className="overflow-y-auto max-h-[calc(100vh-100px)] hide-scrollbar pr-1">
          <ul className="space-y-2">
            {navItems.map((item, index) => (
              <li key={index} onClick={() => setIsOpen(false)}>
                <Link to={item.path} className={linkClass(item.path)}>
                  <div className="transition-transform group-hover:scale-110 text-blue-400">
                    {item.icon}
                  </div>
                  <span className="text-sm font-medium">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
