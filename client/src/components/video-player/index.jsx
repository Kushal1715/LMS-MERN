import React from "react";
import ReactPlayer from "react-player";

const VideoPlayer = ({ url }) => {
  return (
    <div>
      <ReactPlayer height={"100%"} width={"100%"} url={url} />
    </div>
  );
};

export default VideoPlayer;
