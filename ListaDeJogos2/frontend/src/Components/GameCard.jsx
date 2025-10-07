function GameCard({ jogo }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-md p-6 transition hover:shadow-lg hover:scale-[1.02] duration-300">
      <img
        src={jogo.image.startsWith("http") ? jogo.image : `http://localhost:3001${jogo.image}`}
        alt={jogo.title}
        className="w-full h-full object-cover object-center"
      />
      <h2 className="text-2xl font-bold text-gray-800 mb-2">{jogo.tittle}</h2>
      <p className="text-gray-600 mb-2">{jogo.description}</p>
      <div className="text-sm text-gray-500">
        <p><span className="font-semibold">Ano:</span> {jogo.year}</p>
        <p><span className="font-semibold">Empresa:</span> {jogo.company}</p>
      </div>
    </div>
  );
}


export default GameCard;
