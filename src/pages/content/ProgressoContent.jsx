import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
} from "recharts";

const cores = ["#34d399", "#6366f1"]; // verde e índigo

export const Estudos = () => {
  const [historico, setHistorico] = useState(() => {
    const salvo = localStorage.getItem("historicoEstudos");
    return salvo ? JSON.parse(salvo) : {};
  });

  const [estudosHoje, setEstudosHoje] = useState(() => {
    const salvo = localStorage.getItem("estudosHoje");
    return salvo ? parseInt(salvo, 10) : 0;
  });

  useEffect(() => {
    localStorage.setItem("historicoEstudos", JSON.stringify(historico));
  }, [historico]);

  useEffect(() => {
    localStorage.setItem("estudosHoje", estudosHoje);
  }, [estudosHoje]);

  const registrarEstudoHoje = () => {
    const hoje = (() => {
      const d = new Date();
      return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    })();

    setEstudosHoje(estudosHoje + 1);
    setHistorico((prev) => ({
      ...prev,
      [hoje]: (prev[hoje] || 0) + 1,
    }));
  };

  const resetarEstudosHoje = () => {
    setEstudosHoje(0);
    localStorage.setItem("estudosHoje", 0);
  };

  const dadosGraficoLinha = Object.entries(historico)
    .sort(([a], [b]) => new Date(a) - new Date(b))
    .map(([data, quantidade]) => ({
      data,
      estudos: quantidade,
    }));

  const [topicos, setTopicos] = useState([]);
  const [novoTopico, setNovoTopico] = useState("");

  useEffect(() => {
    const dadosSalvos = localStorage.getItem("topicosEstudos");
    if (dadosSalvos) {
      setTopicos(JSON.parse(dadosSalvos));
    } else {
      const iniciais = [
        { nome: "Matemática - Frações", concluido: true },
        { nome: "Português - Interpretação de Texto", concluido: true },
        { nome: "História - Revolução Francesa", concluido: false },
        { nome: "Geografia - Clima e Vegetação", concluido: false },
        { nome: "Ciências - Corpo Humano", concluido: true },
      ];
      setTopicos(iniciais);
      localStorage.setItem("topicosEstudos", JSON.stringify(iniciais));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("topicosEstudos", JSON.stringify(topicos));
  }, [topicos]);

  const adicionarTopico = () => {
    if (!novoTopico.trim()) return;
    const novo = { nome: novoTopico, concluido: false };
    setTopicos([...topicos, novo]);
    setNovoTopico("");
  };

  const alternarConclusao = (index) => {
    const atualizados = [...topicos];
    atualizados[index].concluido = !atualizados[index].concluido;
    setTopicos(atualizados);
  };

  const concluidos = topicos.filter((t) => t.concluido).length;
  const total = topicos.length;
  const porcentagem = total ? Math.round((concluidos / total) * 100) : 0;

  const dadosGrafico = [
    { name: "Concluídos", value: concluidos },
    { name: "Pendentes", value: total - concluidos },
  ];

  return (
    <div className=" rounded-lg text-white space-y-6">
      <h2 className="text-2xl font-bold">Progresso dos Estudos</h2>

      {/* Contêiner do topo com matérias estudadas hoje */}
      <div className="bg-gray-900 p-4 rounded-lg text-center space-y-3">
        <h3 className="text-lg font-semibold">Matérias estudadas hoje</h3>
        <div className="text-4xl font-bold text-green-400">{estudosHoje}</div>
        <div className="flex justify-center gap-2 flex-wrap">
          <button
            onClick={registrarEstudoHoje}
            className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-500"
          >
            Estudei uma matéria hoje 📚
          </button>
          <button
            onClick={resetarEstudosHoje}
            className="bg-red-600 px-4 py-2 rounded hover:bg-red-500"
          >
            Resetar
          </button>
        </div>
      </div>

      {/* Grid principal para gráficos e lista */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Coluna 1: Gráfico de linha */}
        <div className="bg-gray-900 rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-2 text-center">Estudos ao longo dos dias</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={dadosGraficoLinha}>
              <XAxis dataKey="data" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="estudos"
                stroke="#10b981"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Coluna 2: Gráfico pizza e progresso */}
        <div className="space-y-6">
          <div className="bg-gray-900 rounded-lg p-4 h-72">
            <h3 className="text-lg font-semibold mb-2 text-center">Tópicos Concluídos</h3>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={dadosGrafico}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label
                >
                  {dadosGrafico.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={cores[index % cores.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div>
            <div className="text-sm mb-1 text-center">
              {concluidos} de {total} tópicos concluídos ({porcentagem}%)
            </div>
            <div className="w-full bg-gray-700 rounded-full h-4">
              <div
                className="bg-indigo-500 h-full transition-all duration-500"
                style={{ width: `${porcentagem}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Lista e input de tópicos */}
      <div>
        <ul className="space-y-2 mb-4">
          {topicos.map((topico, index) => (
            <li
              key={index}
              className={`flex items-center justify-between gap-2 p-2 rounded ${topico.concluido
                  ? "bg-green-700/20 text-green-300 line-through"
                  : "bg-gray-700 text-gray-200"
                }`}
            >
              <span>{topico.nome}</span>
              <button
                onClick={() => alternarConclusao(index)}
                className="text-xs px-2 py-1 bg-indigo-600 rounded hover:bg-indigo-500"
              >
                {topico.concluido ? "Desfazer" : "Concluir"}
              </button>
            </li>
          ))}
        </ul>

        <div className="flex gap-2 flex-wrap">
          <input
            type="text"
            value={novoTopico}
            onChange={(e) => setNovoTopico(e.target.value)}
            className="flex-1 min-w-[200px] px-3 py-2 rounded bg-gray-700 text-white placeholder-gray-400"
            placeholder="Novo tópico de estudo..."
          />
          <button
            onClick={adicionarTopico}
            className="bg-green-600 px-4 py-2 rounded hover:bg-green-500"
          >
            Adicionar
          </button>
        </div>
      </div>
    </div>
  );

};

export const Cristo = () => {
  const [historico, setHistorico] = useState(() => {
    const salvo = localStorage.getItem("historicoCristo");
    return salvo ? JSON.parse(salvo) : {};
  });

  const [estudosHoje, setEstudosHoje] = useState(() => {
    const salvo = localStorage.getItem("estudosCristoHoje");
    return salvo ? parseInt(salvo, 10) : 0;
  });

  useEffect(() => {
    localStorage.setItem("historicoCristo", JSON.stringify(historico));
  }, [historico]);

  useEffect(() => {
    localStorage.setItem("estudosCristoHoje", estudosHoje);
  }, [estudosHoje]);

  const registrarEstudoHoje = () => {
    const hoje = (() => {
      const d = new Date();
      return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    })();

    setEstudosHoje(estudosHoje + 1);
    setHistorico((prev) => ({
      ...prev,
      [hoje]: (prev[hoje] || 0) + 1,
    }));
  };

  const resetarEstudosHoje = () => {
    setEstudosHoje(0);
    localStorage.setItem("estudosCristoHoje", 0);
  };

  const dadosGraficoLinha = Object.entries(historico)
    .sort(([a], [b]) => new Date(a) - new Date(b))
    .map(([data, quantidade]) => ({
      data,
      estudos: quantidade,
    }));

  const [topicos, setTopicos] = useState([]);
  const [novoTopico, setNovoTopico] = useState("");

  useEffect(() => {
    const dadosSalvos = localStorage.getItem("topicosCristo");
    if (dadosSalvos) {
      setTopicos(JSON.parse(dadosSalvos));
    } else {
      const iniciais = [
        { nome: "João 3:16 - Amor de Deus", concluido: true },
        { nome: "Salmos 23 - O Senhor é meu Pastor", concluido: false },
        { nome: "Mateus 5 - Sermão da Montanha", concluido: false },
        { nome: "Romanos 8 - Vida no Espírito", concluido: true },
        { nome: "Filipenses 4:13 - Força em Cristo", concluido: true },
      ];
      setTopicos(iniciais);
      localStorage.setItem("topicosCristo", JSON.stringify(iniciais));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("topicosCristo", JSON.stringify(topicos));
  }, [topicos]);

  const adicionarTopico = () => {
    if (!novoTopico.trim()) return;
    const novo = { nome: novoTopico, concluido: false };
    setTopicos([...topicos, novo]);
    setNovoTopico("");
  };

  const alternarConclusao = (index) => {
    const atualizados = [...topicos];
    atualizados[index].concluido = !atualizados[index].concluido;
    setTopicos(atualizados);
  };

  const concluidos = topicos.filter((t) => t.concluido).length;
  const total = topicos.length;
  const porcentagem = total ? Math.round((concluidos / total) * 100) : 0;

  const dadosGrafico = [
    { name: "Concluídos", value: concluidos },
    { name: "Pendentes", value: total - concluidos },
  ];

  return (
    <div className="rounded-lg text-white space-y-6">
      <h2 className="text-2xl font-bold">Progresso dos Estudos com Cristo</h2>

      {/* Contêiner do topo com estudos bíblicos feitos hoje */}
      <div className="bg-gray-900 p-4 rounded-lg text-center space-y-3">
        <h3 className="text-lg font-semibold">Estudos Bíblicos hoje</h3>
        <div className="text-4xl font-bold text-green-400">{estudosHoje}</div>
        <div className="flex justify-center gap-2 flex-wrap">
          <button
            onClick={registrarEstudoHoje}
            className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-500"
          >
            Estudei hoje 📖
          </button>
          <button
            onClick={resetarEstudosHoje}
            className="bg-red-600 px-4 py-2 rounded hover:bg-red-500"
          >
            Resetar
          </button>
        </div>
      </div>

      {/* Grid principal para gráficos e lista */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Gráfico de linha */}
        <div className="bg-gray-900 rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-2 text-center">
            Estudos Bíblicos ao longo dos dias
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={dadosGraficoLinha}>
              <XAxis dataKey="data" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="estudos"
                stroke="#10b981"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Gráfico pizza e progresso */}
        <div className="space-y-6">
          <div className="bg-gray-900 rounded-lg p-4 h-72">
            <h3 className="text-lg font-semibold mb-2 text-center">
              Versículos/Tópicos Concluídos
            </h3>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={dadosGrafico}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label
                >
                  {dadosGrafico.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={cores[index % cores.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div>
            <div className="text-sm mb-1 text-center">
              {concluidos} de {total} tópicos concluídos ({porcentagem}%)
            </div>
            <div className="w-full bg-gray-700 rounded-full h-4">
              <div
                className="bg-indigo-500 h-full transition-all duration-500"
                style={{ width: `${porcentagem}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Lista e input de tópicos */}
      <div>
        <ul className="space-y-2 mb-4">
          {topicos.map((topico, index) => (
            <li
              key={index}
              className={`flex items-center justify-between gap-2 p-2 rounded ${topico.concluido
                  ? "bg-green-700/20 text-green-300 line-through"
                  : "bg-gray-700 text-gray-200"
                }`}
            >
              <span>{topico.nome}</span>
              <button
                onClick={() => alternarConclusao(index)}
                className="text-xs px-2 py-1 bg-indigo-600 rounded hover:bg-indigo-500"
              >
                {topico.concluido ? "Desfazer" : "Concluir"}
              </button>
            </li>
          ))}
        </ul>

        <div className="flex gap-2 flex-wrap">
          <input
            type="text"
            value={novoTopico}
            onChange={(e) => setNovoTopico(e.target.value)}
            className="flex-1 min-w-[200px] px-3 py-2 rounded bg-gray-700 text-white placeholder-gray-400"
            placeholder="Novo versículo ou tópico..."
          />
          <button
            onClick={adicionarTopico}
            className="bg-green-600 px-4 py-2 rounded hover:bg-green-500"
          >
            Adicionar
          </button>
        </div>
      </div>
    </div>
  );
};


