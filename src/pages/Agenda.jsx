import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { db } from '../firebase' // importe seu arquivo firebase.js
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  orderBy
} from 'firebase/firestore'
import { CalendarDays, StickyNote, Plus, Trash2 } from "lucide-react";
const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.15,
      duration: 0.5,
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 30, transition: { duration: 0.3 } }
}

const buttonVariants = {
  hover: {
    scale: 1.05,
    backgroundColor: "#2563eb",
    transition: { duration: 0.3, yoyo: Infinity }
  },
  tap: { scale: 0.95 }
}

const inputVariants = {
  focus: { scale: 1.02, boxShadow: "0 0 8px rgb(59 130 246 / 0.6)" },
  rest: { scale: 1, boxShadow: "none" }
}

const Agenda = () => {
  const [lembretes, setLembretes] = useState([])
  const [novaData, setNovaData] = useState('')
  const [novoTexto, setNovoTexto] = useState('')
  const [inputFocus, setInputFocus] = useState({ data: false, texto: false })

  // Referência para a coleção "agenda"
  const agendaRef = collection(db, 'agenda')

  // Carregar lembretes do Firestore com listener em tempo real
  useEffect(() => {
    const q = query(agendaRef, orderBy('data', 'asc'))

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const lista = []
      querySnapshot.forEach((doc) => {
        lista.push({ id: doc.id, ...doc.data() })
      })
      setLembretes(lista)
    })

    return () => unsubscribe() // limpa o listener ao desmontar componente
  }, [agendaRef])

  // Adicionar novo lembrete no Firestore
  const adicionarLembrete = async (e) => {
    e.preventDefault()
    if (!novaData || !novoTexto) return

    try {
      await addDoc(agendaRef, {
        data: novaData,
        texto: novoTexto,
        createdAt: new Date()
      })

      setNovaData('')
      setNovoTexto('')
    } catch (error) {
      console.error('Erro ao adicionar lembrete: ', error)
    }
  }

  // Apagar lembrete no Firestore
  const apagarLembrete = async (id) => {
    try {
      await deleteDoc(doc(db, 'agenda', id))
    } catch (error) {
      console.error('Erro ao apagar lembrete: ', error)
    }
  }

  return (
  <motion.div
    className="min-h-screen px-6 py-10 to-black text-white font-sans"
    variants={containerVariants}
    initial="hidden"
    animate="visible"
  >
    <motion.div
      className="max-w-2xl mx-auto backdrop-blur-md  border border-white/20 rounded-2xl shadow-2xl p-8 transition-all"
      variants={itemVariants}
    >
      <motion.h2
        className="text-3xl font-bold text-center mb-8 text-white drop-shadow-md flex items-center justify-center gap-2"
        variants={itemVariants}
      >
        <CalendarDays className="w-8 h-8 text-indigo-400" /> Agenda Interativa
      </motion.h2>

      <motion.form
        onSubmit={adicionarLembrete}
        className="space-y-6 mb-10"
        variants={itemVariants}
      >
        <motion.div className="flex flex-col gap-1" variants={inputVariants}>
          <label className="text-sm font-medium text-white/90 flex items-center gap-2">
            <CalendarDays className="w-4 h-4 text-indigo-300" /> Data:
          </label>
          <motion.input
            type="date"
            value={novaData}
            onChange={(e) => setNovaData(e.target.value)}
            onFocus={() => setInputFocus(f => ({ ...f, data: true }))}
            onBlur={() => setInputFocus(f => ({ ...f, data: false }))}
            className="w-full px-4 py-2 rounded-lg bg-white/20 border border-white/30 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
            animate={inputFocus.data ? 'focus' : 'rest'}
            transition={{ type: 'spring', stiffness: 300 }}
          />
        </motion.div>

        <motion.div className="flex flex-col gap-1" variants={inputVariants}>
          <label className="text-sm font-medium text-white/90 flex items-center gap-2">
            <StickyNote className="w-4 h-4 text-indigo-300" /> Lembrete:
          </label>
          <motion.input
            type="text"
            value={novoTexto}
            onChange={(e) => setNovoTexto(e.target.value)}
            placeholder="Ex: Estudar React às 20h"
            onFocus={() => setInputFocus(f => ({ ...f, texto: true }))}
            onBlur={() => setInputFocus(f => ({ ...f, texto: false }))}
            className="w-full px-4 py-2 rounded-lg bg-white/20 border border-white/30 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
            animate={inputFocus.texto ? 'focus' : 'rest'}
            transition={{ type: 'spring', stiffness: 300 }}
          />
        </motion.div>

        <motion.button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-500 transition text-white font-semibold py-2 rounded-lg shadow-lg disabled:opacity-50 flex items-center justify-center gap-2"
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
          disabled={!novaData || !novoTexto}
        >
          <Plus className="w-4 h-4" /> Adicionar Lembrete
        </motion.button>
      </motion.form>

      <motion.ul
        className="space-y-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <AnimatePresence>
          {lembretes.map((item) => (
            <motion.li
              key={item.id}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="bg-white/10 border border-white/20 backdrop-blur-md p-4 rounded-xl flex items-center justify-between shadow hover:scale-105 transition-all"
            >
              <div className="text-sm md:text-base">
                <span className="font-semibold text-indigo-300">{item.data}</span> —{" "}
                <span className="text-white/90">{item.texto}</span>
              </div>
              <motion.button
                onClick={() => apagarLembrete(item.id)}
                className="ml-4 text-red-400 hover:text-red-300 transition"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                <Trash2 className="w-5 h-5" />
              </motion.button>
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
    </motion.div>
  </motion.div>
);


}

export default Agenda