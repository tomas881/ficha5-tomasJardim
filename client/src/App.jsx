import { useState, useEffect } from "react";
import Card from "./Card.jsx";


function App() {

  const [filter, setFilter] = useState("Todas");
  const [search, setSearch] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [randomCard, setRandomCard] = useState(null);
  const [sorted, setSorted] = useState(false);
  const [cards, setCards] = useState([]);

  const [name, setName] = useState("");
  const [type, setType] = useState("Criatura");
  const [attack, setAttack] = useState(0);

  const [formError, setFormError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/api/cartas")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Erro HTTP ${res.status}`);
        }
        return res.json()
      })
      .then((data) => {
        setCards(data);
        setError(null);
      })
      .catch((err) => {
        setError(err.message === "Falha em fazer o fetch" ? "Servidor desligado" : err.message);
      })
      .finally(() => {
        setLoading(false);
      })
  }, []);
  function handleSubmit(e) {
    e.preventDefault();
    setFormError(null);
    fetch("http://localhost:3000/api/cartas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, type, attack }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(` HTTP ${res.status}`);
        }
        return res.json();
      })
      .then((savedCard) => {
        setCards([...cards, savedCard]);
        setName("");
        setType("Criatura");
        setAttack(0);
      })
      .catch((err) => {
        setFormError(err.message);
      });
  }
  let visible = cards
    .filter((card) => filter === "Todas" || card.type === filter)
    .filter((card) => card.name.toLowerCase().includes(search.toLowerCase()));

  if (sorted) {
    visible = [...visible].sort((a, b) => b.attack - a.attack);
  }

  function pickRandom() {
    setRandomCard(cards[Math.floor(Math.random() * cards.length)]);
  }

  if (loading) {
    return <main><p>A carregar...</p></main>
  }
  if (error) {
    return (
      <main>
        <h1>A minha coleção</h1>
        <p style={{ color: "red" }}>Erro ao carregar cartas: {error}</p>
      </main>
    );
  }
  return (
    <main>
      <h1>A minha coleção</h1>
      <form onSubmit={handleSubmit}>
        <h2>Adicionar carta</h2>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nome da carta"
        />
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="Criatura">Criatura</option>
          <option value="Feitiço">Feitiço</option>
        </select>
        <input
          type="number"
          value={attack}
          onChange={(e) => setAttack(e.target.value)}
          placeholder="Ataque"
        />
        <button type="submit">Adicionar</button>
      </form>

      {formError && <p style={{color: "red"}}>{formError}</p>}
      <p>
        Tenho {cards.length} cartas · a mostrar {visible.length}
      </p>

      <div>
        <button onClick={() => setFilter("Todas")}>Todas</button>
        <button onClick={() => setFilter("Criatura")}>Só criaturas</button>
        <button onClick={() => setFilter("Feitiço")}>Só feitiços</button>
        <button onClick={() => setSorted(!sorted)}>
          {sorted ? "Ordem original" : "Ordenar por ataque"}
        </button>
      </div>

      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Procurar pelo nome…"
      />

      {visible.length === 0 ? (
        <p>Nenhuma carta corresponde.</p>
      ) : (
        <ul>
          {visible.map((card) => (
            <Card key={card.name} {...card} />
          ))}
        </ul>
      )}

      <h2>Carta à sorte</h2>
      <button onClick={pickRandom}>Escolher outra</button>
      {randomCard && (
        <p>
          <b>{randomCard.name}</b> — {randomCard.type} · ataque {randomCard.attack} ·
          defesa {randomCard.defense}
        </p>
      )}
    </main>
  );
}

export default App;
