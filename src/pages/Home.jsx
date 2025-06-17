import React from 'react'
import MiniPostOnly from '../components/MiniPostOnly'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const Home = () => {
  return (
    <div className="min-h-screen px-4 py-10 text-white">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        {/* Bloco de postar - à esquerda */}
        <div>
          <MiniPostOnly />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
          className="
    w-full
    max-w-2xl
    mx-auto
    p-6
    rounded-xl
    backdrop-blur-md
    bg-blue-900/20
    border border-blue-400/30
    text-blue-100
    shadow-lg
    hover:bg-blue-900/30
    transition-all duration-200
  "
          style={{
            boxShadow: '0 0 15px rgba(59, 130, 246, 0.2)',
          }}
        >
          <Link to="/ifms" className="block h-full">
            <h2 className="text-xl font-bold mb-2">Acesso Rápido ao IFMS</h2>
            <p className="text-sm text-blue-100/90">
              Confira horários de aulas, eventos e materiais de estudo do IFMS.
            </p>
          </Link>
        </motion.div>

      </div>
    </div>
  )
}

export default Home
