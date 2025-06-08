import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import {
  collection,
  doc,
  setDoc,
  getDocs
} from "firebase/firestore";

import {
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer,
  LineChart, Line, XAxis, YAxis, CartesianGrid
} from 'recharts';

import { motion } from 'framer-motion';

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

const Diario = () => {
  const [historico, setHistorico] = useState({});
  const [dataAtual] = useState(getHoje());
  const historicoRef = collection(db, "historicoTarefas");

  // Carregar dados do Firestore
  useEffect(() => {
    const carregarHistorico = async () => {
      const snapshot = await getDocs(historicoRef);
      const dados = {};
      snapshot.forEach(doc => {
        dados[doc.id] = doc.data();
      });
      setHistorico(dados);
    };
    carregarHistorico();
  }, [historicoRef]);

  // Atualizar Firestore ao mudar historico
  useEffect(() => {
    // Salvar o dia atual apenas para otimizar
    const salvarDiaAtual = async () => {
      if (!historico[dataAtual]) return; // nada para salvar
      await setDoc(doc(db, "historicoTarefas", dataAtual), historico[dataAtual]);
    };
    salvarDiaAtual();
  }, [historico, dataAtual]);

  const concluidasHoje = historico[dataAtual] || {};

  const toggleTarefa = (index) => {
    setHistorico(prev => {
      const dia = prev[dataAtual] || {};
      return {
        ...prev,
        [dataAtual]: {
          ...dia,
          [index]: !dia[index],
        }
      };
    });
  };

  const totalFeitas = Object.values(concluidasHoje).filter(Boolean).length;
  const totalNaoFeitas = tarefas.length - totalFeitas;

  const dadosPizza = [
    { nome: 'Feitas', valor: totalFeitas },
    { nome: 'Não feitas', valor: totalNaoFeitas },
  ];

  // Histórico últimos 7 dias
  const gerarHistoricoLinha = () => {
    const dias = Object.keys(historico).sort().slice(-7);
    return dias.map(data => {
      const dia = historico[data] || {};
      const feitas = Object.values(dia).filter(Boolean).length;
      return { data, feitas };
    });
  };

  const dadosLinha = gerarHistoricoLinha();

  return (
  <div className="min-h-screen flex items-center justify-center p-4">

    <motion.div
      className="w-full max-w-5xl mx-auto p-6 rounded-2xl shadow-2xl border border-white/20
                  backdrop-blur-lg transition-all"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7 }}
    >
      <motion.h2
        className="text-2xl md:text-3xl font-bold mb-8 text-center text-white drop-shadow"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        📅 Rotina Diária - {dataAtual}
      </motion.h2>

      <ul className="space-y-4 mb-10">
        {tarefas.map((item, index) => (
          <motion.li
            key={index}
            className="flex items-center space-x-4 text-white/90 px-4 py-3 rounded-xl 
                       backdrop-blur-md hover:scale-[1.015] transition-all duration-300 shadow-md border border-white/20"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <label htmlFor={`tarefa-${index}`} className="flex items-center space-x-4 w-full cursor-pointer select-none">
              <div className="relative">
                <input
                  type="checkbox"
                  id={`tarefa-${index}`}
                  checked={!!concluidasHoje[index]}
                  onChange={() => toggleTarefa(index)}
                  className="peer hidden"
                />
                <div className="w-6 h-6 rounded-md bg-white/20 border border-white/40
                                peer-checked:bg-green-500 peer-checked:border-green-600
                                transition-all duration-300 flex items-center justify-center shadow-inner">
                  <svg
                    className="w-4 h-4 text-white opacity-0 peer-checked:opacity-100 transition-opacity duration-200"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              <div className="flex-1">
                <span className="font-semibold text-white/90">{item.hora} - </span>
                <span className="text-white/80">{item.atividade}</span>
              </div>
            </label>
          </motion.li>
        ))}
      </ul>

      <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
        {/* Gráfico Pizza */}
        <motion.div
          className="w-full max-w-xs md:max-w-sm bg-white/10 rounded-xl p-4 shadow-md backdrop-blur"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={dadosPizza}
                dataKey="valor"
                nameKey="nome"
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                label
              >
                {dadosPizza.map((entry, idx) => (
                  <Cell key={`cell-${idx}`} fill={cores[idx % cores.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Gráfico Linha */}
        <motion.div
          className="w-full max-w-full md:max-w-2xl bg-white/10 rounded-xl p-4 shadow-md backdrop-blur"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={dadosLinha} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="data" tickFormatter={date => new Date(date).toLocaleDateString()} />
              <YAxis allowDecimals={false} domain={[0, tarefas.length]} />
              <Tooltip labelFormatter={date => `Data: ${new Date(date).toLocaleDateString()}`} />
              <Legend />
              <Line
                type="monotone"
                dataKey="feitas"
                stroke="#4caf50"
                strokeWidth={3}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </motion.div>
  </div>
);

};

export default Diario;
