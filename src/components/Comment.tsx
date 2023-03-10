import axios from "axios";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { CommentType, Channel } from "../utils/Types";
import { format } from "timeago.js";
import { Edit, Delete, MoreVert } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import Modal from "./Modal";

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

const IconBox = styled.div`
  padding: 5px 5px 5px 5px;
  border-radius: 50%;
  background-color: transparent;

  position: relative;
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

const EditButton = styled.button`
  border-radius: 10px;
  padding-left: 15px;
  padding-right: 15px;
  cursor: pointer;
  font-weight: 500;
  height: 40px;
  border: none;
  background-color: transparent;
  color: ${({ theme }) => theme.text};
  &:hover {
    background-color: ${({ theme }) => theme.soft};
  }
`;

const EditForm = styled.form`
  display: flex;
  justify-content: space-between;
  gap: 24px;
  width: 100%;
`;

// edit delete options

const Drawer = styled.div`
  margin-top: 3px;
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${({ theme }) => theme.text};
  margin-top: 3px;
`;

const Content = styled.div`
  z-index: 1;
  background-color: ${({ theme }) => theme.soft};
  padding: 5px 5px 5px 5px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const OptonContainer = styled.button`
  border: none;
  cursor: pointer;
  padding: 5px 5px 5px 5px;
  border-radius: 10px;
  color: ${({ theme }) => theme.text};
  background-color: transparent;
  &:hover {
    background-color: ${({ theme }) => theme.bgMain};
  }
`;

const Option = styled.h3``;

function Comment({ comment }: { comment: CommentType }) {
  const { currUser } = useSelector((state: RootState) => state.user);
  const [channel, setChannel] = useState<Channel>();
  const [openEdit, setOpenEdit] = useState(false);
  const [updatedComment, setUpdatedComment] = useState(comment.desc);
  const [defaultComment, setDefaultComment] = useState(comment.desc);
  const [deleted, setDeleted] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  //edit delete options
  const [drawer, setDrawer] = useState(false);

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
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    await axios.delete(`http://localhost:8000/api/comments/${comment._id}`, {
      withCredentials: true,
    });
    setDeleted(false);
  };

  //modal options
  const modalOptions = {
    content: "do you want to delele this comment?",
    callback: deleteComment,
    setIsOpen: setModalOpen,
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
              <IconBox onClick={() => setDrawer(!drawer)}>
                <MoreVert />

                {drawer && (
                  <Drawer>
                    <Content>
                      <OptonContainer onClick={() => setOpenEdit(true)}>
                        <Option>edit</Option>
                      </OptonContainer>
                      <OptonContainer onClick={() => setModalOpen(true)}>
                        <Option>delete</Option>
                      </OptonContainer>
                    </Content>
                  </Drawer>
                )}
              </IconBox>
              {/* <Edit onClick={() => setOpenEdit(true)} />
              <Delete onClick={(e) => deleteComment(e)} /> */}
            </IconWrapper>
          )}
          {modalOpen && <Modal {...modalOptions} />}
        </Container>
      )}
    </div>
  );
}

export default Comment;
