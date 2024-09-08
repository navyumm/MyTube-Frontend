import React, { useCallback, useEffect, useState, useMemo, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllVideos, makeVideosNull } from "../store/Slices/videoSlice";
import { Container, InfiniteScroll } from "../components";
import HomeSkeleton from "../skeleton/HomeSkeleton";
import debounce from 'lodash.debounce';

const VideoList = React.lazy(() => import("../components/VideoList"));

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

    // Fetch videos on component mount with a limit to reduce initial load size
    useEffect(() => {
        dispatch(getAllVideos({ limit: 10 }));
        setPage(1);

        return () => {
            dispatch(makeVideosNull());
            setPage(1);
        };
    }, [dispatch]);

    // Fetch more videos when user scrolls, with debouncing
    const fetchMoreVideos = useCallback(debounce(() => {
        if (hasNextPage) {
            dispatch(getAllVideos({ page: page + 1 }));
            setPage((prev) => prev + 1);
        }
    }, 300), [page, hasNextPage, dispatch]);

    // Memoizing videos to prevent unnecessary re-renders
    const memoizedVideos = useMemo(() => videos, [videos]);

    // Show a loading skeleton only on the initial page load
    if (loading && page === 1) {
        return <HomeSkeleton />;
    }

    return (
        <Container>
            <InfiniteScroll fetchMore={fetchMoreVideos} hasNextPage={hasNextPage}>
                <div
                    className={`text-white mt-2 mb-16 sm:m-0 sm:mb-2 w-full ${height} grid ${gridCols} ${!disableScroll ? "xl:overflow-y-scroll" : ""}`}
                >
                    {memoizedVideos?.length > 0 ? (
                        memoizedVideos.map((video) => (
                            <Suspense fallback={<div>Loading video...</div>} key={video._id}>
                                <VideoList
                                    avatar={video.ownerDetails?.avatar}
                                    duration={video.duration}
                                    title={video.title}
                                    thumbnail={video.thumbnail?.url}
                                    createdAt={video.createdAt}
                                    views={video.views}
                                    channelName={video.ownerDetails?.username}
                                    videoId={video._id}
                                />
                            </Suspense>
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
