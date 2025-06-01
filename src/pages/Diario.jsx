import React, { useState, useEffect } from 'react';
import {
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer,
  LineChart, Line, XAxis, YAxis, CartesianGrid
} from 'recharts';

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
  <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
    📅 Rotina Diária - {dataAtual}
  </h2>

  <ul className="space-y-4 mb-10">
    {tarefas.map((item, index) => (
      <li key={index} className="flex items-center space-x-4">
        <input
          type="checkbox"
          checked={!!concluidasHoje[index]}
          onChange={() => toggleTarefa(index)}
          className="w-5 h-5 text-green-600 rounded focus:ring-green-500"
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
      </li>
    ))}
  </ul>

  <div className="grid md:grid-cols-2 gap-8">
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4">
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
    </div>

    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4">
      <h3 className="text-lg font-semibold mb-2">📈 Histórico dos Últimos Dias</h3>
      <div className="w-full h-64">
        <ResponsiveContainer>
          <LineChart data={dadosLinha}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="data" />
            <YAxis domain={[0, tarefas.length]} allowDecimals={false} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="feitas" stroke="#4caf50" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  </div>
</div>

  );
};

export default Diario;
