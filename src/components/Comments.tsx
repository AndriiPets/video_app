import axios from "axios";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Comment from "./Comment";
import { CommentType } from "../utils/Types";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const Container = styled.div``;

const NewComment = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
`;
const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;
const Input = styled.input`
  border: none;
  background-color: transparent;
  border-bottom: 1px solid ${({ theme }) => theme.soft};
  outline: none;
  padding: 5px;
  width: 100%;
  color: ${({ theme }) => theme.text};
`;

const CommentButton = styled.button``;

function Comments({ videoId }: { videoId: string | undefined }) {
  //TODO add new comment functionality
  const { currUser } = useSelector((state: RootState) => state.user);

  const [comments, setComments] = useState<CommentType[]>([]);

  const [comment, setComment] = useState("");

  const sendComment = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    await axios.post(
      "http://localhost:8000/api/comments",
      {
        desc: comment,
        videoId: videoId,
      },
      { withCredentials: true }
    );
    setComment("");
  };

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/api/comments/${videoId}`,
          { withCredentials: true }
        );
        setComments(res.data);
      } catch (err) {}
    };
    fetchComments();
  }, [videoId, sendComment]);

  return (
    <Container>
      <form>
        <NewComment>
          <Avatar src={currUser?.image} />
          <Input
            value={comment}
            placeholder="Add a comment..."
            type="text"
            onChange={(e) => setComment(e.target.value)}
          />
          <CommentButton
            onClick={(e) => {
              e.preventDefault();
              setComment("");
            }}
          >
            CANCEL
          </CommentButton>
          <CommentButton type="submit" onClick={sendComment}>
            SUBMIT
          </CommentButton>
        </NewComment>
      </form>
      {comments.map((comment) => (
        <Comment key={comment._id} comment={comment} />
      ))}
    </Container>
  );
}

export default Comments;
