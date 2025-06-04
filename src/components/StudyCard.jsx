import React, { useEffect, useState } from 'react';

// Horários de aulas
const horarioManha = [
  ['06:00', '07:00', ['Matemática', 'Física', 'História', 'Biologia', 'Matemática', 'Simulado ENEM', 'Língua Estrangeira']],
  ['07:00', '08:00', ['Matemática', 'Física', 'História', 'Biologia', 'Matemática', 'Simulado ENEM', 'Língua Estrangeira']],
  ['08:00', '08:30', ['Descanso', 'Descanso', 'Descanso', 'Descanso', 'Descanso', 'Descanso', 'Descanso']],
  ['08:30', '09:30', ['Português', 'Química', 'Geografia', 'Redação', 'Filosofia', 'Redação', 'Literatura']],
  ['09:30', '10:30', ['Português', 'Química', 'Geografia', 'Redação', 'Filosofia', 'Redação', 'Literatura']],
  ['10:30', '11:00', ['Sociologia', 'Sociologia', 'Sociologia', 'Sociologia', 'Sociologia', 'Sociologia', 'Sociologia']],
  ['11:00', '12:00', ['Revisão', 'Revisão', 'Revisão', 'Revisão', 'Revisão', 'Revisão', 'Revisão']],
];

const horarioTarde = [
  ['13:00', '14:00', ['Química', 'Física', 'Matemática', 'Geografia', 'História', 'Redação', 'Sociologia']],
  ['14:00', '15:00', ['Química', 'Física', 'Matemática', 'Geografia', 'História', 'Redação', 'Sociologia']],
  ['15:00', '15:30', ['Descanso', 'Descanso', 'Descanso', 'Descanso', 'Descanso', 'Descanso', 'Descanso']],
  ['15:30', '16:30', ['Simulado ENEM', 'Simulado ENEM', 'Simulado ENEM', 'Simulado ENEM', 'Simulado ENEM', 'Simulado ENEM', 'Simulado ENEM']],
  ['16:30', '17:30', ['Revisão', 'Revisão', 'Revisão', 'Revisão', 'Revisão', 'Revisão', 'Revisão']],
  ['17:30', '18:00', ['Literatura', 'Literatura', 'Literatura', 'Literatura', 'Literatura', 'Literatura', 'Literatura']],
];

const horarioNoite = [
  ['19:00', '20:00', ['Redação', 'Literatura', 'Português', 'Filosofia', 'Sociologia', 'Geografia', 'História']],
  ['20:00', '21:00', ['Redação', 'Literatura', 'Português', 'Filosofia', 'Sociologia', 'Geografia', 'História']],
  ['21:00', '21:30', ['Descanso', 'Descanso', 'Descanso', 'Descanso', 'Descanso', 'Descanso', 'Descanso']],
  ['21:30', '22:30', ['Matemática', 'Química', 'Física', 'Biologia', 'Matemática', 'Química', 'Física']],
  ['22:30', '23:30', ['Revisão', 'Revisão', 'Revisão', 'Revisão', 'Revisão', 'Revisão', 'Revisão']],
];

const horarioMadrugada = [
  ['23:30', '00:30', ['Português', 'Matemática', 'História', 'Geografia', 'Física', 'Química', 'Biologia']],
  ['00:30', '01:30', ['Literatura', 'Filosofia', 'Sociologia', 'Português', 'Matemática', 'História', 'Geografia']],
  ['01:30', '02:30', ['Inglês', 'Redação', 'Química', 'Física', 'Biologia', 'Filosofia', 'Sociologia']],
  ['02:30', '03:30', ['Redação', 'Matemática', 'Biologia', 'Química', 'História', 'Geografia', 'Português']],
  ['03:30', '04:00', ['Revisão / Organização', 'Revisão / Organização', 'Revisão / Organização', 'Revisão / Organização', 'Revisão / Organização', 'Revisão / Organização', 'Revisão / Organização']],
];

// Funções auxiliares
function parseTime(timeStr) {
  const [h, m] = timeStr.split(':').map(Number);
  return { h, m };
}

function toMinutes(h, m) {
  return h * 60 + m;
}

function nowInMinutes() {
  const now = new Date();
  return now.getHours() * 60 + now.getMinutes();
}

function getCurrentAndNextClass(schedule) {
  const now = new Date();
  const day = now.getDay();
  const currentMinutes = nowInMinutes();

  for (let i = 0; i < schedule.length; i++) {
    let [start, end, subjects] = schedule[i];

    const { h: sh, m: sm } = parseTime(start);
    const { h: eh, m: em } = parseTime(end);

    let startMinutes = toMinutes(sh, sm);
    let endMinutes = toMinutes(eh, em);

    if (endMinutes <= startMinutes) endMinutes += 24 * 60;
    let adjustedNow = currentMinutes;
    if (currentMinutes < startMinutes) adjustedNow += 24 * 60;

    if (adjustedNow >= startMinutes && adjustedNow < endMinutes) {
      const timeLeft = endMinutes - adjustedNow;
      const duration = endMinutes - startMinutes;
      const progress = ((duration - timeLeft) / duration) * 100;

      return {
        currentClass: subjects[day],
        timeLeft,
        nextClass: schedule[i + 1] ? schedule[i + 1][2][day] : 'Fim do dia',
        endTime: end,
        progress,
      };
    }
  }

  return {
    currentClass: 'Fora do horário de estudo',
    timeLeft: 0,
    nextClass: 'Nenhuma',
    endTime: null,
    progress: 0,
  };
}

// Componente principal
export default function StudyCard() {
  const [info, setInfo] = useState({
    currentClass: '',
    timeLeft: 0,
    nextClass: '',
    endTime: null,
    progress: 0,
  });

  useEffect(() => {
    function atualizar() {
      const now = new Date();
      const hour = now.getHours();

      let schedule;
      if (hour >= 6 && hour < 12) schedule = horarioManha;
      else if (hour >= 13 && hour < 19) schedule = horarioTarde;
      else if (hour >= 19 && hour < 23) schedule = horarioNoite;
      else schedule = horarioMadrugada;

      setInfo(getCurrentAndNextClass(schedule));
    }

    atualizar();
    const interval = setInterval(atualizar, 1000); // Atualiza a cada segundo

    return () => clearInterval(interval);
  }, []);

  const minutos = Math.floor(info.timeLeft);
  const minutosDisplay = minutos > 0 ? `${minutos} min` : 'Terminando...';

  return (
    <div className="bg-gray-800 rounded-lg p-6 text-white shadow-lg w-full max-w-4xl mx-auto space-y-4">
      <div className="flex flex-col md:flex-row items-center justify-between">
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

      {/* Linha de progresso */}
      <div className="w-full h-3 bg-gray-600 rounded overflow-hidden mt-2">
        <div
          className="h-full bg-green-500 transition-all duration-500 ease-linear"
          style={{ width: `${info.progress}%` }}
        />
      </div>
    </div>
  );
}
