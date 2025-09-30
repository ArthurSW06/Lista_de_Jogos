import { useState } from 'react';

function GameForm({ onAddGame }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [year, setYear] = useState('');
  const [company, setCompany] = useState('');
  const [image, setImage] = useState(null); 


  const handleSubmit = (e) => {
    e.preventDefault();

  
    const imageUrl = image ? URL.createObjectURL(image) : 'default-image.jpg'; // Caminho padrão se não houver imagem

  // Chama a função do componente pai para adicionar o jogo
    onAddGame({ title, description, year, company, image: imageUrl });
    // Limpa os campos do formulário
    setTitle('');
    setDescription('');
    setYear('');
    setCompany('');
    setImage(null);
  };

  // Função para lidar com a mudança da imagem
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-xl shadow-md">
      <input
        type="text"
        placeholder="Título do Jogo"
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Descrição"
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="number"
        placeholder="Ano de Lançamento"
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={year}
        onChange={(e) => setYear(e.target.value)}
      />
      <input
        type="text"
        placeholder="Empresa Desenvolvedora"
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
      />
      <div>
        <p>Selecione uma imagem do jogo:</p>
        <input
          type="file"
          accept="image/"
          placeholder='Imagem do Jogo'
          onChange={handleImageChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition"
      >
        Adicionar Jogo
      </button>
    </form>
  );
}

export default GameForm;
