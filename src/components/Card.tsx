import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { CardProps, Channel } from "../utils/Types";
import { format } from "timeago.js";
import axios, { AxiosError } from "axios";

const Container = styled.div<CardProps>`
  width: ${(prop) => prop.type !== "sm" && "290px"};
  margin-bottom: ${(prop) => (prop.type === "sm" ? "10px" : "45px")};
  cursor: pointer;
  display: ${(prop) => prop.type === "sm" && "flex"};
  gap: 10px;
`;

const Image = styled.img<CardProps>`
  width: 100%;
  height: ${(prop) => (prop.type === "sm" ? "110px" : "192px")};
  background-color: #999;
  flex: 1;
  border-radius: ${(prop) => (prop.type === "sm" ? "10px" : "0%")};
`;
const Details = styled.div<CardProps>`
  display: flex;
  margin-top: ${(prop) => prop.type !== "sm" && "16px"};
  gap: 12px;
  flex: 1;
`;

const ChannelImage = styled.img<CardProps>`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #999;
  display: ${(prop) => prop.type === "sm" && "none"};
`;
const Texts = styled.div``;
const Title = styled.h1`
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
`;
const ChannelName = styled.h2`
  font-size: 14px;
  color: ${({ theme }) => theme.textSoft};
  margin: 9px 0px;
`;
const Info = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.textSoft};
`;

function Card({ type, video }: CardProps) {
  const [channel, setChannel] = useState<Channel>();

  const [error, setError] = useState<null | AxiosError | Error>(null);

  useEffect(() => {
    const fetchChannel = async () => {
      const res = await axios.get(
        `http://localhost:8000/api/users/find/${video.userId}`
      );
      setChannel(res.data);
    };
    fetchChannel();
  }, [video.userId]);

  return (
    <Link to={`/video/${video._id}`} style={{ textDecoration: "none" }}>
      <Container type={type} video={video}>
        <Image type={type} video={video} src={video.imgUrl} />
        <Details type={type} video={video}>
          <ChannelImage type={type} video={video} src={channel?.image} />
          <Texts>
            <Title>{video.title}</Title>
            <ChannelName>{channel?.name}</ChannelName>
            <Info>
              {video.views} views {format(video.createdAt)}
            </Info>
          </Texts>
        </Details>
      </Container>
    </Link>
  );
}

export default Card;
