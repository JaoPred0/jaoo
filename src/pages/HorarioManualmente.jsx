import React, { useState } from 'react';
import { db } from '../firebase'; // Ajuste o caminho conforme seu projeto
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export const HorarioManualmente = () => {
  // Estado das tabelas para editar
  const [tabelas, setTabelas] = useState([
    {
      id: 1,
      titulo: 'Minha Tabela',
      horarios: [{ hora: '', materias: {} }]
    }
  ]);

  // Estado das tabelas criadas (salvas localmente)
  const [tabelasCriadas, setTabelasCriadas] = useState([]);

  const dias = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'];

  // Editar título da tabela
  const handleTituloChange = (tabelaIndex, novoTitulo) => {
    const novasTabelas = [...tabelas];
    novasTabelas[tabelaIndex].titulo = novoTitulo;
    setTabelas(novasTabelas);
  };

  // Editar hora em linha da tabela
  const handleHoraChange = (tabelaIndex, horaIndex, novaHora) => {
    const novasTabelas = [...tabelas];
    novasTabelas[tabelaIndex].horarios[horaIndex].hora = novaHora;
    setTabelas(novasTabelas);
  };

  // Editar matéria em dia e hora específicos
  const handleMateriaChange = (tabelaIndex, horaIndex, dia, valor) => {
    const novasTabelas = [...tabelas];
    if (!novasTabelas[tabelaIndex].horarios[horaIndex].materias) {
      novasTabelas[tabelaIndex].horarios[horaIndex].materias = {};
    }
    novasTabelas[tabelaIndex].horarios[horaIndex].materias[dia] = valor;
    setTabelas(novasTabelas);
  };

  // Adicionar linha de horário na tabela
  const adicionarLinhaHorario = (tabelaIndex) => {
    const novasTabelas = [...tabelas];
    novasTabelas[tabelaIndex].horarios.push({ hora: '', materias: {} });
    setTabelas(novasTabelas);
  };

  // Adicionar nova tabela
  const adicionarTabela = () => {
    setTabelas([
      ...tabelas,
      {
        id: Date.now(),
        titulo: 'Nova Tabela',
        horarios: [{ hora: '', materias: {} }]
      }
    ]);
  };

  // Salvar tabela no Firestore e localmente
  const criarTabela = async (tabelaIndex) => {
    const tabelaParaCriar = tabelas[tabelaIndex];

    try {
      await addDoc(collection(db, "tabelas"), {
        titulo: tabelaParaCriar.titulo,
        horarios: tabelaParaCriar.horarios,
        criadoEm: serverTimestamp()
      });

      setTabelasCriadas((prev) => [...prev, { ...tabelaParaCriar, id: Date.now() }]);
      alert(`Tabela "${tabelaParaCriar.titulo}" criada e salva no Firebase!`);
    } catch (error) {
      console.error("Erro ao salvar tabela no Firestore:", error);
      alert("Erro ao salvar tabela. Veja o console para detalhes.");
    }
  };

  // Renderiza a tabela de forma visual
  const renderTabela = (tabela) => (
    <table
      className="table-fixed border-collapse w-full min-w-[800px]"
      style={{ tableLayout: 'fixed' }}
    >
      <thead>
        <tr>
          <th className="border px-2 py-1 text-left bg-gray-100 w-20">Hora / Dia</th>
          {dias.map((dia) => (
            <th key={dia} className="border px-2 py-1 bg-gray-100 text-center">
              {dia}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {tabela.horarios.map((linha, horaIndex) => (
          <tr key={horaIndex}>
            <td className="border px-2 py-1">{linha.hora || '-'}</td>
            {dias.map((dia) => (
              <td key={dia} className="border px-1 py-1">
                {linha.materias?.[dia] || '-'}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <div className="p-4 md:p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Criar Horário Manualmente</h2>

      {tabelas.map((tabela, tabelaIndex) => (
        <div
          key={tabela.id}
          className="mb-8 border rounded p-4 shadow bg-white"
          style={{ overflowX: 'auto' }}
        >
          <input
            type="text"
            value={tabela.titulo}
            onChange={(e) => handleTituloChange(tabelaIndex, e.target.value)}
            className="text-lg font-semibold mb-3 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 w-full"
            placeholder={`Título da Tabela ${tabelaIndex + 1}`}
          />

          <table
            className="table-fixed border-collapse w-full min-w-[800px]"
            style={{ tableLayout: 'fixed' }}
          >
            <thead>
              <tr>
                <th className="border px-2 py-1 text-left bg-gray-100 w-20">Hora / Dia</th>
                {dias.map((dia) => (
                  <th key={dia} className="border px-2 py-1 bg-gray-100 text-center">
                    {dia}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tabela.horarios.map((linha, horaIndex) => (
                <tr key={horaIndex}>
                  <td className="border px-2 py-1">
                    <input
                      type="text"
                      value={linha.hora}
                      onChange={(e) => handleHoraChange(tabelaIndex, horaIndex, e.target.value)}
                      className="w-full border rounded px-1 py-1"
                      placeholder="00:00"
                    />
                  </td>
                  {dias.map((dia) => (
                    <td key={dia} className="border px-1 py-1">
                      <input
                        type="text"
                        value={linha.materias?.[dia] || ''}
                        onChange={(e) =>
                          handleMateriaChange(tabelaIndex, horaIndex, dia, e.target.value)
                        }
                        className="w-full border rounded px-1 py-1"
                        placeholder="Matéria"
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>

          <button
            onClick={() => adicionarLinhaHorario(tabelaIndex)}
            className="mt-3 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full sm:w-auto mr-2"
          >
            + Adicionar Linha de Horário
          </button>

          <button
            onClick={() => criarTabela(tabelaIndex)}
            className="mt-3 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-full sm:w-auto"
          >
            Criar tabela
          </button>
        </div>
      ))}

      {/* Botão para adicionar nova tabela */}
      <button
        onClick={adicionarTabela}
        className="mb-6 bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700"
      >
        + Adicionar Nova Tabela
      </button>

      {/* Mostrar as tabelas criadas */}
      <h3 className="text-xl font-bold mb-4">Tabelas Criadas:</h3>
      {tabelasCriadas.length === 0 && <p>Nenhuma tabela criada ainda.</p>}
      {tabelasCriadas.map((tabela) => (
        <div
          key={tabela.id}
          className="mb-6 border rounded p-4 shadow bg-gray-50 overflow-x-auto"
        >
          <h4 className="text-lg font-semibold mb-3">{tabela.titulo}</h4>
          {renderTabela(tabela)}
        </div>
      ))}
    </div>
  );
};
