import axios from "axios";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Comment from "./Comment";
import { CommentType } from "../utils/Types";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import SortIcon from "@mui/icons-material/SortSharp";
import OptionDrawer from "./OptionDrawer";
import serverURL from "../utils/ServerURL";

const Container = styled.div`
  color: ${({ theme }) => theme.text};
`;

const CommentForm = styled.form`
  display: flex;
  justify-content: space-between;
  gap: 24px;
  width: 100%;
`;

const NewComment = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  margin: 30px 0px;
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

const Text = styled.span`
  font-size: 14px;
`;

const CommentStats = styled.div`
  display: flex;
  gap: 14px;
  align-items: center;
`;

const SortButton = styled.div`
  cursor: pointer;
  background-color: transparent;
  border: none;
  color: ${({ theme }) => theme.text};
  position: relative;
`;

const CommentButton = styled.button`
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

const SortDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 5px;
`;

//sort drawer
const SortDrawer = styled.div`
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

function Comments({ videoId }: { videoId: string | undefined }) {
  //TODO add new comment functionality
  const { currUser } = useSelector((state: RootState) => state.user);

  const [comments, setComments] = useState<CommentType[]>([]);

  const [comment, setComment] = useState("");

  const [reFetch, setReFetch] = useState(false);

  const [openOptions, setOpenOptions] = useState(false);

  const sendComment = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    await axios.post(
      `${serverURL}/api/comments`,
      {
        desc: comment,
        videoId: videoId,
      },
      { withCredentials: true }
    );
    setComment("");
    setReFetch(!reFetch);
  };

  const sortComments = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setOpenOptions(false);
    console.log("sort");
  };

  useEffect(() => {
    console.log(openOptions);
  }, [openOptions]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get(`${serverURL}/api/comments/${videoId}`, {
          withCredentials: true,
        });
        setComments(res.data);
      } catch (err) {}
    };
    fetchComments();
  }, [videoId, reFetch]);

  return (
    <Container>
      <CommentStats>
        <Text>{comments.length} Comments </Text>
        <SortButton onClick={() => setOpenOptions(!openOptions)}>
          <SortDiv>
            <SortIcon />
            <Text>Sort</Text>
          </SortDiv>
          {openOptions && (
            <SortDrawer>
              <Content>
                <OptonContainer onClick={(e) => sortComments(e)}>
                  <Option>popular</Option>
                </OptonContainer>
                <OptonContainer onClick={(e) => sortComments(e)}>
                  <Option>recent</Option>
                </OptonContainer>
              </Content>
            </SortDrawer>
          )}
        </SortButton>
      </CommentStats>

      <NewComment>
        <Avatar src={currUser?.image} />
        <CommentForm>
          <Input
            value={comment}
            placeholder="Add a comment..."
            type="text"
            onChange={(e) => setComment(e.target.value)}
          />

          <CommentButton type="submit" onClick={sendComment}>
            SAVE
          </CommentButton>
          <CommentButton
            onClick={(e) => {
              e.preventDefault();
              setComment("");
            }}
          >
            CANCEL
          </CommentButton>
        </CommentForm>
      </NewComment>
      {comments.map((comment) => (
        <Comment key={comment._id} comment={comment} />
      ))}
    </Container>
  );
}

export default Comments;
