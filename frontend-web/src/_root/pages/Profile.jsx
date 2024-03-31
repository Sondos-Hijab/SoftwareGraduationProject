import React, { useState, useEffect, useReducer } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import LocationView from "@/helper-components/Location/LocationView";
import { useAppContext } from "@/Providers/AppPovider";
import EditPhoneNumberModal from "@/helper-components/EditBusinessInfo/EditPhoneNumberModal";
import EditBusinessDescriptionModal from "@/helper-components/EditBusinessInfo/EditBusinessDescriptionModel";
import EditBusinessLocationModal from "@/helper-components/EditBusinessInfo/EditBusinessLocationModal";
import { fetchInfo } from "@/apis/profileAndBusinessInfo";
import {
  createBlobUrl,
  sortByDate,
  stringToLocationMarker,
} from "@/utils/utils";
import { Link } from "react-router-dom";
import FeedbackCard from "@/helper-components/Cards/FeedbackCard";
import FollowCard from "@/helper-components/Cards/FollowCard";
import {
  fetchBusinessFeedback,
  fetchBusinessFollowers,
  fetchBusinessPosts,
  getNumberOfFollowers,
} from "@/apis/businessPageRequests";
import PostCard from "@/helper-components/Cards/PostCard";

const modalReducer = (state, action) => {
  switch (action.type) {
    case "TOGGLE_PHONE_MODAL":
      return { ...state, showEditPhoneNumberModal: action.payload };
    case "TOGGLE_DESCRIPTION_MODAL":
      return { ...state, showEditBusinessDescriptionModal: action.payload };
    case "TOGGLE_LOCATION_MODAL":
      return { ...state, showEditBusinessLocationModal: action.payload };
    default:
      return state;
  }
};

const initialModalState = {
  showEditPhoneNumberModal: false,
  showEditBusinessDescriptionModal: false,
  showEditBusinessLocationModal: false,
};

const formReducer = (state, action) => {
  switch (action.type) {
    case "SET_PHONE_NUMBER":
      return { ...state, businessPhoneNumber: action.payload };
    case "SET_DESCRIPTION":
      return { ...state, businessDescription: action.payload };
    case "SET_CATEGORY":
      return { ...state, businessCategory: action.payload };
    case "SET_LOCATION":
      return { ...state, businessLocation: action.payload };
    default:
      return state;
  }
};

const initialFormState = {
  businessPhoneNumber: 0,
  businessDescription: "",
  businessLocation: "",
  businessCategory: "",
};

