// IMPORTA O MÓDULO EXPRESS PARA CONTRUIR A APLICAÇÃO
const express = require("express");
// PERMITE QUE ACESSE ROTAS DIFERENTES (DOMÍNIOS)
const cors = require("cors");
// MIDDLEWARE QUE ANALISA AS REQUISIÇÕES DO CORPO DA PÁGINA  COMO ENTRADA HTTP
const bodyParser = require("body-parser");
// FUNÇÃO RESPONSAVEL POR GERAR ID UNICOS
const { v4: uuid } = require("uuid");

// INSTANCIANDO O EXPRESS
const app = express();

// DEFINE A PORTA DO SERVIDOR
const port = 5173;

// USANDO O CORS PARA HABILITAR AS ROTAS
app.use(cors());
//USANDO O BODY-PARSER PARA ANALISAR AS REQUISIÇÕES(EX. DADOS DE UM FORMULARIO) NA APLICAÇÃO E CONVERT PARA JSON
app.use(bodyParser.json());

// VARIAVEL QUE RECEBE UM ARRAY DE JOGOS
let jogos = [
  {
    id: uuid(),
    title: "The Witcher 3",
    description: "RPG de mundo aberto com foco em narrativa.",
    year: 2015,
    company: "CD Projekt Red",
    image: "/public/images/TheWitcher3.png",
  },
  {
    id: uuid(),
    title: "God of War",
    description: "Ação e aventura com mitologia nórdica.",
    year: 2018,
    company: "Santa Monica Studio",
    image: "/public/images/GodOfWar.png",
  },
  {
    id: uuid(),
    title: "Red Dead Redemption 2",
    description: "Jogo de faroeste com mundo aberto e história envolvente.",
    year: 2018,
    company: "Rockstar Games",
    image: "/public/images/RedDead2.png",
  },
  {
    id: uuid(),
    title: "Minecraft",
    description: "Jogo de construção em blocos e sobrevivência.",
    year: 2011,
    company: "Mojang Studios",
    image: "/public/images/Minecraft.png",
  },
  {
    id: uuid(),
    title: "Hollow Knight",
    description: "Metroidvania 2D com arte desenhada à mão.",
    year: 2017,
    company: "Team Cherry",
    image: "/public/images/HollowKnight.png",
  }
]
// CRIANDO A ROTA CADASTRAR JOGOS (POST)
app.post("/jogos", (req, res) => {
  const { title, description, year, company, image } = req.body;
  if (!title || !description || !year || !company || !image) {
    return res.status(400).json({ error: "Campos Inválidos" });
  }
  // REALIZA O NOVO CADASTRO
  const novoJogo = { id: uuid(), title, description, year, company, image };
  jogos.push(novoJogo);
  // RETORNA O JOGO CRIADO
  res.status(201).json(novoJogo);
});

// ROTA PARA CONSULTAR TODOS OS JOGOS CADASTRADOS (GET)
app.get("/jogos", (req, res) => {
  res.json(jogos);
});

// ROTA PARA ALTERAR O JOGO CADASTRADO (PUT)
app.put("/jogos/:id", (req, res) => {
  const jogosId = req.params.id;
  const { title, description, year, company, image } = req.body;

  if (!title || !description || !year || !company || !image) {
    return res.status(400).json({ error: "Campos Inválidos" });
  }

  const jogosIndex = jogos.findIndex((item) => item.id === jogosId);
  if (jogosIndex === -1) {
    return res.status(404).json({ error: "Jogo não encontrado" });
  }

  jogos[jogosIndex] = { id: jogosId, title, description, year, company, image };

  res.json(jogos[jogosIndex]);
});

// ROTA PARA DELETAR UM JOGO CADASTRADO (DELETE)
app.delete("/jogos/:id", (req, res) => {
  const jogosId = req.params.id;
  const inicioJogos = jogos.length;

  jogos = jogos.filter((item) => item.id !== jogosId);

  if (jogos.length === inicioJogos) {
    return res.status(404).json({ error: "Jogo não encontrado" });
  }

  res.status(200).send("Jogo removido com sucesso");
});

// EXECUTANDO O SERVIDOR A NA PORTA DEFINIDA
app.listen(port, () => {
  console.log(`Servidor rodando na porta http://localhost:${port}`);
});
