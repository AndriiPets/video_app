import React, { LegacyRef, useEffect, useRef } from "react";
import videoJs from "video.js";
import Player from "video.js/dist/types/player";
import "video.js/dist/video-js.css";

export const VideoComponent = (props: any) => {
  const placeholderRef = React.useRef<any>();
  const playerRef = React.useRef<Player | null>();
  const { options, onReady } = props;

  React.useEffect(() => {
    // Make sure Video.js player is only initialized once
    if (!playerRef.current) {
      const placeholderEl = placeholderRef.current;
      const videoElement = placeholderEl.appendChild(
        document.createElement("video-js")
      );

      const player = (playerRef.current = videoJs(videoElement, options, () => {
        player.log("player is ready");
        onReady && onReady(player);
      }));

      // You can update player in the `else` block here, for example:
    } else {
      const player = playerRef.current;
      player.autoplay(options.autoplay);
      player.src(options.sources);
    }
  }, [options, onReady]);

  // Dispose the Video.js player when the functional component unmounts
  React.useEffect(() => {
    const player = playerRef.current;

    return () => {
      if (player) {
        player.dispose();
        playerRef.current = null;
      }
    };
  }, [playerRef]);

  return <div ref={placeholderRef}></div>;
};

export default VideoComponent;
