import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import styled, { ThemeProvider } from 'styled-components';
import Menu from './components/Menu';
import Navbar from './components/Navbar';
import { darkTheme,lightTheme, Theme } from './utils/Theme'
import {
  BrowserRouter,
  createBrowserRouter,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";
import Home from './pages/Home';
import Video from './pages/Video';
import Signin from './pages/Signin';

const Container = styled.div`
  display: flex;
`

const Main = styled.div`
  flex:7;
  background-color: ${({theme}) => theme.bgMain};
`

const Wrapper = styled.div`
  padding: 22px 56px;
`

function App() {

  const [ dark, setDark ] = useState(true)

  return (
    <ThemeProvider theme={dark ? darkTheme : lightTheme}>
      <Container>
        <BrowserRouter>
          <Menu setDark={setDark} dark={dark} />
          <Main>
            <Navbar />
            <Wrapper>
              <Routes>
                <Route path='/'>
                  <Route index element={<Home />} />
                  <Route path='signin' element={<Signin />} />
                  <Route path='video'>
                    <Route path=':id' element={<Video />} />
                  </Route>
                </Route>
              </Routes>
            </Wrapper>
          </Main>
        </BrowserRouter>
      </Container>
    </ThemeProvider>
  );
}

export default App;
