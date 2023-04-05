import axios from "axios";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import Card from "../components/Card";
import { Video } from "../utils/Types";
import { open, close } from "../redux/uiSlice";
import { useDispatch } from "react-redux";
import serverURL from "../utils/ServerURL";

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

function Search() {
  const [videos, setVideos] = useState<Video[]>([]);
  const query = useLocation().search;
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchVideos = async () => {
      const res = await axios.get(`${serverURL}/api/videos/search${query}`);
      setVideos(res.data);
    };
    fetchVideos();
  }, [query]);

  useEffect(() => {
    dispatch(open());
  }, []);

  return (
    <Container>
      {videos.map((video) => (
        <Card key={video._id} video={video} type="bg" />
      ))}
    </Container>
  );
}

export default Search;
