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
                className="sm:h-[64vh] xl:max-w-5xl w-full h-64 xl:p-4 object-cover"
            ></video>
        </>
    );
}

export default Video;