import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { CreatorProps } from "../utils/Types";
import Edit from "@mui/icons-material/Edit";
import Delete from "@mui/icons-material/Delete";
import axios from "axios";
import Modal from "./Modal";
import Upload from "./Upload";

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

function CreatorCard({ video, edit, setEdit }: CreatorProps) {
  const [deleted, setDeleted] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const videoDate = new Date(video.createdAt.toString());
  const dateOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  } as const;

  const deleteVideo = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    await axios.delete(`http://localhost:8000/api/videos/${video._id}`, {
      withCredentials: true,
    });
    setDeleted(false);
  };

  const likeRatio = () => {
    if (video.likes.length && video.dislikes.length) {
      return (
        video.likes.length / (video.likes.length + video.dislikes.length) + 100
      );
    } else {
      return 100;
    }
  };

  //modal options
  const modalOptions = {
    content: "do you want to delele this video?",
    callback: deleteVideo,
    setIsOpen: setModalOpen,
  };

  return (
    <div>
      {deleted && (
        <Container>
          <VideoBox>
            <Image src={video.imgUrl} />
            <Details>
              <Title>{video.title}</Title>
              <Desc>{video.desc.slice(0, 20)}</Desc>
            </Details>
          </VideoBox>
          <UploadDate>
            <Content>
              {videoDate.toLocaleDateString("en-US", dateOptions)}
            </Content>
          </UploadDate>
          <Views>
            <Content>{video.views}</Content>
          </Views>
          <Comments>
            <Content>1</Content>
          </Comments>
          <Likes>
            <Content>{likeRatio()}%</Content>
          </Likes>
          <Options>
            <Content>
              <OptionButton onClick={() => setEdit(true)}>
                <Edit />
                Edit
              </OptionButton>
            </Content>
            <Content>
              <OptionButton onClick={() => setModalOpen(true)}>
                <Delete />
                Delete
              </OptionButton>
            </Content>
          </Options>
          {modalOpen && <Modal {...modalOptions} />}
          {edit && <Upload setOpen={setEdit} type="edit" videoToEdit={video} />}
        </Container>
      )}
    </div>
  );
}

export default CreatorCard;
