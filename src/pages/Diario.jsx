import React, { useState, useEffect } from 'react';
import {
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer,
  LineChart, Line, XAxis, YAxis, CartesianGrid
} from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';

const tarefas = [
  { hora: '05:00', atividade: 'Acordar e higiene pessoal' },
  { hora: '05:30', atividade: 'Oração / Leitura bíblica' },
  { hora: '06:00', atividade: 'Exercício físico leve (alongamento, caminhada)' },
  { hora: '19:00', atividade: 'Banho' },
  { hora: '20:30', atividade: 'Oração / Leitura bíblica' },
  { hora: '20:40', atividade: 'Dormir' },
];

const cores = ['#4caf50', '#f44336'];

const getHoje = () => {
  const hoje = new Date();
  return hoje.toISOString().split('T')[0];
};

const fadeSlideUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const zoomIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6 } },
};

const listVariants = {
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
  hidden: {},
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

const checkboxTap = {
  scale: 1.2,
  transition: { type: 'spring', stiffness: 300, damping: 10 },
};

const cardHover = {
  scale: 1.03,
  boxShadow: '0px 10px 20px rgba(0,0,0,0.12)',
};

const lineAnimation = {
  hidden: { pathLength: 0 },
  visible: {
    pathLength: 1,
    transition: { duration: 2, ease: 'easeInOut' },
  },
};

const Diario = () => {
  const [historico, setHistorico] = useState({});
  const [dataAtual] = useState(getHoje());

  const concluidasHoje = historico[dataAtual] || {};

  useEffect(() => {
    const dadosSalvos = localStorage.getItem('historicoTarefas');
    if (dadosSalvos) setHistorico(JSON.parse(dadosSalvos));
  }, []);

  useEffect(() => {
    localStorage.setItem('historicoTarefas', JSON.stringify(historico));
  }, [historico]);

  const toggleTarefa = (index) => {
    setHistorico((prev) => {
      const dia = prev[dataAtual] || {};
      return {
        ...prev,
        [dataAtual]: {
          ...dia,
          [index]: !dia[index],
        },
      };
    });
  };

  const totalFeitas = Object.values(concluidasHoje).filter(Boolean).length;
  const totalNaoFeitas = tarefas.length - totalFeitas;

  const dadosPizza = [
    { nome: 'Feitas', valor: totalFeitas },
    { nome: 'Não feitas', valor: totalNaoFeitas },
  ];

  const gerarHistoricoLinha = () => {
    const dias = Object.keys(historico).sort().slice(-7);
    return dias.map((data) => {
      const dia = historico[data] || {};
      const feitas = Object.values(dia).filter(Boolean).length;
      return { data, feitas };
    });
  };

  const dadosLinha = gerarHistoricoLinha();

  return (
    <div className="max-w-4xl mx-auto p-4 font-sans text-gray-800 dark:text-gray-100 dark:bg-gray-900 min-h-screen">

      <motion.h2
        className="text-2xl md:text-3xl font-bold mb-6 text-center"
        variants={fadeSlideUp}
        initial="hidden"
        animate="visible"
      >
        📅 Rotina Diária - {dataAtual}
      </motion.h2>

      <motion.ul
        className="space-y-4 mb-10"
        variants={listVariants}
        initial="hidden"
        animate="visible"
      >
        {tarefas.map((item, index) => (
          <motion.li
            key={index}
            className="flex items-center space-x-4"
            variants={itemVariants}
            whileHover={{ scale: 1.03 }}
          >
            <motion.input
              type="checkbox"
              checked={!!concluidasHoje[index]}
              onChange={() => toggleTarefa(index)}
              className="w-5 h-5 text-green-600 rounded focus:ring-green-500"
              whileTap={checkboxTap}
              layout
            />
            <label className="cursor-pointer">
              <strong>{item.hora}</strong> -{' '}
              <span
                className={
                  concluidasHoje[index]
                    ? 'line-through text-gray-500 dark:text-gray-400'
                    : ''
                }
              >
                {item.atividade}
              </span>
            </label>
          </motion.li>
        ))}
      </motion.ul>

      <div className="grid md:grid-cols-2 gap-8">

        <motion.div
          className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4"
          variants={zoomIn}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.4 }}
          whileHover={cardHover}
        >
          <h3 className="text-lg font-semibold mb-2">📊 Progresso de Hoje</h3>
          <div className="w-full h-64">
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={dadosPizza}
                  dataKey="valor"
                  nameKey="nome"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                  isAnimationActive={true}
                  animationDuration={800}
                >
                  {dadosPizza.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={cores[index]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div
          className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4"
          variants={zoomIn}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.6 }}
          whileHover={cardHover}
        >
          <h3 className="text-lg font-semibold mb-2">📈 Histórico dos Últimos Dias</h3>
          <div className="w-full h-64">
            <ResponsiveContainer>
              <LineChart data={dadosLinha}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="data" />
                <YAxis domain={[0, tarefas.length]} allowDecimals={false} />
                <Tooltip />
                <Legend />
                <motion.path
                  d=""
                  initial="hidden"
                  animate="visible"
                  variants={lineAnimation}
                />
                <Line
                  type="monotone"
                  dataKey="feitas"
                  stroke="#4caf50"
                  isAnimationActive={false} // vamos controlar pela motion.path
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default Diario;
