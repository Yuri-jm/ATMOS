import { useState } from "react";
import SearchBar from "../ui/SearchBar";
import Favorites from "../ui/Favorites";
import WeatherCard from "../ui/WeatherCard";

export default function Clima({ onLogout }) {
  const [cidadeBusca, setCidadeBusca] = useState("Curitiba");
  const [cidadeAtiva, setCidadeAtiva] = useState("Curitiba");
  const [favoritas, setFavoritas] = useState(["Curitiba", "Rio de Janeiro"]);
  const [reloadToken, setReloadToken] = useState(0);

  const [touchStartY, setTouchStartY] = useState(null);
  const [touchEndY, setTouchEndY] = useState(null);

  function handleSearch() {
    const c = cidadeBusca.trim();
    if (!c) return;

    setCidadeAtiva(c);

    setFavoritas((prev) => (prev.includes(c) ? prev : [...prev, c]));
  }

  function handleSelectFavorite(cidade) {
    setCidadeAtiva(cidade);
    setCidadeBusca(cidade);
  }

  function handleAddFavorite(cidade) {
    const c = cidade.trim();
    if (!c) return;

    setFavoritas((prev) => (prev.includes(c) ? prev : [...prev, c]));
  }

  function handleRemoveFavorite(cidade) {
    setFavoritas((prev) => prev.filter((f) => f !== cidade));
  }

  function handleTouchStart(e) {
    setTouchStartY(e.touches[0].clientY);
    setTouchEndY(null);
  }

  function handleTouchMove(e) {
    setTouchEndY(e.touches[0].clientY);
  }

  function handleTouchEnd() {
    if (touchStartY === null || touchEndY === null) return;

    const distance = touchEndY - touchStartY;

    if (distance > 80) {
      setReloadToken((prev) => prev + 1);
    }

    setTouchStartY(null);
    setTouchEndY(null);
  }

  return (
    <main
      className="main"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <button className="logout-button" onClick={onLogout}>
        Sair
      </button>

      <h1 className="title">Clima agora</h1>

      <SearchBar
        cidade={cidadeBusca}
        onChange={setCidadeBusca}
        onSearch={handleSearch}
      />

      <Favorites
        cidades={favoritas}
        ativa={cidadeAtiva}
        onSelect={handleSelectFavorite}
        onAdd={handleAddFavorite}
        onRemove={handleRemoveFavorite}
      />

      <WeatherCard cidade={cidadeAtiva} reloadToken={reloadToken} />

      <p className="hint-mobile">
        Arraste a tela para baixo para atualizar o clima.
      </p>
    </main>
  );
}
