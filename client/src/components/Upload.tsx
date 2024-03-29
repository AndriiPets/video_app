import React, { Dispatch, SetStateAction, useState, useEffect } from "react";
import styled from "styled-components";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../firebase";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { VideoEditProps, Video } from "../utils/Types";
import serverURL from "../utils/ServerURL";

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #000000ac;
  z-index: 2;
`;

const Wrapper = styled.div<VideoEditProps>`
  width: 600px;
  height: ${(prop) => (prop.type === "upload" ? "600px" : "480px")};
  background-color: ${({ theme }) => theme.bgSide};
  color: ${({ theme }) => theme.text};
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: relative;
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Close = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
`;

const Title = styled.h1`
  text-align: center;
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

const Button = styled.button`
  border-radius: 3px;
  border: none;
  padding: 10px 20px;
  font-weight: 500;
  cursor: pointer;
  background-color: ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
`;

const Lable = styled.label`
  font-size: 14px;
`;

interface Inputs {
  desc?: string;
  title?: string;
  imgUrl?: string;
  videoUrl?: string;
  tags?: string[];
}

interface UploadOptions {
  setOpen: Dispatch<SetStateAction<boolean>>;
  type: string;
  videoToEdit?: Video;
}

function Upload({ setOpen, type, videoToEdit }: UploadOptions) {
  // todo trigger reRender on edit
  const [img, setImg] = useState<File | null>(null);
  const [video, setVideo] = useState<File | null>(null);
  const [imgPerc, setImgPerc] = useState(0);
  const [videoPerc, setVideoPerc] = useState(0);
  const [inputs, setInputs] = useState<Inputs>();
  const [tags, setTags] = useState<string[]>([]);

  //edit functionality
  const [updatedTitle, setUpdatedTitle] = useState(videoToEdit?.title);
  const [updatedDesc, setUpdatedDesc] = useState(videoToEdit?.desc);
  const [updatedTags, setUpdatedTags] = useState(videoToEdit?.tags);

  const navigate = useNavigate();

  const handleTags = (e: React.ChangeEvent<HTMLInputElement>) => {
    type === "upload"
      ? setTags(e.target.value.split(","))
      : setUpdatedTags(e.target.value.split(","));
  };

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const uploadFile = (file: File, urlType: string) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        urlType === "imgUrl"
          ? setImgPerc(Math.round(progress))
          : setVideoPerc(Math.round(progress));
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
            break;
        }
      },
      (error) => {},
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setInputs((prev) => {
            return { ...prev, [urlType]: downloadURL };
          });
        });
      }
    );
  };

  useEffect(() => {
    video && uploadFile(video, "videoUrl");
  }, [video]);

  useEffect(() => {
    img && uploadFile(img, "imgUrl");
  }, [img]);

  const handleUpload = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log(inputs);
    const res = await axios.post(
      `${serverURL}/api/videos`,
      { ...inputs, tags },
      { withCredentials: true }
    );
    setOpen(false);

    res.status === 200 && navigate(`/video/${res.data._id}`);
  };

  const handleEdit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await axios.put(
      `${serverURL}/api/videos/${videoToEdit?._id}`,
      { title: updatedTitle, desc: updatedDesc, tags: updatedTags },
      { withCredentials: true }
    );
    setOpen(false);
  };

  return (
    <Container>
      <Wrapper type={type}>
        <Close onClick={() => setOpen(false)}>X</Close>
        <Title>{type === "upload" ? "Upload a New Video" : "Edit Video"}</Title>
        {type === "upload" && (
          <Box>
            <Lable>Video:</Lable>
            {videoPerc > 0 ? (
              "Uploading:" + videoPerc + "%"
            ) : (
              <Input
                type="file"
                accept="video/*"
                onChange={(e) => e.target.files && setVideo(e.target.files[0])}
              />
            )}
          </Box>
        )}
        <Input
          type="text"
          placeholder="Title"
          value={updatedTitle}
          name="title"
          onChange={(e) => {
            type === "upload"
              ? handleChange(e)
              : setUpdatedTitle(e.target.value);
          }}
        />
        <Desc
          placeholder="Description"
          value={updatedDesc}
          rows={8}
          name="desc"
          onChange={(e) => {
            type === "upload"
              ? handleChange(e)
              : setUpdatedDesc(e.target.value);
          }}
        />
        <Input
          type="text"
          value={updatedTags}
          placeholder="Separate tags with commas."
          onChange={handleTags}
        />
        <Lable>Thumbnail:</Lable>
        {imgPerc > 0 ? (
          "Uploading:" + imgPerc + "%"
        ) : (
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => e.target.files && setImg(e.target.files[0])}
          />
        )}
        {type === "upload" ? (
          <Button onClick={(e) => handleUpload(e)}>Upload</Button>
        ) : (
          <Button onClick={(e) => handleEdit(e)}>Save</Button>
        )}
      </Wrapper>
    </Container>
  );
}

export default Upload;
