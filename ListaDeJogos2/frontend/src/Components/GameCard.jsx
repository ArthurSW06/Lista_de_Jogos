

function GameCard({ game }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-md p-6 transition hover:shadow-lg hover:scale-[1.02] duration-300">
      <img
        src={game.image}
        alt={game.title}
        className="w-full h-56 object-cover rounded-lg mb-4"
      />
      <h2 className="text-2xl font-bold text-gray-800 mb-2">{game.title}</h2>
      <p className="text-gray-600 mb-2">{game.description}</p>
      <div className="text-sm text-gray-500">
        <p><span className="font-semibold">Ano:</span> {game.year}</p>
        <p><span className="font-semibold">Empresa:</span> {game.company}</p>
      </div>
    </div>
  );
}


export default GameCard;
