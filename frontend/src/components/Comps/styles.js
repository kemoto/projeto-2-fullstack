import styled from "styled-components";

export const Page = styled.div`
  max-width: 980px;
  margin: 0 auto;
  padding: 18px 16px 28px;
`;

export const Card = styled.div`
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(255, 255, 255, 0.06);
  padding: 14px;
`;

export const Title = styled.h1`
  margin: 0 0 10px;
  font-size: 22px;
`;

export const Filters = styled.div`
  display: grid;
  gap: 10px;
  grid-template-columns: 220px 1fr;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

export const Select = styled.select`
  padding: 10px 12px;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.14);
  background: rgba(0, 0, 0, 0.25);
`;

export const Input = styled.input`
  padding: 10px 12px;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.14);
  background: rgba(0, 0, 0, 0.25);
`;

export const ErrorText = styled.p`
  margin: 10px 0 0;
  color: #e53e3e;
`;

export const List = styled.div`
  margin-top: 12px;
  display: grid;
  gap: 10px;
`;

export const TeamItem = styled.div`
  padding: 12px;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(0, 0, 0, 0.18);
`;

export const TeamHeader = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
  align-items: baseline;
  margin-bottom: 10px;
`;

export const TeamName = styled.div`
  font-weight: 800;
`;

export const TeamMeta = styled.div`
  font-size: 13px;
`;

export const Chips = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

export const Chip = styled.span`
  padding: 6px 10px;
  border-radius: 999px;
  font-size: 12px;
  border: 1px solid rgba(255, 255, 255, 0.14);
  background: rgba(255, 255, 255, 0.06);
`;
