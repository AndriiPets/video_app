import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Close from "@mui/icons-material/Close";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../firebase";

const Container = styled.div`
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Content = styled.div`
  background-color: ${({ theme }) => theme.bgSide};
  color: ${({ theme }) => theme.text};
  z-index: 10;
  border-radius: 10px;
  box-shadow: 0 5px 20px 0 rgba(0, 0, 0, 0.04);
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 10px 10px 10px 10px;
  gap: 15px;
`;

const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
`;
const Title = styled.h3`
  font-weight: 500;
`;

const Text = styled.p``;
const BottomRow = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const IconWrapper = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
`;

const ConfirmBtn = styled.button`
  cursor: pointer;
  font-weight: 500;
  padding: 11px 28px;
  border-radius: 12px;
  font-size: 0.8rem;
  border: none;
  color: #fff;
  background: #cc1a00;
  transition: all 0.25s ease;
`;

const DisabledBtn = styled.button`
  cursor: pointer;
  font-weight: 500;
  padding: 11px 28px;
  border-radius: 12px;
  font-size: 0.8rem;
  border: none;
  color: #2c3e50;
  background: #fcfcfc;
  transition: all 0.25s ease;
`;

export interface ImageModalOptions {
  callback: any;
  setIsOpen: any;
}

function ImageEditModal({ callback, setIsOpen }: ImageModalOptions) {
  const [editedImage, setEditedImage] = useState<File | null>(null);
  const [downloadUrl, setDownloadUrl] = useState("");
  const [imgPerc, setImgPerc] = useState(0);

  const uploadFile = (file: File) => {
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

        setImgPerc(Math.round(progress));

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
          setDownloadUrl(downloadURL);
        });
      }
    );
  };

  useEffect(() => {
    editedImage && uploadFile(editedImage);
  }, [editedImage]);

  return (
    <Container>
      <Content>
        <TitleWrapper>
          <Title>Choose a Picture:</Title>
          <IconWrapper onClick={() => setIsOpen(false)}>
            <Close />
          </IconWrapper>
        </TitleWrapper>
        {imgPerc > 0 ? (
          "Uploading:" + imgPerc + "%"
        ) : (
          <Input
            type="file"
            name="image"
            accept="image/*"
            onChange={(e) =>
              e.target.files && setEditedImage(e.target.files[0])
            }
          />
        )}
        <BottomRow>
          {imgPerc < 100 ? (
            <DisabledBtn>Upload</DisabledBtn>
          ) : (
            <ConfirmBtn
              onClick={() => {
                callback(downloadUrl);
                setIsOpen(false);
              }}
            >
              Upload
            </ConfirmBtn>
          )}

          <Text>Use a URL</Text>
        </BottomRow>
      </Content>
    </Container>
  );
}

export default ImageEditModal;
