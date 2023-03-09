import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import styled, { ThemeProvider } from "styled-components";
import Menu from "./components/Menu";
import Navbar from "./components/Navbar";
import { darkTheme, lightTheme, Theme } from "./utils/Theme";
import {
  BrowserRouter,
  createBrowserRouter,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";
import Home from "./pages/Home";
import Video from "./pages/Video";
import Signin from "./pages/Signin";
import ChannelPage from "./pages/Channel";
import Search from "./pages/Search";
import { RootState } from "./redux/store";
import { useSelector } from "react-redux";

const Container = styled.div``;

const Main = styled.div`
  flex: 7;
  background-color: ${({ theme }) => theme.bgMain};
`;

const Content = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Wrapper = styled.div`
  padding: 22px 56px;
`;

function App() {
  const [dark, setDark] = useState(true);

  const { menu } = useSelector((state: RootState) => state.ui);

  return (
    <ThemeProvider theme={dark ? darkTheme : lightTheme}>
      <BrowserRouter>
        <Container>
          <div>
            <Navbar />
            <Content>
              {menu && <Menu setDark={setDark} dark={dark} />}
              <Main>
                <Wrapper>
                  <Routes>
                    <Route path="/">
                      <Route index element={<Home type="random" />} />
                      <Route path="trends" element={<Home type="trend" />} />
                      <Route
                        path="subscriptions"
                        element={<Home type="sub" />}
                      />
                      <Route path="search" element={<Search />} />
                      <Route path="signin" element={<Signin />} />
                      <Route path="video">
                        <Route path=":id" element={<Video />} />
                      </Route>
                      <Route path="channel">
                        <Route path=":id" element={<ChannelPage />} />
                      </Route>
                    </Route>
                  </Routes>
                </Wrapper>
              </Main>
            </Content>
          </div>
        </Container>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
