import React from "react";
import { Link } from "react-router-dom";

function Avatar({ src, channelName }) {
  return (
    <>
      <Link to={`/channel/${channelName}`}>
        <img
          src={src}
          alt="avatar"
          className="w-10 h-10 rounded-full object-cover"
        />
      </Link>
    </>
  );
}

export default Avatar;