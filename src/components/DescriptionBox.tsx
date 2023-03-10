import React, { useState } from "react";
import styled from "styled-components";

const Description = styled.p`
  font-size: 14px;
  white-space: pre-line;
`;

const ReadOrHide = styled.span`
  cursor: pointer;
  font-weight: 700;
  margin-top: 10px;
`;

interface DescContent {
  text: string;
  tags: string[];
}

function DescriptionBox({ text, tags }: DescContent) {
  const content =
    text +
    "\n\n" +
    tags.reduce(
      (acc: string, current: string) => acc + " " + "#" + current,
      ""
    );

  const [readMore, setReadMore] = useState(true);

  const toggleReadMore = () => {
    setReadMore(!readMore);
  };

  return (
    <Description>
      {readMore ? content.slice(0, 300) : content}
      <br />
      {content.length > 300 && (
        <ReadOrHide onClick={toggleReadMore}>
          {" "}
          {readMore ? "..." : "show less"}
        </ReadOrHide>
      )}
    </Description>
  );
}

export default DescriptionBox;
