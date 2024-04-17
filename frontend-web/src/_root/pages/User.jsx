import { useAppContext } from "@/Providers/AppPovider";
import {
  fetchUserFeedback,
  fetchUserFollowing,
  fetchUserInfo,
  filterFeedbackDependingOnBusinessName,
  filterFeedbackDependingOnCategory,
} from "@/apis/userRequests";
import FeedbackCard from "@/helper-components/Cards/FeedbackCard";
import FollowCard from "@/helper-components/Cards/FollowCard";
import placeholderUserPicture from "@/assets/images/placeholder.png";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { createBlobUrl, sortByDate } from "@/utils/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const User = () => {
  const { username } = useParams();
  const { accessToken } = useAppContext();

  //state management
  const [feedback, setFeedback] = useState([]);
  const [following, setFollowing] = useState([]);
  const [userBio, setUserBio] = useState("");
  const [activeTab, setActiveTab] = useState("feedback");
  const [userProfilePicture, setUserProfilePicture] = useState(
    placeholderUserPicture
  );
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSorting, setSelectedSorting] = useState("newToOld");
  const [selectedFeedbackType, setSelectFeedbackType] =
    useState("All Feedback");
  const [businessNameSearch, setBusinessNameSearch] = useState("");

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

  //handle business name search
  async function handleBusinessNameSearch() {
    const filteredFeedback = await filterFeedbackDependingOnBusinessName(
      username,
      businessNameSearch
    );

    if (filteredFeedback?.error) {
      console.error("Error filtering feedback");
    } else {
      setFeedback(filteredFeedback.feedback);
    }
  }

  async function handleFeedbackFilteringDependingOnCategory(e) {
    setSelectedCategory(e.target.value);

    if (e.target.value == "All Categories") {
      const feedbackData = await fetchUserFeedback(username, accessToken);
      if (feedbackData.error) {
        console.error("Error fetching user feedback");
      } else {
        setFeedback(feedbackData.feedback);
      }
    } else {
      const filteredFeedback = await filterFeedbackDependingOnCategory(
        username,
        e.target.value
      );

      if (filteredFeedback?.error) {
        console.error("Error filtering feedback");
      } else {
        setFeedback(filteredFeedback.feedback);
      }
    }
  }
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
        <div className="mt-12 w-3/4">
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
        <ul className="w-3/4 mt-16 text-sm font-medium text-center text-gray-500 rounded-lg shadow flex ">
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
        <div className="w-3/4 mb-8">
          {/* feedback */}
          {activeTab === "feedback" && (
            <>
              <div className="flex gap-4 flex-col md:flex-row justify-center my-4">
                <select
                  defaultValue="choose"
                  name="selectedSorting"
                  id="sorting"
                  className="rounded-md border border-gray-200 focus:ring-white w-full md:w-1/2"
                  onChange={(e) => {
                    setSelectedSorting(e.target.value);
                  }}
                >
                  <option value="choose" disabled>
                    Sort by
                  </option>
                  <option value="oldToNew">Oldest to newest</option>
                  <option value="newToOld">Newest to oldest</option>
                </select>

                <select
                  defaultValue="choose"
                  name="selectedCategory"
                  id="category"
                  className="rounded-md border border-gray-200 focus:ring-white w-full md:w-1/2"
                  onChange={(e) => {
                    handleFeedbackFilteringDependingOnCategory(e);
                  }}
                >
                  <option value="choose" disabled>
                    Select Category
                  </option>

                  <option value="All Categories">All Categories</option>
                  <option value="Gym">Gyms</option>
                  <option value="Beauty">Beauty</option>
                  <option value="Clothes">Clothes</option>
                  <option value="Devices">Devices</option>
                  <option value="Restaurants">Restaurants</option>
                </select>
              </div>

              <div className="flex gap-4 flex-col md:flex-row justify-center my-4">
                <div className="relative rounded-md  w-full">
                  <input
                    className=" rounded-md border border-gray-200 focus:ring-white w-full "
                    type="text"
                    placeholder="Search for a business"
                    value={businessNameSearch}
                    onChange={(e) => {
                      setBusinessNameSearch(e.target.value);
                    }}
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                    <FontAwesomeIcon
                      icon={faSearch}
                      onClick={handleBusinessNameSearch}
                      className="cursor-pointer text-customYellow"
                    />
                  </div>
                </div>
              </div>
              {selectedSorting == "oldToNew"
                ? sortByDate(feedback, "oldToNew").map((value) => (
                    <FeedbackCard key={value.feedbackID} feedInfo={value} />
                  ))
                : sortByDate(feedback, "newToOld").map((value) => (
                    <FeedbackCard key={value.feedbackID} feedInfo={value} />
                  ))}
              {feedback.length == 0 && (
                <div className="px-2 flex justify-center items-center">
                  Sorry, we couldn't find any feedback associated with this
                  account with the selected filtering options.
                </div>
              )}
            </>
          )}

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
