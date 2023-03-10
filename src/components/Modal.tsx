import React from "react";
import styled from "styled-components";

const Container = styled.div`
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Content = styled.div`
  width: 250px;
  height: 110px;
  background-color: ${({ theme }) => theme.bgSide};
  color: ${({ theme }) => theme.text};
  z-index: 10;
  border-radius: 10px;
  box-shadow: 0 5px 20px 0 rgba(0, 0, 0, 0.04);
  position: relative;
  display: flex;
`;
const Text = styled.p`
  font-size: 20px;
  white-space: pre-line;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 10px;
  margin-right: 10px;
  margin-bottom: 50px;
`;

const CloseBtn = styled.button`
  margin-top: 10px;
  cursor: pointer;
  font-weight: 500;
  padding: 11px 28px;
  border-radius: 12px;
  font-size: 0.8rem;
  border: none;
  color: #fff;
  background: #cc1a00;
  transition: all 0.25s ease;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  position: absolute;
  bottom: 0px;
  margin: 0px 10px 10px 10px;
  gap: 80px;
`;

const ConfirmBtn = styled.button`
  margin-top: 10px;
  cursor: pointer;
  font-weight: 500;
  padding: 11px 28px;
  border-radius: 12px;
  font-size: 0.8rem;
  border: none;
  color: #2c3e50;
  background: #fcfcfc;
  transition: all 0.25s ease;
`;

export interface ModalOptions {
  content: string;
  callback: any;
  setIsOpen: any;
}

function Modal({ content, callback, setIsOpen }: ModalOptions) {
  console.log(content);
  return (
    <Container onClick={() => setIsOpen(false)}>
      <Content>
        <Text>{content}</Text>
        <ButtonContainer>
          <CloseBtn onClick={() => setIsOpen(false)}>No</CloseBtn>
          <ConfirmBtn onClick={(e) => callback(e)}>Yes</ConfirmBtn>
        </ButtonContainer>
      </Content>
    </Container>
  );
}

export default Modal;
