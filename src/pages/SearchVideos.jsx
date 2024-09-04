import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NoVideosFound, VideoList } from "../components";
import { getAllVideos, makeVideosNull } from "../store/Slices/videoSlice";
import { FaFilter } from "react-icons/fa";
import { IoCloseCircleOutline } from "react-icons/io5";
import { useParams, useSearchParams } from "react-router-dom";
import HomeSkeleton from "../skeleton/HomeSkeleton";

function SearchVideos() {
  const loading = useSelector((state) => state.video?.loading);
  const videos = useSelector((state) => state.video?.video);
  const dispatch = useDispatch();
  const { query } = useParams();
  const [filterOpen, setFilterOpen] = useState(false);
  const [searchParams, setSearchParms] = useSearchParams();

  console.log("Videooos: ", videos);


  useEffect(() => {
    const sortType = searchParams.get("sortType");
    const sortBy = searchParams.get("sortBy");
    dispatch(
      getAllVideos({
        query,
        sortBy,
        sortType,
      })
    );

    return () => dispatch(makeVideosNull());
  }, [dispatch, query, searchParams]);

  const handleSortParams = (newSortBy, newSortType = "asc") => {
    setSearchParms({ sortBy: newSortBy, sortType: newSortType });
  };

  if (videos?.totalDocs === 0) {
    return <NoVideosFound text={"Try searching something else"} />;
  }

  if (loading) {
    return <HomeSkeleton />;
  }

  return (
    // <>
    //   <div
    //     className="w-full h-10 flex items-center font-bold justify-end cursor-pointer px-8"
    //     onClick={() => setFilterOpen((prev) => !prev)}
    //   >
    //     <span className="text-white hover:text-purple-500">
    //       Filters
    //     </span>
    //     <FaFilter
    //       size={20}
    //       className="text-purple-500 hover:text-purple-800"
    //     />
    //   </div>
    //   <div className="w-full text-white">
    //     {filterOpen && (
    //       <div className="w-full absolute bg-transparent">
    //         <div className="max-w-sm border border-slate-800 rounded bg-[#222222] fixed mx-auto z-50 inset-x-0 h-96 p-5">
    //           <h1 className="font-semibold text-lg">
    //             Search filters
    //           </h1>
    //           <IoCloseCircleOutline
    //             size={25}
    //             className="absolute right-5 top-5 cursor-pointer"
    //             onClick={() => setFilterOpen((prev) => !prev)}
    //           />
    //           <table className="mt-4">
    //             <tr className="w-full text-start border-b">
    //               <th>SortBy</th>
    //             </tr>
    //             <tr className="flex flex-col gap-2 text-slate-400 cursor-pointer">
    //               <td onClick={() => handleSortParams("createdAt", "desc")}>
    //                 Upload date{" "}
    //                 <span className="text-xs">
    //                   (Latest)
    //                 </span>
    //               </td>
    //               <td onClick={() => handleSortParams("createdAt", "asc")}>
    //                 Upload date{" "}
    //                 <span className="text-xs">
    //                   (Oldest)
    //                 </span>
    //               </td>
    //               <td onClick={() => handleSortParams("views", "asc")}>
    //                 View count{" "}
    //                 <span className="text-xs">
    //                   (Low to High)
    //                 </span>
    //               </td>
    //               <td onClick={() => handleSortParams("views", "desc")}>
    //                 View count{" "}
    //                 <span className="text-xs">
    //                   (High to Low)
    //                 </span>
    //               </td>
    //               <td onClick={() => handleSortParams("duration", "asc")}>
    //                 Duration{" "}
    //                 <span className="text-xs">
    //                   (Low to High)
    //                 </span>
    //               </td>
    //               <td onClick={() => handleSortParams("duration", "desc")}>
    //                 Duration{" "}
    //                 <span className="text-xs">
    //                   (High to Low)
    //                 </span>
    //               </td>
    //             </tr>
    //           </table>
    //         </div>
    //       </div>
    //     )}
    //     <div className="grid h-screen xl:grid-cols-3 sm:grid-cols-2 grid-cols-1 text-white overflow-y-scroll">
    //       {videos &&
    //         videos?.map((video) => (
    //           <VideoList
    //             key={video?._id}
    //             thumbnail={video?.thumbnail?.url}
    //             duration={video?.duration}
    //             title={video?.title}
    //             views={video?.views}
    //             avatar={video?.ownerDetails?.avatar}
    //             channelName={video?.ownerDetails?.username}
    //             createdAt={video?.createdAt}
    //             videoId={video?._id}
    //           ></VideoList>
    //         ))}
    //     </div>
    //   </div>
    // </>
    <>
      <div
        className="w-full h-10 flex items-center font-bold justify-end cursor-pointer px-4 sm:px-8"
        onClick={() => setFilterOpen((prev) => !prev)}
      >
        <span className="text-white hover:text-purple-500 transition duration-200">
          Filters
        </span>
        <FaFilter
          size={20}
          className="ml-2 text-purple-500 hover:text-purple-800 transition duration-200"
        />
      </div>

      <div className="w-full text-white relative">
        {filterOpen && (
          <div className="w-full absolute bg-transparent">
            <div className="max-w-xs sm:max-w-sm border border-slate-800 rounded-lg bg-[#222222] fixed mx-auto z-50 inset-x-0 h-80 sm:h-96 p-4 sm:p-5 shadow-xl animate-fadeIn">
              <h1 className="font-semibold text-lg mb-4 text-center">Search Filters</h1>
              <IoCloseCircleOutline
                size={25}
                className="absolute right-4 top-4 sm:right-5 sm:top-5 cursor-pointer hover:text-purple-500 transition duration-200"
                onClick={() => setFilterOpen(false)}
              />
              <table className="w-full">
                <thead>
                  <tr className="w-full text-start border-b border-slate-700">
                    <th className="py-2 text-sm font-medium text-purple-400">Sort By</th>
                  </tr>
                </thead>
                <tbody className="flex flex-col gap-2 text-slate-400 cursor-pointer">
                  <tr
                    className="hover:bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 hover:text-white rounded-lg transition duration-200"
                    onClick={() => {
                      handleSortParams("createdAt", "desc");
                      setFilterOpen(false);
                    }}
                  >
                    <td className="py-2 px-2 sm:px-4">
                      Upload date <span className="text-xs">(Latest)</span>
                    </td>
                  </tr>
                  <tr
                    className="hover:bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 hover:text-white rounded-lg transition duration-200"
                    onClick={() => {
                      handleSortParams("createdAt", "asc");
                      setFilterOpen(false);
                    }}
                  >
                    <td className="py-2 px-2 sm:px-4">
                      Upload date <span className="text-xs">(Oldest)</span>
                    </td>
                  </tr>
                  <tr
                    className="hover:bg-gradient-to-r from-orange-500 via-pink-500 to-red-500 hover:text-white rounded-lg transition duration-200"
                    onClick={() => {
                      handleSortParams("views", "asc");
                      setFilterOpen(false);
                    }}
                  >
                    <td className="py-2 px-2 sm:px-4">
                      View count <span className="text-xs">(Low to High)</span>
                    </td>
                  </tr>
                  <tr
                    className="hover:bg-gradient-to-r from-green-500 via-teal-500 to-blue-500 hover:text-white rounded-lg transition duration-200"
                    onClick={() => {
                      handleSortParams("views", "desc");
                      setFilterOpen(false);
                    }}
                  >
                    <td className="py-2 px-2 sm:px-4">
                      View count <span className="text-xs">(High to Low)</span>
                    </td>
                  </tr>
                  <tr
                    className="hover:bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 hover:text-white rounded-lg transition duration-200"
                    onClick={() => {
                      handleSortParams("duration", "asc");
                      setFilterOpen(false);
                    }}
                  >
                    <td className="py-2 px-2 sm:px-4">
                      Duration <span className="text-xs">(Low to High)</span>
                    </td>
                  </tr>
                  <tr
                    className="hover:bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 hover:text-white rounded-lg transition duration-200"
                    onClick={() => {
                      handleSortParams("duration", "desc");
                      setFilterOpen(false);
                    }}
                  >
                    <td className="py-2 px-2 sm:px-4">
                      Duration <span className="text-xs">(High to Low)</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        <div className="grid h-[70vh] sm:h-[85vh] xl:grid-cols-3 sm:grid-cols-2 grid-cols-1 text-white overflow-y-scroll gap-4 p-2 sm:p-4">
          {videos &&
            videos.map((video) => (
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
              />
            ))}
        </div>
      </div>
    </>
  );
}

export default SearchVideos;