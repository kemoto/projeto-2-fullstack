import { HeaderContainer, Logo, ActionButton, Actions } from "./styles";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";

const API_URL = "http://localhost:3001";

const Header = () => {
  const nav = useNavigate();
  const { pathname } = useLocation();
  const { token, logout } = useAuth();

  async function handleLogout() {
    try {
      await fetch(`${API_URL}/auth/logout`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
    } finally {
      logout();
      nav("/login", { replace: true });
    }
  }

  return (
    <HeaderContainer>
      <Logo onClick={() => nav("/")}>VALORANT</Logo>

      <Actions>
        <ActionButton type="button" onClick={() => nav("/create-comp")}>
          Montar Comp
        </ActionButton>

        <ActionButton
          type="button"
          onClick={() => nav("/comps")}
          aria-current={pathname === "/comps" ? "page" : undefined}
        >
          Minhas Comps
        </ActionButton>

        <ActionButton type="button" onClick={handleLogout}>
          Sair
        </ActionButton>
      </Actions>
    </HeaderContainer>
  );
};

export default Header;
