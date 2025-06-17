import React, { useState } from 'react'
import { collection, addDoc } from 'firebase/firestore'
import { db } from '../firebase'

export default function MiniPostOnly() {
  const [novoPost, setNovoPost] = useState('')
  const [carregando, setCarregando] = useState(false)

  const adicionarPost = async () => {
    const textoLimpo = novoPost.trim()
    if (!textoLimpo) return

    setCarregando(true)
    try {
      await addDoc(collection(db, 'posts'), {
        texto: textoLimpo,
        timestamp: new Date(),
      })
      setNovoPost('')
    } catch (error) {
      console.error('Erro ao postar:', error)
    } finally {
      setCarregando(false)
    }
  }

  return (
    <div className="backdrop-blur-xl bg-slate-900/60 text-white rounded-xl shadow-lg p-6 w-full max-w-2xl mx-auto border border-white/10 space-y-4">
      <h2 className="text-lg font-semibold">Novo Post</h2>
      
      <textarea
        className="w-full bg-transparent border border-white/20 rounded-lg p-4 resize-none outline-none placeholder-gray-400 text-sm focus:ring-2 focus:ring-green-500 transition"
        rows={4}
        placeholder="Compartilhe algo inspirador..."
        value={novoPost}
        onChange={(e) => setNovoPost(e.target.value)}
      />

      <div className="flex justify-end">
        <button
          onClick={adicionarPost}
          disabled={carregando || !novoPost.trim()}
          className="bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-2 rounded-full font-medium transition"
        >
          {carregando ? 'Publicando...' : 'Publicar'}
        </button>
      </div>
    </div>
  )
}
