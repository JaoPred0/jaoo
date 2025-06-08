import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { db } from '../firebase'
import { collection, addDoc } from 'firebase/firestore'
import { Input, Button, Form } from 'antd'

const AdicionarAnime = () => {
    const [titulo, setTitulo] = useState('')
    const [capa, setCapa] = useState('')
    const [descricao, setDescricao] = useState('')
    const [episodios, setEpisodios] = useState('')
    const navigate = useNavigate()

    const handleSubmit = async () => {
        await addDoc(collection(db, 'animes'), {
            titulo,
            capa,
            descricao,
            episodios: Number(episodios),
            concluido: false
        })
        navigate('/animes')
    }

    return (
        <div className="flex items-center justify-center px-4">
            <div className="rounded-xl p-8 max-w-md w-full">
                <h2 className="text-2xl font-bold text-center text-white mb-6">
                    📺 Adicionar Novo Anime
                </h2>
                <Form
                    layout="vertical"
                    onFinish={handleSubmit}
                    style={{
                        backdropFilter: 'blur(10px)',
                        backgroundColor: 'rgba(0, 0, 0, 0.4)', // blur escuro com transparência
                        padding: '1.5rem',
                        borderRadius: '1rem',
                        border: '1px solid rgba(255,255,255,0.2)',
                        maxWidth: '480px',
                        margin: '0 auto',
                        color: 'white',
                    }}
                >
                    <Form.Item
                        label={<span style={{ color: 'white', fontWeight: '600' }}>Título</span>}
                        name="titulo"
                        rules={[{ required: true }]}
                    >
                        <Input
                            value={titulo}
                            onChange={e => setTitulo(e.target.value)}
                            style={{
                                backgroundColor: 'transparent',
                                color: 'white',
                                border: '1px solid #4b5563',
                                borderRadius: '0.375rem',
                                padding: '0.5rem 1rem',
                            }}
                            placeholder="Digite o título"
                            bordered={false}
                        />
                    </Form.Item>

                    <Form.Item
                        label={<span style={{ color: 'white', fontWeight: '600' }}>URL da Capa</span>}
                        name="capa"
                        rules={[{ required: true }]}
                    >
                        <Input
                            value={capa}
                            onChange={e => setCapa(e.target.value)}
                            style={{
                                backgroundColor: 'transparent',
                                color: 'white',
                                border: '1px solid #4b5563',
                                borderRadius: '0.375rem',
                                padding: '0.5rem 1rem',
                            }}
                            placeholder="Digite a URL da capa"
                            bordered={false}
                        />
                    </Form.Item>

                    <Form.Item
                        label={<span style={{ color: 'white', fontWeight: '600' }}>Descrição</span>}
                        name="descricao"
                        rules={[{ required: true }]}
                    >
                        <Input.TextArea
                            rows={3}
                            value={descricao}
                            onChange={e => setDescricao(e.target.value)}
                            style={{
                                backgroundColor: 'transparent',
                                color: 'white',
                                border: '1px solid #4b5563',
                                borderRadius: '0.375rem',
                                padding: '0.5rem 1rem',
                                resize: 'none',
                            }}
                            placeholder="Descrição do anime"
                            bordered={false}
                        />
                    </Form.Item>

                    <Form.Item
                        label={<span style={{ color: 'white', fontWeight: '600' }}>Episódios</span>}
                        name="episodios"
                        rules={[{ required: true }]}
                    >
                        <Input
                            type="number"
                            value={episodios}
                            onChange={e => setEpisodios(e.target.value)}
                            style={{
                                backgroundColor: 'transparent',
                                color: 'white',
                                border: '1px solid #4b5563',
                                borderRadius: '0.375rem',
                                padding: '0.5rem 1rem',
                            }}
                            placeholder="Número de episódios"
                            bordered={false}
                        />
                    </Form.Item>

                    <Button
                        htmlType="submit"
                        type="primary"
                        style={{
                            width: '100%',
                            backgroundColor: '#16a34a',
                            fontWeight: '600',
                            borderRadius: '0.5rem',
                            border: 'none',
                            padding: '0.5rem 1rem',
                            marginTop: '1rem',
                        }}
                        onMouseEnter={e => e.currentTarget.style.backgroundColor = '#15803d'}
                        onMouseLeave={e => e.currentTarget.style.backgroundColor = '#16a34a'}
                    >
                        ➕ Adicionar Anime
                    </Button>
                </Form>

            </div>
        </div>
    )
}

export default AdicionarAnime