const Profile = () => {
  const { profileImage, handleImageChange, businessName, accessToken } =
    useAppContext();

  //state management useState
  const [activeTab, setActiveTab] = useState("feedback");
  const [feedback, setFeedback] = useState([]);
  const [posts, setPosts] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [followersNumber, setFollowersNumber] = useState(0);

  //state management useReducer
  const [formState, formDispatch] = useReducer(formReducer, initialFormState);
  const [modalState, modalDispatch] = useReducer(
    modalReducer,
    initialModalState
  );

  const togglePhoneModal = () => {
    modalDispatch({
      type: "TOGGLE_PHONE_MODAL",
      payload: !modalState.showEditPhoneNumberModal,
    });
  };

  const toggleDescriptionModal = () => {
    modalDispatch({
      type: "TOGGLE_DESCRIPTION_MODAL",
      payload: !modalState.showEditBusinessDescriptionModal,
    });
  };

  const toggleLocationModal = () => {
    modalDispatch({
      type: "TOGGLE_LOCATION_MODAL",
      payload: !modalState.showEditBusinessLocationModal,
    });
  };

  useEffect(() => {
    fetchInfo(accessToken).then((businessInfo) => {
      formDispatch({
        type: "SET_DESCRIPTION",
        payload: businessInfo.description,
      });
      formDispatch({
        type: "SET_PHONE_NUMBER",
        payload: businessInfo.phoneNumber,
      });
      formDispatch({ type: "SET_CATEGORY", payload: businessInfo.category });
      formDispatch({
        type: "SET_LOCATION",
        payload: stringToLocationMarker(businessInfo.location),
      });
    });

    const fetchData = async () => {
      try {
        //fetch business feedback
        const feedbackData = await fetchBusinessFeedback(
          businessName,
          accessToken
        );
        if (feedbackData.error) {
          console.error("Error fetching business feedback");
        } else {
          setFeedback(feedbackData.feedback);
        }

        //fetch business posts
        const postsData = await fetchBusinessPosts(businessName, accessToken);
        if (postsData.error) {
          console.error("Error fetching business posts");
        } else {
          setPosts(postsData.posts);
        }

        //fetch business followers
        const followersData = await fetchBusinessFollowers(
          businessName,
          accessToken
        );
        if (followersData.error) {
          console.error("Error fetching business followers");
        } else {
          setFollowers(followersData.followers);
        }

        //fetch number of business followers
        const numberOfFollowersData = await getNumberOfFollowers(
          businessName,
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
            src={profileImage}
            alt="business logo"
          />
          <label
            htmlFor="fileInput"
            className="cursor-pointer absolute bottom-2 right-6 bg-[#13b6f5] w-10 h-10 rounded-full flex justify-center items-center hover:bg-[#fac100]"
          >
            <FontAwesomeIcon className="text-white" icon={faPen} />
          </label>

          <input
            id="fileInput"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
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
                  {businessName}
                </dd>
              </div>

              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Business Phone Number
                </dt>
                <dd className="flex justify-between mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  <p>{formState.businessPhoneNumber}</p>
                  <FontAwesomeIcon
                    onClick={togglePhoneModal}
                    className="cursor-pointer text-[#fac100]"
                    icon={faPen}
                  />
                </dd>
              </div>

              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Business Category
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {formState.businessCategory}
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
                  <p>{formState.businessDescription}</p>
                  <FontAwesomeIcon
                    onClick={toggleDescriptionModal}
                    className="cursor-pointer text-[#fac100]"
                    icon={faPen}
                  />
                </dd>
              </div>
            </dl>
          </div>

          {/* business location */}
          <div className="px-4 sm:px-0 flex justify-between">
            <h3 className="text-base font-semibold leading-7 text-[#2f47c6]  ">
              Business Location
            </h3>
            <FontAwesomeIcon
              className="cursor-pointer text-[#fac100]"
              icon={faPen}
              onClick={toggleLocationModal}
            />
          </div>

          <div className="px-4 py-4 sm:px-0">
            <LocationView position={formState.businessLocation} />
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
          {activeTab === "feedback" &&
            sortByDate(feedback).map((value) => {
              return <FeedbackCard key={value.feedbackID} feedInfo={value} />;
            })}

          {/* posts */}
          {activeTab === "posts" &&
            sortByDate(posts).map((post) => (
              <PostCard
                key={post.postID}
                description={post.description}
                picture={createBlobUrl(post.picture.data)}
                createdAt={post.created_at}
                postID={post.postID}
              />
            ))}
          {/* followers*/}
          {activeTab === "followers" &&
            followers.map((follower, index) => {
              return <FollowCard key={index} followInfo={follower} />;
            })}
        </div>
      </div>

      {modalState.showEditPhoneNumberModal ? (
        <EditPhoneNumberModal
          businessPhoneNumber={formState.businessPhoneNumber}
          setBusinessPhoneNumber={(phoneNumber) =>
            formDispatch({ type: "SET_PHONE_NUMBER", payload: phoneNumber })
          }
          setShowModal={togglePhoneModal}
        />
      ) : (
        ""
      )}
      {modalState.showEditBusinessDescriptionModal ? (
        <EditBusinessDescriptionModal
          businessDescription={formState.businessDescription}
          setBusinessDescription={(description) =>
            formDispatch({ type: "SET_DESCRIPTION", payload: description })
          }
          setShowModal={toggleDescriptionModal}
        />
      ) : (
        ""
      )}
      {modalState.showEditBusinessLocationModal ? (
        <EditBusinessLocationModal
          setBusinessLocation={(location) =>
            formDispatch({ type: "SET_LOCATION", payload: location })
          }
          setShowModal={toggleLocationModal}
        />
      ) : (
        ""
      )}
    </>
  );
};

export default Profile;
