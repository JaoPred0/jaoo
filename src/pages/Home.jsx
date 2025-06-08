import React from 'react'
import { motion } from 'framer-motion'
import { FiUsers, FiBookOpen, FiCheckCircle, FiTrendingUp } from 'react-icons/fi'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts'


const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2 },
  }),
}

const Home = () => {
  return (
    <div className="p-6 0 min-h-screen text-gray-100 max-w-7xl mx-auto">
      <h1 className="text-4xl font-extrabold mb-8">Dashboard</h1>

      {/* Cards resumo */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-10">
        {[{
          icone: <FiUsers size={36} />,
          titulo: 'Usuários',
          valor: 1234,
          cor: 'bg-blue-600',
        },{
          icone: <FiBookOpen size={36} />,
          titulo: 'Livros',
          valor: 87,
          cor: 'bg-green-600',
        },{
          icone: <FiCheckCircle size={36} />,
          titulo: 'Tarefas Concluídas',
          valor: 423,
          cor: 'bg-purple-600',
        },{
          icone: <FiTrendingUp size={36} />,
          titulo: 'Performance',
          valor: '92%',
          cor: 'bg-yellow-500',
        }].map(({ icone, titulo, valor, cor }, i) => (
          <motion.div
            key={i}
            custom={i}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            className={`${cor} rounded-xl p-5 shadow-lg flex items-center gap-4 cursor-default hover:shadow-2xl transition`}
          >
            <div className="text-white">{icone}</div>
            <div>
              <p className="text-gray-300 font-semibold">{titulo}</p>
              <p className="text-2xl font-bold">{valor}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default Home
