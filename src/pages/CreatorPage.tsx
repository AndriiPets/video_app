import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { open, close } from "../redux/uiSlice";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export interface Creator {}

function CreatorPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(open());
  }, []);

  return <div>CreatorPage</div>;
}

export default CreatorPage;
