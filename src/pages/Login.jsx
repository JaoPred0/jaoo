import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../firebase';
import { useState } from 'react';
import 'animate.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const loginEmail = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, senha);
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  const loginGoogle = async () => {
    try {
      await signInWithPopup(auth, provider);
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  const closeModal = () => setError('');

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md animate__animated animate__fadeInUp">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Login</h2>

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
          onClick={loginEmail}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg mb-4 transition duration-300"
        >
          Entrar com Email
        </button>

        <button
          onClick={loginGoogle}
          className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg transition duration-300"
        >
          Entrar com Google
        </button>

        <p className="mt-6 text-center text-sm text-gray-600">
          Não tem conta?{' '}
          <a href="/register" className="text-blue-600 hover:underline">Cadastrar</a>
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
