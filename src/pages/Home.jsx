import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';

import Sidebar, { menuItems } from '../components/Sidebar';
import Submenu from '../components/Submenu';
import Navbar from '../components/Navbar'; 

export default function Home() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);

  const sair = async () => {
    await signOut(auth);
    navigate('/login');
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar
        activeMenu={activeMenu}
        setActiveMenu={setActiveMenu}
        sair={sair}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <Submenu activeMenu={activeMenu} menuItems={menuItems} setSidebarOpen={setSidebarOpen} />

      {(sidebarOpen || activeMenu) && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={() => {
            setSidebarOpen(false);
            setActiveMenu(null);
          }}
        />
      )}

      <div className="flex-1 flex flex-col md:ml-64 md:ml-[112px]">
        <Navbar sair={sair} setSidebarOpen={setSidebarOpen} />

        <main className="flex-1 overflow-auto p-6 bg-gray-100">
          <h1 className="text-3xl font-bold">Página Home</h1>
          Bem-vindo(a), {auth.currentUser?.displayName || auth.currentUser?.email}!
        </main>
      </div>
    </div>
  );
}
