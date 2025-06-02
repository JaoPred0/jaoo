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
import Medalhas from './pages/Medalhas';
import Projetos from './pages/Projetos';
import Tarefas from './pages/Tarefas';
import CardTarefas from './pages/CardTarefas';
import Leituras from './pages/Leituras';
import LivroDetalhe from './pages/LivroDetalhe';
import DashboardLivros from './pages/DashboardLivros';
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
            <Route path="/medalhas" element={<Medalhas />} />
            <Route path="/projetos" element={<Projetos />} />
            <Route path="/tarefas" element={<Tarefas />} />
            <Route path="/tarefas/:id" element={<CardTarefas />} />
            <Route path="/leituras" element={<Leituras />} />
            <Route path="/dashboard-livros" element={<DashboardLivros />} />
            <Route path="/livros/:id" element={<LivroDetalhe />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;