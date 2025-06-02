// components/DiarioCharts.jsx
import React from 'react';
import {
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer,
  LineChart, Line, XAxis, YAxis, CartesianGrid
} from 'recharts';

const cores = ['#4caf50', '#f44336'];

export default function DiarioCharts({ dadosPizza, dadosLinha }) {
  return (
    <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
      <div className="w-full max-w-xs md:max-w-sm">
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={dadosPizza}
              dataKey="valor"
              nameKey="nome"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              label
            >
              {dadosPizza.map((entry, idx) => (
                <Cell key={`cell-${idx}`} fill={cores[idx % cores.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend verticalAlign="bottom" height={36} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="w-full max-w-full md:max-w-2xl">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={dadosLinha} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="data" tickFormatter={date => new Date(date).toLocaleDateString()} />
            <YAxis allowDecimals={false} domain={[0, 6]} />
            <Tooltip labelFormatter={date => `Data: ${new Date(date).toLocaleDateString()}`} />
            <Legend />
            <Line
              type="monotone"
              dataKey="feitas"
              stroke="#4caf50"
              strokeWidth={3}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
