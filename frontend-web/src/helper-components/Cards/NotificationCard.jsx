import { createBlobUrl, getFormattedDateAndTime } from "@/utils/utils";
import React from "react";
import { Link } from "react-router-dom";

const NotificationCard = ({ feedback }) => {
  return (
    <div>
      <Link
        className="border p-4 flex justify-between bg-slate-50"
        to={`/notifications/${feedback["feedbackID"]}`}
        state={feedback}
      >
        <div className="flex items-center gap-4">
          {feedback?.userProfilePicture &&
            feedback?.userProfilePicture?.data && (
              <img
                alt="user profile picture"
                src={createBlobUrl(feedback["userProfilePicture"]["data"])}
                className="size-16 rounded-full object-cover"
              />
            )}
          {feedback?.userProfilePicture &&
            !feedback?.userProfilePicture?.data && (
              <img
                alt="user profile picture"
                src={createBlobUrl(feedback["userProfilePicture"])}
                className="size-16 rounded-full object-cover"
              />
            )}

          <div>
            <strong className="font-medium text-customBlue">
              {feedback["userName"]}
            </strong>

            <p className="mt-1 text-sm ">{feedback["text"]}</p>
            <p className="text-xs text-customGreen">
              {getFormattedDateAndTime(feedback["created_at"])}
            </p>
          </div>
        </div>

        {feedback?.picture && feedback?.picture?.data && (
          <img
            alt="user profile picture"
            src={createBlobUrl(feedback["picture"]["data"])}
            className="size-16 object-cover"
          />
        )}
        {feedback?.picture && !feedback?.picture?.data && (
          <img
            alt="user profile picture"
            src={createBlobUrl(feedback["picture"])}
            className="size-16 object-cover"
          />
        )}
      </Link>
    </div>
  );
};

export default NotificationCard;
