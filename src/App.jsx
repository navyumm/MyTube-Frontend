import React, { useEffect, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { AuthLayout, Login, SignUp, EditPersonalInfo, ChangePassword, Layout } from "./components/index";
import { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { getCurrentUser } from "./store/Slices/authSlice";

// Lazy loading pages
const HomePage = React.lazy(() => import("./pages/HomePage"));
const History = React.lazy(() => import("./pages/History"));
const Channel = React.lazy(() => import("./pages/Channel/Channel"));
const ChannelVideos = React.lazy(() => import("./pages/Channel/ChannelVideos"));
const ChannelTweets = React.lazy(() => import("./pages/Channel/ChannelTweets"));
const ChannelSubscribers = React.lazy(() => import("./pages/Channel/ChannelSubscribers"));
const LikedVideos = React.lazy(() => import("./pages/LikedVideos"));
const VideoDetail = React.lazy(() => import("./pages/VideoDetail"));
const MySubscriptions = React.lazy(() => import("./pages/MySubscriptions"));
const AdminDashboard = React.lazy(() => import("./pages/AdminDashboard"));
const EditChannel = React.lazy(() => import("./pages/EditChannel"));
const SearchVideos = React.lazy(() => import("./pages/SearchVideos"));
const TermsAndConditions = React.lazy(() => import("./pages/TermsAndConditions "));
const ChannelPlaylist = React.lazy(() => import("./pages/Channel/ChannelPlaylist"));

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCurrentUser());
    }, [dispatch]);

    return (
        <>
            <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route path="" element={<HomePage />} />
                        <Route path="/search/:query" element={<AuthLayout authentication={false}> <SearchVideos /> </AuthLayout>} />
                        <Route path="/channel/:username" element={<AuthLayout authentication> <Channel /> </AuthLayout>}>
                            <Route path="videos" element={<AuthLayout authentication> <ChannelVideos /> </AuthLayout>} />
                            <Route path="playlists" element={<AuthLayout authentication> <ChannelPlaylist /> </AuthLayout>} />
                            <Route path="tweets" element={<AuthLayout authentication> <ChannelTweets /> </AuthLayout>} />
                            <Route path="subscribed" element={<AuthLayout authentication> <ChannelSubscribers /> </AuthLayout>} />
                        </Route>
                        <Route path="/history" element={<AuthLayout authentication> <History /> </AuthLayout>} />
                        <Route path="/liked-videos" element={<AuthLayout authentication> <LikedVideos /> </AuthLayout>} />
                        <Route path="/Subscriptions" element={<AuthLayout authentication> <MySubscriptions /> </AuthLayout>} />
                        <Route path="/edit" element={<AuthLayout authentication> <EditChannel /> </AuthLayout>}>
                            <Route path="personalInfo" element={<AuthLayout authentication> <EditPersonalInfo /> </AuthLayout>} />
                            <Route path="password" element={<AuthLayout authentication> <ChangePassword /> </AuthLayout>} />
                        </Route>
                    </Route>
                    <Route path="/login" element={<AuthLayout authentication={false}> <Login /> </AuthLayout>} />
                    <Route path="/signup" element={<AuthLayout authentication={false}> <SignUp /> </AuthLayout>} />
                    <Route path="/watch/:videoId" element={<AuthLayout authentication={false}> <VideoDetail /> </AuthLayout>} />
                    <Route path="/collections" element={<AuthLayout authentication> <AdminDashboard /> </AuthLayout>} />
                    <Route path="/terms&conditions" element={<AuthLayout authentication> <TermsAndConditions /> </AuthLayout>} />
                </Routes>
            </Suspense>

            <Toaster
                position="top-right"
                reverseOrder={true}
                toastOptions={{
                    error: {
                        style: { borderRadius: "0", color: "red" },
                    },
                    success: {
                        style: { borderRadius: "0", color: "green" },
                    },
                    duration: 2000
                }}
            />
        </>
    );
}

export default App;
