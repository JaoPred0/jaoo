import { FaBars, FaSignOutAlt } from 'react-icons/fa';
import { auth } from '../firebase';

export default function Navbar({ sair, setSidebarOpen }) {
  return (
    <header className="flex items-center justify-between bg-white shadow-md px-6 h-16">
      <button
        className="text-blue-700 md:hidden focus:outline-none"
        onClick={() => setSidebarOpen(true)}
        aria-label="Abrir menu"
      >
        <FaBars size={24} />
      </button>

      <div className="text-xl font-semibold text-gray-700 truncate max-w-xs">
        {auth.currentUser?.displayName || auth.currentUser?.email}
      </div>

      <button
        onClick={sair}
        className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition flex items-center"
      >
        <FaSignOutAlt className="mr-2" />
        Sair
      </button>
    </header>
  );
}
