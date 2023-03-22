import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const TagWrapper = styled.p`
  font-weight: 500;
  color: aquamarine;
  cursor: pointer;
`;

export interface Tag {
  name: string;
}

function HashTag({ name }: Tag) {
  const tag = " " + "#" + name;
  const navigate = useNavigate();

  return (
    <TagWrapper onClick={() => navigate(`/tag?tags=${name}`)}>{tag}</TagWrapper>
  );
}

export default HashTag;
