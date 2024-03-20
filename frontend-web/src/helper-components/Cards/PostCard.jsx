import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import emptyPostPicture from "@/assets/images/empty-post.png";
import React, { useState } from "react";
import { useAppContext } from "@/Providers/AppPovider";
import { deletePost } from "@/apis/postsRequests";
import Modal from "@/helper-components/WarningsErrors/Modal";

const PostCard = ({ description, picture, createdAt, postID }) => {
  const { accessToken } = useAppContext();

  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [showPost, setShowPost] = useState(true);

  function handleDeletePost() {
    deletePost(postID, accessToken).then((value) => {
      if (value.error) {
        setModalMessage(value.error);
        setShowModal(true);
      } else {
        console.log("Deleted successfully!");
        setShowPost(false);
      }
    });
  }
  //modal showing when an error occurs
  const closeModal = () => {
    setShowModal(false);
  };
  const [showEditDeleteList, setShowEditDeleteList] = useState(false);
  // Get current date and time
  const currentDate = new Date(createdAt);

  // Format date as "dd-mmm-yyyy"
  const optionsDate = { day: "2-digit", month: "short", year: "numeric" };
  const formattedDate = currentDate
    .toLocaleDateString("en-US", optionsDate)
    .replace(/,/g, "");

  // Format time as "hh:mm:ss"
  const optionsTime = {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };
  const formattedTime = currentDate.toLocaleTimeString("en-US", optionsTime);
  return (
    <>
      {showPost && (
        <article className="relative overflow-hidden rounded-lg border border-gray-100 bg-white shadow-sm mb-5">
          <a
            onClick={() => {
              setShowEditDeleteList(!showEditDeleteList);
            }}
            className="absolute right-4 top-4 bg-customYellow inline-flex items-center justify-center w-8 h-8 rounded-full cursor-pointer"
          >
            <FontAwesomeIcon
              className="text-white w-5 h-5"
              icon={faEllipsisVertical}
            />
          </a>
          <ul
            className={`${
              showEditDeleteList ? "block " : "hidden "
            } absolute bg-white py-2 px-6 rounded-md top-8 right-8 shadow-md`}
          >
            <li
              className="border-b-2 p-2 cursor-pointer"
              onClick={handleDeletePost}
            >
              Delete Post
            </li>
            <li className="p-2 cursor-pointer">Edit Post</li>
          </ul>
          <img
            alt=""
            src={picture || emptyPostPicture}
            className="h-96 w-full object-cover"
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
      {showModal && (
        <Modal
          title={"Can't delete post"}
          message={modalMessage}
          onClose={closeModal}
        />
      )}
    </>
  );
};

export default PostCard;
