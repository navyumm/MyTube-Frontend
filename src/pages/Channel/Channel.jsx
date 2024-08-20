import React, { useEffect } from "react";
import { ChannelHeader } from "../../components/index";
import { useDispatch, useSelector } from "react-redux";
import { userChannelProfile } from "../../store/Slices/userSlice.js";
import ChannelNavigate from "../../components/channel/ChannelNavigate.jsx";
import { Outlet, useParams } from "react-router-dom";

function Channel() {
    const dispatch = useDispatch();
    const { username } = useParams();

    const channel = useSelector((state) => state.user?.profileData);

    // console.log(channel?.subcribersCount);
    useEffect(() => {
        dispatch(userChannelProfile(username));
    }, [dispatch, username]);

    return (
        <>
            {
                channel &&
                <ChannelHeader
                    username={username}
                    coverImage={channel?.coverImage}
                    avatar={channel?.avatar}
                    subscribedCount={channel?.channelsSubscribedToCount}
                    fullName={channel?.fullName}
                    subscribersCount={channel?.subscribersCount}
                    isSubscribed={channel?.isSubscribed}
                    channelId={channel?._id}
                />
            }
            <ChannelNavigate username={username} />
            <div className="overflow-y-scroll h-[30rem] sm:h-[36vh] md:h-[44vh] md:mb-2 mt-2 mb-0 sm:mb-20">
                <Outlet />
            </div>
        </>
    );
}

export default Channel;