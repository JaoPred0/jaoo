import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const medalhasData = [
  {
    id: 1,
    nome: "A volta...",
    emoji: "🏅",
    corBg: "bg-yellow-400",
    corBorder: "border-yellow-600",
    textoCor: "text-yellow-900",
    descricao:
      "Esta medalha celebra seu retorno a Cristo, renovando o amor e a fé Nele com a força e a determinação que só Ele pode inspirar. Você escolheu viver para Ele, superando tudo com coragem e devoção!",
    desbloqueada: true,
  },
  {
    id: 2,
    nome: 'Venci de novo',
    emoji: '🏅',
    corBg: 'bg-yellow-400',
    corBorder: 'border-yellow-600',
    textoCor: 'text-yellow-900',
    descricao:
      'Esta medalha simboliza sua coragem e força imensas ao escolher viver, vencendo novamente a sombra do suicídio. Sua determinação e fé renovada mostram o poder da esperança e da vida.',
    desbloqueada: true,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const medalhaVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 300, damping: 20 } },
  hover: { scale: 1.1, rotate: 10, transition: { type: "spring", stiffness: 300 } },
  tap: { scale: 0.95 },
};

const modalBackdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const modalVariants = {
  hidden: { scale: 0.7, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { duration: 0.3, type: "spring", stiffness: 200 } },
  exit: { scale: 0.7, opacity: 0, transition: { duration: 0.2 } },
};

const Medalhas = () => {
  const [modalAberto, setModalAberto] = useState(false);
  const [medalhaSelecionada, setMedalhaSelecionada] = useState(null);
  const [filtro, setFiltro] = useState("consegui"); // "consegui", "naoConsegui", "todas"

  const abrirModal = (medalha) => {
    if (medalha.desbloqueada) {
      setMedalhaSelecionada(medalha);
      setModalAberto(true);
    }
  };

  const fecharModal = () => {
    setModalAberto(false);
    setMedalhaSelecionada(null);
  };

  const filtrarMedalhas = () => {
    switch (filtro) {
      case "consegui":
        return medalhasData.filter((m) => m.desbloqueada);
      case "naoConsegui":
        return medalhasData.filter((m) => !m.desbloqueada);
      case "todas":
      default:
        return medalhasData;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br text-gray-200 flex flex-col items-center p-4 backdrop-blur-md">
      {/* Filtros */}
      <div className="flex gap-4 mb-6">
        {["consegui", "naoConsegui", "todas"].map((tipo) => (
          <button
            key={tipo}
            onClick={() => setFiltro(tipo)}
            className={`px-4 py-2 rounded-xl backdrop-blur border transition-all duration-200 shadow-md font-semibold ${filtro === tipo
                ? "bg-yellow-500 text-gray-900 border-yellow-400"
                : "bg-white/10 border-white/20 hover:bg-white/20"
              }`}
          >
            {tipo === "consegui"
              ? "Consegui"
              : tipo === "naoConsegui"
                ? "Não consegui"
                : "Todas"}
          </button>
        ))}
      </div>

      {/* Lista de Medalhas */}
      <motion.div
        className="flex flex-wrap gap-6 justify-center items-center mt-8 max-w-xl w-full"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        key={filtro}
      >
        <AnimatePresence>
          {filtrarMedalhas().map((medalha) =>
            medalha.desbloqueada ? (
              <motion.button
                key={medalha.id}
                onClick={() => abrirModal(medalha)}
                className="relative flex flex-col items-center cursor-pointer focus:outline-none w-24"
                aria-label={`Medalha ${medalha.nome}`}
                variants={medalhaVariants}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, scale: 0.7, transition: { duration: 0.2 } }}
                whileHover="hover"
                whileTap="tap"
                layout
              >
                <div
                  className={`w-24 h-24 rounded-full ${medalha.corBg} border-4 ${medalha.corBorder} shadow-xl flex items-center justify-center text-4xl font-bold select-none ${medalha.textoCor} backdrop-blur-lg bg-white/10`}
                >
                  {medalha.emoji}
                </div>
                <span
                  className={`mt-2 font-semibold text-center ${medalha.corBorder.replace(
                    "border-",
                    "text-"
                  )}`}
                >
                  {medalha.nome}
                </span>
              </motion.button>
            ) : (
              <motion.div
                key={medalha.id}
                className="w-20 h-20 rounded-full bg-white/10 border-2 border-white/30 flex items-center justify-center text-3xl text-white/40 select-none shadow backdrop-blur-md"
                title="Medalha trancada"
                variants={medalhaVariants}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, scale: 0.7, transition: { duration: 0.2 } }}
                layout
              >
                {medalha.emoji}
              </motion.div>
            )
          )}
        </AnimatePresence>
      </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {modalAberto && medalhaSelecionada && (
          <motion.div
            className="fixed inset-0 backdrop-blur-sm flex justify-center items-center z-50 p-4"
            variants={modalBackdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={fecharModal}
          >
            <motion.div
              className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 max-w-md w-full text-white border border-white/20 shadow-xl"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-2xl font-bold mb-4 text-yellow-300">
                Medalha: {medalhaSelecionada.nome}
              </h2>
              <p className="mb-4 leading-relaxed text-white/80">
                {medalhaSelecionada.descricao}
              </p>
              <button
                onClick={fecharModal}
                className="mt-2 px-4 py-2 bg-yellow-500 hover:bg-yellow-600 rounded text-gray-900 font-semibold transition"
              >
                Fechar
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

};

export default Medalhas;
