import { useState } from "react";

export default function SearchBar({ onSearch, cidadeAtual }) {
  const [texto, setTexto] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    const valor = texto.trim() || cidadeAtual;
    if (!valor) return;

    onSearch(valor);
  }

  return (
    <form onSubmit={handleSubmit} className="search-form">
      <input
        className="search-input"
        placeholder="Pesquisar cidade..."
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
      />
      <button className="search-button" type="submit">
        Buscar
      </button>
    </form>
  );
}
