import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Perfil() {
  const [modalOpen, setModalOpen] = useState(false);
  const [nome, setNome] = useState('Alemão Programador');
  const [descricao, setDescricao] = useState('apaixonado por códigos e surpresas');

  // Carrega dados do localStorage ao montar o componente
  useEffect(() => {
    const savedNome = localStorage.getItem('perfil_nome');
    const savedDescricao = localStorage.getItem('perfil_descricao');

    if (savedNome) setNome(savedNome);
    if (savedDescricao) setDescricao(savedDescricao);
  }, []);

  // Função para salvar no localStorage e fechar modal
  function salvarPerfil() {
    localStorage.setItem('perfil_nome', nome);
    localStorage.setItem('perfil_descricao', descricao);
    setModalOpen(false);
  }

  return (
    <>
      <motion.div
        className="max-w-md mx-auto mt-10 p-6 bg-gray-800 rounded-lg shadow-lg text-white"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <h1 className="text-3xl font-semibold mb-4">Perfil do Usuário</h1>
        <div className="flex items-center space-x-4">
          <motion.img
            src="./perfil.png"
            alt="Foto do usuário"
            className="w-24 h-24 rounded-full border-4 border-gray-600"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          />
          <div>
            <h2 className="text-xl font-semibold">{nome}</h2>
            <p className="text-gray-400">{descricao}</p>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-6 bg-indigo-600 hover:bg-indigo-700 px-5 py-2 rounded-md shadow-md font-semibold"
          onClick={() => setModalOpen(true)}
        >
          Editar Perfil
        </motion.button>
      </motion.div>

      <AnimatePresence>
        {modalOpen && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-gray-900 rounded-lg p-6 w-11/12 max-w-md text-white shadow-lg"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-2xl mb-4 font-semibold">Editar Perfil</h2>

              <label className="block mb-2">
                Nome:
                <input
                  type="text"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  className="w-full mt-1 p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </label>

              <label className="block mb-4">
                Descrição:
                <textarea
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                  rows={3}
                  className="w-full mt-1 p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                />
              </label>

              <div className="flex justify-end space-x-3">
                <button
                  className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600"
                  onClick={() => setModalOpen(false)}
                >
                  Cancelar
                </button>
                <button
                  className="px-4 py-2 bg-indigo-600 rounded hover:bg-indigo-700"
                  onClick={salvarPerfil}
                >
                  Salvar
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
