import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

// Exemplo de componentes para renderizar (troque pelos seus)
import {
  Horario,
  Lembretes,
  // ...
} from '../components/ConteudoIFMS';

const cards = [
  {
    title: 'Horario IFMS',
    desc: 'Estude português, literatura, inglês, espanhol, artes e interpretação de textos.',
    render: Horario,
  },
  {
    title: 'Lembretes',
    desc: 'Revise álgebra, geometria, estatística e matemática financeira.',
    render: Lembretes,
  },
  // adicione os demais aqui
];

// Animações para o framer-motion
const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { delay: i * 0.15, duration: 0.5, ease: 'easeOut' },
  }),
  hover: {
    scale: 1.05,
    transition: { duration: 0.15 },
  },
};

const Revisoes = () => {
  const [selected, setSelected] = useState(null);
  const handleBack = () => setSelected(null);

  return (
    <>
      {/* Breadcrumb */}

      <nav className="text-sm text-gray-400 mb-6" aria-label="Breadcrumb">
        <ol className="list-reset flex">
          <li>
            <Link to="/" className="hover:text-white">Início</Link>
            <span className="mx-2">/</span>
          </li>
          <li>
            <Link to="/estudos" className="hover:text-white">Estudos</Link>
            <span className="mx-2">/</span>
          </li>
          <li className="text-gray-300">IFMS</li>
        </ol>
      </nav>


      <div className="p-6 animate__animated animate__fadeIn">
        {!selected ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cards.map((card, index) => (
              <motion.button
                key={index}
                custom={index}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                onClick={() => setSelected(card)}
                className={`
                  rounded-xl
                  p-6
                  cursor-pointer
                  backdrop-blur-md
                  bg-blue-900/20
                  border
                  border-blue-400/40
                  text-blue-100
                  shadow-md
                  hover:bg-blue-900/30
                  transition-colors
                  duration-200
                  focus:outline-none
                  focus:ring-2
                  focus:ring-blue-500
                `}
                style={{
                  boxShadow: '0 0 15px rgba(59, 130, 246, 0.3)', // glow azul leve
                }}
              >
                <h2 className="text-2xl font-semibold mb-3 drop-shadow-md">{card.title}</h2>
                <p className="text-sm opacity-90 drop-shadow">{card.desc}</p>
              </motion.button>
            ))}
          </div>
        ) : (
          <div>
            <button
              onClick={handleBack}
              className="mb-4 text-sm text-blue-600 hover:underline"
            >
              ← Voltar
            </button>
            {selected.render && <selected.render />}
          </div>
        )}
      </div>
    </>
  );
};

export default Revisoes;
