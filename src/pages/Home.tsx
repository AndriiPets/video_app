import axios, { AxiosError, isAxiosError } from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Card from "../components/Card";
import { CardProps } from "../utils/Types";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

function Home({ type }: { type: string }) {
  const [videos, setVideos] = useState([]);

  const [error, setError] = useState<null | AxiosError | Error>(null);

  const loadVideos = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/api/videos/${type}`);
      setVideos(res.data);
      setError(null);
    } catch (err) {
      if (isAxiosError(err)) {
        setError(err);
      } else if (err instanceof Error) {
        setError(err);
      } else {
      }
    }
  };

  const displayError = () => {
    return (
      <div>
        Oh no! Something went wrong!.
        {error!.message}
        <button onClick={() => loadVideos()}>Try again!</button>
      </div>
    );
  };

  useEffect(() => {
    loadVideos();
  }, [type]);

  return (
    <Container>
      {error
        ? displayError()
        : videos.map((video: CardProps["video"]) => (
            <Card key={video._id} video={video} type="bg" />
          ))}
    </Container>
  );
}

export default Home;
