import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { motion } from 'framer-motion';

const LivroDetalhe = () => {
  const { id } = useParams();
  const [livro, setLivro] = useState(null);

  const fetchLivro = async () => {
    const docRef = doc(db, 'livros', id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setLivro(docSnap.data());
    } else {
      setLivro(null);
    }
  };

  useEffect(() => {
    fetchLivro();
  }, [id]);

  if (livro === null) {
    return (
      <div className="p-6 bg-gray-900 min-h-screen text-gray-200 flex flex-col items-center justify-center">
        <h1 className="text-3xl font-semibold mb-4">📚 Livro não encontrado</h1>
        <Link
          to="/livros"
          className="text-blue-400 hover:text-blue-600 underline text-lg transition"
        >
          Voltar para Livros
        </Link>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="p-8  min-h-screen text-gray-200 max-w-4xl mx-auto rounded-2xl "
    >
      <h1 className="text-4xl md:text-5xl font-extrabold mb-8 tracking-wide select-none">
        {livro.titulo}
      </h1>

      <div className="flex flex-col md:flex-row gap-10 mb-12 items-start">
        <img
          src={livro.capaUrl}
          alt={livro.titulo}
          className="max-w-sm w-full rounded-2xl shadow-2xl object-cover transition-transform duration-300 hover:scale-105"
        />
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold mb-4 border-b border-green-500 pb-2">
              Descrição
            </h2>
            <p className="text-gray-400 text-base md:text-lg whitespace-pre-wrap leading-relaxed min-h-[140px]">
              {livro.descricao || 'Sem descrição disponível para este livro.'}
            </p>
          </div>
        </div>
      </div>

      <a
        href={livro.linkDownload}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block bg-green-600 hover:bg-green-700 active:bg-green-800 transition 
        px-8 py-3 rounded-full font-semibold text-lg shadow-lg hover:shadow-2xl select-none"
        aria-label={`Baixar o livro ${livro.titulo}`}
      >
        📥 Baixar livro
      </a>

      <div className="mt-16 text-center">
        <Link
          to="/leituras"
          className="inline-block text-blue-400 hover:text-blue-600 underline font-medium text-lg transition select-none"
        >
          ← Voltar para lista de livros
        </Link>
      </div>
    </motion.div>
  );

};

export default LivroDetalhe;
