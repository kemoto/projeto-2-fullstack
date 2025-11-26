import styled from "styled-components";

export const Page = styled.div`
  min-height: 100vh;
  display: grid;
  place-items: center;
  padding: 24px 16px;
`;

export const Card = styled.div`
  width: 100%;
  max-width: 440px;
  border-radius: 18px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(255, 255, 255, 0.06);
  padding: 16px;
`;

export const Title = styled.h1`
  margin: 0;
  font-size: 24px;
`;

export const Form = styled.form`
  display: grid;
  gap: 12px;
`;

export const Field = styled.div`
  display: grid;
  gap: 6px;
`;

export const Label = styled.label`
  font-size: 12px;
  font-weight: 800;
`;

export const Input = styled.input`
  padding: 11px 12px;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.14);
  background: rgba(0, 0, 0, 0.25);
  outline: none;

  &:focus {
    border-color: rgba(255, 70, 85, 0.35);
  }
`;

export const ErrorText = styled.p`
  margin: 0;
  color: #e53e3e;
  font-size: 13px;
`;

export const SubmitButton = styled.button`
  padding: 11px 14px;
  border-radius: 12px;
  border: 1px solid rgba(255, 70, 85, 0.35);
  background: rgba(255, 70, 85, 0.12);
  cursor: pointer;
  font-weight: 900;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    background: rgba(255, 70, 85, 0.18);
  }
`;
