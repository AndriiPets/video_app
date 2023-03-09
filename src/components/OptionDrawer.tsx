import React from "react";
import styled from "styled-components";

const Container = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${({ theme }) => theme.text};
  margin-top: 3px;
`;

const Content = styled.div`
  z-index: 1;
  background-color: ${({ theme }) => theme.soft};
  padding: 5px 5px 5px 5px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const OptonContainer = styled.button`
  border: none;
  cursor: pointer;
  padding: 5px 5px 5px 5px;
  border-radius: 10px;
  color: ${({ theme }) => theme.text};
  background-color: transparent;
  &:hover {
    background-color: ${({ theme }) => theme.bgMain};
  }
`;

const Option = styled.h3``;

function OptionDrawer({ options }: { options: string[] }) {
  return (
    <Container>
      <Content>
        {options.map((option) => (
          <OptonContainer>
            <Option>{option}</Option>
          </OptonContainer>
        ))}
      </Content>
    </Container>
  );
}

export default OptionDrawer;
