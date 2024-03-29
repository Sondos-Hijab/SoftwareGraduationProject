import placeHolderBusinessPicture from "@/assets/images/placeholder.png";
import emptyPostPicture from "@/assets/images/empty.png";
import React from "react";
import { createBlobUrl, getDatTimeFromString } from "@/utils/utils";
import { Link } from "react-router-dom";

const BusinessPostCard = ({ postInfo, businessPicture }) => {
  const { formattedDate, formattedTime } = getDatTimeFromString(
    postInfo["created_at"]
  );

  const postPicture = postInfo.picture
    ? createBlobUrl(postInfo.picture.data)
    : emptyPostPicture;

  return (
    <>
      <div className="mb-4 block rounded-lg p-4 shadow-md shadow-gray-200 ">
        <div className="mt-2">
          <dl className="cursor-pointer">
            <div className="flex justify-between">
              <Link
                to={
                  localStorage.getItem("businessName") == postInfo["name"]
                    ? "/profile"
                    : `/business/${postInfo["name"]}`
                }
              >
                <dt className="sr-only">Username</dt>
                <dd className="flex font-medium text-customGreen">
                  <img
                    className="w-12 h-12 object-cover rounded-full shadow-md"
                    src={businessPicture || placeHolderBusinessPicture}
                  />
                  <p className="flex flex-wrap content-center ml-2">
                    {postInfo["name"]}
                  </p>
                </dd>
              </Link>
            </div>
          </dl>

          <img
            alt=""
            src={postPicture}
            className="mt-2 h-96 w-full rounded-md object-cover"
          />

          <dl className="mt-2">
            <div>
              <dt className="sr-only">Description</dt>

              <dd className="text-sm text-gray-500">
                {postInfo["description"]}
              </dd>
            </div>
          </dl>

          <div className="flex flex-1 justify-between mt-5">
            <p className="text-customBlue">Date: {formattedDate}</p>
            <p className="text-customBlue">Time: {formattedTime}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default BusinessPostCard;
