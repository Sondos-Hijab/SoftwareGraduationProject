import React, { useState, useEffect } from "react";
import LocationView from "@/helper-components/Location/LocationView";
import { Link, useParams } from "react-router-dom";
import { useAppContext } from "@/Providers/AppPovider";
import {
  fetchBusinessFeedback,
  fetchBusinessFollowers,
  fetchBusinessInfo,
  fetchBusinessPosts,
  getNumberOfFollowers,
} from "@/apis/businessPageRequests";
import {
  createBlobUrl,
  sortByDate,
  stringToLocationMarker,
} from "@/utils/utils";
import placeholderBusinessPicture from "@/assets/images/placeholder.png";
import FeedbackCard from "@/helper-components/Cards/FeedbackCard";
import FollowCard from "@/helper-components/Cards/FollowCard";
import BusinessPostCard from "@/helper-components/Cards/BusinessPostCard";

const BusinessPage = () => {
  const { businessname } = useParams();
  const { accessToken } = useAppContext();

  //state manaegement
  const [feedback, setFeedback] = useState([]);
  const [posts, setPosts] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [businessInfo, setBusinessInfo] = useState({});
  const [followersNumber, setFollowersNumber] = useState(0);
  const [activeTab, setActiveTab] = useState("feedback");
  const [selectedFeedbackSorting, setSelectedFeedbackSorting] =
    useState("newToOld");
  const [selectedPostsSorting, setSelectedPostsSorting] = useState("newToOld");

  useEffect(() => {
    const fetchData = async () => {
      try {
        //fetch business info
        const businessInfoData = await fetchBusinessInfo(
          businessname,
          accessToken
        );
        if (businessInfoData.error) {
          console.error("Error fetching business info");
        } else {
          setBusinessInfo({
            ...businessInfoData.business,
            picture: createBlobUrl(businessInfoData.business.picture.data),
          });
        }

        //fetch business feedback
        const feedbackData = await fetchBusinessFeedback(
          businessname,
          accessToken
        );
        if (feedbackData.error) {
          console.error("Error fetching business feedback");
        } else {
          setFeedback(feedbackData.feedback);
        }

        //fetch business posts
        const postsData = await fetchBusinessPosts(businessname, accessToken);
        if (postsData.error) {
          console.error("Error fetching business posts");
        } else {
          setPosts(postsData.posts);
        }

        //fetch business followers
        const followersData = await fetchBusinessFollowers(
          businessname,
          accessToken
        );
        if (followersData.error) {
          console.error("Error fetching business followers");
        } else {
          setFollowers(followersData.followers);
        }

        //fetch  number of business followers
        const numberOfFollowersData = await getNumberOfFollowers(
          businessname,
          accessToken
        );
        if (numberOfFollowersData.error) {
          console.error("Error fetching business followers");
        } else {
          setFollowersNumber(numberOfFollowersData.followerCount);
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
            className="inline-block h-52 w-52 rounded-full border border-gray-300 ring-2 ring-white mx-auto"
            src={businessInfo.picture || placeholderBusinessPicture}
            alt="business logo"
          />
        </div>

        {/* info */}
        <div className="mt-12 w-3/5">
          <div className="px-4 sm:px-0">
            <h3 className="text-base font-semibold leading-7 text-[#2f47c6] ">
              Business Information
            </h3>
          </div>
          <div className="mt-6 border-t border-gray-100">
            <dl className="divide-y divide-gray-100">
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Business Name
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {businessInfo.name}
                </dd>
              </div>

              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Business Phone Number
                </dt>
                <dd className="flex justify-between mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  <p>{businessInfo.phoneNumber}</p>
                </dd>
              </div>

              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Business Category
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {businessInfo.category}
                </dd>
              </div>

              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Number of followers
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {followersNumber}
                </dd>
              </div>

              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Business Description
                </dt>
                <dd className="flex justify-between mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  <p>{businessInfo.description}</p>
                </dd>
              </div>
            </dl>
          </div>

          {/* business location */}
          <div className="px-4 sm:px-0 flex justify-between">
            <h3 className="text-base font-semibold leading-7 text-[#2f47c6]  ">
              Business Location
            </h3>
          </div>

          <div className="px-4 py-4 sm:px-0">
            <LocationView
              position={stringToLocationMarker(businessInfo.location)}
            />
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
                activeTab === "posts"
                  ? "text-gray-900  bg-gray-100  border-gray-200  rounded-lg  active focus:outline-none "
                  : "bg-white  border-gray-200  hover:text-gray-700 rounded-lg hover:bg-gray-50  focus:outline-none "
              }`}
              aria-current={activeTab === "posts" ? "page" : undefined}
              onClick={() => setActiveTab("posts")}
            >
              Posts
            </Link>
          </li>

          <li className="w-full focus-within:z-10 rounded-lg">
            <Link
              className={`inline-block w-full p-4 ${
                activeTab === "followers"
                  ? "text-gray-900  bg-gray-100 border-gray-200  rounded-lg  active focus:outline-none "
                  : "bg-white  border-gray-200  hover:text-gray-700 rounded-lg hover:bg-gray-50  focus:outline-none "
              }`}
              onClick={() => setActiveTab("followers")}
            >
              Followers
            </Link>
          </li>
        </ul>

        <div className="w-3/5 mb-8">
          {/* feedback */}
          {activeTab === "feedback" && (
            <>
              <div className="flex gap-4 flex-col md:flex-row justify-end my-4 ">
                <select
                  defaultValue="choose"
                  name="selectedSorting"
                  id="sorting"
                  className="rounded-md border border-gray-200 focus:ring-white w-1/3"
                  onChange={(e) => {
                    setSelectedFeedbackSorting(e.target.value);
                  }}
                >
                  <option value="choose" disabled>
                    Sort by
                  </option>
                  <option value="oldToNew">Oldest to newest</option>
                  <option value="newToOld">Newest to oldest</option>
                </select>
              </div>

              {selectedFeedbackSorting == "oldToNew"
                ? sortByDate(feedback, "oldToNew").map((value) => (
                    <FeedbackCard key={value.feedbackID} feedInfo={value} />
                  ))
                : sortByDate(feedback, "newToOld").map((value) => (
                    <FeedbackCard key={value.feedbackID} feedInfo={value} />
                  ))}
            </>
          )}
          {/* posts */}
          {activeTab === "posts" && (
            <>
              <div className="flex gap-4 flex-col md:flex-row justify-end my-4 ">
                <select
                  defaultValue="choose"
                  name="selectedSorting"
                  id="sorting"
                  className="rounded-md border border-gray-200 focus:ring-white w-1/3"
                  onChange={(e) => {
                    setSelectedPostsSorting(e.target.value);
                  }}
                >
                  <option value="choose" disabled>
                    Sort by
                  </option>
                  <option value="oldToNew">Oldest to newest</option>
                  <option value="newToOld">Newest to oldest</option>
                </select>
              </div>

              {selectedPostsSorting == "oldToNew"
                ? sortByDate(posts, "oldToNew").map((post) => (
                    <BusinessPostCard
                      key={post.postID}
                      postInfo={post}
                      businessPicture={businessInfo.picture}
                    />
                  ))
                : sortByDate(posts, "newToOld").map((post) => (
                    <BusinessPostCard
                      key={post.postID}
                      postInfo={post}
                      businessPicture={businessInfo.picture}
                    />
                  ))}
            </>
          )}

          {/* followers*/}
          {activeTab === "followers" &&
            followers.map((follower, index) => {
              return <FollowCard key={index} followInfo={follower} />;
            })}
        </div>
      </div>
    </>
  );
};

export default BusinessPage;
