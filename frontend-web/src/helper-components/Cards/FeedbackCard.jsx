import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import placeholderUserPicture from "@/assets/images/placeholder.png";
import emptyFeedbackPicture from "@/assets/images/empty.png";
import React from "react";
import { createBlobUrl, getDatTimeFromString } from "@/utils/utils";
import { Link } from "react-router-dom";

const FeedbackCard = ({ feedInfo }) => {
  const { formattedDate, formattedTime } = getDatTimeFromString(
    feedInfo["created_at"]
  );

  const userProfilePicture = feedInfo.userProfilePicture
    ? createBlobUrl(feedInfo.userProfilePicture.data)
    : placeholderUserPicture;

  const feedbackPicture = feedInfo.picture
    ? createBlobUrl(feedInfo.picture.data)
    : emptyFeedbackPicture;

  return (
    <>
      <div className="mb-4 block rounded-lg p-4 shadow-md shadow-gray-200 ">
        <div className="mt-2">
          <dl className="cursor-pointer">
            <div className="flex justify-between">
              <Link to={`/user/${feedInfo["userName"]}`}>
                <dt className="sr-only">Username</dt>
                <dd className="flex font-medium text-customGreen">
                  <img
                    className="w-12 h-12 object-cover rounded-full"
                    src={userProfilePicture}
                  />
                  <p className="flex flex-wrap content-center ml-2">
                    {feedInfo["userName"]}
                  </p>
                </dd>
              </Link>
              <button
                type="button"
                className=" text-white self-center sm:font-semibold text-sm h-3/4 px-1 sm:px-4 rounded-3xl py-2 justify-self-end bg-customGreen inline-flex items-center justify-center cursor-pointer"
              >
                Send a message
              </button>
            </div>
          </dl>

          <img
            alt=""
            src={feedbackPicture}
            className="mt-2 h-96 w-full rounded-md object-cover"
          />

          <dl className="mt-2">
            <div>
              <Link
                to={
                  localStorage.getItem("businessName") ==
                  feedInfo["businessName"]
                    ? "/profile"
                    : `/business/${feedInfo["businessName"]}`
                }
              >
                <dt className="sr-only">Business name</dt>

                <dd className="text-base font-semibold text-customPurple">
                  {`Feedback for: ${feedInfo["businessName"]}`}
                </dd>
              </Link>

              <dt className="sr-only">Description</dt>

              <dd className="text-sm text-gray-500">{feedInfo["text"]}</dd>
            </div>
          </dl>

          <div className="mt-6 flex flex-wrap justify-start gap-8 text-xs flex-col sm:flex-row sm:justify-around ">
            {[
              "Customer Service Rate",
              "Value Of Money Rate",
              "Product/Service Quality Rate",
            ].map((item, index) => {
              return (
                <div
                  key={index}
                  className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2"
                >
                  <FontAwesomeIcon
                    className="text-customYellow text-lg"
                    icon={faStar}
                  />

                  <div className="mt-1.5 sm:mt-0">
                    <p className="text-customPurple font-semibold">{item}</p>
                    <p className="font-medium">{`${parseFloat(
                      feedInfo[`rate${index + 1}`]
                    )} / 5.0`}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex flex-1 justify-between mt-5">
            <p className="text-customBlue">Date: {formattedDate}</p>
            <p className="text-customBlue">Time: {formattedTime}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default FeedbackCard;
