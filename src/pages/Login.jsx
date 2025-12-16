import { useState } from "react";
import { auth, signInWithEmailAndPassword } from "../services/firebase";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const cred = await signInWithEmailAndPassword(auth, email, senha);
      // Envia o usuário do Firebase para o App
      onLogin(cred.user);
      setErro("");
    } catch (err) {
      console.error(err);
      setErro("E-mail ou senha inválidos.");
    }
  }

  return (
    <main className="main">
      <h1>Entrar</h1>

      <form className="card" onSubmit={handleSubmit}>
        <label>
          E-mail
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>

        <label>
          Senha
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
        </label>

        {erro && (
          <p style={{ color: "red", fontSize: 14, marginTop: 8 }}>{erro}</p>
        )}

        <button type="submit">Entrar</button>
      </form>

      <div style={{ marginTop: 12, fontSize: 14 }}>
        <p>Usuário:professor@teste.com Senha:123456:</p>
      </div>
    </main>
  );
}
