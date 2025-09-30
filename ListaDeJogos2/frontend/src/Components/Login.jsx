import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !senha) {
      alert("Preencha todos os campos!");
      return;
    }

    // Salvar usuário no localStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const userExists = users.find(u => u.email === email);

    if (!userExists) {
      users.push({ email, senha });
      localStorage.setItem("users", JSON.stringify(users));
    }

    // Salva usuário logado
    localStorage.setItem("user", JSON.stringify({ email }));
    navigate("/jogos");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      <div className="bg-gray-800 p-10 rounded-3xl shadow-2xl w-full max-w-md border-2 border-blue-600">
        <h2 className="text-4xl font-bold text-blue-400 mb-6 text-center animate-pulse">🎮 Login Gamer</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-3 rounded-lg border-2 border-blue-600 bg-gray-900 text-white placeholder-gray-400 focus:border-blue-400 outline-none transition"
            required
          />
          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            className="p-3 rounded-lg border-2 border-red-600 bg-gray-900 text-white placeholder-gray-400 focus:border-red-400 outline-none transition"
            required
          />
          <button
            type="submit"
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition transform hover:scale-105"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
