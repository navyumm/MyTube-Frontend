import React, { useEffect, useState } from "react";
import { NoVideosFound, VideoList } from "../../components/index";
import { useDispatch, useSelector } from "react-redux";
import { getAllVideos, makeVideosNull } from "../../store/Slices/videoSlice";

function ChannelVideos() {
    const dispatch = useDispatch();
    const userId = useSelector((state) => state.user?.profileData?._id);
    const videos = useSelector((state) => state.video?.videos?.docs);
    const [searchParams, setSearchParams] = useState();
    const [activeButton, setActiveButton] = useState("button1");

    useEffect(() => {
        const sortBy = searchParams?.sortBy;
        const sortType = searchParams?.sortType;
        dispatch(getAllVideos({ userId, sortBy, sortType }));

        return () => dispatch(makeVideosNull());
    }, [dispatch, userId, searchParams]);

    if (videos?.length == 0) {
        return <NoVideosFound />
    }

    const handleSort = (sortBy, sortType = "asc") => {
        setSearchParams({ sortBy, sortType });
    };


    return (
        <>
            {/* For sorting latest, popular and oldest videos */}
            <div className="w-full p-2 text-white flex gap-4">
                <button
                    onClick={() => {
                        setActiveButton("button1");
                        handleSort("createdAt", "desc");
                    }}
                    className={`group py-1 px-2 rounded-md ${activeButton === "button1"
                        ? "bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 hover:text-white rounded-lg transition duration-200"
                        : "bg-[#222222]"
                        }`}
                >
                    Latest
                </button>
                <button
                    onClick={() => {
                        setActiveButton("button2");
                        handleSort("views", "desc");
                    }}
                    className={`group py-1 px-2 rounded-md ${activeButton === "button2"
                        ? "bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 hover:text-white rounded-lg transition duration-200"
                        : "bg-[#222222]"
                        }`}
                >
                    Popluar
                </button>
                <button
                    onClick={() => {
                        setActiveButton("button3");
                        handleSort("createdAt", "asc");
                    }}
                    className={`group py-1 px-2 rounded-md ${activeButton === "button3"
                        ? "bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 hover:text-white rounded-lg transition duration-200"
                        : "bg-[#222222]"
                        }`}
                >
                    Oldest
                </button>
            </div>

            {/* Video listing */}
            <div className="grid lg:grid-cols-3 sm:grid-cols-2 text-white">
                {videos?.map((video) => (
                    <VideoList
                        key={video._id}
                        avatar={video.ownerDetails?.avatar}
                        duration={video.duration}
                        title={video.title}
                        thumbnail={video.thumbnail?.url}
                        createdAt={video.createdAt}
                        views={video.views}
                        videoId={video._id}
                    />
                ))}
            </div>
        </>
    );
}

export default ChannelVideos;