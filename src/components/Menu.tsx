import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import styled from "styled-components";
import logoImg from "../img/Rocket-PNG-Clipart.png";
import HomeIcon from "@mui/icons-material/Home";
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import SubscriptionsOutlinedIcon from "@mui/icons-material/SubscriptionsOutlined";
import VideoLibraryOutlinedIcon from "@mui/icons-material/VideoLibraryOutlined";
import HistoryOutlinedIcon from "@mui/icons-material/HistoryOutlined";
import LibraryMusicOutlinedIcon from "@mui/icons-material/LibraryMusicOutlined";
import SportsEsportsOutlinedIcon from "@mui/icons-material/SportsEsportsOutlined";
import SportsBasketballOutlinedIcon from "@mui/icons-material/SportsBasketballOutlined";
import MovieOutlinedIcon from "@mui/icons-material/MovieOutlined";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import LiveTvOutlinedIcon from "@mui/icons-material/LiveTvOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import FlagOutlinedIcon from "@mui/icons-material/FlagOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import SettingsBrightnessOutlinedIcon from "@mui/icons-material/SettingsBrightnessOutlined";
import LightMode from "@mui/icons-material/LightMode";
import DarkMode from "@mui/icons-material/DarkMode";
import { Theme } from "../utils/Theme";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import LogoMenu from "./LogoMenu";
import axios from "axios";
import { Channel } from "../utils/Types";

const Container = styled.div`
  background-color: ${({ theme }) => theme.bgSide};
  height: 100vh;
  color: ${({ theme }) => theme.text};
  font-size: 14px;
  position: sticky;
  top: 0;
  flex: 1;
`;
const Wrapper = styled.div`
  padding: 18px 26px;
`;
const Login = styled.div``;

const Button = styled.button`
  padding: 5px 15px;
  background-color: transparent;
  border: 1px solid #3ea6ff;
  color: #3ea6ff;
  border-radius: 3px;
  font-weight: 500;
  margin-top: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const SubscriptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const Subscription = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
`;
const SubAvatar = styled.img`
  border-radius: 50%;
  height: 36px;
  width: 36px;
  cursor: pointer;
`;
const SubName = styled.p`
  font-weight: 500;
`;

const Text = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  font-weight: bold;
  margin-bottom: 25px;
`;
const Image = styled.img`
  height: 50px;
`;
const Item = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  cursor: pointer;
  padding: 7.5px 0px;
  transition-property: color, background-color, border-color,
    text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter,
    backdrop-filter;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
  transition-timing-function: cubic-bezier(0, 0, 0.2, 1);
  &:hover {
    background-color: ${({ theme }) => theme.soft};
  }
`;
const IconWrapper = styled.div`
  margin-left: 10px;
  &:hover {
    transform: scale(1.25);
  }
`;

const Hr = styled.hr`
  margin: 15px 0px;
  border: 0.5px solid ${({ theme }) => theme.soft};
`;

function Menu({
  setDark,
  dark,
}: {
  setDark: Dispatch<SetStateAction<boolean>>;
  dark: boolean;
}) {
  const { currUser } = useSelector((state: RootState) => state.user);

  const [subs, setSubs] = useState<Channel[]>([]);

  const navigate = useNavigate();

  const fetchSubscriptions = async (user: string) => {
    try {
      const res = await axios.get(
        `http://localhost:8000/api/users/subscriptions/${user}`,
        { withCredentials: true }
      );
      setSubs(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (currUser?._id) {
      fetchSubscriptions(currUser._id);
    }
  }, [currUser]);

  console.log(subs);
  return (
    <Container>
      <Wrapper>
        <Logo></Logo>
        {/* <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          <Logo>
            <Image src={logoImg} />
            AstroTube
          </Logo>
        </Link> */}
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          <Item>
            <IconWrapper>
              <HomeIcon />
            </IconWrapper>
            Home
          </Item>
        </Link>
        <Link to="trends" style={{ textDecoration: "none", color: "inherit" }}>
          <Item>
            <IconWrapper>
              <ExploreOutlinedIcon />
            </IconWrapper>
            Explore
          </Item>
        </Link>
        <Link
          to="subscriptions"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <Item>
            <IconWrapper>
              <SubscriptionsOutlinedIcon />
            </IconWrapper>
            Subscriptions
          </Item>
        </Link>
        <Hr />
        <Item>
          <IconWrapper>
            <VideoLibraryOutlinedIcon />
          </IconWrapper>
          Library
        </Item>
        <Item>
          <IconWrapper>
            <HistoryOutlinedIcon />
          </IconWrapper>
          History
        </Item>
        <Hr />
        {!currUser && (
          <>
            <Login>
              sign in to comment and subscribe!
              <Link to="signin" style={{ textDecoration: "none" }}>
                <Button>
                  <AccountCircleOutlinedIcon />
                  SIGN IN
                </Button>
              </Link>
            </Login>
            <Hr />
          </>
        )}

        {/* <Hr/>
        <Item>
          <LibraryMusicOutlinedIcon />
          Music
        </Item>
        <Item>
          <SportsBasketballOutlinedIcon />
          Sports
        </Item>
        <Item>
          <SportsEsportsOutlinedIcon />
          Gaming
        </Item>
        <Item>
          <MovieOutlinedIcon />
          Movies
        </Item>
        <Item>
          <ArticleOutlinedIcon />
          News
        </Item>
        <Item>
          <LiveTvOutlinedIcon />
          Live
        </Item> */}
        <Item>
          <IconWrapper>
            <SettingsOutlinedIcon />
          </IconWrapper>
          Settings
        </Item>
        <Item>
          <IconWrapper>
            <FlagOutlinedIcon />
          </IconWrapper>
          Report
        </Item>
        <Item>
          <IconWrapper>
            <HelpOutlineOutlinedIcon />
          </IconWrapper>
          Help
        </Item>
        <Item onClick={() => setDark(!dark)}>
          {dark ? (
            <IconWrapper>
              <LightMode />
            </IconWrapper>
          ) : (
            <IconWrapper>
              <DarkMode />
            </IconWrapper>
          )}
          {dark ? "Light" : "Dark"} Mode
        </Item>
        {subs?.length && currUser && (
          <SubscriptionsContainer>
            <Hr />
            <Text>
              <SubName>Subscriptions</SubName>
            </Text>
            {subs.map((sub) => (
              <Subscription key={sub._id}>
                <SubAvatar
                  src={sub.image}
                  onClick={() => navigate(`/channel/${sub._id}`)}
                />
                <SubName>{sub.name}</SubName>
              </Subscription>
            ))}
          </SubscriptionsContainer>
        )}
      </Wrapper>
    </Container>
  );
}

export default Menu;
