import React from "react";
import { motion } from "framer-motion";

const projetos = [
  {
    "id": 1,
    "nome": "MAX - Plataforma de IPTV",
    "descricao": "Plataforma moderna de IPTV com mais de 400 canais, filmes, séries e esportes. Interface responsiva com animações e suporte a múltiplos dispositivos.",
    "url": "https://github.com/JaoPred0/max.git",
    "deploy": "https://max-chi-nine.vercel.app/",
    "imagem": "./capa_projeto1.png"
  }


];

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, type: "spring", stiffness: 100 },
  }),
};

const tooltipVariants = {
  hidden: { opacity: 0, y: 5 },
  visible: { opacity: 1, y: 0 },
};

const Projetos = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-8">Meus Projetos no GitHub</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl w-full">
        {projetos.map((projeto, i) => (
          <motion.div
            key={projeto.id}
            className="bg-gray-800 rounded-lg shadow-lg overflow-hidden flex flex-col"
            custom={i}
            initial="hidden"
            animate="visible"
            variants={cardVariants}
            whileHover={{ scale: 1.05 }}
          >
            <img
              src={projeto.imagem}
              alt={`Capa do projeto ${projeto.nome}`}
              className="w-full h-44 object-cover"
            />
            <div className="p-4 flex flex-col flex-grow">
              <h2 className="text-xl font-semibold mb-2">{projeto.nome}</h2>
              <p className="text-gray-400 flex-grow">{projeto.descricao}</p>

              <motion.a
                href={projeto.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold px-4 py-2 rounded relative group"
                aria-label={`Acessar o projeto ${projeto.nome} no GitHub`}
                initial="rest"
                whileHover="hover"
                animate="rest"
              >
                Acessar
                <motion.span
                  className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-gray-700 text-sm rounded px-2 py-1 whitespace-nowrap pointer-events-none z-10"
                  variants={tooltipVariants}
                  initial="hidden"
                  animate="hidden"
                  whileHover="visible"
                >
                  Abrir {projeto.nome} no GitHub
                </motion.span>
              </motion.a>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Projetos;
