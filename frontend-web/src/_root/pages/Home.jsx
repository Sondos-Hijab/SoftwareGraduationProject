import { fetchFeedback } from "@/apis/feedbackRequests";
import FeedbackCard from "@/helper-components/Cards/FeedbackCard";
import React, { useState, useEffect } from "react";
import Modal from "@/helper-components/WarningsErrors/Modal";
import { useAppContext } from "@/Providers/AppPovider";

const Home = () => {
  const [feedback, setFeedback] = useState([]);
  const { accessToken, businessName } = useAppContext();

  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  useEffect(() => {
    fetchFeedback(businessName, accessToken).then((value) => {
      if (value?.error) {
        setModalMessage(value.error);
        setShowModal(true);
      } else {
        setFeedback(value.feedback);
        console.log(feedback);
      }
    });
  }, [feedback]);

  const closeModal = () => {
    setShowModal(false);
  };

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

      {showModal && (
        <Modal
          title={"Can't get feedback"}
          message={modalMessage}
          onClose={closeModal}
        />
      )}
    </>
  );
};

export default Home;
