import React, { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
import { db } from '../firebase';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';

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
      return <p className="text-red-400 font-bold">Atenção! O número de dias péssimos está alto. Busque melhorar seu bem-estar!</p>;
    } else if (dadosHoje.Mal > dadosHoje.Bem) {
      return <p className="text-yellow-400 font-bold">Você tem mais dias difíceis do que bons, tente focar em coisas positivas.</p>;
    } else {
      return <p className="text-green-400 font-bold">Ótimo equilíbrio! Continue cuidando de sua saúde mental.</p>;
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

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <h1 className="text-3xl font-semibold mb-2 text-white">Bem-vindo, Alemão</h1>
      <p className="italic text-gray-300 mt-4 mb-6">Frase do dia: "{fraseDoDia}"</p>
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
        <div className="w-full md:w-1/3 h-64 md:h-80 bg-gray-800 rounded-lg p-4 shadow-lg">
          <Doughnut key={chartKey} data={data} options={options} />
        </div>
        <div className="flex flex-col gap-4 w-full md:w-2/3 text-white">
          <h2 className="text-xl font-semibold mb-2">Seu Status Atual</h2>
          {mensagemMotivacional()}
          <p>Você está se sentindo <span className="font-bold text-green-400">Bem</span>: {pegarMensagem('Bem')}</p>
          <p>Tem dias <span className="font-bold text-yellow-400">Mal</span>: {pegarMensagem('Mal')}</p>
          <p>E alguns <span className="font-bold text-red-500">Péssimo</span>: {pegarMensagem('Pessimo')}</p>
          <div className="flex gap-3 flex-wrap">
            <button onClick={() => aumentarStatus('Bem')} className="bg-green-600 px-4 py-2 rounded hover:bg-green-700 transition">Ver detalhes Bem</button>
            <button onClick={() => aumentarStatus('Mal')} className="bg-yellow-500 px-4 py-2 rounded hover:bg-yellow-600 transition">Ver detalhes Mal</button>
            <button onClick={() => aumentarStatus('Pessimo')} className="bg-red-600 px-4 py-2 rounded hover:bg-red-700 transition">Ver detalhes Péssimo</button>
          </div>
        </div>
      </div>
    </div>
  );
}
