import React, { useState } from "react";
import Button from "./Button";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { createTweet } from "../store/Slices/tweetSlice";
import { createAComment } from "../store/Slices/commentSlice";
import AuthLayout from "./AuthLayout";

function TweetAndComment({ tweet, comment, videoId }) {
  const { register, handleSubmit, setValue } = useForm();
  const dispatch = useDispatch();
  const [showAuthLayout, setShowAuthLayout] = useState(false);

  const isAuthenticated = useSelector((state) => state.auth.userData);

  const sendContent = (data) => {
    if (data.content) {
      if (!isAuthenticated) {
        setShowAuthLayout(true);
        return;
      }

      if (tweet) {
        dispatch(createTweet(data));
      } else if (comment) {
        dispatch(createAComment({ content: data.content, videoId }));
      }
      setValue("content", "");
    }
  };

  const formContent = (
    <form
      onSubmit={handleSubmit(sendContent)}
      className="sm:p-5 p-3 md:max-w-6xl w-full relative"
    >
      <textarea
        placeholder={`${tweet ? "Write a tweet" : "Add a Comment"}`}
        className="p-2 text-sm focus:border-white text-white border border-slate-500 bg-[#222222] outline-none w-full"
        {...register("content", { required: true })}
        rows={3}
      />
      <Button
        type="submit"
        className="bg-[#e55542] hover:bg-gradient-to-r from-red-500 via-orange-500 px-2 py-1 text-black font-bold transition-all ease-in absolute sm:bottom-8 sm:right-8 bottom-8 right-4 text-xs sm:text-base"
      >
        Send
      </Button>
    </form>
  );

  return (
    <>
      {showAuthLayout ? (
        <AuthLayout authentication={true}>{formContent}</AuthLayout>
      ) : (
        formContent
      )}
    </>
  );
}

export default TweetAndComment;