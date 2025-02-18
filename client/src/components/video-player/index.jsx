import React, { useRef, useState } from "react";
import ReactPlayer from "react-player";

const VideoPlayer = ({ url }) => {
  return (
    <div className="relative w-[500px] h-[350px] overflow-hidden">
      <ReactPlayer
        url={url}
        className="absolute left-0 top-0"
        controls
        width={"100%"}
        height={"100%"}
      />
    </div>
  );
};

export default VideoPlayer;
