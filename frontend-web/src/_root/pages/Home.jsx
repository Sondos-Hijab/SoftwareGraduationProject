import { fetchFeedback } from "@/apis/feedbackRequests";
import FeedbackCard from "@/helper-components/Cards/FeedbackCard";
import React, { useState, useEffect, useReducer } from "react";
import Modal from "@/helper-components/WarningsErrors/Modal";
import { useAppContext } from "@/Providers/AppPovider";
import { sortByDate } from "@/utils/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { filterFeedbackDependingOnUsername } from "@/apis/businessPageRequests";

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

  //state management useReducer
  const [modalState, modalDispatch] = useReducer(
    modalReducer,
    initialModalState
  );

  //state management useState
  const [feedback, setFeedback] = useState([]);
  const [allFeedback, setAllFeedback] = useState([]);
  const [selectedFeedbackSorting, setSelectedFeedbackSorting] =
    useState("newToOld");
  const [selectedFeedbackType, setSelectFeedbackType] =
    useState("All Feedback");
  const [usernameSearch, setUsernameSearch] = useState("");

  //handling username search
  async function handleUsernameSearch() {
    const filteredFeedback = await filterFeedbackDependingOnUsername(
      usernameSearch,
      localStorage.getItem("businessName")
    );

    if (filteredFeedback?.error) {
      console.error("Error filtering feedback");
    } else {
      setFeedback(filteredFeedback.feedback);
    }
  }

  useEffect(() => {
    fetchFeedback(businessName, accessToken).then((value) => {
      if (value?.error) {
        modalDispatch({ type: "SHOW_MODAL", payload: value.error });
      } else {
        setFeedback(value.feedback);
        setAllFeedback(value.feedback);
      }
    });
  }, [businessName]);

  return (
    <>
      <div className="flex flex-col flex-1 justify-center px-10 md:px-20 lg:px-32 py-12">
        <h2 className="text-2xl font-bold leading-7 text-customPurple mb-5">
          Recent Feedback
        </h2>

        <div className="flex gap-4 flex-col md:flex-row  my-4 ">
          <select
            defaultValue="choose"
            name="selectedSorting"
            id="sorting"
            className="rounded-md border border-gray-200 focus:ring-white w-full md:w-1/2"
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

          <select
            defaultValue="Select Feedback Tone"
            name="selectedFeedbackType"
            id="feedbackType"
            className="rounded-md border border-gray-200 focus:ring-white w-full md:w-1/2"
            onChange={(e) => {
              setSelectFeedbackType(e.target.value);
            }}
          >
            <option value="Select Feedback Tone" disabled>
              Select Feedback Tone
            </option>
            <option value="All Feedback">All Feedback</option>
            <option value="Positive Feedback">Positive Feedback</option>
            <option value="Neutral Feedback">Neutral Feedback</option>
            <option value="Negative Feedback">Negative Feedback</option>
          </select>
        </div>

        <div className="relative rounded-md mb-4 w-full">
          <input
            className=" rounded-md border border-gray-200 focus:ring-white w-full "
            type="text"
            placeholder="Search for username"
            value={usernameSearch}
            onChange={(e) => {
              setUsernameSearch(e.target.value);
              if (e.target.value.length == 0) {
                setFeedback(allFeedback);
              }
            }}
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            <FontAwesomeIcon
              icon={faSearch}
              onClick={handleUsernameSearch}
              className="cursor-pointer text-customYellow"
            />
          </div>
        </div>

        {selectedFeedbackSorting == "oldToNew"
          ? sortByDate(feedback, "oldToNew").map((value) => (
              <FeedbackCard key={value.feedbackID} feedInfo={value} />
            ))
          : sortByDate(feedback, "newToOld").map((value) => (
              <FeedbackCard key={value.feedbackID} feedInfo={value} />
            ))}
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
