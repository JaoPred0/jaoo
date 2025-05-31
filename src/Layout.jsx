import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import { Outlet } from 'react-router-dom';

export default function Layout() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex">
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
      <div className="flex flex-col flex-1 ml-0 md:ml-64">
        <Navbar setIsOpen={setIsOpen} />
        <main className="p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
