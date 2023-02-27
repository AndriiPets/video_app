import axios from "axios";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { CommentType, Channel } from "../utils/Types";
import { format } from "timeago.js";
import { Edit, Delete } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const Container = styled.div`
  display: flex;
  gap: 24px;
  margin: 30px 0px;
  color: ${({ theme }) => theme.text};
`;

const IconWrapper = styled.div`
  display: flex;
  align-self: center;
  cursor: pointer;
  margin-left: auto;
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

const Input = styled.input`
  border: none;
  background-color: transparent;
  border-bottom: 1px solid ${({ theme }) => theme.soft};
  outline: none;
  padding: 5px;
  width: 100%;
  color: ${({ theme }) => theme.text};
`;

const Text = styled.span`
  font-size: 14px;
`;

const EditButton = styled.button``;

const EditForm = styled.form`
  display: flex;
  justify-content: space-between;
  gap: 24px;
  width: 100%;
`;

function Comment({ comment }: { comment: CommentType }) {
  const { currUser } = useSelector((state: RootState) => state.user);
  const [channel, setChannel] = useState<Channel>();
  const [openEdit, setOpenEdit] = useState(false);
  const [updatedComment, setUpdatedComment] = useState(comment.desc);
  const [defaultComment, setDefaultComment] = useState(comment.desc);
  const [deleted, setDeleted] = useState(true);

  useEffect(() => {
    const fetchChannel = async () => {
      const res = await axios.get(
        `http://localhost:8000/api/users/find/${comment.userId}`,
        { withCredentials: true }
      );
      setChannel(res.data);
    };
    fetchChannel();
  }, [comment.userId]);

  const updateComment = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    await axios.put(
      `http://localhost:8000/api/comments/edit/${comment._id}`,
      { desc: updatedComment },
      { withCredentials: true }
    );
    setUpdatedComment("");
    setOpenEdit(false);
    setDefaultComment(updatedComment);
  };

  const deleteComment = async (
    e: React.MouseEvent<SVGSVGElement, MouseEvent>
  ) => {
    e.preventDefault();

    await axios.delete(`http://localhost:8000/api/comments/${comment._id}`, {
      withCredentials: true,
    });
    setDeleted(false);
  };

  return (
    <div>
      {deleted && (
        <Container>
          <Avatar src={channel?.image} />
          {openEdit ? (
            <EditForm>
              <Input
                type="text"
                value={updatedComment}
                onChange={(e) => setUpdatedComment(e.target.value)}
              />
              <EditButton type="submit" onClick={updateComment}>
                SAVE
              </EditButton>
              <EditButton
                onClick={() => {
                  setOpenEdit(false);
                  setUpdatedComment(comment.desc);
                }}
              >
                CANCEL
              </EditButton>
            </EditForm>
          ) : (
            <Details>
              <Name>
                {channel?.name}
                <Date>{format(comment.createdAt)}</Date>
              </Name>
              <Text>{defaultComment}</Text>
            </Details>
          )}
          {comment.userId === currUser?._id && !openEdit && (
            <IconWrapper>
              <Edit onClick={() => setOpenEdit(true)} />
              <Delete onClick={(e) => deleteComment(e)} />
            </IconWrapper>
          )}
        </Container>
      )}
    </div>
  );
}

export default Comment;
