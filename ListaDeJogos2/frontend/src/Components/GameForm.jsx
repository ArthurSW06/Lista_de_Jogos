import { useState, useEffect } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

const API_URL = "http://localhost:3001/jogos";

const Jogo = () => {
  const [jogo, setJogo] = useState([
    {
      id: uuidv4(),
      title: "The Witcher 3",
      description: "RPG de mundo aberto com foco em narrativa.",
      year: 2015,
      company: "CD Projekt Red",
      image: "/images/TheWitcher3.png",
    },
    {
      id: uuidv4(),
      title: "God of War",
      description: "Ação e aventura com mitologia nórdica.",
      year: 2018,
      company: "Santa Monica Studio",
      image: "/images/GodOfWar.png",
    },
    {
      id: uuidv4(),
      title: "Red Dead Redemption 2",
      description: "Jogo de faroeste com mundo aberto e história envolvente.",
      year: 2018,
      company: "Rockstar Games",
      image: "/images/RedDead2.png",
    },
    {
      id: uuidv4(),
      title: "Minecraft",
      description: "Jogo de construção em blocos e sobrevivência.",
      year: 2011,
      company: "Mojang Studios",
      image: "/images/Minecraft.png",
    },
    {
      id: uuidv4(),
      title: "Hollow Knight",
      description: "Metroidvania 2D com arte desenhada à mão.",
      year: 2017,
      company: "Team Cherry",
      image: "/images/HollowKnight.png",
    },
  ]);

  const [novoJogo, setNovoJogo] = useState({
    title: "",
    description: "",
    year: "",
    company: "",
    image: "",
  });

  const [editar, setEditar] = useState(false);

  const cadastrarJogo = async () => {
    if (
      !novoJogo.title.trim() ||
      !novoJogo.description.trim() ||
      !novoJogo.year ||
      !novoJogo.company.trim() ||
      !novoJogo.image.trim()
    ) {
      alert("Todos os campos são obrigatórios");
      return;
    }
    try {
      const response = await axios.post(`${API_URL}`, novoJogo);
      setJogo([...jogo, response.data]);
      setNovoJogo({ title: "", description: "", year: "", company: "", image: "" });
      setEditar(false);
    } catch (error) {
      console.log("Erro ao cadastrar o jogo", error);
    }
  };

  const ConsultarJogo = async () => {
    try {
      const response = await axios.get(`${API_URL}`);
      setJogo(response.data);
    } catch (error) {
      console.log("Erro ao consultar o jogo", error);
    }
  };

  useEffect(() => {
    ConsultarJogo();
  }, []);

  const alterarJogo = async () => {
    if (
      !novoJogo.title.trim() ||
      !novoJogo.description.trim() ||
      !novoJogo.year ||
      !novoJogo.company.trim() ||
      !novoJogo.image.trim()
    ) {
      alert("Todos os campos são obrigatórios");
      return;
    }
    try {
      const response = await axios.put(`${API_URL}/${novoJogo.id}`, novoJogo);
      setJogo(jogo.map((j) => (j.id === novoJogo.id ? response.data : j)));
      setNovoJogo({ title: "", description: "", year: "", company: "", image: "" });
      setEditar(false);
    } catch (error) {
      console.log("Erro ao alterar o jogo", error);
    }
  };

  const deletarJogo = async (id) => {
    if (window.confirm("Tem certeza que deseja deletar este Jogo?")) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        setJogo(jogo.filter((j) => j.id !== id));
      } catch (error) {
        console.log("Erro ao deletar Jogo", error);
      }
    }
  };

  const handleAlterar = (j) => {
    setNovoJogo(j);
    setEditar(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // evita reload da página
    if (editar) {
      alterarJogo();
    } else {
      cadastrarJogo();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 p-6">
      {/* FORMULÁRIO */}
      <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-gray-800 border-2 border-blue-600 shadow-2xl rounded-3xl p-6 mb-10">
        <h2 className="text-2xl font-bold text-blue-400 mb-4 text-center">{editar ? "Editar Jogo" : "Adicionar Jogo"}</h2>
        <input
          type="text"
          placeholder="Título"
          value={novoJogo.title}
          onChange={(e) => setNovoJogo({ ...novoJogo, title: e.target.value })}
          className="w-full border-2 border-blue-600 bg-gray-900 p-2 rounded-lg mb-3 text-white placeholder-gray-400 focus:border-blue-400 outline-none"
        />
        <input
          type="text"
          placeholder="Descrição"
          value={novoJogo.description}
          onChange={(e) => setNovoJogo({ ...novoJogo, description: e.target.value })}
          className="w-full border-2 border-blue-600 bg-gray-900 p-2 rounded-lg mb-3 text-white placeholder-gray-400 focus:border-blue-400 outline-none"
        />
        <input
          type="number"
          placeholder="Ano"
          value={novoJogo.year}
          onChange={(e) => setNovoJogo({ ...novoJogo, year: e.target.value })}
          className="w-full border-2 border-blue-600 bg-gray-900 p-2 rounded-lg mb-3 text-white placeholder-gray-400 focus:border-blue-400 outline-none"
        />
        <input
          type="text"
          placeholder="Empresa"
          value={novoJogo.company}
          onChange={(e) => setNovoJogo({ ...novoJogo, company: e.target.value })}
          className="w-full border-2 border-blue-600 bg-gray-900 p-2 rounded-lg mb-3 text-white placeholder-gray-400 focus:border-blue-400 outline-none"
        />
        <input
          type="text"
          placeholder="URL da imagem"
          value={novoJogo.image}
          onChange={(e) => setNovoJogo({ ...novoJogo, image: e.target.value })}
          className="w-full border-2 border-blue-600 bg-gray-900 p-2 rounded-lg mb-3 text-white placeholder-gray-400 focus:border-blue-400 outline-none"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg font-bold transition transform hover:scale-105"
        >
          {editar ? "Salvar Alterações" : "Adicionar Jogo"}
        </button>
      </form>

      {/* LISTA DE JOGOS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {jogo.map((game) => (
          <div
            key={game.id}
            className="bg-gray-800 border-2 border-blue-600 shadow-2xl rounded-3xl p-3 flex flex-col justify-between transition transform hover:scale-105 hover:shadow-blue-500/50"
          >
            <div className="w-full h-64 mb-4 rounded-2xl overflow-hidden border-2 border-blue-500">
              <img
                src={game.image}
                alt={game.title}
                className="w-full h-full object-cover object-center"
              />
            </div>
            <h2 className="text-xl font-bold text-blue-400 mb-1">{game.title}</h2>
            <p className="text-gray-300 mb-1">{game.description}</p>
            <div className="text-sm text-gray-400">
              <p><span className="font-semibold">Ano:</span> {game.year}</p>
              <p><span className="font-semibold">Empresa:</span> {game.company}</p>
            </div>
            <div className="flex justify-between mt-3">
              <button
                onClick={() => handleAlterar(game)}
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-lg transition transform hover:scale-105"
              >
                Editar
              </button>
              <button
                onClick={() => deletarJogo(game.id)}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg transition transform hover:scale-105"
              >
                Excluir
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Jogo;
