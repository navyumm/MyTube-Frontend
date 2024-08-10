import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import HomePage from "./pages/HomePage";
import Login from "./components/Login";
import { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { getCurrentUser } from "./store/authSlice";
import MyChannel from "./pages/MyChannel/MyChannel";
import MyChannelVideos from "./pages/MyChannel/MyChannelVideos";

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCurrentUser());
    }, [dispatch])

    return (
        <>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route path="" element={<HomePage />}/>
                    <Route path="/my-content" element={<MyChannel />}>
                        <Route path="videos" element={<MyChannelVideos />}/>
                        <Route path="playlists" element=''/>
                        <Route path="tweets" element=''/>
                        <Route path="subscribed" element=''/>
                    </Route>
                </Route>
                <Route path="/login" element={<Login />}/>
            </Routes>
            
            <Toaster
                position="top-right"
                reverseOrder={true}
                toastOptions={{
                    error: {
                        style: { borderRadius: "0", color: "red",},
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