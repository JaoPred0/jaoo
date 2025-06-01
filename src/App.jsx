import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Perfil from './pages/Perfil';
import Configuracoes from './pages/Configuracoes';
import Estudos from './pages/Estudos';
import EstudosEmCasa from './pages/EstudosEmCasa';
import IFMS from './pages/IFMS';
import Biblioteca from './pages/Biblioteca';
import Diario from './pages/Diario';
import Agenda from './pages/Agenda';
import Pomodoro from './pages/Pomodoro';
import BemEstar from './pages/BemEstar';
import Progresso from './pages/Progresso';
import Medalhas from './pages/Medalhas';
import Projetos from './pages/Projetos';
function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="h-screen bg-gray-900 text-white overflow-hidden">
      <Sidebar isOpen={menuOpen} setIsOpen={setMenuOpen} />
      
      <div className="md:ml-64 flex flex-col h-full">
        <Navbar toggleMenu={() => setMenuOpen(!menuOpen)} />
        <main className="p-4 overflow-y-auto flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/perfil" element={<Perfil />} />
            <Route path="/configuracoes" element={<Configuracoes />} />
            <Route path="/estudos" element={<Estudos />} />
            <Route path="/estudos-em-casa" element={<EstudosEmCasa />} />
            <Route path="/ifms" element={<IFMS />} />
            <Route path="/biblioteca-livros" element={<Biblioteca />} />
            <Route path="/diario" element={<Diario />} />
            <Route path="/agenda" element={<Agenda />} />
            <Route path="/pomodoro" element={<Pomodoro />} />
            <Route path="/bem-estar" element={<BemEstar />} />
            <Route path="/progresso" element={<Progresso />} />
            <Route path="/medalhas" element={<Medalhas />} />
            <Route path="/projetos" element={<Projetos />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;