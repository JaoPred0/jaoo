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
    <div className="p-6 bg-gray-900 min-h-screen text-gray-100">
      <h1 className="text-3xl font-bold mb-6">Livros</h1>

      <Link
        to="/dashboard-livros"
        className="mb-6 inline-block bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
      >
        Ir para Dashboard (Adicionar livro)
      </Link>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {livros.map((livro, i) => (
          <motion.div
            key={livro.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.5, ease: 'easeOut' }}
            whileHover={{ scale: 1.05, boxShadow: '0 10px 20px rgba(0,0,0,0.6)' }}
            whileTap={{ scale: 0.95 }}
            className="bg-gray-800 rounded-xl shadow-lg overflow-hidden cursor-pointer"
          >
            <Link to={`/livros/${livro.id}`}>
              <img src={livro.capaUrl} alt={livro.titulo} className="w-full h-56 object-cover" />
              <div className="p-4">
                <h2 className="text-xl font-semibold truncate">{livro.titulo}</h2>
                {livro.descricao && (
                  <p className="mt-2 text-gray-400 text-sm line-clamp-3">{livro.descricao}</p>
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
