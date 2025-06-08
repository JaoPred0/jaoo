import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { db } from '../firebase'
import { doc, getDoc } from 'firebase/firestore'

const AnimeDetalhes = () => {
  const { id } = useParams()
  const [anime, setAnime] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchAnime = async () => {
      try {
        const docRef = doc(db, 'animes', id)
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
          setAnime(docSnap.data())
        } else {
          setError('Anime não encontrado.')
        }
      } catch (err) {
        setError('Erro ao buscar dados.')
      } finally {
        setLoading(false)
      }
    }

    fetchAnime()
  }, [id])

  if (loading) return <p className="p-6 text-center text-gray-500">Carregando...</p>
  if (error) return <p className="p-6 text-center text-red-600">{error}</p>

  return (
    <div className="max-w-4xl mx-auto rounded-lg p-6 mt-10 ">
      <Link
        to="/animes"
        className="inline-block mb-6 text-blue-600 hover:text-blue-800 transition"
      >
        ← Voltar para a lista
      </Link>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Imagem */}
        <img
          src={anime.capa}
          alt={anime.titulo}
          className="w-full md:w-1/3 rounded-md object-cover shadow-md"
        />

        {/* Dados */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-4 border-b pb-2 border-gray-200">{anime.titulo}</h1>
            <p className="mb-6 leading-relaxed">{anime.descricao}</p>
          </div>

          <div className="flex items-center justify-between text-sm font-semibold mb-6">
            <div>
              Episódios: <span className="font-bold ">{anime.episodios}</span>
            </div>
            <div
              className={`px-4 py-1 rounded-full text-sm font-semibold ${
                anime.concluido ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
              }`}
            >
              {anime.concluido ? 'Concluído' : 'Em andamento'}
            </div>
          </div>

          <button
            onClick={() => window.history.back()}
            className="w-full md:w-auto bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition"
          >
            Voltar
          </button>
        </div>
      </div>
    </div>
  )
}

export default AnimeDetalhes
