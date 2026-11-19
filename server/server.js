const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();
const PORT = 3000;

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

const cards = JSON.parse(fs.readFileSync("./cartas.json", "utf-8"));

function page(title, body) {
  return `<!DOCTYPE html>
<html lang="pt">
  <head>
    <meta charset="utf-8">
    <title>${title}</title>
  </head>
  <body>
    <nav>
      <a href="/">Início</a> ·
      <a href="/cartas">Cartas</a> ·
      <a href="/sobre">Sobre</a> ·
      <a href="/agora">Agora</a>
    </nav>
    <h1>${title}</h1>
    ${body}
  </body>
</html>`;
}

app.get("/", (req, res) => {
  res.send(page(
    "A minha coleção",
    `<p>Neste momento tenho <b>${cards.length}</b> cartas na coleção.</p>`
  ));
});

app.get("/sobre", (req, res) => {
  res.send(page(
    "Sobre",
    `<p>Feito por <b>&lt;nome do aluno&gt;</b>, turma &lt;turma&gt;.</p>`
  ));
});

app.get("/cartas", (req, res) => {
  const items = cards
    .map((card) => `<li><b>${card.name}</b> — ${card.type}, ataque ${card.attack}</li>`)
    .join("");

  res.send(page("Cartas", `<ul>${items}</ul>`));
});

app.get("/cartas/aleatoria", (req, res) => {
  const card = cards[Math.floor(Math.random() * cards.length)];

  res.send(page(
    "Carta à sorte",
    `<h2>${card.name}</h2>
     <p>${card.type} · ataque ${card.attack} · defesa ${card.defense}</p>`
  ));
});

app.get("/agora", (req, res) => {
  const now = new Date().toLocaleString("pt-PT", {
    dateStyle: "long",
    timeStyle: "medium",
  });

  res.send(page("Agora", `<p>Este pedido foi respondido às <b>${now}</b>.</p>`));
});

app.get("/api/cartas", (req, res) => {
  res.json(cards);

});

app.post("/api/cartas", (req, res) => {
  const { name, type, attack } = req.body;

  if (!name || !name.trim() || !type || !type.trim()) {
    return res.status(400).json({ error: "Nome e tipo são obrigatórios" });
  }
  
  const card = {
    name: name.trim(),
    type,
    attack: Number(attack) || 0,
    defense: 0,
  };
  cards.push(card);
  fs.writeFileSync("./cartas.json", JSON.stringify(cards, null, 2));
  res.status(201).json(card);
});

app.use((req, res) => {

  res.status(404).send(page(
    "404 — não encontrado",
    `<p>Não existe nada em <code>${req.url}</code>.</p>
     <p><a href="/">Voltar ao início</a></p>`
  ));
});

app.listen(PORT, () => {
  console.log(`Server a correr em http://localhost:${PORT}`);
});
