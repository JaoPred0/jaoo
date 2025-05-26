import React from 'react';
import { Link } from 'react-router-dom';
import { FaRegEdit, FaRobot } from 'react-icons/fa';

export const Horarios = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">Gerenciar Horários</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Link para criação manual */}
        <Link
          to="/horarios/manual"
          className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition block"
        >
          <FaRegEdit className="text-blue-500 mb-4" size={40} />
          <h3 className="text-xl font-semibold mb-2">Criar Horário Manualmente</h3>
          <p className="text-gray-600">
            Monte seu horário escolhendo os dias e as disciplinas manualmente.
          </p>
        </Link>

        {/* Link para criação automática */}
        <Link
          to="/horarios/automatico"
          className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition block"
        >
          <FaRobot className="text-green-500 mb-4" size={40} />
          <h3 className="text-xl font-semibold mb-2">Criar Horário Automaticamente</h3>
          <p className="text-gray-600">
            Gere um horário automaticamente com base nas preferências definidas.
          </p>
        </Link>
      </div>
    </div>
  );
};
