import React, { useState, useEffect } from 'react'
import { collection, addDoc, deleteDoc, doc, onSnapshot, query, orderBy } from 'firebase/firestore'
import { db } from '../firebase'

const JaoX = () => {
  const [posts, setPosts] = useState([])
  const [novoPost, setNovoPost] = useState('')
  const [postParaExcluir, setPostParaExcluir] = useState(null)

  useEffect(() => {
    const q = query(collection(db, 'posts'), orderBy('timestamp', 'desc'))
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setPosts(snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })))
    })
    return () => unsubscribe()
  }, [])

  const adicionarPost = async () => {
    if (!novoPost.trim()) return
    await addDoc(collection(db, 'posts'), {
      texto: novoPost,
      timestamp: new Date()
    })
    setNovoPost('')
  }

  const deletarPost = async () => {
    if (postParaExcluir) {
      await deleteDoc(doc(db, 'posts', postParaExcluir))
      setPostParaExcluir(null)
    }
  }

  const tempoDesde = (data) => {
    const segundos = Math.floor((new Date() - new Date(data.seconds * 1000)) / 1000)
    if (segundos < 60) return 'agora'
    const minutos = Math.floor(segundos / 60)
    if (minutos < 60) return `${minutos} min`
    const horas = Math.floor(minutos / 60)
    return `${horas}h`
  }

  return (
    <div className=" min-h-screen text-white mx-auto relative">
      {/* CAMPO DE NOVO POST */}
      <div className="p-4 flex gap-3 border-b border-gray-800">
        <div className="flex-1">
          <textarea
            className="w-full text-white placeholder-gray-500 resize-none outline-none text-lg"
            placeholder="O que está acontecendo?"
            rows={2}
            value={novoPost}
            onChange={e => setNovoPost(e.target.value)}
          />
          <div className="flex justify-end mt-2">
            <button
              onClick={adicionarPost}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1.5 rounded-full font-semibold"
            >
              Publicar
            </button>
          </div>
        </div>
      </div>

      {/* LISTA DE POSTS */}
      {posts.map((post) => (
        <div key={post.id} className="p-4 border-b border-gray-800 text-sm relative group">
          <div className="text-gray-400">{tempoDesde(post.timestamp)}</div>
          <p className="text-white mt-1">{post.texto}</p>
          <button
            onClick={() => setPostParaExcluir(post.id)}
            className="absolute top-2 right-2 text-red-500 opacity-0 group-hover:opacity-100 transition"
            title="Excluir"
          >
            🗑
          </button>
        </div>
      ))}

      {/* MODAL DE CONFIRMAÇÃO */}
      {postParaExcluir && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-gray-900 p-6 rounded-xl text-center shadow-xl w-[90%] max-w-sm">
            <h2 className="text-lg font-bold mb-4 text-white">Confirmar exclusão</h2>
            <p className="text-gray-300 mb-6">Você tem certeza que deseja apagar este post?</p>
            <div className="flex justify-around gap-4">
              <button
                onClick={() => setPostParaExcluir(null)}
                className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-full"
              >
                Cancelar
              </button>
              <button
                onClick={deletarPost}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-full"
              >
                Apagar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default JaoX
