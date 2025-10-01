// backend/server.js
const express = require("express");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Lista de jogos inicial (copiada do seu Jogo.jsx)
let jogos = [
  { id: uuidv4(), title: "The Witcher 3", description: "RPG de mundo aberto com foco em narrativa.", year: 2015, company: "CD Projekt Red", image: "/images/TheWitcher3.png" },
  { id: uuidv4(), title: "God of War", description: "Ação e aventura com mitologia nórdica.", year: 2018, company: "Santa Monica Studio", image: "/images/GodOfWar.png" },
  { id: uuidv4(), title: "Red Dead Redemption 2", description: "Jogo de faroeste com mundo aberto e história envolvente.", year: 2018, company: "Rockstar Games", image: "/images/RedDead2.png" },
  { id: uuidv4(), title: "Minecraft", description: "Jogo de construção em blocos e sobrevivência.", year: 2011, company: "Mojang Studios", image: "/images/Minecraft.png" },
  { id: uuidv4(), title: "Hollow Knight", description: "Metroidvania 2D com arte desenhada à mão.", year: 2017, company: "Team Cherry", image: "/images/HollowKnight.png" }
];

// Rotas
app.get("/jogos", (req, res) => {
  res.json(jogos);
});

app.post("/jogos", (req, res) => {
  const novoJogo = { id: uuidv4(), ...req.body };
  jogos.push(novoJogo);
  res.status(201).json(novoJogo);
});

// rota de login
app.post("/login", async (req, res) => {
  const { email, senha } = req.body;

  try {
    // validação simples
    if (!email || !senha) {
      return res.status(400).json({ error: "Preencha todos os campos." });
    }

    // busca usuário no banco
    const usuario = await User.findOne({ email });
    if (!usuario) {
      return res.status(404).json({ error: "Usuário não encontrado." });
    }

    // compara senha
    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
    if (!senhaCorreta) {
      return res.status(401).json({ error: "Senha incorreta." });
    }

    // gera token
    const token = jwt.sign({ id: usuario._id }, "segredo", { expiresIn: "1h" });

    res.json({ message: "Login realizado com sucesso!", token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro interno, tente novamente." });
  }
});

app.put("/jogos/:id", (req, res) => {
  const index = jogos.findIndex(j => j.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: "Jogo não encontrado" });
  jogos[index] = { id: req.params.id, ...req.body };
  res.json(jogos[index]);
});

app.delete("/jogos/:id", (req, res) => {
  const index = jogos.findIndex(j => j.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: "Jogo não encontrado" });
  const deleted = jogos.splice(index, 1);
  res.json(deleted[0]);
});

app.listen(PORT, () => {
  console.log(`Backend rodando em http://localhost:${PORT}`);
});
