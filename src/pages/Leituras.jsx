import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Livros = () => {
  const [livros, setLivros] = useState([]);

  const fetchLivros = async () => {
    const colRef = collection(db, 'livros');
    const snapshot = await getDocs(colRef);
    const lista = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setLivros(lista);
  };

  useEffect(() => {
    fetchLivros();
  }, []);

  return (
  <div className="p-8 min-h-screen text-gray-100">
    <h1 className="text-4xl font-extrabold mb-8 tracking-wide select-none">
      📚 Livros
    </h1>

    <Link
      to="/dashboard-livros"
      className="mb-8 inline-block bg-blue-600 hover:bg-blue-700 transition-colors duration-300 px-5 py-3 rounded-lg font-semibold shadow-md shadow-blue-800/50"
    >
      Ir para Dashboard (Adicionar livro)
    </Link>

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {livros.map((livro, i) => (
        <motion.div
          key={livro.id}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.12, duration: 0.5, ease: 'easeOut' }}
          whileTap={{ scale: 0.95 }}
          className="relative rounded-xl overflow-hidden cursor-pointer  backdrop-blur-md border border-gray-700 shadow-lg transition-shadow duration-300"
        >
          <Link to={`/livros/${livro.id}`}>
            <div className="h-64 w-full overflow-hidden rounded-t-xl">
              <img
                src={livro.capaUrl}
                alt={livro.titulo}
                className="w-full h-full object-cover transition-transform duration-300 ease-in-out hover:scale-105"
                loading="lazy"
              />
            </div>
            <div className="p-5">
              <h2 className="text-lg font-semibold truncate text-white">
                {livro.titulo}
              </h2>
              {livro.descricao && (
                <p className="mt-2 text-gray-300 text-sm line-clamp-3 select-text">
                  {livro.descricao}
                </p>
              )}
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  </div>
);

};

export default Livros;
