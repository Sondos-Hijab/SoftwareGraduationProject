import { fetchFeedback } from "@/apis/feedbackRequests";
import FeedbackCard from "@/helper-components/Cards/FeedbackCard";
import React, { useState, useEffect, useReducer } from "react";
import Modal from "@/helper-components/WarningsErrors/Modal";
import { useAppContext } from "@/Providers/AppPovider";

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

const Home = () => {
  const { accessToken, businessName } = useAppContext();
  const [feedback, setFeedback] = useState([]);
  const [modalState, modalDispatch] = useReducer(
    modalReducer,
    initialModalState
  );

  useEffect(() => {
    fetchFeedback(businessName, accessToken).then((value) => {
      if (value?.error) {
        modalDispatch({ type: "SHOW_MODAL", payload: value.error });
      } else {
        setFeedback(value.feedback);
      }
    });
  }, [feedback]);

  return (
    <>
      <div className="flex flex-col flex-1 justify-center px-10 md:px-20 lg:px-44 py-12">
        <h2 className="text-2xl font-bold leading-7 text-customPurple mb-5">
          Recent Feedback
        </h2>
        {feedback.map((value) => {
          return <FeedbackCard feedInfo={value} />;
        })}
      </div>

      {modalState.showModal && (
        <Modal
          title={"Can't get feedback"}
          message={modalState.modalMessage}
          onClose={() => {
            modalDispatch({ type: "HIDE_MODAL" });
          }}
        />
      )}
    </>
  );
};

export default Home;
