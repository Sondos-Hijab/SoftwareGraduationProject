import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const InputMessage = () => {
  return (
    <div className="sticky bottom-0 bg-white py-4">
      <div className="flex flex-1 rounded-md">
        <input
          className="w-11/12 py-4 rounded-md border-y-2 border-r-0 border-l-2 border-gray-100 "
          type="text"
          placeholder="Type your message here"
        />
        <div className="bg-customPurple flex-grow rounded-md flex justify-center content-center flex-wrap">
          <FontAwesomeIcon className="size-5 text-white" icon={faPaperPlane} />
        </div>
      </div>
    </div>
  );
};

export default InputMessage;
