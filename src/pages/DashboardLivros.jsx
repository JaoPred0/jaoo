import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const DashboardLivros = () => {
  const [titulo, setTitulo] = useState('');
  const [capaUrl, setCapaUrl] = useState('');
  const [linkDownload, setLinkDownload] = useState('');
  const [descricao, setDescricao] = useState('');
  const navigate = useNavigate();

  const adicionarLivro = async () => {
    if (!titulo.trim() || !capaUrl.trim() || !linkDownload.trim()) {
      alert('Preencha todos os campos obrigatórios!');
      return;
    }
    try {
      await addDoc(collection(db, 'livros'), {
        titulo,
        capaUrl,
        linkDownload,
        descricao,
      });
      alert('Livro adicionado!');
      setTitulo('');
      setCapaUrl('');
      setLinkDownload('');
      setDescricao('');
      navigate('/leituras');
    } catch (error) {
      alert('Erro ao adicionar livro: ' + error.message);
    }
  };

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-gray-100 flex flex-col items-center">
      <h1 className="text-3xl font-extrabold mb-8 tracking-wide">Dashboard - Adicionar Livro</h1>

      <form
        onSubmit={e => {
          e.preventDefault();
          adicionarLivro();
        }}
        className="flex flex-col gap-5 w-full max-w-md"
      >
        <input
          type="text"
          placeholder="Título do livro *"
          value={titulo}
          onChange={e => setTitulo(e.target.value)}
          className="p-3 rounded-md bg-gray-800 border border-gray-700 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
          required
        />
        <input
          type="url"
          placeholder="URL da capa *"
          value={capaUrl}
          onChange={e => setCapaUrl(e.target.value)}
          className="p-3 rounded-md bg-gray-800 border border-gray-700 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
          required
        />
        <input
          type="url"
          placeholder="Link para baixar *"
          value={linkDownload}
          onChange={e => setLinkDownload(e.target.value)}
          className="p-3 rounded-md bg-gray-800 border border-gray-700 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
          required
        />
        <textarea
          placeholder="Descrição / Sobre o livro"
          value={descricao}
          onChange={e => setDescricao(e.target.value)}
          rows={4}
          className="p-3 rounded-md bg-gray-800 border border-gray-700 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 transition resize-none"
        />

        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 transition text-white px-6 py-3 rounded-full font-semibold shadow-md hover:shadow-xl"
        >
          Adicionar Livro
        </button>
      </form>
    </div>
  );
};

export default DashboardLivros;
