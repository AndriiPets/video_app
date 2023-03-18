import React from "react";
import styled from "styled-components";
import { CreatorProps } from "../utils/Types";
import Edit from "@mui/icons-material/Edit";
import Delete from "@mui/icons-material/Delete";

const Container = styled.div`
  display: flex;
  align-items: stretch;
  border-top: 0.5px solid ${({ theme }) => theme.text};
  border-bottom: 0.5px solid ${({ theme }) => theme.text};
  gap: 15px;
  color: ${({ theme }) => theme.text};
`;

const Image = styled.img`
  background-color: #999;
  width: 120px;
  height: 68px;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
`;

const VideoBox = styled.div`
  display: flex;
  flex: 3;
  gap: 15px;
`;

const Title = styled.h3`
  align-self: flex-start;
  margin-top: 10px;
`;
const Desc = styled.p``;
const Content = styled.p`
  margin-top: 10px;
`;
const UploadDate = styled.div`
  display: flex;
  flex-direction: column;

  flex: 1;
`;
const Views = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;
const Comments = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;
const Likes = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;
const Options = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const OptionButton = styled.div`
  display: flex;
  cursor: pointer;
`;
export interface Card {}

function CreatorCard({ video }: CreatorProps) {
  // todo unsigned users cannot see video comments
  const videoDate = new Date(video.createdAt.toString());
  const dateOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  } as const;

  return (
    <Container>
      <VideoBox>
        <Image src={video.imgUrl} />
        <Details>
          <Title>{video.title}</Title>
          <Desc>{video.desc.slice(0, 20)}</Desc>
        </Details>
      </VideoBox>
      <UploadDate>
        <Content>{videoDate.toLocaleDateString("en-US", dateOptions)}</Content>
      </UploadDate>
      <Views>
        <Content>{video.views}</Content>
      </Views>
      <Comments>
        <Content>1</Content>
      </Comments>
      <Likes>
        <Content>100%</Content>
      </Likes>
      <Options>
        <Content>
          <OptionButton>
            <Edit />
            Edit
          </OptionButton>
        </Content>
        <Content>
          <OptionButton>
            <Delete />
            Delete
          </OptionButton>
        </Content>
      </Options>
    </Container>
  );
}

export default CreatorCard;
