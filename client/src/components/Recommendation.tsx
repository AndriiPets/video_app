import axios from "axios";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { CardProps } from "../utils/Types";
import Card from "./Card";
import serverURL from "../utils/ServerURL";

const Container = styled.div`
  flex: 2;
`;

function Recommendation({ tags }: { tags: string[] }) {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      const res = await axios.get(`${serverURL}/api/videos/tags?tags=${tags}`, {
        withCredentials: true,
      });
      setVideos(res.data);
    };
    fetchVideos();
    console.log(videos);
  }, [tags]);

  return (
    <Container>
      {videos.map((video: CardProps["video"]) => (
        <Card key={video._id} video={video} type="sm" />
      ))}
    </Container>
  );
}

export default Recommendation;
