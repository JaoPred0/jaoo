import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import { useState } from 'react';

export default function Home({ sair }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar
        activeMenu={activeMenu}
        setActiveMenu={setActiveMenu}
        sair={sair}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {(sidebarOpen || activeMenu) && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="flex-1 flex flex-col">
        <Navbar sair={sair} setSidebarOpen={setSidebarOpen} />

        <main className="flex-1 overflow-auto p-6 bg-gray-100">
          <Outlet /> {/* Aqui renderiza as rotas filhas */}
        </main>
      </div>
    </div>
  );
}
