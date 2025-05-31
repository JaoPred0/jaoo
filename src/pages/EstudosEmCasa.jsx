import React from 'react';

const Schedule = () => {
  const diasSemanaManha = ['Tempo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'];
  const diasSemanaTarde = ['Tempo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'];
  const diasSemanaNoite = ['Tempo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'];
  const diasSemanaMadrugada = ['Tempo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'];

  const horarioManha = [
    ['05:00 - 06:00', 'Matemática', 'Física', 'História', 'Biologia', 'Matemática', 'Simulado ENEM', 'Língua Estrangeira'],
    ['06:00 - 07:00', 'Matemática', 'Física', 'História', 'Biologia', 'Matemática', 'Simulado ENEM', 'Língua Estrangeira'],
    ['07:00 - 07:30', 'Descanso', 'Descanso', 'Descanso', 'Descanso', 'Descanso', 'Descanso', 'Descanso'],
    ['07:30 - 08:30', 'Português', 'Química', 'Geografia', 'Redação', 'Filosofia', 'Redação', 'Literatura'],
    ['08:30 - 09:30', 'Português', 'Química', 'Geografia', 'Redação', 'Filosofia', 'Redação', 'Literatura'],
    ['09:30 - 10:00', 'Sociologia', 'Sociologia', 'Sociologia', 'Sociologia', 'Sociologia', 'Sociologia', 'Sociologia'],
    ['10:00 - 11:00', 'Revisão', 'Revisão', 'Revisão', 'Revisão', 'Revisão', 'Revisão', 'Revisão'],
  ];

  const horarioTarde = [
    ['13:00 - 14:00', 'Química', 'Física', 'Matemática', 'Geografia', 'História', 'Redação', 'Sociologia'],
    ['14:00 - 15:00', 'Química', 'Física', 'Matemática', 'Geografia', 'História', 'Redação', 'Sociologia'],
    ['15:00 - 15:30', 'Descanso', 'Descanso', 'Descanso', 'Descanso', 'Descanso', 'Descanso', 'Descanso'],
    ['15:30 - 16:30', 'Simulado ENEM', 'Simulado ENEM', 'Simulado ENEM', 'Simulado ENEM', 'Simulado ENEM', 'Simulado ENEM', 'Simulado ENEM'],
    ['16:30 - 17:30', 'Revisão', 'Revisão', 'Revisão', 'Revisão', 'Revisão', 'Revisão', 'Revisão'],
    ['17:30 - 18:00', 'Literatura', 'Literatura', 'Literatura', 'Literatura', 'Literatura', 'Literatura', 'Literatura'],
  ];

  const horarioNoite = [
    ['19:00 - 20:00', 'Redação', 'Literatura', 'Português', 'Filosofia', 'Sociologia', 'Geografia', 'História'],
    ['20:00 - 21:00', 'Redação', 'Literatura', 'Português', 'Filosofia', 'Sociologia', 'Geografia', 'História'],
    ['21:00 - 21:30', 'Descanso', 'Descanso', 'Descanso', 'Descanso', 'Descanso', 'Descanso', 'Descanso'],
    ['21:30 - 22:30', 'Matemática', 'Química', 'Física', 'Biologia', 'Matemática', 'Química', 'Física'],
    ['22:30 - 23:30', 'Revisão', 'Revisão', 'Revisão', 'Revisão', 'Revisão', 'Revisão', 'Revisão'],
  ];

  const horarioMadrugada = [
    ['23:30 - 00:30', 'Português', 'Matemática', 'História', 'Geografia', 'Física', 'Química', 'Biologia'],
    ['00:30 - 01:30', 'Literatura', 'Filosofia', 'Sociologia', 'Português', 'Matemática', 'História', 'Geografia'],
    ['01:30 - 02:30', 'Inglês', 'Redação', 'Química', 'Física', 'Biologia', 'Filosofia', 'Sociologia'],
    ['02:30 - 03:30', 'Redação', 'Matemática', 'Biologia', 'Química', 'História', 'Geografia', 'Português'],
    ['03:30 - 04:00', 'Revisão / Organização', 'Revisão / Organização', 'Revisão / Organização', 'Revisão / Organização', 'Revisão / Organização', 'Revisão / Organização', 'Revisão / Organização'],
  ];



  return (
    <div className="p-6 bg-gray-900 text-gray-100 min-h-screen">
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
          <li className="text-gray-300">Estudos em Casa</li>
        </ol>
      </nav>

      {/* Horário da Manhã */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">Horário da Manhã</h2>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] border border-gray-700 text-sm">
            <thead>
              <tr className="bg-gray-800">
                {diasSemanaManha.map((dia, idx) => (
                  <th key={idx} className="py-2 px-4 border border-gray-700 font-semibold">{dia}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {horarioManha.map((linha, i) => (
                <tr key={i} className="hover:bg-gray-800">
                  {linha.map((celula, j) => (
                    <td key={j} className="py-2 px-4 border border-gray-700">{celula}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Horário da Tarde */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">Horário da Tarde</h2>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px] border border-gray-700 text-sm">
            <thead>
              <tr className="bg-gray-800">
                {diasSemanaTarde.map((dia, idx) => (
                  <th key={idx} className="py-2 px-4 border border-gray-700 font-semibold">{dia}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {horarioTarde.map((linha, i) => (
                <tr key={i} className="hover:bg-gray-800">
                  {linha.map((celula, j) => (
                    <td key={j} className="py-2 px-4 border border-gray-700">{celula || '-'}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Horário da Noite */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">Horário da Noite</h2>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] border border-gray-700 text-sm">
            <thead>
              <tr className="bg-gray-800">
                {diasSemanaNoite.map((dia, idx) => (
                  <th key={idx} className="py-2 px-4 border border-gray-700 font-semibold">{dia}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {horarioNoite.map((linha, i) => (
                <tr key={i} className="hover:bg-gray-800">
                  {linha.map((celula, j) => (
                    <td key={j} className="py-2 px-4 border border-gray-700">{celula}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      {/* Horário da Madrugada */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Horário da Madrugada</h2>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] border border-gray-700 text-sm">
            <thead>
              <tr className="bg-gray-800">
                {diasSemanaMadrugada.map((dia, idx) => (
                  <th key={idx} className="py-2 px-4 border border-gray-700 font-semibold">{dia}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {horarioMadrugada.map((linha, i) => (
                <tr key={i} className="hover:bg-gray-800">
                  {linha.map((celula, j) => (
                    <td key={j} className="py-2 px-4 border border-gray-700">{celula}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default Schedule;
