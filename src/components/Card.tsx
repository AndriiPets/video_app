import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { CardProps } from "../utils/Types";

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
  return (
    <Link to="video/test" style={{ textDecoration: "none" }}>
      <Container type={type} video={video}>
        <Image type={type} video={video} src={video.imgUrl} />
        <Details type={type} video={video}>
          <ChannelImage
            type={type}
            video={video}
            src="https://yt3.ggpht.com/yti/APfAmoE-Q0ZLJ4vk3vqmV4Kwp0sbrjxLyB8Q4ZgNsiRH=s88-c-k-c0x00ffffff-no-rj-mo"
          />
          <Texts>
            <Title>{video.title}</Title>
            <ChannelName>Dev Dev</ChannelName>
            <Info>{video.views} views 1 day ago</Info>
          </Texts>
        </Details>
      </Container>
    </Link>
  );
}

export default Card;
