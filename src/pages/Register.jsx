import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../firebase';
import { useState } from 'react';
import 'animate.css';

export default function Register() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [nome, setNome] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const registrar = async () => {
    try {
      const userCred = await createUserWithEmailAndPassword(auth, email, senha);
      await updateProfile(userCred.user, { displayName: nome });
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  const closeModal = () => setError('');

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md animate__animated animate__fadeInUp">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Cadastro</h2>

        <input
          type="text"
          placeholder="Nome de usuário"
          className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={nome}
          onChange={e => setNome(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Senha"
          className="w-full p-3 mb-6 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={senha}
          onChange={e => setSenha(e.target.value)}
        />

        <button
          onClick={registrar}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg transition duration-300"
        >
          Cadastrar
        </button>

        <p className="mt-6 text-center text-sm text-gray-600">
          Já tem conta?{' '}
          <a href="/login" className="text-blue-600 hover:underline">Entrar</a>
        </p>
      </div>

      {/* Modal de erro */}
      {error && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate__animated animate__fadeIn">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h3 className="text-xl font-semibold text-red-600 mb-4">Erro</h3>
            <p className="text-gray-700 mb-6">{error}</p>
            <button
              onClick={closeModal}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
