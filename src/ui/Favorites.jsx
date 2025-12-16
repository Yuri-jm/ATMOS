import { useState } from "react";

export default function Favorites({
  cidades,
  ativa,
  onSelect,
  onAdd,
  onRemove,
}) {
  const [novaCidade, setNovaCidade] = useState("");

  function handleAdd(e) {
    e.preventDefault();
    if (novaCidade.trim()) {
      onAdd(novaCidade.trim());
      setNovaCidade("");
    }
  }

  return (
    <section>
      <h3>Favoritas</h3>
      {cidades.map((c) => (
        <button
          key={c}
          style={{
            fontWeight: c === ativa ? "bold" : "normal",
            marginRight: 8,
          }}
          onClick={() => onSelect(c)}
        >
          {c}
          <span
            onClick={(e) => {
              e.stopPropagation();
              onRemove(c);
            }}
          >
            {" "}
            x{" "}
          </span>
        </button>
      ))}
      <form onSubmit={handleAdd}>
        <input
          value={novaCidade}
          onChange={(e) => setNovaCidade(e.target.value)}
          placeholder="Adicionar cidade"
        />
        <button type="submit">Adicionar</button>
      </form>
    </section>
  );
}
