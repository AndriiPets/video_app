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
`;

function Comments({ videoId }: { videoId: string | undefined }) {
  //TODO add new comment functionality
  const { currUser } = useSelector((state: RootState) => state.user);

  const [comments, setComments] = useState<CommentType[]>([]);

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
  }, [videoId]);

  return (
    <Container>
      <NewComment>
        <Avatar src={currUser?.image} />
        <Input placeholder="Add a comment..." />
      </NewComment>
      {comments.map((comment) => (
        <Comment key={comment._id} comment={comment} />
      ))}
    </Container>
  );
}

export default Comments;
