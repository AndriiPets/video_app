import axios from "axios";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import Card from "../components/Card";
import { Video } from "../utils/Types";

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

function Search() {
  const [videos, setVideos] = useState<Video[]>([]);
  const query = useLocation().search;

  useEffect(() => {
    const fetchVideos = async () => {
      const res = await axios.get(
        `http://localhost:8000/api/videos/search${query}`
      );
      setVideos(res.data);
    };
    fetchVideos();
  }, [query]);

  return (
    <Container>
      {videos.map((video) => (
        <Card key={video._id} video={video} type="bg" />
      ))}
    </Container>
  );
}

export default Search;
