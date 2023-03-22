import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { open, close } from "../redux/uiSlice";
import { useDispatch } from "react-redux";
import { Video } from "../utils/Types";
import axios from "axios";
import Card from "../components/Card";

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  color: ${({ theme }) => theme.text};
`;

const Title = styled.h1`
  font-weight: 500;
`;

function SearchByTag() {
  const [videos, setVideos] = useState<Video[]>([]);
  const tag = useLocation().search;
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchVideos = async () => {
      const res = await axios.get(
        `http://localhost:8000/api/videos/tags${tag}`,
        { withCredentials: true }
      );
      setVideos(res.data);
    };
    fetchVideos();
  }, [tag]);

  useEffect(() => {
    dispatch(open());
  }, []);

  return (
    <Container>
      <Title>{tag}</Title>
      {videos.map((video) => (
        <Card key={video._id} video={video} type="bg" />
      ))}
    </Container>
  );
}

export default SearchByTag;
