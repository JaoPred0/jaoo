import { useEffect, useState } from "react";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
export const Horario = () => {
    const diasSemana = ['Tempo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta'];

    const horarioMatutino = [
        ['07:00 - 07:45', '', '', '', '', 'MATEMÁTICA 3'],
        ['07:45 - 08:30', '', '', '', '', ''],
        ['08:30 - 09:15', '', '', '', '', ''],
        ['09:35 - 10:20', '', '', '', 'QUÍMICA 2', 'BIOLOGIA 1'],
        ['10:20 - 11:05', '', 'MATEMÁTICA 3', '', 'QUÍMICA 2', 'BIOLOGIA 1'],
        ['11:05 - 11:50', '', 'MATEMÁTICA 3', '', '', ''],
        ['11:50 - 12:35', '', '', '', '', 'QUÍMICA 2'],
    ];


    const horarioVespertino = [
        ['13:00 - 13:45', 'FRAMEWORKS 1', 'EDUCAÇÃO FÍSICA 5', 'BIOLOGIA 3', 'ANÁLISE E PROJETO DE SISTEMAS WEB 2', 'MARKETING WEB'],
        ['13:45 - 14:30', 'FRAMEWORKS 1', 'FRAMEWORKS 1', 'BIOLOGIA 3', 'ANÁLISE E PROJETO DE SISTEMAS WEB 2', 'MARKETING WEB'],
        ['14:30 - 15:15', 'METODOLOGIA DA PESQUISA', 'FRAMEWORKS 1', 'BANCO DE DADOS 2', 'MATEMÁTICA 5', 'HISTÓRIA 3'],
        ['15:35 - 16:20', 'METODOLOGIA DA PESQUISA', 'FÍSICA 5', 'BANCO DE DADOS 2', 'QUÍMICA 4', 'HISTÓRIA 3'],
        ['16:20 - 17:05', 'QUÍMICA 4', 'MATEMÁTICA 5', 'LÍNGUA PORTUGUESA E LITERATURA BRASILEIRA 5', 'QUÍMICA 4', 'FÍSICA 5'],
        ['17:05 - 17:50', 'QUÍMICA 4', 'MATEMÁTICA 5', 'LÍNGUA PORTUGUESA E LITERATURA BRASILEIRA 5', 'LÍNGUA PORTUGUESA E LITERATURA BRASILEIRA 5', 'FÍSICA 5'],
    ];

    const horarioNoturno = []; // Não há dados para o noturno no PDF

    const renderTabela = (titulo, dados) => (
        <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4">{titulo}</h2>
            <div className="overflow-x-auto">
                <table className="w-full min-w-[900px] border border-gray-700 text-sm text-white">
                    <thead>
                        <tr className="bg-gray-800">
                            {diasSemana.map((dia, idx) => (
                                <th key={idx} className="py-2 px-4 border border-gray-700 font-semibold">
                                    {dia}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {dados.map((linha, i) => (
                            <tr key={i} className="hover:bg-gray-800">
                                {linha.map((celula, j) => (
                                    <td key={j} className="py-2 px-4 border border-gray-700">
                                        {celula || '-'}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );

    return (
        <div className="p-6 bg-gray-900 min-h-screen">
            {renderTabela('Horário Matutino', horarioMatutino)}
            {renderTabela('Horário Vespertino', horarioVespertino)}
            {renderTabela('Horário Noturno', horarioNoturno)}
        </div>
    );
};

export const Lembretes = () => {
  const [lembretes, setLembretes] = useState([]);
  const [texto, setTexto] = useState("");
  const [data, setData] = useState("");
  const [cor, setCor] = useState("#1f2937");

  const colecaoRef = collection(db, "lembretes");

  useEffect(() => {
    const carregarLembretes = async () => {
      const snap = await getDocs(colecaoRef);
      const lista = snap.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setLembretes(lista);
      localStorage.setItem("lembretes", JSON.stringify(lista));
    };

    carregarLembretes();
  }, []);

  const adicionarLembrete = async (e) => {
    e.preventDefault();
    if (texto.trim() === "" && data === "") return;

    const novo = {
      texto: texto.trim(),
      data: data || null,
      cor,
    };

    const docRef = await addDoc(colecaoRef, novo);
    setLembretes([...lembretes, { ...novo, id: docRef.id }]);

    setTexto("");
    setData("");
    setCor("#1f2937");
  };

  const removerLembrete = async (id) => {
    await deleteDoc(doc(db, "lembretes", id));
    setLembretes(lembretes.filter((item) => item.id !== id));
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-gray-900 text-gray-100 rounded-lg shadow-md px-4 sm:px-6">
      <h2 className="text-2xl font-bold mb-6 text-center">📚 Lembretes Escolares</h2>

      <form onSubmit={adicionarLembrete} className="flex flex-col gap-3 mb-6">
        <input
          type="text"
          placeholder="Ex: Prova de Matemática na sexta"
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          className="rounded-md bg-gray-800 border border-gray-700 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
        />
        <input
          type="date"
          value={data}
          onChange={(e) => setData(e.target.value)}
          className="rounded-md bg-gray-800 border border-gray-700 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
        />
        <label className="flex items-center gap-2">
          <span>Cor do fundo:</span>
          <input
            type="color"
            value={cor}
            onChange={(e) => setCor(e.target.value)}
            className="w-10 h-10 p-0 border-none cursor-pointer"
            aria-label="Escolher cor do fundo do lembrete"
          />
        </label>
        <button
          type="submit"
          className="bg-red-600 hover:bg-red-700 rounded-md px-5 py-2 font-semibold transition-colors"
        >
          ➕ Adicionar
        </button>
      </form>

      {lembretes.length === 0 ? (
        <p className="text-center text-gray-400">Nenhum lembrete por enquanto...</p>
      ) : (
        <ul className="space-y-3">
          {lembretes.map((item, index) => (
            <li
              key={item.id || index}
              className="flex justify-between items-center rounded-md px-4 py-3 shadow"
              style={{ backgroundColor: item.cor }}
            >
              <div>
                <p>{item.texto || <em>(Sem texto)</em>}</p>
                {item.data && (
                  <p className="text-sm text-gray-300 mt-1">
                    📅 {new Date(item.data).toLocaleDateString()}
                  </p>
                )}
              </div>
              <button
                onClick={() => removerLembrete(item.id)}
                className="bg-red-700 hover:bg-red-800 text-white rounded-md px-3 py-1 font-bold transition-colors"
              >
                ❌
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

