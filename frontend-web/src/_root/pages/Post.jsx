import React from "react";

const Post = () => {
  return <div>Post</div>;
};

export default Post;

export async function postLoader({ request, params }) {
  //note that you can access params here to go to the post with specefic id
  // const response = await fetch("url");
  // if (!response.ok) {
  //   // handle error
  // } else {
  //   const resData = await response.json();
  //   //return data
  //   return resData;
  // }
}
