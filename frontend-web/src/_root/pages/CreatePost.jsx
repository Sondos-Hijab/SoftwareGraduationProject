import React, { useState } from "react";
import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { createPost } from "@/apis/postsRequests";
import { useAppContext } from "@/Providers/AppPovider";
import Modal from "@/helper-components/WarningsErrors/Modal";

const CreatePost = () => {
  const [picture, setPicture] = useState(null);
  const [imageView, setImageView] = useState(null);
  const [description, setDescription] = useState("");

  const { accessToken } = useAppContext();
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  //modal showing when an error occurs
  const closeModal = () => {
    setShowModal(false);
  };

  async function handlePostSubmission(event) {
    event.preventDefault();

    if (!picture || !description) {
      setModalMessage("Both description and picture fields should be filled");
      setShowModal(true);
      return;
    }

    const postInfo = new FormData();
    postInfo.append("picture", picture);
    postInfo.append("description", description);

    createPost(accessToken, postInfo).then((value) => {
      if (value.error) {
        setModalMessage(value.error);
        setShowModal(true);
      } else {
        handleReset();
      }
    });
  }

  function handleReset() {
    setDescription("");
    setPicture(null);
  }
  return (
    <>
      <form
        className="flex flex-1 flex-col px-36 py-14"
        onSubmit={handlePostSubmission}
      >
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-xl font-bold leading-7 text-customBlue">
              Create Post
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              This information will be displayed publicly so be careful what you
              share.
            </p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="col-span-full">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Description
                </label>
                <div className="mt-2">
                  <textarea
                    id="description"
                    name="description"
                    rows={4}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-customBlue sm:text-sm sm:leading-6"
                    onChange={(event) => {
                      setDescription(event.target.value);
                    }}
                  />
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="cover-photo"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Add a photo
                </label>

                <div className="mt-2 flex flex-col justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-12">
                  {picture && (
                    <img src={imageView} width={500} className="mx-auto" />
                  )}

                  <div className="text-center">
                    {!picture && (
                      <PhotoIcon
                        className="mx-auto h-12 w-12 text-gray-300"
                        aria-hidden="true"
                      />
                    )}
                    <div className="mt-4 flex content-center justify-center text-sm leading-6 text-gray-600">
                      <label
                        htmlFor="picture"
                        className="relative cursor-pointer rounded-md bg-white font-semibold text-customGreen"
                      >
                        <span className="text-center">Upload a file</span>
                        <input
                          id="picture"
                          name="picture"
                          type="file"
                          className="sr-only"
                          onChange={(event) => {
                            const file = event.target.files[0];
                            if (file) {
                              const reader = new FileReader();
                              reader.onloadend = () => {
                                setPicture(file);
                                setImageView(reader.result);
                              };
                              reader.readAsDataURL(file);
                            }
                          }}
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="reset"
            onClick={handleReset}
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Reset
          </button>
          <button
            type="submit"
            className="rounded-md bg-customBlue px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-customPurple"
          >
            Save
          </button>
        </div>
      </form>
      {showModal && (
        <Modal
          title={"Can't create post"}
          message={modalMessage}
          onClose={closeModal}
        />
      )}
    </>
  );
};

export default CreatePost;
