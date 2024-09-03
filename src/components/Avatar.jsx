import React from "react";
import { useNavigate } from "react-router-dom";

function Avatar({ src, channelName }) {
  const navigate = useNavigate();

  const handleAvatarClick = (e) => {
    e.stopPropagation()
    navigate(`/channel/${channelName}`);
  };
  return (
    <>
      <img
        src={src}
        alt="avatar"
        className="w-10 h-10 rounded-full object-cover"
        onClick={handleAvatarClick}
      />
    </>
  );
}

export default Avatar;