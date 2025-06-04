import React, { useEffect, useState } from 'react';

// Horários no formato: [intervalo (ex: "07:00 - 07:45"), matéria dom, seg, ter, qua, qui, sex, sab]
const horarioMatutino = [
  ['07:00 - 07:45', '', '', '', '', 'MATEMÁTICA 3', ''],
  ['07:45 - 08:30', '', '', '', '', '', ''],
  ['08:30 - 09:15', '', '', '', '', '', ''],
  ['09:35 - 10:20', '', '', '', 'QUÍMICA 2', 'BIOLOGIA 1', ''],
  ['10:20 - 11:05', '', 'MATEMÁTICA 3', '', 'QUÍMICA 2', 'BIOLOGIA 1', ''],
  ['11:05 - 11:50', '', 'MATEMÁTICA 3', '', '', '', ''],
  ['11:50 - 12:35', '', '', '', '', 'QUÍMICA 2', ''],
];

const horarioVespertino = [
  ['13:00 - 13:45', 'FRAMEWORKS 1', 'EDUCAÇÃO FÍSICA 5', 'BIOLOGIA 3', 'ANÁLISE E PROJETO DE SISTEMAS WEB 2', 'MARKETING WEB', ''],
  ['13:45 - 14:30', 'FRAMEWORKS 1', 'FRAMEWORKS 1', 'BIOLOGIA 3', 'ANÁLISE E PROJETO DE SISTEMAS WEB 2', 'MARKETING WEB', ''],
  ['14:30 - 15:15', 'METODOLOGIA DA PESQUISA', 'FRAMEWORKS 1', 'BANCO DE DADOS 2', 'MATEMÁTICA 5', 'HISTÓRIA 3', ''],
  ['15:35 - 16:20', 'METODOLOGIA DA PESQUISA', 'FÍSICA 5', 'BANCO DE DADOS 2', 'QUÍMICA 4', 'HISTÓRIA 3', ''],
  ['16:20 - 17:05', 'QUÍMICA 4', 'MATEMÁTICA 5', 'LÍNGUA PORTUGUESA E LITERATURA BRASILEIRA 5', 'QUÍMICA 4', 'FÍSICA 5', ''],
  ['17:05 - 17:50', 'QUÍMICA 4', 'MATEMÁTICA 5', 'LÍNGUA PORTUGUESA E LITERATURA BRASILEIRA 5', 'LÍNGUA PORTUGUESA E LITERATURA BRASILEIRA 5', 'FÍSICA 5', ''],
];

// Sem dados para noite e madrugada, mas defino arrays vazios para evitar erros
const horarioNoite = [];
const horarioMadrugada = [];

// Função auxiliar para converter "HH:MM" para minutos
function toMinutes(hhmm) {
  const [h, m] = hhmm.split(':').map(Number);
  return h * 60 + m;
}

// Função que retorna a aula atual e a próxima, dado um horário (array)
function getCurrentAndNextClass(schedule) {
  const now = new Date();
  const day = now.getDay(); // 0=Domingo, 1=Segunda...
  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  for (let i = 0; i < schedule.length; i++) {
    // schedule[i] = ['07:00 - 07:45', 'mat dom', 'mat seg', ...]
    const intervalo = schedule[i][0];
    const materias = schedule[i].slice(1); // do índice 1 até o fim

    const [startStr, endStr] = intervalo.split(' - ');
    const startMinutes = toMinutes(startStr);
    const endMinutes = toMinutes(endStr);

    if (currentMinutes >= startMinutes && currentMinutes < endMinutes) {
      const currentClass = materias[day] || 'Sem aula';
      const next = schedule[i + 1];
      const nextClass = next ? (next[day + 1] || 'Sem aula') : 'Fim do dia';
      return {
        currentClass,
        timeLeft: endMinutes - currentMinutes,
        nextClass,
        endTime: endStr,
      };
    }
  }

  return {
    currentClass: 'Fora do horário de aula',
    timeLeft: 0,
    nextClass: 'Nenhuma',
    endTime: null,
  };
}

export default function IfmsCard() {
  const [info, setInfo] = useState({
    currentClass: '',
    timeLeft: 0,
    nextClass: '',
    endTime: null,
  });

  useEffect(() => {
    function atualizar() {
      const now = new Date();
      const hour = now.getHours();

      let schedule;
      if (hour >= 7 && hour < 12) schedule = horarioMatutino;
      else if (hour >= 13 && hour < 18) schedule = horarioVespertino;
      else if (hour >= 18 && hour < 23) schedule = horarioNoite;
      else schedule = horarioMadrugada;

      setInfo(getCurrentAndNextClass(schedule));
    }

    atualizar();
    const interval = setInterval(atualizar, 30 * 1000);

    return () => clearInterval(interval);
  }, []);

  const minutos = Math.floor(info.timeLeft);
  const minutosDisplay = minutos > 0 ? `${minutos} min` : 'Terminando...';

  return (
    <div className="bg-gray-800 rounded-lg p-6 flex flex-col md:flex-row items-center justify-between text-white shadow-lg w-full max-w-4xl mx-auto space-y-6 md:space-y-0">
      <div className="flex-1 text-center md:text-left">
        <h3 className="text-lg font-semibold mb-1">Aula Atual</h3>
        <p className="text-2xl font-bold">{info.currentClass}</p>
        {info.endTime && <p className="text-sm text-gray-400">Termina às {info.endTime}</p>}
      </div>

      <div className="flex-1 text-center">
        <h3 className="text-lg font-semibold mb-1">Tempo Restante</h3>
        <p className="text-2xl font-bold">{minutosDisplay}</p>
      </div>

      <div className="flex-1 text-center md:text-right">
        <h3 className="text-lg font-semibold mb-1">Próxima Aula</h3>
        <p className="text-xl font-medium">{info.nextClass}</p>
      </div>
    </div>
  );
}