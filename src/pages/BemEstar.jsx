import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import {
  FaQuoteLeft,
  FaDumbbell,
  FaSpa,
  FaRegSmile,
  FaPlayCircle,
  FaStopwatch,
  FaUtensils,
  FaBookOpen,
  FaCheckCircle,
  FaFlagCheckered,
} from "react-icons/fa";

const cardsData = [
  {
    id: 1,
    icon: <FaQuoteLeft size={40} className="text-indigo-500" />,
    title: "Frases motivacionais e inspiradoras",
    description:
      "Receba diariamente mensagens poderosas e inspiradoras para incentivar o autocuidado, fortalecer sua positividade e manter o foco em suas metas. " +
      "Essas frases ajudam a renovar sua motivação e a encarar desafios com uma nova perspectiva, promovendo equilíbrio emocional e mental.",
  },
  {
    id: 2,
    icon: <FaDumbbell size={40} className="text-indigo-500" />,
    title: "Dicas de saúde física",
    description:
      "Descubra exercícios simples e eficazes para praticar no conforto da sua casa, mesmo com pouco tempo disponível. " +
      "Além disso, oferecemos sugestões de alongamentos e práticas de meditação para melhorar sua flexibilidade, postura e bem-estar geral. " +
      "Também compartilhamos recomendações de alimentação saudável que ajudam a manter seu corpo forte e energizado.",
  },
  {
    id: 3,
    icon: <FaSpa size={40} className="text-indigo-500" />,
    title: "Rotinas para relaxamento",
    description:
      "Explore técnicas comprovadas para aliviar o estresse do dia a dia, como exercícios rápidos de respiração profunda e mindfulness. " +
      "Guias passo a passo ajudam você a criar momentos de tranquilidade, promovendo relaxamento mental e físico, e melhorando sua qualidade de vida.",
  },
  {
    id: 4,
    icon: <FaRegSmile size={40} className="text-indigo-500" />,
    title: "Área para registrar humor e sentimentos",
    description:
      "Utilize nosso diário pessoal para anotar suas emoções, pensamentos e experiências diárias. " +
      "Essa prática ajuda a aumentar a autoconsciência e a identificar padrões emocionais ao longo do tempo. " +
      "Você também poderá visualizar gráficos e históricos que facilitam o acompanhamento e a reflexão sobre seu estado emocional.",
  },
  {
    id: 5,
    icon: <FaPlayCircle size={40} className="text-indigo-500" />,
    title: "Vídeos ou áudios de meditação guiada",
    description:
      "Acesse conteúdos selecionados de meditação guiada em vídeo ou áudio, desenvolvidos para ajudar você a relaxar, focar e elevar sua concentração. " +
      "Ideal para iniciantes e praticantes avançados, essas meditações promovem equilíbrio mental e reduzem a ansiedade.",
  },
  {
    id: 6,
    icon: <FaStopwatch size={40} className="text-indigo-500" />,
    title: "Cronômetros ou timers para pausas",
    description:
      "Aproveite nossos cronômetros para organizar suas pausas durante o trabalho ou estudos, incluindo a técnica Pomodoro. " +
      "Timers específicos para pausas respiratórias e alongamentos ajudam a melhorar sua produtividade e a prevenir o cansaço físico e mental.",
  },
  {
    id: 7,
    icon: <FaUtensils size={40} className="text-indigo-500" />,
    title: "Receitas saudáveis",
    description:
      "Descubra receitas práticas e nutritivas para todas as refeições do dia, que promovem uma alimentação equilibrada e saborosa. " +
      "Incluímos sugestões para café da manhã, almoço, jantar e lanches, focando em ingredientes naturais e métodos simples de preparo.",
  },
  {
    id: 8,
    icon: <FaBookOpen size={40} className="text-indigo-500" />,
    title: "Conteúdo educativo",
    description:
      "Aprofunde seus conhecimentos com artigos rápidos e acessíveis sobre saúde mental, qualidade do sono, nutrição e hábitos saudáveis. " +
      "Esses conteúdos são embasados em estudos científicos e apresentados de forma clara para apoiar sua jornada de bem-estar.",
  },
  {
    id: 9,
    icon: <FaCheckCircle size={40} className="text-indigo-500" />,
    title: "Checklist de hábitos saudáveis",
    description:
      "Mantenha o controle sobre seus hábitos diários essenciais, como ingestão adequada de água, prática de exercícios, boas noites de sono, leitura e momentos de lazer. " +
      "Esse checklist facilita o acompanhamento do seu progresso e a criação de uma rotina equilibrada.",
  },
  {
    id: 10,
    icon: <FaFlagCheckered size={40} className="text-indigo-500" />,
    title: "Feedback e desafios",
    description:
      "Participe de pequenos desafios diários, como aumentar o consumo de água ou caminhar por 10 minutos, incentivando mudanças positivas no seu estilo de vida. " +
      "Você terá espaço para marcar suas conquistas e refletir sobre seu progresso, recebendo feedback que ajuda na motivação contínua.",
  },
];


const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, type: "spring", stiffness: 50 },
  }),
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } },
};

const BemEstar = () => {
  const [selectedCard, setSelectedCard] = useState(null);

  return (
    <div className="max-w-6xl mx-auto p-10 min-h-screen bg-gray-900 text-gray-300 font-sans">
      <h1 className="text-center mb-12 text-gray-200 font-extrabold text-4xl tracking-wide drop-shadow-lg">
        Página de Bem Estar
      </h1>

      <div className="grid gap-8 grid-cols-[repeat(auto-fit,minmax(280px,1fr))]">
        {cardsData.map(({ id, icon, title }, i) => (
          <motion.div
            key={id}
            custom={i}
            initial="hidden"
            animate="visible"
            variants={cardVariants}
            className="bg-gray-800 p-6 rounded-2xl shadow-xl flex flex-col items-center text-center cursor-pointer select-none
              transition-transform duration-300 hover:scale-105 hover:shadow-indigo-600"
            onClick={() => setSelectedCard(cardsData.find(card => card.id === id))}
          >
            <div className="mb-5">{icon}</div>
            <h3 className="mb-3 text-indigo-500 text-2xl font-semibold">{title}</h3>
          </motion.div>
        ))}
      </div>

      {/* Modal SPA maior e formal */}
      <AnimatePresence>
        {selectedCard && (
          <motion.div
            key="modal"
            className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-6"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={modalVariants}
            onClick={() => setSelectedCard(null)}
          >
            <motion.div
              className="bg-gray-900 rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-12 text-left relative"
              onClick={e => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedCard(null)}
                className="absolute top-6 right-6 text-gray-400 hover:text-indigo-500 transition-colors"
                aria-label="Fechar modal"
                style={{ fontSize: '1.5rem', background: 'none', border: 'none', cursor: 'pointer' }}
              >
                &times;
              </button>

              <div className="flex items-center mb-8 gap-6">
                <div className="text-indigo-500">{selectedCard.icon}</div>
                <h2 className="text-indigo-400 text-4xl font-bold tracking-tight">{selectedCard.title}</h2>
              </div>

              <p className="whitespace-pre-line text-gray-300 text-lg leading-relaxed">
                {selectedCard.description}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BemEstar;
