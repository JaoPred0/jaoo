import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home'; // layout fixo com Sidebar + Navbar + Outlet
import PrivateRoute from './components/PrivateRoute';
import { Estatisticas } from './pages/Estatisticas';
import { Perfil } from './pages/Perfil';
import { EditarPerfil } from './pages/EditarPerfil';
import { Horarios } from './pages/Horarios';
import { HorarioManualmente } from './pages/HorarioManualmente';

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Layout fixo sem /home na URL */}
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }
      >
        {/* Página inicial no "/" */}
        <Route index element={<div>Página inicial dentro do Home</div>} />
        <Route path="home/estatisticas" element={<Estatisticas />} />
        <Route path="perfil/meu-perfil" element={<Perfil />} />
        <Route path="perfil/editar" element={<EditarPerfil />} />
        <Route path="escola/horarios" element={<Horarios />} />
        <Route path="horarios/manual" element={<HorarioManualmente />} />
        {/* outras rotas fixas aqui */}
      </Route>

      {/* Redireciona qualquer outra rota não encontrada para "/" */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
