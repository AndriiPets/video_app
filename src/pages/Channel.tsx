import axios from "axios";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import Card from "../components/Card";
import { CardProps, Channel } from "../utils/Types";
import Subscription from "./Subscription";
import { open, close } from "../redux/uiSlice";
import { useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { useSelector } from "react-redux";
import Edit from "@mui/icons-material/Edit";
import Camera from "@mui/icons-material/PhotoCameraOutlined";
import BottomModal from "../components/ModalBottom";
import ImageEditModal from "../components/ImageEditModal";

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  position: relative;
`;

const VideosWrapper = styled.div`
  display: flex;
`;

const ChannelHeader = styled.div`
  background-color: ${({ theme }) => theme.bgMain};
  justify-content: space-between;
  display: flex;
  height: 100px;
  width: 100%;
  border-bottom: 0.5px solid ${({ theme }) => theme.text};
  margin-bottom: 25px;
`;

const Wrapper = styled.div`
  display: flex;
`;

const ChannelInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: ${({ theme }) => theme.text};
  margin-left: 25px;
  height: 80px;
`;
const Title = styled.h1`
  font-weight: 500;
`;

const Text = styled.p``;

const SubCount = styled.h5`
  font-weight: 200;
`;

const ChannelAvatar = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
`;

const SubButton = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const EditButton = styled.button`
  background-color: ${({ theme }) => theme.bgMain};
  color: white;
  border: none;
  height: max-content;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 10px;
  &:hover {
    background-color: ${({ theme }) => theme.soft};
  }
`;

const AvatarWrapper = styled.div`
  position: relative;
  width: 80px;
  height: 80px;
  border-radius: 50%;
`;

const EditContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  color: ${({ theme }) => theme.text};
  width: 100%;
`;

const EditGeneralWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const EditWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.bgSide};
  padding: 10px 10px 10px 10px;
  gap: 10px;
  border-radius: 3px;
`;

const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
`;

const Desc = styled.textarea`
  border: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
`;

const EditImage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
  color: white;
  cursor: pointer;
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
`;

function ChannelPage() {
  const [videos, setVideos] = useState([]);
  const [userInfo, setUserInfo] = useState<Channel>();
  const [editState, setEditState] = useState(false);
  const [confirmEdit, setConfirmEdit] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const path = useLocation().pathname.split("/")[2];
  const { menu } = useSelector((state: RootState) => state.ui);
  const { currUser } = useSelector((state: RootState) => state.user);

  //upgate user functionality
  const [updatedUsername, setUpdatedUsername] = useState(userInfo?.name);
  const [updatedUserImage, setUpdatedUserImage] = useState(userInfo?.image);

  const dispatch = useDispatch();

  const loadUser = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/api/users/find/${path}`,
        { withCredentials: true }
      );
      setUserInfo(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const loadVideos = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/api/videos/channel/${path}`,
        { withCredentials: true }
      );
      setVideos(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const modalOptions = {
    callback: setUpdatedUserImage,
    setIsOpen: setOpenModal,
  };

  useEffect(() => {
    loadVideos();
    loadUser();
  }, []);

  useEffect(() => {
    dispatch(open());
  }, []);

  useEffect(() => {
    updatedUserImage && console.log(`updatedImageURL: ${updatedUserImage}`);
  }, [updatedUserImage]);

  return (
    <Container>
      <ChannelHeader>
        <Wrapper>
          <AvatarWrapper>
            <ChannelAvatar
              src={updatedUserImage ? updatedUserImage : userInfo?.image}
            />
            {editState && (
              <EditImage onClick={() => setOpenModal(!openModal)}>
                <Camera />
              </EditImage>
            )}
          </AvatarWrapper>
          <ChannelInfo>
            <Title>{userInfo?.name}</Title>
            <SubCount>{userInfo?.subscribers} subscribers</SubCount>
          </ChannelInfo>
        </Wrapper>
        {userInfo?._id !== currUser?._id ? (
          <SubButton>
            <Subscription channel={userInfo} />
          </SubButton>
        ) : (
          <SubButton>
            <EditButton onClick={() => setEditState(!editState)}>
              <Edit />
            </EditButton>
          </SubButton>
        )}
      </ChannelHeader>
      {!editState && (
        <VideosWrapper>
          {videos.map((video: CardProps["video"]) => (
            <Card key={video._id} video={video} type="bg" />
          ))}
        </VideosWrapper>
      )}
      {editState && (
        <EditContainer>
          <EditGeneralWrapper>
            <Title>General</Title>
            <EditWrapper>
              <Text>Channel Name:</Text>
              <Input
                type="text"
                value={userInfo?.name}
                name="Channel Name"
                placeholder="Channel Name"
              />
              <Text>Channel Description</Text>
              <Desc placeholder="Description" rows={8} name="desc" />
            </EditWrapper>
          </EditGeneralWrapper>
        </EditContainer>
      )}
      {editState && (
        <BottomModal setConfirm={setConfirmEdit} setCancel={setEditState} />
      )}
      {openModal && <ImageEditModal {...modalOptions} />}
    </Container>
  );
}

export default ChannelPage;
