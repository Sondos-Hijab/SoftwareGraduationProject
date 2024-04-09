import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const UserChatSearch = () => {
  return (
    <div className="mt-4">
      <label
        htmlFor="default-search"
        className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300"
      >
        Search
      </label>
      <div className="relative">
        <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </div>
        <input
          type="search"
          id="default-search"
          className="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300  "
          placeholder="Search for a user"
          required
        />
        <button
          type="button"
          className="text-white absolute right-2.5 bottom-2.5 bg-customBlue hover:bg-customPurple  focus:outline-none font-medium rounded-lg text-sm px-4 py-2 "
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default UserChatSearch;
