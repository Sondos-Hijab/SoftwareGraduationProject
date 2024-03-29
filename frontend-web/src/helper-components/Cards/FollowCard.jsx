import React from "react";
import placeholderUserPicture from "@/assets/images/placeholder.png";
import { Link } from "react-router-dom";
import { createBlobUrl } from "@/utils/utils";

const FollowCard = ({ followInfo }) => {
  const profilePicture = followInfo.picture
    ? createBlobUrl(followInfo.picture.data)
    : placeholderUserPicture;

  let path = "";
  let name = "";

  if (followInfo.businessName) {
    path =
      localStorage.getItem("businessName") == followInfo.businessName
        ? "/profile"
        : `/business/${followInfo.businessName}`;
    name = followInfo.businessName;
  } else {
    path = `/user/${followInfo.userName}`;
    name = followInfo.userName;
  }
  return (
    <Link
      className="w-full border p-4 flex  justify-between bg-white rounded-lg"
      to={path}
    >
      <div className="flex items-center gap-4">
        <img
          alt="profile picture"
          src={profilePicture}
          className="size-16 rounded-full object-cover"
        />

        <strong className="font-medium text-customGreen">{name}</strong>
      </div>
    </Link>
  );
};

export default FollowCard;
