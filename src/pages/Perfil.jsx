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
        className="max-w-md mx-auto mt-12 p-8 rounded-3xl border border-white/20 backdrop-blur-xl  text-white shadow-lg"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      >
        <h1 className="text-4xl font-extrabold mb-8 text-center tracking-wide drop-shadow-md">
          Perfil do Usuário
        </h1>

        <div className="flex items-center space-x-6">
          <motion.img
            src="./perfil.png"
            alt="Foto do usuário"
            className="w-28 h-28 rounded-full border-4 border-white/30 shadow-xl"
            initial={{ scale: 0.85 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          />
          <div className="flex flex-col space-y-1">
            <h2 className="text-2xl font-semibold drop-shadow-lg">{nome}</h2>
            <p className="text-gray-300 italic text-sm max-w-xs leading-relaxed drop-shadow-sm">
              {descricao}
            </p>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.07, boxShadow: "0 0 15px 2px rgba(99, 102, 241, 0.8)" }}
          whileTap={{ scale: 0.95 }}
          className="mt-10 w-full py-3 rounded-xl bg-indigo-500/80 hover:bg-indigo-600/90 font-semibold tracking-wide shadow-md transition-all duration-300 drop-shadow-md"
          onClick={() => setModalOpen(true)}
        >
          Editar Perfil
        </motion.button>
      </motion.div>

      <AnimatePresence>
        {modalOpen && (
          <motion.div
            className="fixed inset-0 bg-transparent backdrop-blur-3xl flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="backdrop-blur-2xl border border-white/30 rounded-3xl p-8 w-11/12 max-w-md shadow-2xl text-white"
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ duration: 0.35 }}
            >
              <h2 className="text-3xl mb-6 font-extrabold text-center drop-shadow-lg">
                Editar Perfil
              </h2>

              <label className="block mb-5">
                <span className="text-sm text-gray-300">Nome:</span>
                <input
                  type="text"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  className="w-full mt-2 p-3 rounded-xl bg-gray-800/60 text-white focus:outline-none focus:ring-2 focus:ring-indigo-400 backdrop-blur-sm"
                />
              </label>

              <label className="block mb-8">
                <span className="text-sm text-gray-300">Descrição:</span>
                <textarea
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                  rows={4}
                  className="w-full mt-2 p-3 rounded-xl bg-gray-800/60 text-white focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-none backdrop-blur-sm"
                />
              </label>

              <div className="flex justify-end space-x-4">
                <button
                  className="px-5 py-2 rounded-xl bg-gray-700/70 hover:bg-gray-700 transition font-semibold"
                  onClick={() => setModalOpen(false)}
                >
                  Cancelar
                </button>
                <button
                  className="px-5 py-2 rounded-xl bg-indigo-500/90 hover:bg-indigo-600 transition font-semibold"
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
