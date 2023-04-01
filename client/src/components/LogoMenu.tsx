import React from "react";
import styled from "styled-components";
import { Menu } from "@mui/icons-material";
import logoImg from "../img/Rocket-PNG-Clipart.png";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { open, close } from "../redux/uiSlice";
import { useDispatch } from "react-redux";

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  margin-left: 10px;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  font-weight: bold;
`;
const Image = styled.img`
  height: 40px;
`;

const Button = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
  color: ${({ theme }) => theme.text};
`;

function LogoMenu() {
  const { menu } = useSelector((state: RootState) => state.ui);

  const dispatch = useDispatch();

  const toggleMenu = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    menu ? dispatch(close()) : dispatch(open());
    console.log(menu);
  };

  return (
    <LogoContainer>
      <Button onClick={(e) => toggleMenu(e)}>
        <Menu />
      </Button>
      <Link to={"/"} style={{ textDecoration: "none", color: "inherit" }}>
        <Logo>
          <Image src={logoImg} />
          AstroTube
        </Logo>
      </Link>
    </LogoContainer>
  );
}

export default LogoMenu;
