import PostCard from "@/helper-components/Cards/PostCard";
import React from "react";

const Posts = () => {
  const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  return (
    <div className="flex flex-col flex-1 justify-center px-44 py-12">
      <h2 className="text-2xl font-bold leading-7 text-customPurple mb-5">
        My Posts
      </h2>
      {arr.map((index) => (
        <PostCard key={index} />
      ))}
    </div>
  );
};

export default Posts;
