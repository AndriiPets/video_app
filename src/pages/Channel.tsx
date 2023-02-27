import axios from "axios";
import Reac, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import Card from "../components/Card";
import { CardProps, Channel } from "../utils/Types";
import Subscription from "./Subscription";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const ChannelHeader = styled.div`
  background-color: ${({ theme }) => theme.bgMain};
  justify-content: space-between;
  display: flex;
  height: 100px;
  width: 100%;
  border-bottom: 0.5px solid ${({ theme }) => theme.text};
  margin-bottom: 25px;
`;

const Wrapper = styled.div`
  display: flex;
`;

const ChannelInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: ${({ theme }) => theme.text};
  margin-left: 25px;
  height: 80px;
`;
const Title = styled.h1`
  font-weight: 500;
`;
const SubCount = styled.h5`
  font-weight: 200;
`;

const ChannelAvatar = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
`;

const SubButton = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

function ChannelPage() {
  const [videos, setVideos] = useState([]);
  const [userInfo, setUserInfo] = useState<Channel>();
  const path = useLocation().pathname.split("/")[2];

  const loadUser = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/api/users/find/${path}`,
        { withCredentials: true }
      );
      setUserInfo(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const loadVideos = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/api/videos/channel/${path}`,
        { withCredentials: true }
      );
      setVideos(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadVideos();
    loadUser();
  }, []);

  return (
    <Container>
      <ChannelHeader>
        <Wrapper>
          <ChannelAvatar src={userInfo?.image} />
          <ChannelInfo>
            <Title>{userInfo?.name}</Title>
            <SubCount>{userInfo?.subscribers} subscribers</SubCount>
          </ChannelInfo>
        </Wrapper>
        <SubButton>
          <Subscription channel={userInfo} />
        </SubButton>
      </ChannelHeader>
      {videos.map((video: CardProps["video"]) => (
        <Card key={video._id} video={video} type="bg" />
      ))}
    </Container>
  );
}

export default ChannelPage;
