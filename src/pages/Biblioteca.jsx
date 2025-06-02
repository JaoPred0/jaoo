import React, { useState } from 'react';

const livrosMock = [
  {
    id: 1,
    titulo: 'Sociologia Hoje',
    autor: 'Machado de Assis',
    categoria: 'Romance',
    urlCapa: '/public/biblioteca/sociologia_hoje.png',
    urlLivro: 'https://drive.google.com/drive/folders/0B5HxDYbtKJ7dajd6a3prR2FVNm8?resourcekey=0-SKhfGMWcm6gdtH8QvOFDmA',
  },
];

const categorias = ['Todos', 'Romance', 'Infantil', 'Realismo Mágico', 'Distopia', 'Fantasia'];

const Biblioteca = () => {
  const [categoriaSelecionada, setCategoriaSelecionada] = useState('Todos');
  const [pesquisa, setPesquisa] = useState('');

  // Filtra por categoria e depois por pesquisa no título ou autor
  const livrosFiltrados = livrosMock
    .filter((livro) =>
      categoriaSelecionada === 'Todos' ? true : livro.categoria === categoriaSelecionada
    )
    .filter(
      (livro) =>
        livro.titulo.toLowerCase().includes(pesquisa.toLowerCase()) ||
        livro.autor.toLowerCase().includes(pesquisa.toLowerCase())
    );

  return (
    <div className="min-h-screen bg-gray-900 p-6 text-white">
      <h1 className="text-4xl font-serif mb-8 text-center">📚 Minha Biblioteca</h1>

      <div className="max-w-xl mx-auto mb-8 flex flex-col sm:flex-row gap-4">
        {/* Pesquisa */}
        <input
          type="text"
          placeholder="Pesquisar por título ou autor..."
          value={pesquisa}
          onChange={(e) => setPesquisa(e.target.value)}
          className="flex-1 px-4 py-3 rounded-md border border-gray-700 bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-600"
        />

        {/* Filtro de categoria */}
        <select
          value={categoriaSelecionada}
          onChange={(e) => setCategoriaSelecionada(e.target.value)}
          className="w-48 px-4 py-3 rounded-md border border-gray-700 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-gray-600"
        >
          {categorias.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Lista de livros */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {livrosFiltrados.length === 0 ? (
          <p className="text-center col-span-full text-gray-400 font-semibold">
            Nenhum livro encontrado 😕
          </p>
        ) : (
          livrosFiltrados.map((livro) => (
            <div
              key={livro.id}
              className="bg-gray-800 rounded-lg shadow-md p-4 flex flex-col justify-between border border-gray-700 hover:bg-gray-700 transition-colors"
            >
              <a href={livro.urlLivro} target="_blank" rel="noopener noreferrer">
                <img
                  src={livro.urlCapa}
                  alt={`Capa do livro ${livro.titulo}`}
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
              </a>
              <h2 className="text-xl font-semibold font-serif mb-1">{livro.titulo}</h2>
              <p className="italic text-gray-300 mb-2">— {livro.autor}</p>
              <span className="inline-block text-sm bg-gray-700 px-2 py-1 rounded text-gray-300 select-none">
                {livro.categoria}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Biblioteca;
