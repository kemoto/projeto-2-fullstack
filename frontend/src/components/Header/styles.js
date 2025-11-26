import styled from "styled-components";

export const HeaderContainer = styled.header`
  background-color: #101823;
  padding: 1.5rem 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 1000;
  border-bottom: 2px solid #ff4655;

  h1 {
    font-size: 2.5rem;
    color: #ff4655;
    text-transform: uppercase;
    letter-spacing: 2px;
  }
`;

export const Logo = styled.div`
  font-size: 2rem;
  font-weight: bold;
  color: #ff4655;
  cursor: pointer;
`;

export const Actions = styled.div`
  width: 100%;
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  align-items: center;
  margin: 16px auto 12px;
  padding: 0 16px;
  flex-wrap: wrap;
`;

export const ActionButton = styled.button`
  padding: 10px 14px;
  border-radius: 10px;
  border: 1px solid rgba(255, 70, 85, 0.35);
  background: rgba(255, 70, 85, 0.12);
  color: #ffffff;
  cursor: pointer;
  font-weight: 700;

  &:hover {
    background: rgba(255, 70, 85, 0.18);
  }
`;