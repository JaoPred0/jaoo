import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const cards = [
  {
    title: 'Estudos em Casa',
    desc: 'Organize seus horários e aproveite ao máximo seu tempo de estudo em casa.',
    link: '/estudos-em-casa',
  },
  {
    title: 'IFMS',
    desc: 'Confira os horários das aulas, eventos e outras informações importantes do IFMS.',
    link: '/ifms',
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.15,
      duration: 0.5,
      ease: 'easeOut',
    },
  }),
  hover: {
    scale: 1.05,
    // removido boxShadow do hover para deixar mais rápido e leve
    transition: { duration: 0.15 },
  },
};

const Estudos = () => {
  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {cards.map((card, index) => (
        <motion.div
          key={index}
          custom={index}
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          className="
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
            duration-100
          "
          style={{
            boxShadow: '0 0 15px rgba(59, 130, 246, 0.2)', // glow leve azul fixo
          }}
        >
          <Link to={card.link} className="block h-full">
            <h2 className="text-2xl font-semibold mb-3 drop-shadow-md">{card.title}</h2>
            <p className="text-sm opacity-90 drop-shadow">{card.desc}</p>
          </Link>
        </motion.div>
      ))}
    </div>
  );
};

export default Estudos;
