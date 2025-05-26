import { Link, useLocation } from 'react-router-dom';

export default function Submenu({ activeMenu, menuItems, setSidebarOpen }) {
  const location = useLocation();

  const currentMenu = menuItems.find((item) => item.id === activeMenu);

  if (!currentMenu) return null;

  return (
    <div
      className={`
        fixed inset-y-0 left-16 bg-blue-600 text-white w-48
        transform ${activeMenu ? 'translate-x-0' : '-translate-x-full'}
        transition-transform duration-300 ease-in-out
        md:static md:flex-shrink-0 z-30
      `}
      onMouseEnter={() => {}}
      onMouseLeave={() => setSidebarOpen(false)}
    >
      {currentMenu.submenu.map(({ label, path }) => (
        <Link
          key={path}
          to={path}
          className={`
            flex items-center px-4 py-3 border-b border-blue-500 hover:bg-blue-500 transition
            ${location.pathname === path ? 'bg-blue-800 font-semibold' : ''}
          `}
          onClick={() => setSidebarOpen(false)}
        >
          {label}
        </Link>
      ))}
    </div>
  );
}
