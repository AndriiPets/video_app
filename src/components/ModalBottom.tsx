import React from "react";
import styled from "styled-components";
import Close from "@mui/icons-material/Close";

const Container = styled.div`
  position: fixed;
  bottom: 0;
  display: flex;
  background-color: ${({ theme }) => theme.bgMain};
  border: 0.5px solid ${({ theme }) => theme.text};
  border-radius: 5px;
  color: ${({ theme }) => theme.text};
`;

const Content = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 10px 10px 10px 10px;
  width: 100%;
`;

const Buttons = styled.div`
  display: flex;
  gap: 15px;
`;

const Gap = styled.div`
  width: 1004px;
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
      <Content>
        <Buttons>
          <ConfirmButton>Save</ConfirmButton>
          <CancelButton onClick={() => setCancel(false)}>Cancel</CancelButton>
        </Buttons>
        <Gap />
        <Close />
      </Content>
    </Container>
  );
}

export default ModalBottom;
