import { useAppContext } from "@/Providers/AppPovider";
import { fetchPosts } from "@/apis/postsRequests";
import PostCard from "@/helper-components/Cards/PostCard";
import Modal from "@/helper-components/WarningsErrors/Modal";
import React, { useEffect, useState } from "react";

const Posts = () => {
  const [posts, setPosts] = useState();
  const { accessToken, businessName } = useAppContext();

  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  useEffect(() => {
    fetchPosts(businessName, accessToken).then((value) => {
      if (value.error) {
        setModalMessage(value.error);
        setShowModal(true);
      } else {
        setPosts(value.posts);
        console.log(posts);
      }
    });
  }, []);

  //modal showing when an error occurs
  const closeModal = () => {
    setShowModal(false);
  };
  return (
    <>
      <div className="flex flex-col flex-1 justify-center px-44 py-12">
        <h2 className="text-2xl font-bold leading-7 text-customPurple mb-5">
          My Posts
        </h2>
        {posts &&
          posts.map((post) => {
            let url;
            if (post.picture) {
              const byteArray = new Uint8Array(post.picture.data);
              const blob = new Blob([byteArray], { type: "image/*" });
              url = URL.createObjectURL(blob);
            }
            return (
              <PostCard
                key={post.postID}
                description={post.description}
                createdAt={post.created_at}
                picture={url}
                postID={post.postID}
              />
            );
          })}
      </div>
      {showModal && (
        <Modal
          title={"Can't get posts"}
          message={modalMessage}
          onClose={closeModal}
        />
      )}
    </>
  );
};

export default Posts;
