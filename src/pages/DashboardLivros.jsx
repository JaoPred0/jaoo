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
  <div className="p-8 min-h-screen text-gray-100 flex flex-col items-center">
    <h1 className="text-4xl font-extrabold mb-10 tracking-wide select-none">
      Dashboard - Adicionar Livro
    </h1>

    <form
      onSubmit={e => {
        e.preventDefault();
        adicionarLivro();
      }}
      className="flex flex-col gap-6 w-full max-w-lg"
    >
      <input
        type="text"
        placeholder="Título do livro *"
        value={titulo}
        onChange={e => setTitulo(e.target.value)}
        className="p-4 rounded-lg bg-gray-800 border border-gray-700 text-gray-200 placeholder-gray-400
          focus:outline-none focus:ring-4 focus:ring-green-500 focus:border-green-400 transition-shadow
          shadow-inner shadow-black/20"
        required
      />
      <input
        type="url"
        placeholder="URL da capa *"
        value={capaUrl}
        onChange={e => setCapaUrl(e.target.value)}
        className="p-4 rounded-lg bg-gray-800 border border-gray-700 text-gray-200 placeholder-gray-400
          focus:outline-none focus:ring-4 focus:ring-green-500 focus:border-green-400 transition-shadow
          shadow-inner shadow-black/20"
        required
      />
      <input
        type="url"
        placeholder="Link para baixar *"
        value={linkDownload}
        onChange={e => setLinkDownload(e.target.value)}
        className="p-4 rounded-lg bg-gray-800 border border-gray-700 text-gray-200 placeholder-gray-400
          focus:outline-none focus:ring-4 focus:ring-green-500 focus:border-green-400 transition-shadow
          shadow-inner shadow-black/20"
        required
      />
      <textarea
        placeholder="Descrição / Sobre o livro"
        value={descricao}
        onChange={e => setDescricao(e.target.value)}
        rows={5}
        className="p-4 rounded-lg bg-gray-800 border border-gray-700 text-gray-200 placeholder-gray-400
          focus:outline-none focus:ring-4 focus:ring-green-500 focus:border-green-400 transition-shadow
          shadow-inner shadow-black/20 resize-none"
      />

      <button
        type="submit"
        className="bg-green-600 hover:bg-green-700 focus:ring-4 focus:ring-green-400
          transition duration-300 text-white px-8 py-4 rounded-full font-semibold shadow-lg
          hover:shadow-2xl active:scale-95"
      >
        Adicionar Livro
      </button>
    </form>
  </div>
);

};

export default DashboardLivros;
