import { useAppContext } from "@/Providers/AppPovider";
import { fetchPosts } from "@/apis/postsRequests";
import PostCard from "@/helper-components/Cards/PostCard";
import Modal from "@/helper-components/WarningsErrors/Modal";
import { createBlobUrl, sortByDate } from "@/utils/utils";
import React, { useEffect, useState, useReducer } from "react";

const initialModalState = {
  showModal: false,
  modalMessage: "",
};

const modalReducer = (state, action) => {
  switch (action.type) {
    case "SHOW_MODAL":
      return { ...state, showModal: true, modalMessage: action.payload };
    case "HIDE_MODAL":
      return { ...state, showModal: false };
    default:
      return state;
  }
};

const Posts = () => {
  const { accessToken, businessName } = useAppContext();

  //state management useReducer
  const [modalState, modalDispatch] = useReducer(
    modalReducer,
    initialModalState
  );

  //state management useState
  const [posts, setPosts] = useState();
  const [selectedPostsSorting, setSelectedPostsSorting] = useState("newToOld");

  useEffect(() => {
    fetchPosts(businessName, accessToken).then((value) => {
      if (value.error) {
        modalDispatch({ type: "SHOW_MODAL", payload: value.error });
      } else {
        setPosts(value.posts);
      }
    });
  }, []);

  return (
    <>
      <div className="flex flex-col flex-1 justify-center px-10 md:px-20 lg:px-32 py-12">
        <h2 className="text-2xl font-bold leading-7 text-customPurple mb-5">
          My Posts
        </h2>
        <div className="flex gap-4 flex-col md:flex-row justify-end my-4 ">
          <select
            defaultValue="choose"
            name="selectedSorting"
            id="sorting"
            className="rounded-md border border-gray-200 focus:ring-white w-full"
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
              <PostCard
                key={post.postID}
                description={post.description}
                picture={createBlobUrl(post.picture.data)}
                createdAt={post.created_at}
                postID={post.postID}
              />
            ))
          : sortByDate(posts, "newToOld").map((post) => (
              <PostCard
                key={post.postID}
                description={post.description}
                picture={createBlobUrl(post.picture.data)}
                createdAt={post.created_at}
                postID={post.postID}
              />
            ))}
      </div>
      {modalState.showModal && (
        <Modal
          title={"Can't get posts"}
          message={modalState.modalMessage}
          onClose={() => {
            modalDispatch({ type: "HIDE_MODAL" });
          }}
        />
      )}
    </>
  );
};

export default Posts;
