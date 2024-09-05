import React, { useState } from "react";
import { Button, Input2, UploadingVideo, GetImagePreview } from "./index";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { publishAvideo } from "../store/Slices/videoSlice";
import { IoCloseCircleOutline } from "./icons";

function UploadVideo({ setUploadVideoPopup }) {
  const [videoName, setVideoName] = useState("");
  const [videoSize, setVideoSize] = useState(0);
  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const uploading = useSelector((state) => state.video.uploading);
  const uploaded = useSelector((state) => state.video.uploaded);

  const publishVideo = async (data) => {
    setVideoSize(Math.floor(data.videoFile[0].size / (1024 * 1024)));
    await dispatch(publishAvideo(data));
  };

  if (uploading) {
    return (
      <UploadingVideo
        setUploadVideoPopup={setUploadVideoPopup}
        videoFileName={videoName}
        fileSize={videoSize}
      />
    );
  }

  if (uploaded) {
    return (
      <>
        <UploadingVideo
          setUploadVideoPopup={setUploadVideoPopup}
          videoFileName={videoName}
          fileSize={videoSize}
          uploaded={true}
        />
      </>
    );
  }

  return (
    <>
  <div className="fixed top-5 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-70 z-30">
    <div className="relative w-[95vw] sm:w-3/4 h-[80vh] sm:h-[80vh] mx-auto text-white border overflow-y-scroll bg-black">
      <form onSubmit={handleSubmit(publishVideo)} className="space-y-5">
        {/* Header Section */}
        <section className="sticky top-0 bg-[#222222] px-5 py-4 flex justify-between items-center border-b border-white">
          <div className="flex gap-1 items-center cursor-pointer">
            <h3 className="text-white font-semibold text-xl">Upload Videos</h3>
          </div>
          <div >
          <IoCloseCircleOutline
              size={30}
              onClick={() => setUploadVideoPopup((prev) => !prev)}
              className="hover:text-red-400"
            />
          </div>
        </section>

        {/* Main Form Section */}
        <section className="px-6 py-2">
          {/* Video Upload Section */}
          <div className="w-full border border-dotted h-44 pt-12 flex flex-col gap-3 justify-center items-center text-center">
            <div>
              <h1 className="font-medium text-sm">Drag and drop video files to upload</h1>
              <p className="font-light text-xs">
                Your videos will be private until you publish them.
              </p>
            </div>
            <label 
            htmlFor="video-upload" 
            className="cursor-pointer bg-red-500 font-bold text-sm py-2 px-4 hover:bg-gradient-to-r from-red-500 via-orange-500 to-orange-500"
            >
              Select Files
            </label>
            <input
              id="video-upload"
              type="file"
              accept="video/*"
              className="hidden"
              {...register("videoFile", {
                required: "Video file is required",
                onChange: (e) => setVideoName(e.target.files[0]?.name),
              })}
            />
            <input
              className="sm:w-3/4 w-full text-center h-10 bg-transparent text-white outline-none"
              value={videoName}
              readOnly
            />
            <span className="text-red-500 text-xs">{errors.videoFile?.message}</span>
          </div>

          {/* Thumbnail, Title, and Description Section */}
          <div className="space-y-5 mt-2 w-full grid lg:grid-cols-2 grid-cols-1 lg:gap-10 justify-start items-start">
            {/* Thumbnail */}
            <div className="w-full">
              <GetImagePreview
                name="thumbnail"
                control={control}
                label="Thumbnail *"
                className="w-full h-56 border object-contain rounded-md"
                cameraIcon={true}
                cameraSize={40}
              />
              <span className="text-red-500 text-xs">{errors.thumbnail?.message}</span>
            </div>

            <div className="w-full">
              {/* Title */}
              <Input2
                type="text"
                label="Title *"
                className="mb-2"
                {...register("title", {
                  required: "Title is required",
                })}
              />
              <span className="text-red-500 text-xs">{errors.title?.message}</span>

              {/* Description */}
              <div>
                <label>Description *</label>
                <textarea
                  rows="5"
                  className="focus:bg-[#222222] bg-transparent outline-none border w-full mt-1 p-1 rounded-md"
                  {...register("description", {
                    required: "Description is required",
                  })}
                ></textarea>
                <span className="text-red-500 text-xs">{errors.description?.message}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Footer Buttons */}
        <div className="sticky bottom-0 w-full bg-[#222222] py-4 px-6 border-t flex justify-end gap-4">
          <Button className="bg-gray-600 py-2 px-4 text-white font-bold rounded-md hover:bg-gray-500" onClick={() => setUploadVideoPopup(false)}>
            Cancel
          </Button>
          <Button className="bg-red-500 py-2 px-4 font-bold rounded-md hover:bg-gradient-to-r from-red-500 via-orange-500 to-orange-500 hover:text-white" type="submit">
            Save
          </Button>
        </div>
      </form>
    </div>
  </div>
</>

  );
}

export default UploadVideo;