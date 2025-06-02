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
    <div className="max-w-4xl mx-auto p-4 font-sans text-gray-800 dark:text-gray-100 dark:bg-gray-900 min-h-screen">

      <motion.h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
        📅 Rotina Diária - {dataAtual}
      </motion.h2>

      <ul className="space-y-4 mb-10">
        {tarefas.map((item, index) => (
          <li key={index} className="flex items-center space-x-4">
            <input
              type="checkbox"
              checked={!!concluidasHoje[index]}
              onChange={() => toggleTarefa(index)}
              className="w-5 h-5 text-green-600 rounded focus:ring-green-500"
              id={`tarefa-${index}`}
            />
            <label htmlFor={`tarefa-${index}`} className="cursor-pointer select-none">
              <span className="font-semibold">{item.hora} - </span>
              {item.atividade}
            </label>
          </li>
        ))}
      </ul>

      <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
        {/* Envolver cada gráfico em uma div para controlar largura */}
        <div className="w-full max-w-xs md:max-w-sm">
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
        </div>

        <div className="w-full max-w-full md:max-w-2xl">
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
        </div>
      </div>

    </div>
  );

};

export default Diario;
