import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { motion } from 'framer-motion';
import { FaFolderPlus, FaFolderOpen, FaTrash } from 'react-icons/fa';

const Tarefas = () => {
  const [cards, setCards] = useState([]);
  const [novoCard, setNovoCard] = useState('');
  const [modalAberto, setModalAberto] = useState(false);
  const [idParaDeletar, setIdParaDeletar] = useState(null);

  const fetchCards = async () => {
    const snapshot = await getDocs(collection(db, 'cards'));
    const lista = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setCards(lista);
  };

  const criarCard = async () => {
    if (!novoCard.trim()) return;
    await addDoc(collection(db, 'cards'), { titulo: novoCard });
    setNovoCard('');
    fetchCards();
  };

  const deletarCard = async () => {
    if (!idParaDeletar) return;
    await deleteDoc(doc(db, 'cards', idParaDeletar));
    setModalAberto(false);
    setIdParaDeletar(null);
    fetchCards();
  };

  const abrirModal = (id) => {
    setIdParaDeletar(id);
    setModalAberto(true);
  };

  const fecharModal = () => {
    setModalAberto(false);
    setIdParaDeletar(null);
  };

  useEffect(() => {
    fetchCards();
  }, []);

  return (
    <div className="p-6 min-h-screen transition-colors">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
        <FaFolderOpen /> Pastas de Tarefas
      </h2>

      <div className="flex gap-3 mb-8">
        <input
          className="flex-grow bg-opacity-30 backdrop-blur-sm border placeholder-gray-600 dark:placeholder-gray-400 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          placeholder="Nome da pasta"
          value={novoCard}
          onChange={(e) => setNovoCard(e.target.value)}
        />
        <button
          onClick={criarCard}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition-transform active:scale-95"
          title="Criar nova pasta"
        >
          <FaFolderPlus />
          Criar
        </button>
      </div>

      <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {cards.map((card, i) => (
          <Card
            key={card.id}
            id={card.id}
            titulo={card.titulo}
            delay={i * 0.08}
            abrirModal={abrirModal}
          />
        ))}
      </div>

      {/* Modal de confirmação */}
      {modalAberto && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg max-w-sm w-full text-center"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-lg font-bold mb-5 text-gray-900 dark:text-gray-100">
              Confirmar exclusão
            </h3>
            <p className="mb-8 text-gray-700 dark:text-gray-300">
              Tem certeza que deseja apagar esta pasta? Essa ação não pode ser desfeita.
            </p>
            <div className="flex justify-center gap-6">
              <button
                onClick={fecharModal}
                className="px-5 py-2 rounded-lg border border-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
              >
                Cancelar
              </button>
              <button
                onClick={deletarCard}
                className="px-5 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white font-semibold transition"
              >
                Apagar
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

const Card = ({ id, titulo, delay, abrirModal }) => {
  const irParaTarefas = () => {
    window.location.href = `/tarefas/${id}`;
  };

  const pedirConfirmacao = (e) => {
    e.stopPropagation();
    abrirModal(id);
  };

  return (
    <motion.div
      className=" p-4 rounded-lg shadow hover:shadow-md cursor-pointer transition-colors border dark:border-gray-700 relative"
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.3 }}
      onClick={irParaTarefas}
    >
      <button
        onClick={pedirConfirmacao}
        className="absolute top-2 right-2 text-red-500 hover:text-red-700"
        title="Excluir"
      >
        <FaTrash />
      </button>
      <h3 className="font-semibold text-lg truncate">{titulo}</h3>
      <p className="text-sm text-gray-600 dark:text-gray-400">Clique para ver tarefas</p>
    </motion.div>
  );
};

export default Tarefas;

