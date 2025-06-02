import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
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
import { motion } from 'framer-motion';
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
    <div className="p-4 min-h-screen bg-gray-900 text-gray-100">
      <h2 className="text-2xl font-bold mb-4">📁 {titulo}</h2>
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-400 mb-6" aria-label="Breadcrumb">
        <ol className="list-reset flex">
          <li>
            <a href="/" className="hover:text-white">Início</a>
            <span className="mx-2">/</span>
          </li>
          <li>
            <a href="/tarefas" className="hover:text-white">Tarefas</a>
            <span className="mx-2">/</span>
          </li>
          <li className="text-gray-300">{titulo}</li>
        </ol>
      </nav>
      <div className="flex gap-2 mb-4">
        <input
          className="bg-gray-800 border border-gray-700 px-3 py-2 rounded w-full text-gray-100"
          placeholder="Nova tarefa"
          value={novaTarefa}
          onChange={(e) => setNovaTarefa(e.target.value)}
        />
        <button
          onClick={adicionarTarefa}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
        >
          Adicionar
        </button>
      </div>

      <ul className="space-y-2">
        {tarefas.map((tarefa) => (
          <li
            key={tarefa.id}
            className={`bg-gray-800 p-3 rounded flex items-center justify-between shadow ${tarefa.concluida ? 'line-through text-gray-400' : ''
              }`}
          >
            <label className="flex items-center gap-3 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={tarefa.concluida}
                onChange={() => toggleConcluida(tarefa)}
                className="w-5 h-5 text-green-500 bg-gray-700 border-gray-600 rounded focus:ring-green-400 focus:ring-2"
              />
              <span>{tarefa.descricao}</span>
            </label>
            <button
              onClick={() => abrirModal(tarefa.id)}
              className="text-red-500 hover:text-red-700"
              title="Excluir tarefa"
            >
              <FaTrash />
            </button>
          </li>
        ))}
      </ul>

      {/* Modal de confirmação de exclusão */}
      {modalAberto && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-sm w-full text-center text-gray-100"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-xl font-bold mb-4">
              Confirmar exclusão da tarefa?
            </h3>
            <div className="flex justify-center gap-4">
              <button
                onClick={fecharModal}
                className="px-4 py-2 rounded border border-gray-600 hover:bg-gray-700"
              >
                Cancelar
              </button>
              <button
                onClick={deletarTarefa}
                className="px-4 py-2 rounded bg-red-600 hover:bg-red-700 text-white"
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

export default CardTarefas;
