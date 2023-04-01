import axios from "axios";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import Card from "../components/Card";
import CreatorCard from "../components/CreatorCard";
import { open, close } from "../redux/uiSlice";
import { CardProps } from "../utils/Types";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const VideosTitle = styled.div`
  border-top: 0.5px solid ${({ theme }) => theme.text};
  border-bottom: 0.5px solid ${({ theme }) => theme.text};
  display: flex;
  color: ${({ theme }) => theme.text};
  gap: 15px;
`;

const Column = styled.div`
  display: flex;
  flex: 1;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const FirstColumn = styled.div`
  display: flex;
  flex: 3;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const Title = styled.h3`
  align-self: flex-start;
`;

export interface Creator {}

function CreatorPage() {
  const [videos, setVideos] = useState([]);
  const dispatch = useDispatch();
  const path = useLocation().pathname.split("/")[2];
  const [openEdit, setOpenEdit] = useState(false);

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
    dispatch(open());
  }, [openEdit]);

  return (
    <Container>
      <VideosTitle>
        <FirstColumn>
          <Title>Video</Title>
        </FirstColumn>
        <Column>
          <Title>Date</Title>
        </Column>

        <Column>
          <Title>Views</Title>
        </Column>
        <Column>
          <Title>Comments</Title>
        </Column>
        <Column>
          <Title>%Likes</Title>
        </Column>
        <Column>
          <Title>Options</Title>
        </Column>
      </VideosTitle>
      {videos.map((video: CardProps["video"]) => (
        <CreatorCard
          key={video._id}
          video={video}
          edit={openEdit}
          setEdit={setOpenEdit}
        />
      ))}
    </Container>
  );
}

export default CreatorPage;
