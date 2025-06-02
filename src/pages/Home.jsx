import React, { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
import { db } from '../firebase';
import { doc, getDoc, setDoc, collection, getDocs } from 'firebase/firestore';
import StudyCard from '../components/StudyCard';
import IfmsCard from '../components/IFMSCard';
import DiarioCharts from '../components/DiarioCharts';

Chart.register(ArcElement, Tooltip, Legend);

export default function Home() {
  function getDataHoje() {
    const hoje = new Date();
    return hoje.toISOString().slice(0, 10);
  }

  const hojeStr = getDataHoje();

  const [dadosHoje, setDadosHoje] = useState({ Bem: 0, Mal: 0, Pessimo: 0 });
  const [fraseDoDia, setFraseDoDia] = useState('');

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

  const chartKey = `${dadosHoje.Bem}-${dadosHoje.Mal}-${dadosHoje.Pessimo}`;

  useEffect(() => {
    async function carregarDados() {
      try {
        const docRef = doc(db, 'statusHistorico', hojeStr);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setDadosHoje(docSnap.data());
        } else {
          await setDoc(docRef, { Bem: 0, Mal: 0, Pessimo: 0 });
          setDadosHoje({ Bem: 0, Mal: 0, Pessimo: 0 });
        }
      } catch (err) {
        console.error('Erro ao carregar dados do Firestore:', err);
      }
    }
    carregarDados();

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
  }, [hojeStr]);

  async function aumentarStatus(status) {
    const novoValor = dadosHoje[status] + 1;
    const novosDados = {
      ...dadosHoje,
      [status]: novoValor,
    };

    setDadosHoje(novosDados);

    try {
      const docRef = doc(db, 'statusHistorico', hojeStr);
      await setDoc(docRef, novosDados, { merge: true });
    } catch (err) {
      console.error('Erro ao atualizar o Firestore:', err);
    }
  }

  function mensagemMotivacional() {
    if (dadosHoje.Pessimo > 50) {
      return <p className="text-red-400 font-semibold text-center">⚠️ Atenção! O número de dias péssimos está alto. Busque melhorar seu bem-estar!</p>;
    } else if (dadosHoje.Mal > dadosHoje.Bem) {
      return <p className="text-yellow-400 font-semibold text-center">⚠️ Você tem mais dias difíceis do que bons, tente focar em coisas positivas.</p>;
    } else {
      return <p className="text-green-400 font-semibold text-center">🎉 Ótimo equilíbrio! Continue cuidando de sua saúde mental.</p>;
    }
  }

  const data = {
    labels: ['Bem', 'Mal', 'Pessimo'],
    datasets: [
      {
        data: [dadosHoje.Bem, dadosHoje.Mal, dadosHoje.Pessimo],
        backgroundColor: ['#4ade80', '#fbbf24', '#ef4444'],
        borderWidth: 2,
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
      tooltip: { enabled: true },
    },
    maintainAspectRatio: false,
  };

  const tarefas = [
    { hora: '05:00', atividade: 'Acordar e higiene pessoal' },
    { hora: '05:30', atividade: 'Oração / Leitura bíblica' },
    { hora: '06:00', atividade: 'Exercício físico leve (alongamento, caminhada)' },
    { hora: '19:00', atividade: 'Banho' },
    { hora: '20:30', atividade: 'Oração / Leitura bíblica' },
    { hora: '20:40', atividade: 'Dormir' },
  ];

  const cores = ['#4caf50', '#f44336'];

  function getHoje() {
    const hoje = new Date();
    return hoje.toISOString().split('T')[0];
  }

  const [historico, setHistorico] = useState({});
  const [dataAtual] = useState(getHoje());
  const historicoRef = collection(db, "historicoTarefas");

  useEffect(() => {
    async function carregarHistorico() {
      const snapshot = await getDocs(historicoRef);
      const dados = {};
      snapshot.forEach(doc => {
        dados[doc.id] = doc.data();
      });
      setHistorico(dados);
    }
    carregarHistorico();
  }, []);

  useEffect(() => {
    const salvarDiaAtual = async () => {
      if (!historico[dataAtual]) return;
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
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <header className="text-white">
          <h1 className="text-4xl font-bold mb-2">Olá João Pedro</h1>
          <p className="italic text-gray-300 text-lg">Frase do dia: <q>{fraseDoDia}</q></p>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Gráfico e status */}
          <div className="bg-gray-800 rounded-xl shadow-lg p-6 flex flex-col items-center justify-center">
            <h2 className="text-2xl font-semibold mb-4 text-white">Status Hoje</h2>
            <div className="w-48 h-48">
              <Doughnut key={chartKey} data={data} options={options} />
            </div>
            <div className="mt-6 w-full space-y-4 text-white">
              {mensagemMotivacional()}
              <div className="text-center">
                <p>Você está se sentindo <span className="font-bold text-green-400">Bem</span>: {pegarMensagem('Bem')}</p>
                <p>Tem dias <span className="font-bold text-yellow-400">Mal</span>: {pegarMensagem('Mal')}</p>
                <p>E alguns <span className="font-bold text-red-500">Péssimo</span>: {pegarMensagem('Pessimo')}</p>
              </div>
              <div className="flex justify-center gap-4 flex-wrap mt-3">
                <button
                  onClick={() => aumentarStatus('Bem')}
                  className="bg-green-600 hover:bg-green-700 transition px-5 py-2 rounded-full font-semibold shadow"
                >
                  Incrementar Bem
                </button>
                <button
                  onClick={() => aumentarStatus('Mal')}
                  className="bg-yellow-500 hover:bg-yellow-600 transition px-5 py-2 rounded-full font-semibold shadow"
                >
                  Incrementar Mal
                </button>
                <button
                  onClick={() => aumentarStatus('Pessimo')}
                  className="bg-red-600 hover:bg-red-700 transition px-5 py-2 rounded-full font-semibold shadow"
                >
                  Incrementar Péssimo
                </button>
              </div>
            </div>
          </div>

          {/* Cards de aulas */}
          <div className="md:col-span-2 space-y-6">
            <div className="bg-gray-800 rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-semibold mb-4 text-white">Aulas em Casa</h2>
              <StudyCard />
            </div>
            <div className="bg-gray-800 rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-semibold mb-4 text-white">Aulas do IFMS</h2>
              <IfmsCard />
            </div>
          </div>
        </section>

        {/* Aqui os gráficos do Diário, full width, responsivos */}
        <section className="bg-gray-800 rounded-xl shadow-lg p-6 mt-10">
          <h2 className="text-2xl font-semibold mb-4 text-white text-center">Seu Histórico Diário</h2>
          <DiarioCharts dadosPizza={dadosPizza} dadosLinha={dadosLinha} />
        </section>
      </div>
    </div>
  );
}
