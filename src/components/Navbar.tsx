import React, { useState, useEffect } from "react";
import styled from "styled-components";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import VideoCallIcon from "@mui/icons-material/VideoCallOutlined";
import { Menu } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import axios from "axios";
import { useDispatch } from "react-redux";
import { logout } from "../redux/userSlice";
import Upload from "./Upload";
import logoImg from "../img/Rocket-PNG-Clipart.png";
import Logo from "./LogoMenu";

const Container = styled.div`
  position: sticky;
  top: 0;
  background-color: ${({ theme }) => theme.bgSide};
  height: 56px;
  color: ${({ theme }) => theme.text};
  z-index: 1;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  pad: 0px 20px;
  position: relative;
`;

const Search = styled.div`
  position: absolute;
  width: 40%;
  left: 0px;
  right: 0px;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 3px;
`;

const Input = styled.input`
  border: none;
  background-color: transparent;
  outline: none;
  color: ${({ theme }) => theme.text};
`;

const Button = styled.button`
  padding: 5px 15px;
  margin-right: 15px;
  background-color: transparent;
  border: 1px solid #3ea6ff;
  color: #3ea6ff;
  border-radius: 3px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const User = styled.div`
  align-items: center;
  display: flex;
  gap: 10px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
  margin-right: 15px;
`;
const Avatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #999;
`;

function Navbar() {
  const { currUser } = useSelector((state: RootState) => state.user);

  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  const [q, setQ] = useState("");

  const dispatch = useDispatch();

  const userLogout = async () => {
    await axios.get("http://localhost:8000/api/auth/logout", {
      withCredentials: true,
    });
    dispatch(logout());
  };

  return (
    <>
      <Container>
        <Wrapper>
          <Logo />
          <Search>
            <Input
              placeholder="Search..."
              onChange={(e) => setQ(e.target.value)}
            />
            <SearchOutlinedIcon onClick={() => navigate(`/search?q=${q}`)} />
          </Search>
          {currUser ? (
            <User>
              <Button onClick={() => userLogout()}>SIGN OUT</Button>
              <VideoCallIcon onClick={() => setOpen(true)} />
              <Avatar src={currUser.image} />
              {currUser.name}
            </User>
          ) : (
            <Link to="signin" style={{ textDecoration: "none" }}>
              <Button>
                <AccountCircleOutlinedIcon />
                SIGN IN
              </Button>
            </Link>
          )}
        </Wrapper>
      </Container>
      {open && <Upload setOpen={setOpen} />}
    </>
  );
}

export default Navbar;
