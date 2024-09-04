import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllVideos, makeVideosNull } from "../store/Slices/videoSlice";
import { VideoList, Container, InfiniteScroll } from "../components";
import HomeSkeleton from "../skeleton/HomeSkeleton";

function HomePage() {
    const dispatch = useDispatch();
    const videos = useSelector((state) => state.video?.video);
    const loading = useSelector((state) => state.video?.loading);
    const hasNextPage = useSelector(
        (state) => state.video?.video?.hasNextPage
    );
    const [page, setPage] = useState(1);

    useEffect(() => {
        dispatch(getAllVideos({}));
        // setPage(1);

        return () => {
            dispatch(makeVideosNull());
            // setPage(1); 
        };
    }, [dispatch]);

    const fetchMoreVideos = useCallback(() => {
        if (hasNextPage) {
            dispatch(getAllVideos({ page: page + 1 }));
            setPage((prev) => prev + 1);
        }
    }, [page, hasNextPage, dispatch]);

    return (
        <Container>
            <InfiniteScroll
                fetchMore={fetchMoreVideos}
                hasNextPage={hasNextPage}
            >
                <div className="text-white max-h-screen mt-2 mb-16 sm:m-0 sm:mb-2 w-full h-[86vh] grid xl:grid-cols-3 sm:grid-cols-2 grid-cols-1 overflow-y-scroll">
                    {videos?.map((video) => (
                        <VideoList
                            key={video._id}
                            avatar={video.ownerDetails?.avatar}
                            duration={video.duration}
                            title={video.title}
                            thumbnail={video.thumbnail?.url}
                            createdAt={video.createdAt}
                            views={video.views}
                            channelName={video.ownerDetails.username}
                            videoId={video._id}
                        />
                    ))}
                </div>
            </InfiniteScroll>
            {loading && <HomeSkeleton />}
        </Container>
    );
}

export default HomePage;