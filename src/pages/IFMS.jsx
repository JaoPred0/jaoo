import React, { useState } from 'react';
import {
  Horario,
  Lembretes,
  // ...importe os outros
} from '../components/ConteudoIFMS';

const cards = [
  {
    title: 'Horario IFMS',
    desc: 'Estude português, literatura, inglês, espanhol, artes e interpretação de textos.',
    render: Horario,
    color: 'bg-pink-600'
  },
  {
    title: 'Lembretes',
    desc: 'Revise álgebra, geometria, estatística e matemática financeira.',
    render: Lembretes,
    color: 'bg-blue-700'
  },
  // Adicione os demais
];

const Revisoes = () => {
  const [selected, setSelected] = useState(null);

  const handleBack = () => setSelected(null);

  return (
    <>
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-400 mb-6" aria-label="Breadcrumb">
        <ol className="list-reset flex">
          <li>
            <a href="/" className="hover:text-white">Início</a>
            <span className="mx-2">/</span>
          </li>
          <li>
            <a href="/estudos" className="hover:text-white">Estudos</a>
            <span className="mx-2">/</span>
          </li>
          <li className="text-gray-300">IFMS</li>
        </ol>
      </nav>
      <div className="p-6 animate__animated animate__fadeIn">
        {!selected ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cards.map((card, index) => (
              <button
                key={index}
                onClick={() => setSelected(card)}
                className={`text-left rounded-xl shadow-md p-6 ${card.color} hover:scale-105 transition-transform duration-300 animate__animated animate__fadeInUp`}
                style={{ animationDelay: `${index * 0.1}s`, animationDuration: '0.6s' }}
              >
                <h2 className="text-xl font-bold mb-2 text-white">{card.title}</h2>
                <p className="text-sm text-white">{card.desc}</p>
              </button>
            ))}
          </div>
        ) : (
          <div>
            <button
              onClick={handleBack}
              className="mb-4 text-sm text-blue-600 hover:underline"
            >
              ← Voltar
            </button>
            {selected.render && <selected.render />}
          </div>
        )}
      </div>
    </>
  );
};

export default Revisoes;
