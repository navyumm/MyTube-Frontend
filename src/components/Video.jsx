import React from "react";

function Video({ src, poster }) {
    return (
        <>
            <video
                src={src}
                poster={poster}
                autoPlay
                controls
                playsInline
                className="sm:h-[64vh] w-[65vw] h-64 object-cover"
            ></video>
        </>
    );
}

export default Video;