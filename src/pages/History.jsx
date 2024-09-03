import React, { useEffect } from "react";
import { Container, NoVideosFound, VideoList } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { getWatchHistory } from "../store/Slices/userSlice";
import HomeSkeleton from "../skeleton/HomeSkeleton";

function History() {
    const loading = useSelector((state) => state.user?.loading);
    const videos = useSelector((state) => state.user?.history);
    const dispatch = useDispatch();
    // console.log(videos);

    window.scrollTo(0, 0);

    useEffect(() => {
        dispatch(getWatchHistory());
    }, [dispatch]);

    if (loading) {
        return <HomeSkeleton />
    }

    if (videos?.length == 0) {
        return <NoVideosFound />
    }

    if (videos && videos.length > 0) {
        return (
            <>
                <Container>
                    <div className="grid max-h-screen sm:m-0 lg:grid-cols-3 h-[86vh] mb-16 sm:mb-2 sm:grid-cols-2 text-white overflow-y-scroll">
                        {videos.map((video) => (
                            <VideoList
                                key={video._id}
                                avatar={video.owner?.avatar}
                                duration={video.duration}
                                title={video.title}
                                thumbnail={video.thumbnail?.url}
                                createdAt={video.createdAt}
                                views={video.views}
                                channelName={video.owner.username}
                                videoId={video._id}
                            />
                        ))}
                    </div>
                </Container>
            </>
        );
    }
    return <></>;
}

export default History;