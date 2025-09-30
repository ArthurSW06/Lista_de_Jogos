import { useState } from "react";
import GameCard from "./Components/GameCard";
import GameForm from "./Components/GameForm";
import Header from "./components/Header";


function App() {
  const [games, setGames] = useState([
  {
    id: 1,
    title: "The Witcher 3",
    description: "RPG de mundo aberto com foco em narrativa.",
    year: 2015,
    company: "CD Projekt Red",
    image: "/public/images/TheWitcher3.png", 
  },
  {
    id: 2,
    title: "God of War",
    description: "Ação e aventura com mitologia nórdica.",
    year: 2018,
    company: "Santa Monica Studio",
    image: "/public/images/GodOfWar.png",
  },
  {
    id: 3,
    title: "Red Dead Redemption 2",
    description: "Jogo de faroeste com mundo aberto e história envolvente.",
    year: 2018,
    company: "Rockstar Games",
    image: "/public/images/RedDead2.png",
  },
  {
    id: 4,
    title: "Minecraft",
    description: "Jogo de construção em blocos e sobrevivência.",
    year: 2011,
    company: "Mojang Studios",
    image: "/public/images/Minecraft.png",
  },
  {
    id: 5,
    title: "Hollow Knight",
    description: "Metroidvania 2D com arte desenhada à mão.",
    year: 2017,
    company: "Team Cherry",
    image: "/public/images/HollowKnight.png",
  },
]);


  const addGame = (game) => {
    setGames([...games, { ...game, id: Date.now() }]);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center p-6">
      <div className="max-w-5xl w-full">
        <Header />
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <GameForm onAddGame={addGame} />
        </div>
        <h2 className="text-2xl font-semibold mt-10 mb-4 text-gray-800 text-center">📋 Lista Atual:</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {games.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      </div>
    </div>
  );


}

export default App;
