import axios from "axios";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { RootState } from "../redux/store";
import { subscription } from "../redux/userSlice";
import { Channel } from "../utils/Types";

const Subscribe = styled.button`
  background-color: #cc1a00;
  font-weight: 500;
  color: white;
  border: none;
  height: max-content;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 10px;
`;

const Subscribed = styled.button`
  background-color: #c1c0bf;
  font-weight: 500;
  color: #676666;
  border: none;
  height: max-content;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 10px;
`;

function Subscription({ channel }: { channel: Channel | undefined }) {
  const dispatch = useDispatch();

  const { currUser } = useSelector((state: RootState) => state.user);

  const handleSub = async () => {
    await axios.put(
      `http://localhost:8000/api/users/sub/${channel?._id}`,
      {},
      { withCredentials: true }
    );
    dispatch(subscription(channel?._id));
  };

  const handleUnsub = async () => {
    await axios.put(
      `http://localhost:8000/api/users/unsub/${channel?._id}`,
      {},
      { withCredentials: true }
    );
    dispatch(subscription(channel?._id));
  };

  return (
    <div>
      {currUser?.subscribedUsers?.includes(channel?._id || "") ? (
        <Subscribed onClick={() => handleUnsub()}>UNSUBSCRIBE</Subscribed>
      ) : (
        <Subscribe onClick={() => handleSub()}>SUBSCRIBE</Subscribe>
      )}
    </div>
  );
}

export default Subscription;
