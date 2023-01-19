import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import styled, { ThemeProvider } from 'styled-components';
import Menu from './components/Menu';
import Navbar from './components/Navbar';
import { darkTheme,lightTheme, Theme } from './utils/Theme'

const Container = styled.div`
  display: flex;
`

const Main = styled.div`
  flex:7;
  background-color: ${({theme}) => theme.bgMain};
`

const Wrapper = styled.div``

function App() {

  const [ dark, setDark ] = useState(true)

  return (
    <ThemeProvider theme={dark ? darkTheme : lightTheme}>
      <Container>
        <Menu setDark={setDark} dark={dark} />
        <Main>
          <Navbar />
          <Wrapper>
            video cards
          </Wrapper>
        </Main>
      </Container>
    </ThemeProvider>
  );
}

export default App;
