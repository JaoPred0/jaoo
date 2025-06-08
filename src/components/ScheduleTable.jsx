const ScheduleTable = ({ title, dias, horario }) => (
  <section className="mb-12">
    <h2 className="text-3xl font-extrabold mb-4 text-gray-100 drop-shadow-md border-b border-gray-600 pb-2">
      {title}
    </h2>
    <div
      className="overflow-x-auto rounded-lg border border-gray-700"
      style={{
        background: 'rgba(30,30,30,0.6)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        boxShadow: '0 4px 15px rgba(0,0,0,0.5)',
      }}
    >
      <table className="w-full min-w-[900px] text-gray-200 text-sm border-collapse">
        <thead
          className="sticky top-0"
          style={{ backgroundColor: 'rgba(45, 45, 45, 0.9)', borderBottom: '1px solid #444' }}
        >
          <tr>
            {dias.map((dia, idx) => (
              <th
                key={idx}
                className={`py-3 px-4 border-r border-gray-700 font-semibold select-none whitespace-nowrap ${idx === 0 ? 'sticky left-0 bg-gray-800 z-20' : ''
                  }`}
                style={{ minWidth: idx === 0 ? 140 : 110 }}
              >
                {dia}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {horario.length === 0 ? (
            <tr><td colSpan={dias.length} className="text-center py-4 text-gray-500">Sem dados disponíveis</td></tr>
          ) : (
            horario.map((linha, i) => (
              <tr
                key={i}
                className={`${i % 2 === 0 ? 'bg-gray-800' : 'bg-gray-900'
                  } hover:bg-gray-700 transition-colors duration-300 cursor-default`}
              >
                {linha.map((celula, j) => (
                  <td
                    key={j}
                    className={`py-2 px-3 border border-gray-700 whitespace-nowrap ${j === 0 ? 'font-mono font-semibold bg-gray-800 sticky left-0 z-10' : ''
                      }`}
                    style={{ minWidth: j === 0 ? 140 : 110 }}
                  >
                    {celula || '-'}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  </section>
);
