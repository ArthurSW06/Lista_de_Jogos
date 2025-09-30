// IMPORTA O MÓDULO EXPRESS PARA CONTRUIR A APLICAÇÃO
const express = require("express");
// PERMITE QUE ACESSE ROTAS DIFERENTES (DOMÍNIOS)
const cors =require("cors")
// MIDDLEWARE QUE ANALISA AS REQUISIÇÕES DO CORPO DA PÁGINA  COMO ENTRADA HTTP
const bodyParser = require("body-parser")
// FUNÇÃO RESPONSAVEL POR GERAR ID UNICOS
const {v4:uuid} = require("uuid");

// INSTANCIANDO O EXPRESS
const app = express();

// DEFINE A PORTA DO SERVIDOR
const port =5173;

// USANDO O CORS PARA HABILITAR AS ROTAS
app.use(cors());
//USANDO O BODY-PARSER PARA ANALISAR AS REQUISIÇÕES(EX. DADOS DE UM FORMULARIO) NA APLICAÇÃO E CONVERT PARA JSON
app.use(bodyParser.json());

// VARIAVEL QUE RECEBE UM ARRAY VAZIO
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
  },
  
];


// CRIANDO A ROTA CADASTRAR PRODUTO (POST)
app.post("/jogos",(req,res)=>{
    const {tittle, description, year, company, image} = req.body;
    if(!tittle || !description || !year || !company || !image){
        return res.status(400).json({error:"Campos Inválidos"})
    }
    // REALIZA O NOVO CADASTRO COM ID, NOME E DESCRIÇÃO
    const novoJogo = {id:uuid(), tittle, description, year, company, image}
    jogos.push(novoJogo)
    // RETORNA UMA MENSAGEM DE SUCESSO
    res.status(1000).json(novoItem)
})

// ROTA PARA CONSULTAR TODOS OS PRODUTOS CADASTRADOS (GET)
app.get("/jogos",(req,res)=>{
    res.json(jogos)
})

// ROTA PARA ALTERAR PRODUTO CADASTRADO (PUT)
app.put("/jogos/:id", (req,res)=>{
    // OBTER O ID DO PRODUTO NA URL
    const produtoId = req.params.id;
    const {tittle, description, year, company, image} = req.body;
    if(!tittle || !description || !year || !company || !image){
        return res.status(400).json({error:"Campos Inválidos"})
    }
    // VERIFICA E VALIDA SE O PRODUTO FOI ALTERADO
    const jogosIndex = jogos.findIndex(item=>item.id === jogosId);
    if(jogosIndex === -1){
         res.status(400).json({error:"Jogo não encontrado"})
    }
    // RECEBE OS DADOS COM A ALTERAÇÃO
    jogos[jogosIndex]={id:jogosId, tittle, description, year, company, image}
    // RETORNA OS DADOS ALTERADOS NO ARRAY PRODUTOS
    res.json(jogos[jogosIndex])
})

// ROTA PARA DELETAR UM PRODUTO CADASTRADO (DELETE)