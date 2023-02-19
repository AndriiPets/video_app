import axios from "axios";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { CommentType, Channel } from "../utils/Types";
import { format } from "timeago.js";

const Container = styled.div`
  display: flex;
  gap: 24px;
  margin: 30px 0px;
`;
const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;
const Details = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  color: ${({ theme }) => theme.text};
`;
const Name = styled.span`
  font-size: 13px;
  font-weight: 500;
`;

const Date = styled.span`
  font-size: 12px;
  font-weight: 400;
  margin-left: 5px;
  color: ${({ theme }) => theme.textSoft};
`;

const Text = styled.span`
  font-size: 14px;
`;

function Comment({ comment }: { comment: CommentType }) {
  const [channel, setChannel] = useState<Channel>();

  useEffect(() => {
    const fetchComment = async () => {
      const res = await axios.get(
        `http://localhost:8000/api/users/find/${comment.userId}`,
        { withCredentials: true }
      );
      setChannel(res.data);
    };
    fetchComment();
  }, [comment.userId]);

  return (
    <Container>
      <Avatar src={channel?.image} />
      <Details>
        <Name>
          {channel?.name}
          <Date>{format(comment.createdAt)}</Date>
        </Name>
        <Text>{comment.desc}</Text>
      </Details>
    </Container>
  );
}

export default Comment;
