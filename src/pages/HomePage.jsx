import React, { useEffect } from "react";
import Container from "../components/Container";
import { useDispatch, useSelector } from "react-redux";
import { getAllVideos } from "../store/Slices/videoSlice";
import { Link } from "react-router-dom";
import { VideoList } from "../components";
import HomeSkeleton from "../skeleton/HomeSkeleton";

function HomePage() {
    const dispatch = useDispatch();
    const videos = useSelector((state) => state.video?.video);
    const loading = useSelector((state) => state.video?.loading);

    useEffect(() => {
        dispatch(getAllVideos());
    }, [dispatch]);

    if (loading) {
        return <HomeSkeleton />
    }
    return (
        <Container>
            <div className="text-white mt-2 mb-16 sm:mb-2 w-full h-[86vh] grid xl:grid-cols-3 sm:grid-cols-2 grid-cols-1 overflow-y-scroll">
                {videos?.map((video) => (
                    <Link
                        to={`/watch/${video._id}`}
                        key={video._id}
                    >
                        <VideoList
                            avatar={video.ownerDetails?.avatar}
                            duration={video.duration}
                            title={video.title}
                            thumbnail={video.thumbnail?.url}
                            createdAt={video.createdAt}
                            views={video.views}
                            channelName={video.ownerDetails?.username}
                        />
                    </Link>
                ))}
            </div>
        </Container>
    );
}

export default HomePage;