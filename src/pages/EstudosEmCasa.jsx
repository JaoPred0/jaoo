import React from "react";
      import {Link} from 'react-router-dom';

const diasSemana = [
  "Tempo",
  "Segunda",
  "Terça",
  "Quarta",
  "Quinta",
  "Sexta",
  "Sábado",
  "Domingo",
];

const horarios = {
  "Manhã": [
    ["06:00 - 07:00", "Matemática", "Física", "História", "Biologia", "Matemática", "Simulado ENEM", "Língua Estrangeira"],
    ["07:00 - 08:00", "Matemática", "Física", "História", "Biologia", "Matemática", "Simulado ENEM", "Língua Estrangeira"],
    ["08:00 - 08:30", "Descanso", "Descanso", "Descanso", "Descanso", "Descanso", "Descanso", "Descanso"],
    ["08:30 - 09:30", "Português", "Química", "Geografia", "Redação", "Filosofia", "Redação", "Literatura"],
    ["09:30 - 10:30", "Português", "Química", "Geografia", "Redação", "Filosofia", "Redação", "Literatura"],
    ["10:30 - 11:00", "Sociologia", "Sociologia", "Sociologia", "Sociologia", "Sociologia", "Sociologia", "Sociologia"],
    ["11:00 - 12:00", "Revisão", "Revisão", "Revisão", "Revisão", "Revisão", "Revisão", "Revisão"],
  ],
  "Tarde": [
    ["13:00 - 14:00", "Química", "Física", "Matemática", "Geografia", "História", "Redação", "Sociologia"],
    ["14:00 - 15:00", "Química", "Física", "Matemática", "Geografia", "História", "Redação", "Sociologia"],
    ["15:00 - 15:30", "Descanso", "Descanso", "Descanso", "Descanso", "Descanso", "Descanso", "Descanso"],
    ["15:30 - 16:30", "Simulado ENEM", "Simulado ENEM", "Simulado ENEM", "Simulado ENEM", "Simulado ENEM", "Simulado ENEM", "Simulado ENEM"],
    ["16:30 - 17:30", "Revisão", "Revisão", "Revisão", "Revisão", "Revisão", "Revisão", "Revisão"],
    ["17:30 - 18:00", "Literatura", "Literatura", "Literatura", "Literatura", "Literatura", "Literatura", "Literatura"],
  ],
  "Noite": [
    ["19:00 - 20:00", "Redação", "Literatura", "Português", "Filosofia", "Sociologia", "Geografia", "História"],
    ["20:00 - 21:00", "Redação", "Literatura", "Português", "Filosofia", "Sociologia", "Geografia", "História"],
    ["21:00 - 21:30", "Descanso", "Descanso", "Descanso", "Descanso", "Descanso", "Descanso", "Descanso"],
    ["21:30 - 22:30", "Matemática", "Química", "Física", "Biologia", "Matemática", "Química", "Física"],
    ["22:30 - 23:30", "Revisão", "Revisão", "Revisão", "Revisão", "Revisão", "Revisão", "Revisão"],
  ],
  "Madrugada": [
    ["23:30 - 00:30", "Português", "Matemática", "História", "Geografia", "Física", "Química", "Biologia"],
    ["00:30 - 01:30", "Literatura", "Filosofia", "Sociologia", "Português", "Matemática", "História", "Geografia"],
    ["01:30 - 02:30", "Inglês", "Redação", "Química", "Física", "Biologia", "Filosofia", "Sociologia"],
    ["02:30 - 03:30", "Redação", "Matemática", "Biologia", "Química", "História", "Geografia", "Português"],
    ["03:30 - 04:00", "Revisão / Organização", "Revisão / Organização", "Revisão / Organização", "Revisão / Organização", "Revisão / Organização", "Revisão / Organização", "Revisão / Organização"],
  ],
};

const ScheduleTable = ({ title, dias, horario }) => (
  <section className="mb-12">
    <h2 className="text-3xl font-extrabold mb-4 text-gray-100 drop-shadow-md border-b border-gray-600 pb-2">
      {title}
    </h2>
    <div
      className="overflow-x-auto rounded-lg border border-gray-700"
      style={{
        background: 'rgba(30,30,30,0.6)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        boxShadow: '0 4px 15px rgba(0,0,0,0.5)',
      }}
    >
      <table className="w-full min-w-[900px] text-gray-200 text-sm border-collapse">
        <thead
          className="sticky top-0"
          style={{ backgroundColor: 'rgba(45, 45, 45, 0.9)', borderBottom: '1px solid #444' }}
        >
          <tr>
            {dias.map((dia, idx) => (
              <th
                key={idx}
                className={`py-3 px-4 border-r border-gray-700 font-semibold select-none whitespace-nowrap ${idx === 0 ? 'sticky left-0 bg-gray-800 z-20' : ''
                  }`}
                style={{ minWidth: idx === 0 ? 140 : 110 }}
              >
                {dia}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {horario.map((linha, i) => (
            <tr
              key={i}
              className={`${i % 2 === 0 ? 'bg-gray-800' : 'bg-gray-900'
                } hover:bg-gray-700 transition-colors duration-300 cursor-default`}
            >
              {linha.map((celula, j) => (
                <td
                  key={j}
                  className={`py-2 px-3 border border-gray-700 whitespace-nowrap ${j === 0 ? 'font-mono font-semibold bg-gray-800 sticky left-0 z-10' : ''
                    }`}
                  style={{ minWidth: j === 0 ? 140 : 110 }}
                >
                  {celula}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </section>
);

const Schedule = () => {
  return (
    <div className="p-6 min-h-screen text-gray-100 font-sans">
      {/* Breadcrumb */}

      <nav className="text-sm text-gray-400 mb-8" aria-label="Breadcrumb">
        <ol className="flex space-x-2">
          <li>
            <Link to="/" className="hover:text-gray-300 transition-colors duration-200">Início</Link>
          </li>
          <li><span className="text-gray-600">/</span></li>
          <li>
            <Link to="/estudos" className="hover:text-gray-300 transition-colors duration-200">Estudos</Link>
          </li>
          <li><span className="text-gray-600">/</span></li>
          <li className="text-gray-500">Estudos em Casa</li>
        </ol>
      </nav>


      {/* Renderiza as tabelas dinamicamente */}
      {Object.entries(horarios).map(([title, horario]) => (
        <ScheduleTable key={title} title={title} dias={diasSemana} horario={horario} />
      ))}
    </div>
  );
};

export default Schedule;
