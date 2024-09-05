import React, { useEffect } from "react";
import Input2 from "./Input2";
import { useForm } from "react-hook-form";
import Button from "./Button";
import { IoCloseCircleOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { updateAVideo, updateUploadState } from "../store/Slices/videoSlice";
import Spinner from "./Spinner";
import GetImagePreview from "./GetImagePreview";

function EditVideo({
  videoId,
  title,
  description,
  setEditVideoPopup,
  thumbnail,
}) {
  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
    setValue,
  } = useForm();
  const dispatch = useDispatch();
  const uploading = useSelector((state) => state.video.uploading);

  const handleClosePopUp = () => {
    setEditVideoPopup((prev) => ({
      ...prev,
      uploadVideo: false,
      editVideo: false,
    }));
  };

  const updateVideo = async (data) => {
    await dispatch(updateAVideo({ videoId, data }));
    setEditVideoPopup((prev) => ({
      ...prev,
      uploadVideo: false,
      editVideo: false,
    }));
  };

  useEffect(() => {
    setValue("title", title);
    setValue("description", description);
  }, [title, description, setValue]);

  if (uploading) {
    return (
      <>
        <div className="w-52 border border-slate-600 bg-black flex gap-2 p-3">
          <Spinner />
          <span className="text-md font-bold">Updating video...</span>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-70 z-50">
        <form
          onSubmit={handleSubmit(updateVideo)}
          className="bg-black shadow-lg w-[40rem] max-w-full overflow-hidden border"
        >
          <div className="sticky top-0 bg-[#222222] px-5 py-4 flex justify-between items-center border-b border-white">
            <h2 className="text-white font-semibold text-xl">Edit Video</h2>
            <IoCloseCircleOutline
              size={30}
              onClick={handleClosePopUp}
              className="text-white text-2xl cursor-pointer hover:text-red-500 transition"
            />
          </div>

          <div className="p-6 grid lg:grid-cols-2 grid-cols-1 gap-5">
            <div className="lg:col-span-1">
              <GetImagePreview
                name={"thumbnail"}
                control={control}
                label={"Thumbnail: "}
                cameraIcon
                cameraSize={30}
                className="object-cover w-full h-64 border"
                image={thumbnail}
              />
              <span className="text-red-500 text-xs mt-1 block">
                {errors.thumbnail?.message}
              </span>
            </div>

            <div className="lg:col-span-1 space-y-4 py-2">
              <Input2
                type="text"
                label="Title *"
                {...register("title", {
                  required: "Title is required",
                })}
                className="bg-[222] text-gray-400 border p-2 w-full"
              />
              <span className="text-red-500 text-xs">
                {errors.title?.message}
              </span>

              <div className="mb-4">
                <label className="text-white text-sm">Description *</label>
                <textarea
                  rows="4"
                  className="focus:bg-[#222222] text-gray-400 bg-black border w-full mt-1 p-2"
                  {...register("description", {
                    required: "Description is required",
                  })}
                ></textarea>
                <span className="text-red-500 text-xs">
                  {errors.description?.message}
                </span>
              </div>
            </div>
          </div>

          {/* Footer Buttons */}
          <div className="px-6 py-4 bg-[#222222] border-t flex justify-end space-x-4">
            <Button
              className="bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-500 transition"
              onClick={handleClosePopUp}
              type="button"
            >
              Cancel
            </Button>
            <Button
              className="bg-red-500 text-white py-2 px-4 rounded-md font-bold hover:bg-gradient-to-r from-red-500 via-orange-500 transition"
              type="submit"
            >
              Update
            </Button>
          </div>
        </form>
      </div>
    </>

  );
}

export default EditVideo;