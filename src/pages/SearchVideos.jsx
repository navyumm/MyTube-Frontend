import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NoVideosFound, VideoList } from "../components";
import HomeSkeleton from "../skeleton/HomeSkeleton";

function SearchVideos() {
  const loading = useSelector((state) => state.video?.loading);
  const videos = useSelector((state) => state.video?.video);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => dispatch(makeVideosNull());
  }, [dispatch]);

  if (videos?.totalDocs === 0) {
    return <NoVideosFound text={"Try searching something else"} />;
  }

  if (loading) {
    return <HomeSkeleton />;
  }

  return (
    <>
      <div className="grid xl:grid-cols-3 sm:grid-cols-2 grid-cols-1 text-white">
        {videos &&
          videos?.map((video) => (
            <VideoList
              key={video?._id}
              thumbnail={video?.thumbnail?.url}
              duration={video?.duration}
              title={video?.title}
              views={video?.views}
              avatar={video?.ownerDetails?.avatar}
              channelName={video?.ownerDetails?.username}
              createdAt={video?.createdAt}
              videoId={video?._id}
            ></VideoList>
          ))}
      </div>
    </>
  );
}

export default SearchVideos;