import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownOffAltOutlinedIcon from "@mui/icons-material/ThumbDownOffAltOutlined";
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
import AddTaskOutlinedIcon from "@mui/icons-material/AddTaskOutlined";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThunbDownIcon from "@mui/icons-material/ThumbDown";
import Comments from "../components/Comments";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { Channel } from "../utils/Types";
import axios from "axios";
import { dislike, fetchSuccess, like } from "../redux/videoSlice";
import { format } from "timeago.js";
import Subscription from "./Subscription";
import Recommendation from "../components/Recommendation";
import { open, close } from "../redux/uiSlice";
import VideoPlayer from "../components/VideoComponent";

const Container = styled.div`
  display: flex;
  gap: 24px;
`;
const Content = styled.div`
  flex: 5;
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

const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
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

const DescriptionBox = styled.div`
  background-color: ${({ theme }) => theme.soft};
  border-radius: 10px;
  padding: 15px 15px 15px 15px;
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.text};
`;

const VideoFrame = styled.div`
  max-height: 520px;
  width: 100%;
  object-fit: cover;
`;

function VideoElement() {
  const { currUser } = useSelector((state: RootState) => state.user);
  const { currVideo } = useSelector((state: RootState) => state.video);
  const { menu } = useSelector((state: RootState) => state.ui);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const path = useLocation().pathname.split("/")[2];

  const [channel, setChannel] = useState<Channel>();

  const videoOptions = {
    autoplay: false,
    playbackRates: [0.5, 1, 1.25, 1.5, 2],
    controls: true,
    responsive: true,
    height: 520,
    sources: [
      {
        src: currVideo?.videoUrl,
        type: "video/mp4",
      },
    ],
  };

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

  useEffect(() => {
    dispatch(close());
  }, []);

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

  return (
    <Container>
      <Content>
        <VideoWrapper>
          <VideoFrame>
            <VideoPlayer options={videoOptions} />
          </VideoFrame>
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
            <Avatar
              src={channel?.image}
              onClick={() => navigate(`/channel/${channel?._id}`)}
            />
            <ChannelDetail>
              <ChannelName>{channel?.name}</ChannelName>
              <ChannelCounter>
                {channel?.subscribers} subscribers
              </ChannelCounter>
            </ChannelDetail>
          </ChannelInfo>
          <Subscription channel={channel} />
        </ChannelContainer>
        <DescriptionBox>
          <Description>{currVideo?.desc}</Description>
        </DescriptionBox>
        <Hr />
        <Comments videoId={currVideo?._id} />
      </Content>
      <Recommendation tags={currVideo?.tags || []} />
    </Container>
  );
}

export default VideoElement;
