import axios from "axios";

export async function createPost(accessToken, postInfo) {
  const accessTokenLocalStorage = localStorage.getItem("accessToken");
  console.log(postInfo.get("picture"));
  try {
    const response = await axios.post(
      "http://localhost:3000/RateRelay/user/addPost",
      postInfo,
      {
        headers: {
          Authorization: `Bearer ${accessToken || accessTokenLocalStorage}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    if (error.response) {
      return error.response.data;
    } else {
      return { error: "Network error" };
    }
  }
}

export async function fetchPosts(name, accessToken) {
  const accessTokenLocalStorage = localStorage.getItem("accessToken");
  const businessName = localStorage.getItem("businessName");
  const passedParameter = name ? name : businessName;
  try {
    const response = await axios.get(
      `http://localhost:3000/RateRelay/user/getPost?name=${passedParameter}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken || accessTokenLocalStorage}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    if (error.response) return error.response.data;
  }
}

export async function deletePost(postId, accessToken) {
  const accessTokenLocalStorage = localStorage.getItem("accessToken");
  try {
    const response = await axios.delete(
      "http://localhost:3000/RateRelay/user/deletePost",
      {
        headers: {
          Authorization: `Bearer ${accessToken || accessTokenLocalStorage}`,
        },
        data: {
          postId: postId,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error deleting post:", error);
    if (error.response) return error.response.data;
  }
}
