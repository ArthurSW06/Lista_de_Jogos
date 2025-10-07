const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Caminho do arquivo de dados
const filePath = path.join(__dirname, "jogos.json");

// Funções utilitárias
function lerJogos() {
  const data = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(data);
}

function salvarJogos(jogos) {
  fs.writeFileSync(filePath, JSON.stringify(jogos, null, 2), "utf-8");
}

// ROTAS

// Listar jogos
app.get("/jogos", (req, res) => {
  const jogos = lerJogos();
  res.json(jogos);
});

// Adicionar jogo
app.post("/jogos", (req, res) => {
  const jogos = lerJogos();
  const novoJogo = { id: uuidv4(), ...req.body };
  jogos.push(novoJogo);
  salvarJogos(jogos);
  res.status(201).json(novoJogo);
});

// Atualizar jogo
app.put("/jogos/:id", (req, res) => {
  const jogos = lerJogos();
  const index = jogos.findIndex(j => j.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: "Jogo não encontrado" });

  jogos[index] = { id: req.params.id, ...req.body };
  salvarJogos(jogos);
  res.json(jogos[index]);
});

// Deletar jogo
app.delete("/jogos/:id", (req, res) => {
  let jogos = lerJogos();
  const index = jogos.findIndex(j => j.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: "Jogo não encontrado" });

  const deletado = jogos.splice(index, 1);
  salvarJogos(jogos);
  res.json(deletado[0]);
});

// Rota de login (não alterada, mas depende de banco)
app.post("/login", async (req, res) => {
  const { email, senha } = req.body;
  try {
    if (!email || !senha) {
      return res.status(400).json({ error: "Preencha todos os campos." });
    }

    // Exemplo: esta parte exige que você tenha mongoose + model configurado
    const usuario = await User.findOne({ email });
    if (!usuario) {
      return res.status(404).json({ error: "Usuário não encontrado." });
    }

    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
    if (!senhaCorreta) {
      return res.status(401).json({ error: "Senha incorreta." });
    }

    const token = jwt.sign({ id: usuario._id }, "segredo", { expiresIn: "1h" });
    res.json({ message: "Login realizado com sucesso!", token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro interno, tente novamente." });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Backend rodando em http://localhost:${PORT}`);
});
