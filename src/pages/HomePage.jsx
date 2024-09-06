import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllVideos, makeVideosNull } from "../store/Slices/videoSlice";
import { VideoList, Container, InfiniteScroll } from "../components";
import HomeSkeleton from "../skeleton/HomeSkeleton";

function HomePage({
    gridCols = "xl:grid-cols-3 sm:grid-cols-2 grid-cols-1",
    height = "h-[85vh]",
    disableScroll = false
}) {
    const dispatch = useDispatch();
    const videos = useSelector((state) => state.video?.videos?.docs);
    const loading = useSelector((state) => state.video?.loading);
    const hasNextPage = useSelector((state) => state.video?.videos?.hasNextPage);
    const [page, setPage] = useState(1);

    // Fetch videos on component mount
    useEffect(() => {
        dispatch(getAllVideos({}));
        setPage(1);

        return () => {
            dispatch(makeVideosNull());
            setPage(1);
        };
    }, [dispatch]);

    // Fetch more videos when user scrolls
    const fetchMoreVideos = useCallback(() => {
        if (hasNextPage) {
            dispatch(getAllVideos({ page: page + 1 }));
            setPage((prev) => prev + 1);
        }
    }, [page, hasNextPage, dispatch]);

    // Show a loading skeleton while loading
    if (loading) {
        return <HomeSkeleton />;
    }

    return (
        <Container>
            <InfiniteScroll fetchMore={fetchMoreVideos} hasNextPage={hasNextPage}>
                <div
                    className={`text-white mt-2 mb-16 sm:m-0 sm:mb-2 w-full ${height} grid ${gridCols} ${!disableScroll ? "xl:overflow-y-scroll" : ""}`}
                >
                    {videos?.length > 0 ? (
                        videos.map((video) => (
                            <VideoList
                                key={video._id}
                                avatar={video.ownerDetails?.avatar}
                                duration={video.duration}
                                title={video.title}
                                thumbnail={video.thumbnail?.url}
                                createdAt={video.createdAt}
                                views={video.views}
                                channelName={video.ownerDetails?.username}
                                videoId={video._id}
                            />
                        ))
                    ) : (
                        <p>No videos available</p>
                    )}
                </div>
            </InfiniteScroll>
        </Container>
    );
}

export default HomePage;

