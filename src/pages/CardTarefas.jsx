import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { db } from '../firebase';
import {
  doc,
  getDoc,
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc
} from 'firebase/firestore';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTrash } from 'react-icons/fa';

const CardTarefas = () => {
  const { id } = useParams();
  const [titulo, setTitulo] = useState('');
  const [tarefas, setTarefas] = useState([]);
  const [novaTarefa, setNovaTarefa] = useState('');
  const [modalAberto, setModalAberto] = useState(false);
  const [idParaDeletar, setIdParaDeletar] = useState(null);

  // Buscar o nome da pasta
  const fetchTitulo = async () => {
    const docRef = doc(db, 'cards', id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) setTitulo(docSnap.data().titulo);
  };

  // Buscar tarefas da subcoleção
  const fetchTarefas = async () => {
    const tarefasCol = collection(db, 'cards', id, 'tarefas');
    const snapshot = await getDocs(tarefasCol);
    const lista = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setTarefas(lista);
  };

  // Adicionar tarefa
  const adicionarTarefa = async () => {
    if (!novaTarefa.trim()) return;
    const tarefasCol = collection(db, 'cards', id, 'tarefas');
    await addDoc(tarefasCol, {
      descricao: novaTarefa,
      concluida: false
    });
    setNovaTarefa('');
    fetchTarefas();
  };

  // Atualizar conclusão da tarefa
  const toggleConcluida = async (tarefa) => {
    const tarefaRef = doc(db, 'cards', id, 'tarefas', tarefa.id);
    await updateDoc(tarefaRef, { concluida: !tarefa.concluida });
    fetchTarefas();
  };

  // Abrir modal de exclusão
  const abrirModal = (tarefaId) => {
    setIdParaDeletar(tarefaId);
    setModalAberto(true);
  };

  // Fechar modal
  const fecharModal = () => {
    setModalAberto(false);
    setIdParaDeletar(null);
  };

  // Deletar tarefa
  const deletarTarefa = async () => {
    if (!idParaDeletar) return;
    const tarefaRef = doc(db, 'cards', id, 'tarefas', idParaDeletar);
    await deleteDoc(tarefaRef);
    fecharModal();
    fetchTarefas();
  };

  useEffect(() => {
    fetchTitulo();
    fetchTarefas();
  }, [id]);

  return (
    <div className="p-4 min-h-screen text-gray-100 relative">
      {/* Conteúdo fica com blur quando modal aberto */}
      <div className={modalAberto ? "filter blur-sm pointer-events-none select-none" : ""}>

        <h2 className="text-2xl font-bold mb-4">📁 {titulo}</h2>

        {/* Breadcrumb */}
        <nav className="text-sm text-gray-400 mb-6" aria-label="Breadcrumb">
          <ol className="list-reset flex flex-wrap gap-1">
            <li>
              <Link to="/" className="hover:text-white transition">Início</Link>
              <span className="mx-2 select-none">/</span>
            </li>
            <li>
              <Link to="/tarefas" className="hover:text-white transition">Tarefas</Link>
              <span className="mx-2 select-none">/</span>
            </li>
            <li className="text-gray-300 truncate max-w-xs">{titulo}</li>
          </ol>
        </nav>

        <div className="flex gap-2 mb-4">
          <input
            className=" border border-gray-700 px-3 py-2 rounded w-full text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
            placeholder="Nova tarefa"
            value={novaTarefa}
            onChange={(e) => setNovaTarefa(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && adicionarTarefa()}
          />
          <button
            onClick={adicionarTarefa}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition"
            aria-label="Adicionar tarefa"
          >
            Adicionar
          </button>
        </div>

        <ul className="space-y-2 max-w-xl mx-auto">
          {tarefas.map((tarefa) => (
            <li
              key={tarefa.id}
              className={` p-3 rounded flex items-center justify-between shadow-md transition 
                ${tarefa.concluida ? 'line-through text-gray-400 opacity-70' : 'hover:bg-gray-700'}`}
            >
              <label className="flex items-center gap-3 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={tarefa.concluida}
                  onChange={() => toggleConcluida(tarefa)}
                  className="w-5 h-5 text-green-500 bg-gray-700 border-gray-600 rounded focus:ring-green-400 focus:ring-2 transition"
                />
                <span>{tarefa.descricao}</span>
              </label>
              <button
                onClick={() => abrirModal(tarefa.id)}
                className="text-red-500 hover:text-red-700 transition"
                title="Excluir tarefa"
                aria-label={`Excluir tarefa ${tarefa.descricao}`}
              >
                <FaTrash size={18} />
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Modal de confirmação de exclusão */}
      <AnimatePresence>
        {modalAberto && (
          <motion.div
            className="fixed inset-0 bg-opacity-70 backdrop-blur-sm flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="border-gray-800 p-6 rounded-lg shadow-lg max-w-sm w-full text-center text-gray-100"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-title"
            >
              <h3 id="modal-title" className="text-xl font-bold mb-4">
                Confirmar exclusão da tarefa?
              </h3>
              <div className="flex justify-center gap-4">
                <button
                  onClick={fecharModal}
                  className="px-4 py-2 rounded border border-gray-600 hover:bg-gray-700 transition"
                >
                  Cancelar
                </button>
                <button
                  onClick={deletarTarefa}
                  className="px-4 py-2 rounded bg-red-600 hover:bg-red-700 text-white transition"
                >
                  Apagar
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CardTarefas;
