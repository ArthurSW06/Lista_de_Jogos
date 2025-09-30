import { useState, useEffect } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

// DECLARANDO A URL DA API QUE SERÁ CONSUMIDA
const API_URL = "http://localhost:3001/jogos";

const Jogo = () => {
  // Estado principal
  const [jogo, setJogo] = useState([
    {
      id: uuidv4(),
      title: "The Witcher 3",
      description: "RPG de mundo aberto com foco em narrativa.",
      year: 2015,
      company: "CD Projekt Red",
      image: "/public/images/TheWitcher3.png",
    },
    {
      id: uuidv4(),
      title: "God of War",
      description: "Ação e aventura com mitologia nórdica.",
      year: 2018,
      company: "Santa Monica Studio",
      image: "/public/images/GodOfWar.png",
    },
    {
      id: uuidv4(),
      title: "Red Dead Redemption 2",
      description: "Jogo de faroeste com mundo aberto e história envolvente.",
      year: 2018,
      company: "Rockstar Games",
      image: "/public/images/RedDead2.png",
    },
    {
      id: uuidv4(),
      title: "Minecraft",
      description: "Jogo de construção em blocos e sobrevivência.",
      year: 2011,
      company: "Mojang Studios",
      image: "/public/images/Minecraft.png",
    },
    {
      id: uuidv4(),
      title: "Hollow Knight",
      description: "Metroidvania 2D com arte desenhada à mão.",
      year: 2017,
      company: "Team Cherry",
      image: "/public/images/HollowKnight.png",
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

  // CADASTRAR JOGO (POST)
  const cadastrarJogo = async () => {
    if (
      !novoJogo.title ||
      !novoJogo.description ||
      !novoJogo.year ||
      !novoJogo.company ||
      !novoJogo.image
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

  // CONSULTAR JOGO (GET)
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

  // ALTERAR JOGO (PUT)
  const alterarJogo = async () => {
    if (
      !novoJogo.title ||
      !novoJogo.description ||
      !novoJogo.year ||
      !novoJogo.company ||
      !novoJogo.image
    ) {
      alert("Todos os campos são obrigatórios");
      return;
    }
    try {
      const response = await axios.put(`${API_URL}/${novoJogo.id}`, novoJogo);
      setJogo(
        jogo.map((j) => (j.id === novoJogo.id ? response.data : j))
      );
      setNovoJogo({ title: "", description: "", year: "", company: "", image: "" });
      setEditar(false);
    } catch (error) {
      console.log("Erro ao alterar o jogo", error);
    }
  };

  // DELETAR JOGO (DELETE)
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

  // Método alterar
  const handleAlterar = (j) => {
    setNovoJogo(j);
    setEditar(true);
  };

  // Método submit
  const handleSubmit = () => {
    if (editar) {
      alterarJogo();
    } else {
      cadastrarJogo();
    }
  };

  return (
  <div className="p-6">
    {/* FORMULÁRIO */}
    <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6 mb-8">
      <h2 className="text-xl font-bold mb-4">
        {editar ? "Editar Jogo" : "Adicionar Jogo"}
      </h2>
      <input
        type="text"
        placeholder="Título"
        value={novoJogo.title}
        onChange={(e) => setNovoJogo({ ...novoJogo, title: e.target.value })}
        className="w-full border p-2 rounded mb-3"
      />
      <input
        type="text"
        placeholder="Descrição"
        value={novoJogo.description}
        onChange={(e) => setNovoJogo({ ...novoJogo, description: e.target.value })}
        className="w-full border p-2 rounded mb-3"
      />
      <input
        type="number"
        placeholder="Ano"
        value={novoJogo.year}
        onChange={(e) => setNovoJogo({ ...novoJogo, year: e.target.value })}
        className="w-full border p-2 rounded mb-3"
      />
      <input
        type="text"
        placeholder="Empresa"
        value={novoJogo.company}
        onChange={(e) => setNovoJogo({ ...novoJogo, company: e.target.value })}
        className="w-full border p-2 rounded mb-3"
      />
      <input
        type="text"
        placeholder="URL da imagem"
        value={novoJogo.image}
        onChange={(e) => setNovoJogo({ ...novoJogo, image: e.target.value })}
        className="w-full border p-2 rounded mb-3"
      />

      <button
        onClick={handleSubmit}
        className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
      >
        {editar ? "Salvar Alterações" : "Adicionar Jogo"}
      </button>
    </div>

    {/* LISTA DE JOGOS */}
    <div className="flex flex-wrap gap-6 justify-center">
      {jogo.map((game) => (
        <div
          key={game.id}
          className="bg-white border border-gray-200 rounded-lg shadow-md p-6 w-80 flex flex-col justify-between"
        >
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

          <div className="flex justify-between mt-4">
            <button
              onClick={() => handleAlterar(game)}
              className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600"
            >
              Editar
            </button>
            <button
              onClick={() => deletarJogo(game.id)}
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
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
