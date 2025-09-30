import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="relative min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden">
      {/* Título principal */}
      <h1 className="text-6xl font-extrabold mb-4 animate-pulse text-center">
        🎮 Bem-vindo à Lista de Jogos!
      </h1>
      <p className="text-xl mb-8 text-gray-300 text-center max-w-xl">
        Explore, adicione e gerencie seus jogos favoritos em um ambiente totalmente gamer.
      </p>

      {/* Botões chamativos */}
      <div className="flex gap-6">
        <Link
          to="/jogos"
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-lg font-semibold transition transform hover:scale-105"
        >
          Ver Jogos
        </Link>
        <Link
          to="/login"
          className="px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg text-lg font-semibold transition transform hover:scale-105"
        >
          Login
        </Link>
      </div>

      {/* Elementos decorativos estilo gamer (fora do fluxo, não afetam scroll) */}
      <div className="absolute -top-16 -left-16 w-32 h-32 bg-blue-500 opacity-30 rounded-full animate-bounce pointer-events-none"></div>
      <div className="absolute -bottom-16 -right-16 w-40 h-40 bg-red-500 opacity-20 rounded-full animate-ping pointer-events-none"></div>
    </div>
  );
}

export default Home;
