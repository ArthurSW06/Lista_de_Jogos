import { useState } from "react";
import axios from "axios";

function GameForm({ onAdd }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    year: "",
    company: "",
    image: "",
  });

  // Função para atualizar os campos
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image" && files.length > 0) {
      // Caso queira usar upload de arquivo real, aqui mudaria para FormData
      setFormData({ ...formData, image: URL.createObjectURL(files[0]) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:5173/jogos", formData)
      .then((res) => {
        onAdd(res.data); // atualiza a lista de jogos no componente pai
        setFormData({
          title: "",
          description: "",
          year: "",
          company: "",
          image: "",
        });
      })
      .catch((err) => {
        console.error("Erro ao adicionar jogo:", err);
      });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-2xl shadow-md mb-6 max-w-2xl mx-auto"
    >
      <input
        type="text"
        name="title"
        placeholder="Título do Jogo"
        value={formData.title}
        onChange={handleChange}
        className="w-full p-3 border rounded-lg mb-4"
      />
      <input
        type="text"
        name="description"
        placeholder="Descrição"
        value={formData.description}
        onChange={handleChange}
        className="w-full p-3 border rounded-lg mb-4"
      />
      <input
        type="number"
        name="year"
        placeholder="Ano de Lançamento"
        value={formData.year}
        onChange={handleChange}
        className="w-full p-3 border rounded-lg mb-4"
      />
      <input
        type="text"
        name="company"
        placeholder="Empresa Desenvolvedora"
        value={formData.company}
        onChange={handleChange}
        className="w-full p-3 border rounded-lg mb-4"
      />
      <input
        type="file"
        name="image"
        accept="image/*"
        onChange={handleChange}
        className="w-full p-3 border rounded-lg mb-4"
      />
      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg"
      >
        Adicionar Jogo
      </button>
    </form>
  );
}

export default GameForm;
