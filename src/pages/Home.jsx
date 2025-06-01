import React, { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
import { motion, AnimatePresence } from 'framer-motion';

Chart.register(ArcElement, Tooltip, Legend);

export default function Home() {
  // Função para pegar a data atual no formato yyyy-mm-dd
  function getDataHoje() {
    const hoje = new Date();
    return hoje.toISOString().slice(0, 10);
  }

  const historicoInicial = JSON.parse(localStorage.getItem('statusHistorico')) || {};
  const hojeStr = getDataHoje();

  if (!historicoInicial[hojeStr]) {
    historicoInicial[hojeStr] = { Bem: 0, Mal: 0, Pessimo: 0 };
  }

  const [dadosHoje, setDadosHoje] = useState(historicoInicial[hojeStr]);
  const [historico, setHistorico] = useState(historicoInicial);
  const [fraseDoDia, setFraseDoDia] = useState('');

  useEffect(() => {
    const novoHistorico = { ...historico, [hojeStr]: dadosHoje };
    setHistorico(novoHistorico);
    localStorage.setItem('statusHistorico', JSON.stringify(novoHistorico));
    const chaveMensagem = `mensagem-${hojeStr}`;
    const salva = localStorage.getItem(chaveMensagem);
    if (salva) {
      setFraseDoDia(salva);
    } else {
      const todasMensagens = [...mensagensBem, ...mensagensMal, ...mensagensPessimo];
      const nova = todasMensagens[Math.floor(Math.random() * todasMensagens.length)];
      setFraseDoDia(nova);
      localStorage.setItem(chaveMensagem, nova);
    }
  }, [dadosHoje]);

  function aumentarStatus(status) {
    setDadosHoje((prev) => ({
      ...prev,
      [status]: prev[status] + 1,
    }));
  }

  const mensagensBem = [
    'Você está indo muito bem, continue assim!',
    'Dias positivos fortalecem sua jornada!',
    'Sua energia está lá em cima, ótimo trabalho!',
  ];

  const mensagensMal = [
    'Nem todo dia é fácil, mas você está superando!',
    'Dias difíceis fazem parte, mantenha a cabeça erguida!',
    'Reconhecer dias ruins é o primeiro passo para melhorar!',
  ];

  const mensagensPessimo = [
    'Está complicado, mas há sempre um caminho para melhorar.',
    'Não desista! Busque ajuda e cuide de você.',
    'Dias péssimos são temporários, força!',
  ];

  function pegarMensagem(status) {
    const randomIndex = (arr) => Math.floor(Math.random() * arr.length);
    if (status === 'Bem') return mensagensBem[randomIndex(mensagensBem)];
    if (status === 'Mal') return mensagensMal[randomIndex(mensagensMal)];
    if (status === 'Pessimo') return mensagensPessimo[randomIndex(mensagensPessimo)];
  }

  function mensagemMotivacional() {
    if (dadosHoje.Pessimo > 50) {
      return (
        <p className="text-red-400 font-bold">
          Atenção! O número de dias péssimos está alto. Busque melhorar seu bem-estar!
        </p>
      );
    } else if (dadosHoje.Mal > dadosHoje.Bem) {
      return (
        <p className="text-yellow-400 font-bold">
          Você tem mais dias difíceis do que bons, tente focar em coisas positivas.
        </p>
      );
    } else {
      return (
        <p className="text-green-400 font-bold">
          Ótimo equilíbrio! Continue cuidando de sua saúde mental.
        </p>
      );
    }
  }

  const data = {
    labels: ['Bem', 'Mal', 'Pessimo'],
    datasets: [
      {
        data: [dadosHoje.Bem, dadosHoje.Mal, dadosHoje.Pessimo],
        backgroundColor: ['#4ade80', '#fbbf24', '#ef4444'],
        borderWidth: 1,
        borderColor: '#1f2937',
      },
    ],
  };

  const options = {
    cutout: '70%',
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: 'white',
          font: { size: 14 },
        },
      },
      tooltip: {
        enabled: true,
      },
    },
    maintainAspectRatio: false,
  };

  function classificarDia(diaDados) {
    const maiorValor = Math.max(diaDados.Bem, diaDados.Mal, diaDados.Pessimo);
    if (maiorValor === diaDados.Bem) return 'Bom';
    if (maiorValor === diaDados.Mal) return 'Ruim';
    if (maiorValor === diaDados.Pessimo) return 'Péssimo';
  }

  function exportarHistorico() {
    const blob = new Blob([JSON.stringify(historico, null, 2)], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'historico_status.json';
    link.click();
  }

  function resetarHoje() {
    const novoDia = { Bem: 0, Mal: 0, Pessimo: 0 };
    setDadosHoje(novoDia);
  }

  function limparHistorico() {
    localStorage.removeItem('statusHistorico');
    window.location.reload();
  }

  // Variants para animação do framer-motion
  const containerVariant = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
  };

  const itemVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } },
  };

  const chartVariant = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.6 } },
  };

  return (
    <motion.div
      className="p-4 max-w-7xl mx-auto"
      initial="hidden"
      animate="visible"
      variants={containerVariant}
    >
      <motion.h1
        className="text-3xl font-semibold mb-2 text-white"
        variants={itemVariant}
      >
        Bem-vindo, Alemão
      </motion.h1>

      <motion.p
        className="italic text-gray-300 mt-4 mb-6"
        variants={itemVariant}
      >
        Frase do dia: "{fraseDoDia}"
      </motion.p>

      <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
        <motion.div
          className="w-full md:w-1/3 h-64 md:h-80 bg-gray-800 rounded-lg p-4 shadow-lg"
          variants={chartVariant}
        >
          <Doughnut data={data} options={options} />
        </motion.div>

        <motion.div
          className="flex flex-col gap-4 w-full md:w-2/3 text-white"
          variants={containerVariant}
          initial="hidden"
          animate="visible"
        >
          <motion.h2 className="text-xl font-semibold mb-2" variants={itemVariant}>
            Seu Status Atual
          </motion.h2>

          <motion.div variants={itemVariant}>{mensagemMotivacional()}</motion.div>

          <motion.p variants={itemVariant}>
            Você está se sentindo{' '}
            <span className="font-bold text-green-400">Bem</span>: {pegarMensagem('Bem')}
          </motion.p>
          <motion.p variants={itemVariant}>
            Tem dias <span className="font-bold text-yellow-400">Mal</span>: {pegarMensagem('Mal')}
          </motion.p>
          <motion.p variants={itemVariant}>
            E alguns <span className="font-bold text-red-500">Péssimo</span>: {pegarMensagem('Pessimo')}
          </motion.p>

          <motion.div className="flex gap-3 flex-wrap" variants={itemVariant}>
            <button
              onClick={() => aumentarStatus('Bem')}
              className="bg-green-600 px-4 py-2 rounded hover:bg-green-700 transition"
            >
              Ver detalhes Bem
            </button>
            <button
              onClick={() => aumentarStatus('Mal')}
              className="bg-yellow-500 px-4 py-2 rounded hover:bg-yellow-600 transition"
            >
              Ver detalhes Mal
            </button>
            <button
              onClick={() => aumentarStatus('Pessimo')}
              className="bg-red-600 px-4 py-2 rounded hover:bg-red-700 transition"
            >
              Ver detalhes Péssimo
            </button>
          </motion.div>

          <motion.div className="flex gap-4 mt-4" variants={itemVariant}>
            <button onClick={resetarHoje} className="bg-blue-600 px-4 py-2 rounded">
              Resetar Hoje
            </button>
            <button onClick={limparHistorico} className="bg-red-700 px-4 py-2 rounded">
              Limpar Histórico
            </button>
          </motion.div>

          <motion.div className="mt-8" variants={itemVariant}>
            <h2 className="text-xl font-semibold mb-4">Histórico Diário</h2>
            <div className="overflow-x-auto">
              <table className="min-w-[600px] w-full text-white border-collapse border border-gray-600">
                <thead>
                  <tr>
                    <th className="border border-gray-600 p-2 text-left">Data</th>
                    <th className="border border-gray-600 p-2 text-left">Bem</th>
                    <th className="border border-gray-600 p-2 text-left">Mal</th>
                    <th className="border border-gray-600 p-2 text-left">Péssimo</th>
                    <th className="border border-gray-600 p-2 text-left">Classificação</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(historico).map(([data, valores]) => (
                    <tr
                      key={data}
                      className={`${
                        data === hojeStr ? 'bg-gray-700' : 'bg-gray-800'
                      } hover:bg-gray-600`}
                    >
                      <td className="border border-gray-600 p-2">{data}</td>
                      <td className="border border-gray-600 p-2">{valores.Bem}</td>
                      <td className="border border-gray-600 p-2">{valores.Mal}</td>
                      <td className="border border-gray-600 p-2">{valores.Pessimo}</td>
                      <td className="border border-gray-600 p-2">{classificarDia(valores)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <button
              onClick={exportarHistorico}
              className="mt-4 bg-green-600 px-4 py-2 rounded hover:bg-green-700"
            >
              Exportar Histórico JSON
            </button>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}
