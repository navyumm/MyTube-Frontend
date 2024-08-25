import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLikedVideos } from "../store/Slices/likeSlice";
import HomeSkeleton from "../skeleton/HomeSkeleton";
import { Link } from "react-router-dom";
import { Container, NoVideosFound, VideoList } from "../components";

function LikedVideos() {
  const dispatch = useDispatch();
  const likedVideos = useSelector((state) => state.like?.likedVideos);
  const loading = useSelector((state) => state.like.loading);

  useEffect(() => {
    dispatch(getLikedVideos());
  }, [dispatch]);

  if (loading) {
    return <HomeSkeleton />;
  }

  if (likedVideos?.length == 0) {
    return <NoVideosFound />
  }

  return (
    <>
      <Container>
        <div className="grid lg:grid-cols-3 sm:grid-cols-2 text-white mb-20 sm:mb-0">
          {likedVideos?.map((video) => (
            <Link
              to={`/watch/${video.likedVideo._id}`}
              key={video.likedVideo._id}
            >
              <VideoList
                avatar={video.likedVideo.ownerDetails?.avatar}
                duration={video.likedVideo.duration}
                title={video.likedVideo.title}
                thumbnail={video.likedVideo.thumbnail?.url}
                createdAt={video.likedVideo.createdAt}
                views={video.likedVideo.views}
                channelName={video.likedVideo.ownerDetails?.username}
              />
            </Link>
          ))}
        </div>
      </Container>
    </>
  );
}

export default LikedVideos;