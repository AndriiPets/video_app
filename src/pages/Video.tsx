import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownOffAltOutlinedIcon from "@mui/icons-material/ThumbDownOffAltOutlined";
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
import AddTaskOutlinedIcon from "@mui/icons-material/AddTaskOutlined";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThunbDownIcon from "@mui/icons-material/ThumbDown";
import Comments from "../components/Comments";
import Card from "../components/Card";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { Video, GetVideoResponce, Channel } from "../utils/Types";
import axios, { AxiosResponse } from "axios";
import { dislike, fetchSuccess, like } from "../redux/videoSlice";
import { format } from "timeago.js";
import { subscription } from "../redux/userSlice";

const Container = styled.div`
  display: flex;
  gap: 24px;
`;
const Content = styled.div`
  flex: 5;
`;
const Recomendation = styled.div`
  flex: 2;
`;
const VideoWrapper = styled.div``;
const Title = styled.h1`
  font-size: 18px;
  font-weight: 400;
  margin-top: 20px;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.text};
`;

const Details = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Info = styled.span`
  color: ${({ theme }) => theme.textSoft};
`;

const Buttons = styled.div`
  display: flex;
  gap: 20px;
  color: ${({ theme }) => theme.text};
`;

const Button = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
`;
const Hr = styled.hr`
  margin: 15px 0px;
  border: 0.5px solid ${({ theme }) => theme.soft};
`;

const ChannelContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
const ChannelInfo = styled.div`
  display: flex;
  gap: 20px;
`;
const Subscribe = styled.button`
  background-color: #cc1a00;
  font-weight: 500;
  color: white;
  border: none;
  height: max-content;
  padding: 10px 20px;
  cursor: pointer;
`;

const Subscribed = styled.button`
  background-color: #c1c0bf;
  font-weight: 500;
  color: #676666;
  border: none;
  height: max-content;
  padding: 10px 20px;
  cursor: pointer;
`;

const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;

const ChannelDetail = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.text};
`;

const ChannelName = styled.span`
  font-weight: 500;
`;

const ChannelCounter = styled.span`
  margin-top: 5px;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.textSoft};
  font-size: 12px;
`;

const Description = styled.p`
  font-size: 14px;
`;

const VideoFrame = styled.video`
  max-height: 720px;
  width: 100%;
  object-fit: cover;
`;

function VideoElement() {
  const { currUser } = useSelector((state: RootState) => state.user);
  const { currVideo } = useSelector((state: RootState) => state.video);
  const dispatch = useDispatch();

  const path = useLocation().pathname.split("/")[2];

  const [channel, setChannel] = useState<Channel>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const videoRes = await axios.get(
          `http://localhost:8000/api/videos/find/${path}`
        );
        const channelRes = await axios.get(
          `http://localhost:8000/api/users/find/${videoRes.data.userId}`
        );

        setChannel(channelRes.data);
        console.log(videoRes.data);
        dispatch(fetchSuccess(videoRes.data));
      } catch (err) {}
    };
    fetchData();
  }, [path, dispatch]);

  const handleLike = async () => {
    await axios.put(
      `http://localhost:8000/api/users/like/${currVideo?._id}`,
      {},
      { withCredentials: true }
    );
    dispatch(like(currUser?._id));
  };

  const handleDislike = async () => {
    await axios.put(
      `http://localhost:8000/api/users/dislike/${currVideo?._id}`,
      {},
      { withCredentials: true }
    );
    dispatch(dislike(currUser?._id));
  };

  const handleSub = async () => {
    await axios.put(
      `http://localhost:8000/api/users/sub/${channel?._id}`,
      {},
      { withCredentials: true }
    );
    dispatch(subscription(channel?._id));
  };

  const handleUnsub = async () => {
    await axios.put(
      `http://localhost:8000/api/users/unsub/${channel?._id}`,
      {},
      { withCredentials: true }
    );
    dispatch(subscription(channel?._id));
  };

  return (
    <Container>
      <Content>
        <VideoWrapper>
          <VideoFrame src={currVideo?.videoUrl} />
        </VideoWrapper>
        <Title>{currVideo?.title}</Title>
        <Details>
          <Info>
            {currVideo?.views} views • {format(currVideo?.createdAt || "")}
          </Info>
          <Buttons>
            <Button onClick={() => handleLike()}>
              {currVideo?.likes.includes(currUser?._id || " ") ? (
                <ThumbUpIcon />
              ) : (
                <ThumbUpOutlinedIcon />
              )}
              {currVideo?.likes?.length}
            </Button>
            <Button onClick={() => handleDislike()}>
              {currVideo?.dislikes.includes(currUser?._id || " ") ? (
                <ThunbDownIcon />
              ) : (
                <ThumbDownOffAltOutlinedIcon />
              )}
              {currVideo?.dislikes?.length}
            </Button>
            <Button>
              <ReplyOutlinedIcon /> Share
            </Button>
            <Button>
              <AddTaskOutlinedIcon /> Save
            </Button>
          </Buttons>
        </Details>

        <Hr />
        <ChannelContainer>
          <ChannelInfo>
            <Avatar src={channel?.image} />
            <ChannelDetail>
              <ChannelName>{channel?.name}</ChannelName>
              <ChannelCounter>
                {channel?.subscribers} subscribers
              </ChannelCounter>
              <Description>{currVideo?.desc}</Description>
            </ChannelDetail>
          </ChannelInfo>
          {currUser?.subscribedUsers?.includes(channel?._id || "") ? (
            <Subscribed onClick={() => handleUnsub()}>UNSUBSCRIBE</Subscribed>
          ) : (
            <Subscribe onClick={() => handleSub()}>SUBSCRIBE</Subscribe>
          )}
        </ChannelContainer>
        <Hr />
        <Comments videoId={currVideo?._id} />
      </Content>
      <Recomendation></Recomendation>
    </Container>
  );
}

export default VideoElement;
