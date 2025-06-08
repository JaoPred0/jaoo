import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Checkbox, Tag } from 'antd'
import { motion } from 'framer-motion'
import { db } from '../firebase'
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore'

const cardVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.07 },
  }),
}

const Animes = () => {
  const [animes, setAnimes] = useState([])
  const [search, setSearch] = useState('')
  const [mostrarConcluidos, setMostrarConcluidos] = useState(false)

  const buscarAnimes = async () => {
    const querySnapshot = await getDocs(collection(db, 'animes'))
    const lista = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    setAnimes(lista)
  }

  const toggleConcluido = async (id, atual) => {
    const animeRef = doc(db, 'animes', id)
    await updateDoc(animeRef, { concluido: !atual })
    buscarAnimes()
  }

  useEffect(() => {
    buscarAnimes()
  }, [])

  // Filtra animes por título e, se a checkbox estiver marcada, só os concluídos
  const animesFiltrados = animes.filter(anime => {
    const tituloMatch = anime.titulo.toLowerCase().includes(search.toLowerCase())
    const concluidoMatch = mostrarConcluidos ? anime.concluido : true
    return tituloMatch && concluidoMatch
  })

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold text-blue-200 mb-6 text-center select-none">
        🎥 Minha Lista de Animes
      </h2>

      <div className="text-center mb-6">
        <Link
          to="/animes/adicionar"
          className="text-green-400 font-medium hover:underline text-base select-none"
        >
          + Adicionar novo anime
        </Link>
      </div>

      {/* Campo de pesquisa e filtro */}
      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-6 max-w-md mx-auto">
        <input
          type="text"
          placeholder="Pesquisar por título..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-auto px-3 py-2 rounded border border-blue-400 text-blue-100 placeholder-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <label className="flex items-center gap-2 text-blue-200 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={mostrarConcluidos}
            onChange={() => setMostrarConcluidos(!mostrarConcluidos)}
            className="accent-blue-400"
          />
          Mostrar só concluídos
        </label>
      </div>

      <div className="flex flex-col gap-4 mx-auto">
        {animesFiltrados.length === 0 ? (
          <p className="text-center text-blue-300 select-none">
            Nenhum anime encontrado.
          </p>
        ) : (
          animesFiltrados.map((anime, index) => (
            <motion.div
              key={anime.id}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              className="flex items-center gap-4 rounded-lg p-3 cursor-pointer hover:bg-blue-900/40 transition"
              style={{ boxShadow: '0 0 8px rgba(59, 130, 246, 0.15)' }}
            >
              <img
                src={anime.capa}
                alt={anime.titulo}
                className="w-24 h-32 object-cover rounded-md shadow-sm flex-shrink-0"
              />

              <div className="flex-1 min-w-0">
                <Link to={`/animes/${anime.id}`} className="block truncate">
                  <h3 className="text-lg font-semibold text-blue-100 truncate">
                    {anime.titulo}
                  </h3>
                  <p className="text-xs text-blue-300 truncate mt-0.5">
                    {anime.descricao}
                  </p>
                  <Tag
                    color="blue"
                    className="mt-1 text-xs px-2 py-0.5 rounded"
                    style={{ userSelect: 'none' }}
                  >
                    🎬 {anime.episodios} eps
                  </Tag>
                </Link>

                <Checkbox
                  checked={anime.concluido}
                  onChange={() => toggleConcluido(anime.id, anime.concluido)}
                  className="mt-2 text-blue-300"
                  style={{ userSelect: 'none' }}
                >
                  <span className="text-sm select-none">Concluído</span>
                </Checkbox>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  )
}

export default Animes
