import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BiSolidLike, BiSolidDislike } from "../components/icons";
import {
    toggleCommentLike,
    toggleTweetLike,
    toggleVideoLike,
} from "../store/Slices/likeSlice";
import AuthLayout from "./AuthLayout";

function Like({ isLiked, likesCount = 0, tweetId, commentId, videoId, size }) {
    const dispatch = useDispatch();
    const [localIsLiked, setLocalIsLiked] = useState(isLiked);
    const [localLikesCount, setLocalLikesCount] = useState(likesCount);
    const [showAuthLayout, setShowAuthLayout] = useState(false);
    
    const isAuthenticated = useSelector(state => state.auth.userData);

    const handleLikeToggle = () => {
        if (isAuthenticated) {
            performLikeAction();
        } else {
            setShowAuthLayout(true);
        }
    };

    const performLikeAction = () => {
        if (localIsLiked) {
            setLocalLikesCount((prev) => prev - 1);
        } else {
            setLocalLikesCount((prev) => prev + 1);
        }

        setLocalIsLiked((prev) => !prev);

        if (tweetId) {
            dispatch(toggleTweetLike(tweetId));
        } else if (commentId) {
            dispatch(toggleCommentLike(commentId));
        } else if (videoId) {
            dispatch(toggleVideoLike(videoId));
        }
    };

    useEffect(() => {
        setLocalIsLiked(isLiked);
        setLocalLikesCount(likesCount);
    }, [isLiked, likesCount]);

    const handleAuthSuccess = () => {
        setShowAuthLayout(false);
        performLikeAction();
    };

    const likeContent = (
        <div className="flex items-center gap-1">
            <BiSolidLike
                size={size}
                onClick={handleLikeToggle}
                className={`cursor-pointer ${localIsLiked ? "text-purple-500" : ""}`}
            />
            <span className="text-xs mr-3">{localLikesCount}</span>
            <BiSolidDislike size={size} />
        </div>
    );

    return (
        <>
            {showAuthLayout ? (
                <AuthLayout authentication={true} onAuthSuccess={handleAuthSuccess}>
                    {likeContent}
                </AuthLayout>
            ) : (
                likeContent
            )}
        </>
    );
}

export default Like;