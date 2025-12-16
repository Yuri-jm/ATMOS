import { useEffect, useState } from "react";

const KEY = "a97e6e8310f144862ac825e05982a168";

export default function WeatherCard({ cidade, reloadToken }) {
  const [data, setData] = useState(null);
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    if (!cidade) return;

    async function load() {
      setStatus("loading");
      try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
          cidade
        )}&appid=${KEY}&lang=pt_br`;

        const res = await fetch(url);
        if (!res.ok) throw new Error("Erro ao buscar clima");

        const json = await res.json();
        setData(json);
        setStatus("done");
      } catch (err) {
        console.error(err);
        setStatus("error");
      }
    }

    load();
  }, [cidade, reloadToken]);

  if (status === "idle") return null;

  if (status === "loading") {
    return (
      <section className="card">
        <p>Carregando clima de {cidade}...</p>
      </section>
    );
  }

  if (status === "error") {
    return (
      <section className="card">
        <p>Não foi possível carregar {cidade}.</p>
      </section>
    );
  }

  if (!data) return null;

  const tempC = Math.round(data.main.temp - 273.15);
  const feelsC = Math.round(data.main.feels_like - 273.15);
  const desc = data.weather?.[0]?.description ?? "";

  return (
    <section className="card">
      <h2>{cidade}</h2>
      <p className="temp">{tempC}°C</p>
      <p>Sensação: {feelsC}°C</p>
      <p>Umidade: {data.main.humidity}%</p>
      <p>Vento: {data.wind.speed} m/s</p>
      <p>{desc}</p>
    </section>
  );
}
