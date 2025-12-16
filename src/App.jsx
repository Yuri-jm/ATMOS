import { useState } from "react";
import Login from "./pages/Login";
import Clima from "./pages/Clima";
import MenuNav from "./ui/MenuNav";
import "./styles.css";

export default function App() {
  const [page, setPage] = useState("login");
  const [isAuth, setIsAuth] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  function handleLogin(user) {
    // user vem do Firebase (userCredential.user)
    setIsAuth(true);
    setUserEmail(user.email || "");
    setPage("clima");
  }

  function handleLogout() {
    setIsAuth(false);
    setUserEmail("");
    setPage("login");
  }

  function handleNavigate(nextPage) {
    if (nextPage === "clima" && !isAuth) {
      setPage("login");
    } else {
      setPage(nextPage);
    }
  }

  return (
    <>
      <MenuNav onNavigate={handleNavigate} currentPage={page} isAuth={isAuth} />

      {page === "login" && <Login onLogin={handleLogin} />}

      {page === "clima" && isAuth && (
        <Clima userEmail={userEmail} onLogout={handleLogout} />
      )}
    </>
  );
}
