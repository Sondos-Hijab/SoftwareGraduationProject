import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const PostCard = () => {
  // Get current date and time
  const currentDate = new Date();

  // Format date as "dd-mmm-yyyy"
  const optionsDate = { day: "2-digit", month: "short", year: "numeric" };
  const formattedDate = currentDate
    .toLocaleDateString("en-US", optionsDate)
    .replace(/,/g, "");

  // Format time as "hh:mm:ss"
  const optionsTime = {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };
  const formattedTime = currentDate.toLocaleTimeString("en-US", optionsTime);
  return (
    <article className="relative overflow-hidden rounded-lg border border-gray-100 bg-white shadow-sm mb-5">
      <a className="absolute right-4 top-4 bg-customYellow inline-flex items-center justify-center w-8 h-8 rounded-full cursor-pointer">
        <FontAwesomeIcon
          className="text-white w-5 h-5"
          icon={faEllipsisVertical}
        />
      </a>
      <ul className="absolute bg-white py-2 px-6 rounded-md top-6 right-6">
        <li className="border-b-2 p-2 cursor-pointer">Delete Post</li>
        <li className="p-2 cursor-pointer">Edit Post</li>
      </ul>
      <img
        alt=""
        src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        className="h-96 w-full object-cover"
      />

      <div className="p-4 sm:p-6">
        <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-500">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae
          dolores, possimus pariatur animi temporibus nesciunt praesentium
          dolore sed nulla ipsum eveniet corporis quidem, mollitia itaque minus
          soluta, voluptates neque explicabo tempora nisi culpa eius atque
          dignissimos. Molestias explicabo corporis voluptatem?
        </p>

        <div className="flex flex-1 justify-between mt-5">
          <p className="text-customGreen">Date: {formattedDate}</p>
          <p className="text-customGreen">Time: {formattedTime}</p>
        </div>
      </div>
    </article>
  );
};

export default PostCard;
