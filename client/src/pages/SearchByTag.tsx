import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { open, close } from "../redux/uiSlice";
import { useDispatch } from "react-redux";
import { Video } from "../utils/Types";
import axios from "axios";
import Card from "../components/Card";
import serverURL from "../utils/ServerURL";

const Container = styled.div`
  color: ${({ theme }) => theme.text};
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;
`;

const VideosWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const Title = styled.h1`
  font-weight: 500;
`;

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
const Text = styled.p``;

function SearchByTag() {
  const [videos, setVideos] = useState<Video[]>([]);
  const tag = useLocation().search;
  const tagName = "#" + tag?.split("=")[1];
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchVideos = async () => {
      const res = await axios.get(`${serverURL}/api/videos/tags${tag}`, {
        withCredentials: true,
      });
      setVideos(res.data);
    };
    fetchVideos();
  }, [tag]);

  useEffect(() => {
    dispatch(open());
  }, []);

  return (
    <Container>
      <Wrapper>
        <TitleWrapper>
          <Title>{tagName}</Title>
          <Text>{videos.length} videos</Text>
        </TitleWrapper>
        <VideosWrapper>
          {videos.map((video) => (
            <Card key={video._id} video={video} type="bg" />
          ))}
        </VideosWrapper>
      </Wrapper>
    </Container>
  );
}

export default SearchByTag;
