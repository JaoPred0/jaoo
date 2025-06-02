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
      className="p-8 max-w-xl mx-auto font-sans text-gray-800 dark:text-gray-100 bg-white dark:bg-gray-900 min-h-screen"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h2 className="text-2xl font-bold mb-4" variants={itemVariants}>
        Agenda
      </motion.h2>

      <motion.form
        onSubmit={adicionarLembrete}
        className="mb-6 space-y-4 p-4 rounded-lg shadow bg-gray-100 dark:bg-gray-800"
        variants={itemVariants}
      >
        <motion.div>
          <label className="block text-sm font-semibold mb-1">Data:</label>
          <motion.input
            type="date"
            value={novaData}
            onChange={(e) => setNovaData(e.target.value)}
            onFocus={() => setInputFocus((f) => ({ ...f, data: true }))}
            onBlur={() => setInputFocus((f) => ({ ...f, data: false }))}
            className="w-full border px-3 py-2 rounded bg-white dark:bg-gray-700 dark:border-gray-600"
            variants={inputVariants}
            animate={inputFocus.data ? 'focus' : 'rest'}
            transition={{ type: 'spring', stiffness: 300 }}
          />
        </motion.div>
        <motion.div>
          <label className="block text-sm font-semibold mb-1">Lembrete:</label>
          <motion.input
            type="text"
            value={novoTexto}
            onChange={(e) => setNovoTexto(e.target.value)}
            placeholder="Digite o lembrete"
            className="w-full border px-3 py-2 rounded bg-white dark:bg-gray-700 dark:border-gray-600"
            onFocus={() => setInputFocus((f) => ({ ...f, texto: true }))}
            onBlur={() => setInputFocus((f) => ({ ...f, texto: false }))}
            variants={inputVariants}
            animate={inputFocus.texto ? 'focus' : 'rest'}
            transition={{ type: 'spring', stiffness: 300 }}
          />
        </motion.div>
        <motion.button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
          disabled={!novaData || !novoTexto}
          style={{
            opacity: !novaData || !novoTexto ? 0.6 : 1,
            cursor: !novaData || !novoTexto ? 'not-allowed' : 'pointer',
          }}
        >
          Adicionar
        </motion.button>
      </motion.form>

      <motion.ul className="space-y-4" variants={containerVariants}>
        <AnimatePresence>
          {lembretes.map((item) => (
            <motion.li
              key={item.id}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="p-4 rounded-lg shadow-md flex justify-between items-center bg-white dark:bg-gray-800"
            >
              <div>
                <strong className="text-blue-600 dark:text-blue-400">{item.data}</strong> — {item.texto}
              </div>
              <motion.button
                onClick={() => apagarLembrete(item.id)}
                className="ml-4 text-red-600 dark:text-red-400 hover:underline"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                Apagar
              </motion.button>
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
    </motion.div>
  )
}

export default Agenda