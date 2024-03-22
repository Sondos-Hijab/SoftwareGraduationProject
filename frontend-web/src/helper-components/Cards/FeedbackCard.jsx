import { faEllipsisVertical, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import userPicture from "@/assets/images/user.jpg";
import React from "react";

const FeedbackCard = () => {
  return (
    <>
      <div className="mb-4 block rounded-lg p-4 shadow-md shadow-gray-200 ">
        <div className="mt-2">
          <dl>
            <div className="flex justify-between">
              <dt className="sr-only">Username</dt>
              <dd className="flex font-medium text-customGreen">
                <img
                  className="w-12 h-12 object-cover rounded-full"
                  src={userPicture}
                />
                <p className="flex flex-wrap content-center ml-2">Username</p>
              </dd>
              <button
                type="button"
                className=" text-white self-center sm:font-semibold text-sm h-3/4 px-1 sm:px-4 rounded-3xl py-2 justify-self-end bg-customGreen inline-flex items-center justify-center cursor-pointer"
              >
                Send a message
              </button>
            </div>
          </dl>

          <img
            alt=""
            src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            className="mt-2 h-96 w-full rounded-md object-cover"
          />

          <dl className="mt-2">
            <div>
              <dt className="sr-only">Description</dt>

              <dd className="text-sm text-gray-500">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Laboriosam, hic in esse placeat quis modi reiciendis nobis,
                voluptatum sed animi, ducimus ipsum! Dolorum voluptates
                asperiores, eligendi quas eos exercitationem animi!
              </dd>
            </div>
          </dl>

          <div className="mt-6 flex flex-wrap justify-start gap-8 text-xs flex-col sm:flex-row sm:justify-around ">
            <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
              <FontAwesomeIcon
                className="text-customYellow text-lg"
                icon={faStar}
              />

              <div className="mt-1.5 sm:mt-0">
                <p className="text-customPurple font-semibold">
                  Customer Service Rate
                </p>
                <p className="font-medium">2/5</p>
              </div>
            </div>

            <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
              <FontAwesomeIcon
                className="text-customYellow text-lg"
                icon={faStar}
              />

              <div className="mt-1.5 sm:mt-0">
                <p className="text-customPurple font-semibold">
                  Value Of Money Rate
                </p>
                <p className="font-medium">4/5</p>
              </div>
            </div>

            <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
              <FontAwesomeIcon
                className="text-customYellow text-lg"
                icon={faStar}
              />

              <div className="mt-1.5 sm:mt-0">
                <p className="text-customPurple font-semibold">
                  Product/Service Quality Rate
                </p>
                <p className="font-medium">5/5</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FeedbackCard;
