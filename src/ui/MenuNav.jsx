export default function MenuNav({ onNavigate, currentPage, isAuth }) {
  return (
    <nav
      style={{
        display: "flex",
        gap: "12px",
        padding: "10px",
        justifyContent: "center",
        borderBottom: "1px solid #ccc",
      }}
    >
      <button
        onClick={() => onNavigate("login")}
        style={{ fontWeight: currentPage === "login" ? "bold" : "normal" }}
      >
        Login
      </button>

      <button
        onClick={() => onNavigate("clima")}
        disabled={!isAuth}
        style={{
          fontWeight: currentPage === "clima" ? "bold" : "normal",
          opacity: isAuth ? 1 : 0.5,
          cursor: isAuth ? "pointer" : "not-allowed",
        }}
      >
        Clima
      </button>
    </nav>
  );
}
