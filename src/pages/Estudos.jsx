import React from 'react';
import { Link } from 'react-router-dom';
const cards = [
    {
        title: 'Estudos em Casa',
        desc: 'Organize seus horários e aproveite ao máximo seu tempo de estudo em casa.',
        link: '/estudos-em-casa',
        color: 'bg-blue-700'
    },
    {
        title: 'IFMS',
        desc: 'Confira os horários das aulas, eventos e outras informações importantes do IFMS.',
        link: '/ifms',
        color: 'bg-green-700'
    },
    {
        title: 'Biblioteca de Livros',
        desc: 'Acesse uma coleção de livros de física, química, biologia e muito mais.',
        link: '/biblioteca-livros',
        color: 'bg-purple-700'
    },
];

const Estudos = () => {
    return (
        <>
            <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate__animated animate__fadeIn">
                {cards.map((card, index) => (
                    <Link
                        to={card.link}
                        key={index}
                        className={`rounded-xl shadow-md p-6 ${card.color} hover:scale-105 transition-transform duration-300 animate__animated animate__fadeInUp`}
                        style={{ animationDelay: `${index * 0.2}s`, animationDuration: '0.8s' }}
                    >
                        <h2 className="text-xl font-bold mb-2">{card.title}</h2>
                        <p className="text-sm">{card.desc}</p>
                    </Link>
                ))}
            </div>
        </>
    );
};

export default Estudos;
