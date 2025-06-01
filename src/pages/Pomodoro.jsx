import React, { useState, useEffect, useRef } from 'react';

const Pomodoro = () => {
  const [inputMinutes, setInputMinutes] = useState(25);
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const timerRef = useRef(null);
  const alarmRef = useRef(null);
  const [mode, setMode] = useState('pomodoro');
  const [showLineAnimation, setShowLineAnimation] = useState(false);

  const modos = [
    { key: 'pomodoro', label: 'Pomodoro' },
    { key: 'timer', label: 'Timer' },
    { key: 'alarm', label: 'Alarme' },
    { key: 'descanso', label: 'Descanso' },
    { key: 'foco', label: 'Foco' },
  ];

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const handleInputChange = (e) => {
    const val = Math.max(1, Math.min(999, Number(e.target.value)));
    setInputMinutes(val);
    if (!isActive) {
      setTimeLeft(val * 60);
    }
  };

  const startTimer = () => {
    if (!isActive) {
      setShowLineAnimation(false); // reset animation se começar de novo
      setIsActive(true);
    }
  };

  const pauseTimer = () => {
    if (isActive) setIsActive(false);
  };

  const resetTimer = () => {
    setIsActive(false);
    setShowLineAnimation(false);
    setTimeLeft(inputMinutes * 60);
  };

  const selectMode = (newMode) => {
    setMode(newMode);
    setIsActive(false);
    setMenuOpen(false);
    setShowLineAnimation(false);

    switch (newMode) {
      case 'pomodoro':
        setInputMinutes(25);
        setTimeLeft(25 * 60);
        break;
      case 'timer':
        setInputMinutes(10);
        setTimeLeft(10 * 60);
        break;
      case 'alarm':
        setInputMinutes(1);
        setTimeLeft(60);
        break;
      case 'descanso':
        setInputMinutes(5);
        setTimeLeft(5 * 60);
        break;
      case 'foco':
        setInputMinutes(50);
        setTimeLeft(50 * 60);
        break;
      default:
        setInputMinutes(25);
        setTimeLeft(25 * 60);
    }
  };

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((t) => t - 1);
      }, 1000);
    } else if (timeLeft === 0 && isActive) {
      setIsActive(false);
      clearInterval(timerRef.current);
      if (alarmRef.current) alarmRef.current.play();
      alert('Tempo finalizado! Hora de descansar :)');
      setShowLineAnimation(true); // inicia animação da linha quando acabar
    }
    return () => clearInterval(timerRef.current);
  }, [isActive, timeLeft]);

  // Configurações do círculo SVG
  const radius = 90;
  const circumference = 2 * Math.PI * radius;
  const progress = (timeLeft / (inputMinutes * 60)) * circumference;

  return (
    <div className="flex min-h-screen text-gray-300 font-sans">
      {/* Menu Lateral (seu código aqui permanece igual) */}
      <nav
        className={`fixed top-0 left-0 h-full bg-[#1f1f1f] shadow-lg transform transition-transform duration-300 ease-in-out
      ${menuOpen ? 'translate-x-0' : '-translate-x-full'} w-56 md:w-64 z-50 flex flex-col`}
      >
        <div className="p-4 md:p-6 border-b border-gray-700 text-center font-extrabold text-2xl md:text-3xl select-none text-cyan-400 tracking-wide">
          Menu
        </div>
        <ul className="flex flex-col mt-4 md:mt-6">
          {modos.map(({ key, label }) => (
            <li key={key}>
              <button
                onClick={() => selectMode(key)}
                className={`flex items-center gap-2 md:gap-3 w-full px-4 md:px-6 py-3 md:py-4 text-left rounded-lg transition-colors duration-250 hover:bg-cyan-700 ${
                  mode === key
                    ? 'bg-cyan-600 text-white font-semibold shadow-lg'
                    : 'text-gray-400'
                } text-sm md:text-base`}
                aria-current={mode === key ? 'page' : undefined}
              >
                {key === 'pomodoro' && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4 md:w-5 md:h-5 text-cyan-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <circle cx="12" cy="12" r="10" strokeWidth="2" />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 6v6l4 2"
                    />
                  </svg>
                )}
                {label}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Conteúdo Principal */}
      <main className="flex flex-col flex-1 justify-center items-center p-6 md:p-10 relative">
        {/* Botão para abrir/fechar menu */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="absolute top-4 left-4 md:top-8 md:left-8 p-2 md:p-3 rounded-md shadow-lg hover:bg-cyan-700 transition-colors z-50 focus:outline-none focus:ring-2 focus:ring-cyan-400"
          aria-label="Toggle Menu"
        >
          <svg
            className="w-5 h-5 md:w-6 md:h-6 text-cyan-400"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            viewBox="0 0 24 24"
          >
            {menuOpen ? (
              <path d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path d="M3 12h18M3 6h18M3 18h18" />
            )}
          </svg>
        </button>

        <h1 className="text-3xl md:text-5xl font-extrabold mb-6 md:mb-10 select-none text-cyan-400 tracking-wide">
          {modos.find((m) => m.key === mode)?.label || 'Timer'}
        </h1>

        {/* Círculo SVG progressivo */}
        <svg
          className="mb-6 md:mb-10"
          width="220"
          height="220"
          viewBox="0 0 220 220"
        >
          <circle
            cx="110"
            cy="110"
            r={radius}
            stroke="#333"
            strokeWidth="15"
            fill="none"
          />
          <circle
            cx="110"
            cy="110"
            r={radius}
            stroke="#06b6d4" // cyan-400
            strokeWidth="15"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={circumference - progress}
            strokeLinecap="round"
            style={{ transition: 'stroke-dashoffset 1s linear' }}
          />
          {/* Texto dentro do círculo */}
          <text
            x="110"
            y="120"
            textAnchor="middle"
            fontSize="48"
            fontFamily="monospace"
            fill={isActive ? '#06b6d4' : '#ccc'}
            className={isActive ? '' : ''}
          >
            {formatTime(timeLeft)}
          </text>
        </svg>

        {/* Linha animada que aparece só quando o tempo acaba */}
        {showLineAnimation && (
          <div className="w-48 h-1 bg-cyan-400 overflow-hidden rounded-full">
            <div className="h-full bg-cyan-600 animate-line-expand"></div>
          </div>
        )}

        <div className="mb-6 md:mb-10 text-center w-full max-w-xs">
          <label
            htmlFor="minutesInput"
            className="block mb-1 md:mb-2 font-semibold text-base md:text-lg text-gray-300"
          >
            Tempo (min)
          </label>
          <input
            id="minutesInput"
            type="number"
            min="1"
            max="999"
            value={inputMinutes}
            onChange={handleInputChange}
            disabled={isActive}
            className="w-full p-2 md:p-3 rounded-md border border-gray-600 bg-[#1f1f1f] text-center text-lg md:text-xl text-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-400"
          />
        </div>

        <div className="flex flex-col md:flex-row gap-4 md:gap-8 w-full max-w-xs">
          {!isActive ? (
            <button
              onClick={startTimer}
              className="w-full md:w-auto bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 md:py-3 px-6 md:px-12 rounded-lg shadow-lg transition transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            >
              Iniciar
            </button>
          ) : (
            <button
              onClick={pauseTimer}
              className="w-full md:w-auto bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-2 md:py-3 px-6 md:px-12 rounded-lg shadow-lg transition transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            >
              Pausar
            </button>
          )}

          <button
            onClick={resetTimer}
            className="w-full md:w-auto bg-red-600 hover:bg-red-700 text-white font-bold py-2 md:py-3 px-6 md:px-12 rounded-lg shadow-lg transition transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-400"
          >
            Resetar
          </button>
        </div>

        <audio
          ref={alarmRef}
          src="https://actions.google.com/sounds/v1/alarms/alarm_clock.ogg"
          preload="auto"
        />
      </main>

      {/* CSS para animação da linha */}
      <style>{`
        @keyframes line-expand {
          0% {
            width: 0%;
          }
          100% {
            width: 100%;
          }
        }
        .animate-line-expand {
          animation: line-expand 2s ease forwards;
        }
      `}</style>
    </div>
  );
};

export default Pomodoro;
