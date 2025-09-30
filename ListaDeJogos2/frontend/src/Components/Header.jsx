import { Link, useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <header className="text-center p-4 bg-transparent">
      <h1 className="text-5xl font-extrabold text-blue-700">🎮 Lista de Jogos</h1>
      <p className="text-black-300 mt-2">Explore e adicione seus jogos favoritos!</p>
      <nav className="mt-4 flex justify-center gap-6">
        <Link to="/" className="text-#2b6cb0 hover:underline">Home</Link>
        <Link to="/jogos" className="text-#2b6cb0 hover:underline">Jogos</Link>
        {!user ? (
          <Link to="/login" className="text-#2b6cb0 hover:underline">Login</Link>
        ) : (
          <button
            onClick={() => { localStorage.removeItem("user"); navigate("/login"); }}
            className="text-white bg-red-500 px-4 py-1 rounded hover:bg-red-600"
          >
            Sair
          </button>
        )}
      </nav>
    </header>
  );
}

export default Header;
