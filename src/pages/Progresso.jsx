import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {Estudos, Cristo,} from "./content/ProgressoContent"; // Importando o conteúdo de Estudos
const cardsData = [
  {
    id: 1,
    title: "Estudos",
    description: "Progresso de estudos e conteúdos concluídos em tempo",
    page: "estudos",
  },
  {
    id: 2,
    title: "Cristo",
    description: "Tempo com cristo e leituras diarias.",
    page: "cristo",
  },
];

const pageContent = {
  estudos: <Estudos />,
  cristo: <Cristo />,
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" },
  },
};

const pageVariants = {
  initial: { opacity: 0, x: 50 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -50 },
};

export default function Progresso() {
  const [page, setPage] = useState(null);

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 bg-gray-900 min-h-screen text-indigo-300">
      <h2 className="text-4xl font-extrabold mb-10 text-center drop-shadow-md">
        Seu Progresso Diário
      </h2>

      {!page && (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {cardsData.map(({ id, title, description, page }) => (
            <motion.div
              key={id}
              className="bg-gray-800 rounded-xl shadow-lg p-6 cursor-pointer border border-indigo-700/40 hover:border-indigo-400 hover:shadow-indigo-600/40 transition-all duration-300"
              variants={cardVariants}
              whileHover={{ scale: 1.05, boxShadow: "0 0 15px 3px rgba(129, 140, 248, 0.6)" }}
              onClick={() => setPage(page)}
            >
              <h3 className="text-xl font-semibold mb-3">{title}</h3>
              <p className="whitespace-pre-line leading-relaxed text-gray-300">{description}</p>
            </motion.div>
          ))}
        </motion.div>
      )}

      <AnimatePresence mode="wait">
        {page && (
          <motion.div
            key={page}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className=""
          >
            <button
              onClick={() => setPage(null)}
              className="mb-4 px-4 py-2 bg-indigo-600 rounded hover:bg-indigo-500"
            >
              ← Voltar
            </button>
            {pageContent[page]}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
