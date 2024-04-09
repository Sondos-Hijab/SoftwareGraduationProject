import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import placeHolderBusinessPicture from "@/assets/images/placeholder.png";
import emptyPostPicture from "@/assets/images/empty.png";
import React, { useReducer, useState } from "react";
import { useAppContext } from "@/Providers/AppPovider";
import { deletePost } from "@/apis/postsRequests";
import Modal from "@/helper-components/WarningsErrors/Modal";
import { getDatTimeFromString } from "@/utils/utils";
import { Link } from "react-router-dom";
import EditPostModal from "../EditBusinessInfo/EditPostModal";

const initialState = {
  showModal: false,
  modalMessage: "",
  showPost: true,
  showConfirmDeleteModal: false,
  showEditDeleteList: false,
  showEditPostModal: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SHOW_MODAL":
      return { ...state, showModal: true, modalMessage: action.payload };
    case "HIDE_MODAL":
      return { ...state, showModal: false };
    case "SHOW_CONFIRM_DELETE_MODAL":
      return { ...state, showConfirmDeleteModal: true };
    case "HIDE_CONFIRM_DELETE_MODAL":
      return { ...state, showConfirmDeleteModal: false };
    case "SHOW_EDIT_MODAL":
      return { ...state, showEditPostModal: true };
    case "HIDE_EDIT_MODAL":
      return { ...state, showEditPostModal: false };
    case "TOGGLE_EDIT_DELETE_LIST":
      return { ...state, showEditDeleteList: !state.showEditDeleteList };
    case "DELETE_POST":
      return { ...state, showPost: false };
    default:
      return state;
  }
};

const PostCard = ({
  description: initialDescription,
  picture,
  createdAt,
  postID,
}) => {
  const { formattedDate, formattedTime } = getDatTimeFromString(createdAt);
  const { accessToken, profileImage } = useAppContext();

  const [state, dispatch] = useReducer(reducer, initialState);
  const [description, setPostDescription] = useState(initialDescription);

  const handleDeletePost = () => {
    deletePost(postID, accessToken).then((value) => {
      if (value.error) {
        dispatch({ type: "SHOW_MODAL", payload: value.error });
      } else {
        dispatch({ type: "DELETE_POST" });
      }
    });
    dispatch({ type: "HIDE_CONFIRM_DELETE_MODAL" });
  };

  const closeModal = () => {
    dispatch({ type: "HIDE_MODAL" });
  };

  return (
    <>
      {state.showPost && (
        <article className="relative overflow-hidden rounded-lg border border-gray-100 bg-white shadow-sm mb-5 px-4">
          <a
            onClick={() => {
              dispatch({ type: "TOGGLE_EDIT_DELETE_LIST" });
            }}
            className="absolute right-4 top-4 bg-customYellow inline-flex items-center justify-center w-6 h-6 rounded-full cursor-pointer"
          >
            <FontAwesomeIcon
              className="text-white w-4 h-4"
              icon={faEllipsisVertical}
            />
          </a>
          <ul
            className={`${
              state.showEditDeleteList ? "block " : "hidden "
            } absolute bg-white py-2 px-6 rounded-md top-8 right-8 shadow-md`}
          >
            <li
              className="border-b-2 p-2 cursor-pointer"
              onClick={() => {
                dispatch({ type: "SHOW_CONFIRM_DELETE_MODAL" });
              }}
            >
              Delete Post
            </li>
            <li
              className="p-2 cursor-pointer"
              onClick={() => {
                dispatch({ type: "SHOW_EDIT_MODAL" });
              }}
            >
              Edit Post
            </li>
          </ul>

          <dl className="cursor-pointer my-4">
            <div className="flex justify-between">
              <Link to={"/profile"}>
                <dt className="sr-only">Business Name</dt>
                <dd className="flex font-medium text-customGreen">
                  <img
                    className="w-12 h-12 object-cover rounded-full shadow-md"
                    src={profileImage || placeHolderBusinessPicture}
                  />
                  <p className="flex flex-wrap content-center ml-2">
                    {localStorage.getItem("businessName")}
                  </p>
                </dd>
              </Link>
            </div>
          </dl>

          <img
            alt=""
            src={picture || emptyPostPicture}
            className="mt-2 h-96 w-full rounded-md object-cover"
          />

          <div className="p-4 sm:p-6">
            <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-500">
              {description}
            </p>

            <div className="flex flex-1 justify-between mt-5">
              <p className="text-customGreen">Date: {formattedDate}</p>
              <p className="text-customGreen">Time: {formattedTime}</p>
            </div>
          </div>
        </article>
      )}
      {state.showModal && (
        <Modal
          title={"Can't delete post"}
          message={state.modalMessage}
          onClose={closeModal}
        />
      )}

      {state.showConfirmDeleteModal && (
        <div class="flex justify-center items-center fixed top-0 right-0 bottom-0 left-0">
          <div class="bg-white px-16 py-14 rounded-md text-center">
            <h1 class="text-xl mb-4 font-bold text-slate-500">
              Are you sure you want to delete this post?
            </h1>
            <button
              class="bg-customRed px-4 py-2 rounded-md text-md text-white"
              onClick={() => {
                dispatch({ type: "HIDE_CONFIRM_DELETE_MODAL" });
                dispatch({ type: "TOGGLE_EDIT_DELETE_LIST" });
              }}
            >
              Cancel
            </button>
            <button
              class="bg-customBlue px-7 py-2 ml-2 rounded-md text-md text-white font-semibold"
              onClick={handleDeletePost}
            >
              Yes
            </button>
          </div>
        </div>
      )}

      {state.showEditPostModal && (
        <EditPostModal
          hideModal={() => {
            dispatch({ type: "HIDE_EDIT_MODAL" });
            dispatch({ type: "TOGGLE_EDIT_DELETE_LIST" });
          }}
          postID={postID}
          postDescription={description}
          setPostDescription={setPostDescription}
        />
      )}
    </>
  );
};

export default PostCard;
