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
      className="p-6 bg-gray-900 min-h-screen text-gray-200 max-w-3xl mx-auto rounded-lg shadow-lg"
    >
      <h1 className="text-3xl md:text-4xl font-extrabold mb-6 tracking-wide">{livro.titulo}</h1>

      <div className="flex flex-col md:flex-row gap-6 mb-8 items-start">
        <img
          src={livro.capaUrl}
          alt={livro.titulo}
          className="max-w-xs w-full rounded-lg shadow-lg object-cover"
        />
        <div className="flex-1">
          <h2 className="text-xl md:text-2xl font-semibold mb-3">Descrição</h2>
          <p className="text-gray-400 text-sm md:text-base whitespace-pre-wrap leading-relaxed min-h-[120px]">
            {livro.descricao || 'Sem descrição disponível para este livro.'}
          </p>
        </div>
      </div>

      <a
        href={livro.linkDownload}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block bg-green-600 hover:bg-green-700 transition px-7 py-2 rounded-full font-semibold text-base md:text-lg shadow-md hover:shadow-xl"
      >
        📥 Baixar livro
      </a>

      <div className="mt-10 text-center">
        <Link
          to="/leituras"
          className="inline-block mt-6 text-blue-400 hover:text-blue-600 underline font-medium text-base md:text-lg transition"
        >
          ← Voltar para lista de livros
        </Link>
      </div>
    </motion.div>
  );
};

export default LivroDetalhe;
