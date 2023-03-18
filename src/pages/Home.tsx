import axios, { AxiosError, isAxiosError } from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Card from "../components/Card";
import { CardProps } from "../utils/Types";
import { open, close } from "../redux/uiSlice";
import { useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { useSelector } from "react-redux";

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
`;

function Home({ type }: { type: string }) {
  const [videos, setVideos] = useState([]);

  const { menu } = useSelector((state: RootState) => state.ui);

  const dispatch = useDispatch();

  const [error, setError] = useState<null | AxiosError | Error>(null);

  const loadVideos = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/api/videos/${type}`, {
        withCredentials: true,
      });
      setVideos(res.data);
      setError(null);
    } catch (err) {
      console.log(err);
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

  useEffect(() => {
    dispatch(open());
  }, []);

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
