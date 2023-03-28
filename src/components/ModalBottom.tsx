import React from "react";
import styled from "styled-components";

const Container = styled.div`
  position: sticky;
  bottom: 0;
  display: flex;
  margin-left: 25px;
  margin-right: 25px;
  background-color: ${({ theme }) => theme.bgMain};
  border: 0.5px solid ${({ theme }) => theme.text};
  border-radius: 5px;
`;

const ConfirmButton = styled.button`
  background-color: #cc1a00;
  font-weight: 500;
  color: white;
  border: none;
  height: max-content;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 10px;
`;
const CancelButton = styled.button`
  background-color: #c1c0bf;
  font-weight: 500;
  color: #676666;
  border: none;
  height: max-content;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 10px;
`;
interface Modal {
  setConfirm: any;
  setCancel: any;
}

function ModalBottom({ setConfirm, setCancel }: Modal) {
  return (
    <Container>
      <ConfirmButton>Save</ConfirmButton>
      <CancelButton onClick={() => setCancel(false)}>Cancel</CancelButton>
    </Container>
  );
}

export default ModalBottom;
