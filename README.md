

# 🎮 Gamer Games

Este repositório contém um **sistema de gerenciamento de jogos** com frontend em **React** e backend em **Node.js/Express**.
Ele permite adicionar, editar, deletar e visualizar jogos com uma interface estilizada em tema gamer.

---

## 🖥️ Funcionalidades

* Listar jogos com informações detalhadas:

  * Título
  * Descrição
  * Ano de lançamento
  * Empresa
  * Imagem do jogo
* Adicionar novos jogos
* Editar jogos existentes
* Deletar jogos
* Interface com tema **gamer** (cores, botões e cartões estilizados)
* Backend rodando em **Express** para armazenamento em memória (persistência enquanto o servidor estiver ativo)

---

## ⚡ Tecnologias utilizadas

* **Frontend:**

  * React.js
  * Tailwind CSS
  * Axios
  * UUID

* **Backend:**

  * Node.js
  * Express.js
  * CORS
  * UUID

---

## 🚀 Como rodar o projeto

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/gamer-games.git
cd gamer-games
```

---

### 2. Rodar o backend

1. Entre na pasta do backend:

```bash
cd backend
```

2. Instale as dependências:

```bash
npm install
```

3. Rode o servidor:

```bash
node server.js
```

> O backend estará disponível em `http://localhost:3001/jogos`

---

### 3. Rodar o frontend

1. Abra um novo terminal e entre na pasta do frontend:

```bash
cd frontend
```

2. Instale as dependências:

```bash
npm install
```

3. Rode o frontend:

```bash
npm start
```

> O frontend estará disponível em `http://localhost:5173` (ou porta padrão do Vite/React).

---

## 🔗 Como usar

1. Abra o navegador em `http://localhost:5173`.
2. Você verá a **Home gamer** com os jogos já cadastrados.
3. Para **adicionar um novo jogo**, preencha o formulário no topo e clique em **Adicionar Jogo**.
4. Para **editar um jogo**, clique em **Editar**, altere os campos e clique em **Salvar Alterações**.
5. Para **deletar um jogo**, clique em **Excluir**.
6. Todas as alterações serão refletidas no backend enquanto o servidor estiver ativo.

---


## 🎨 Estilo

* Tema **gamer**: cores fortes (azul, vermelho, amarelo) e botões com hover.
* Layout responsivo com **cartões de jogos**.
* Formulário moderno para cadastro e edição de jogos.

---





