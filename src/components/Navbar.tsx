import React, { useState, useEffect } from "react";
import styled from "styled-components";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import VideoCallIcon from "@mui/icons-material/VideoCallOutlined";
import AccountBox from "@mui/icons-material/AccountBox";
import VideoSettings from "@mui/icons-material/VideoSettings";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import axios from "axios";
import { useDispatch } from "react-redux";
import { logout } from "../redux/userSlice";
import Upload from "./Upload";
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
  position: relative;
`;
const Avatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #999;
  cursor: pointer;
`;

//sort drawer

const SortDrawer = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${({ theme }) => theme.text};
  top: 0;
  right: 0;
`;

const Dropdown = styled.div`
  display: flex;
  position: relative;
  padding-top: 10px;
`;

const Content = styled.div`
  background-color: ${({ theme }) => theme.soft};
  padding: 5px 5px 5px 5px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const UserHeader = styled.div`
  display: flex;
  gap: 10px;
  margin: 3px 3px 3px 3px;
  padding: 10px 10px 10px 10px;
`;

const UserHeaderDesc = styled.div`
  display: flex;
  flex-direction: column;
`;

const Hr = styled.hr`
  margin: 3px 0px;
  border: 0.1px solid ${({ theme }) => theme.text};
`;

const OptonContainer = styled.button`
  border: none;
  display: flex;
  gap: 10px;
  cursor: pointer;
  padding: 10px 10px 10px 10px;
  margin: 3px 3px 3px 3px;
  border-radius: 10px;
  color: ${({ theme }) => theme.text};
  background-color: transparent;
  &:hover {
    background-color: ${({ theme }) => theme.bgMain};
  }
`;

const Option = styled.h3`
  white-space: nowrap;
`;

const Text = styled.p``;

function Navbar() {
  const { currUser } = useSelector((state: RootState) => state.user);

  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  const [q, setQ] = useState("");

  const dispatch = useDispatch();

  const [openOptions, setOpenOptions] = useState(false);

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
              <Dropdown>
                {!openOptions && (
                  <Button onClick={() => userLogout()}>SIGN OUT</Button>
                )}
                <VideoCallIcon onClick={() => setOpen(true)} />
                {openOptions && (
                  <SortDrawer>
                    <Content>
                      <UserHeader>
                        <Avatar src={currUser.image} />
                        <UserHeaderDesc>
                          <Text>{currUser.name}</Text>
                          <Text>{currUser.email}</Text>
                        </UserHeaderDesc>
                      </UserHeader>
                      <Hr />
                      <OptonContainer
                        onClick={() => {
                          navigate(`/channel/${currUser?._id}`);
                          setOpenOptions(false);
                        }}
                      >
                        <AccountBox />
                        <Option>My channel</Option>
                      </OptonContainer>
                      <OptonContainer
                        onClick={(e) => {
                          navigate(`/manage/${currUser?._id}`);
                          setOpenOptions(false);
                        }}
                      >
                        <VideoSettings />
                        <Option>Manage videos</Option>
                      </OptonContainer>
                    </Content>
                  </SortDrawer>
                )}
              </Dropdown>

              <Avatar
                src={currUser.image}
                onClick={() => setOpenOptions(!openOptions)}
              />
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
      {open && <Upload setOpen={setOpen} type="upload" />}
    </>
  );
}

export default Navbar;
