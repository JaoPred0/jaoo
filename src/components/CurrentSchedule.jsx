


  return (
        <div className="p-6 bg-gray-900 text-gray-100 min-h-screen flex flex-col justify-center items-center">
      <h1 className="text-3xl mb-4">Horário Atual</h1>
      <div className="bg-gray-800 p-6 rounded shadow-lg text-center max-w-md">
        <p className="text-xl mb-2">Período: <strong>{atual.periodo}</strong></p>
        <p className="text-xl mb-2">Horário: <strong>{atual.horario}</strong></p>
        <p className="text-2xl font-bold">{atual.materia}</p>
      </div>
    </div>
  );
};

export default CurrentSchedule;
