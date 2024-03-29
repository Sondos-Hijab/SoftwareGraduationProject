import { useAppContext } from "@/Providers/AppPovider";
import {
  fetchUserFeedback,
  fetchUserFollowing,
  fetchUserInfo,
} from "@/apis/userRequests";
import FeedbackCard from "@/helper-components/Cards/FeedbackCard";
import FollowCard from "@/helper-components/Cards/FollowCard";
import placeholderUserPicture from "@/assets/images/placeholder.png";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { createBlobUrl, sortByDate } from "@/utils/utils";

const User = () => {
  const { username } = useParams();
  const [activeTab, setActiveTab] = useState("feedback");
  const { accessToken } = useAppContext();

  const [feedback, setFeedback] = useState([]);
  const [following, setFollowing] = useState([]);
  const [userBio, setUserBio] = useState("");
  const [userProfilePicture, setUserProfilePicture] = useState(
    placeholderUserPicture
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const feedbackData = await fetchUserFeedback(username, accessToken);
        if (feedbackData.error) {
          console.error("Error fetching user feedback");
        } else {
          setFeedback(feedbackData.feedback);
        }

        const userInfoData = await fetchUserInfo(username, accessToken);
        if (userInfoData.error) {
          console.error("Error fetching user info");
        } else {
          setUserBio(userInfoData.userProfile.bio);
          setUserProfilePicture(
            createBlobUrl(userInfoData.userProfile.picture.data)
          );
        }

        const followingData = await fetchUserFollowing(username, accessToken);
        if (followingData.error) {
          console.error("Error fetching user following");
        } else {
          setFollowing(followingData.followers);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className=" mt-8 h-full w-full flex flex-col justify-center items-center">
        {/* profile image */}
        <div className="relative">
          <img
            className="inline-block size-52 object-cover rounded-full border border-gray-300 mx-auto"
            src={userProfilePicture}
            alt="profile image"
          />
        </div>

        {/* info */}
        <div className="mt-12 w-3/5">
          <div className="px-4 sm:px-0">
            <h3 className="text-base font-semibold leading-7 text-[#2f47c6] ">
              User Information
            </h3>
          </div>
          <div className="mt-6 border-t border-gray-100">
            <dl className="divide-y divide-gray-100">
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Username
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {username}
                </dd>
              </div>

              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  User Bio
                </dt>
                <dd className="flex justify-between mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  <p>{userBio}</p>
                </dd>
              </div>
            </dl>
          </div>
        </div>

        {/* select */}
        <ul className="w-3/5 mt-16 text-sm font-medium text-center text-gray-500 rounded-lg shadow flex ">
          <li className="w-full focus-within:z-10 rounded-lg">
            <Link
              className={`inline-block w-full p-4 ${
                activeTab === "feedback"
                  ? "text-gray-900  bg-gray-100  border-gray-200  rounded-lg  active focus:outline-none "
                  : "bg-white  border-gray-200  hover:text-gray-700 rounded-lg hover:bg-gray-50  focus:outline-none "
              }`}
              aria-current={activeTab === "feedback" ? "page" : undefined}
              onClick={() => setActiveTab("feedback")}
            >
              Feedback
            </Link>
          </li>
          <li className="w-full focus-within:z-10 rounded-lg">
            <Link
              className={`inline-block w-full p-4 ${
                activeTab === "following"
                  ? "text-gray-900  bg-gray-100 border-gray-200  rounded-lg  active focus:outline-none "
                  : "bg-white  border-gray-200  hover:text-gray-700 rounded-lg hover:bg-gray-50  focus:outline-none "
              }`}
              onClick={() => setActiveTab("following")}
            >
              Following
            </Link>
          </li>
        </ul>

        {/* displaying values depending on tab menu selected value*/}
        <div className="w-3/5 mb-8">
          {/* feedback */}
          {activeTab === "feedback" &&
            sortByDate(feedback).map((value) => {
              return <FeedbackCard key={value.feedbackID} feedInfo={value} />;
            })}

          {/* following */}
          {activeTab === "following" &&
            following.map((following, index) => {
              return <FollowCard key={index} followInfo={following} />;
            })}
        </div>
      </div>
    </>
  );
};

export default User;
