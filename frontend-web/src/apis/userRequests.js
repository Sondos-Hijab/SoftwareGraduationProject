import axios from "axios";

export async function fetchUserInfo(name, accessToken) {
  const accessTokenLocalStorage = localStorage.getItem("accessToken");
  try {
    const response = await axios.get(
      `http://localhost:3000/RateRelay/user/getUserInfo?name=${name}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken || accessTokenLocalStorage}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    if (error.response) return error.response.data;
  }
}

export async function fetchUserFeedback(name, accessToken) {
  const accessTokenLocalStorage = localStorage.getItem("accessToken");
  try {
    const response = await axios.get(
      `http://localhost:3000/RateRelay/user/getUserFeedback?userName=${name}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken || accessTokenLocalStorage}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    if (error.response) return error.response.data;
  }
}

export async function fetchUserFollowing(name, accessToken) {
  const accessTokenLocalStorage = localStorage.getItem("accessToken");
  try {
    const response = await axios.get(
      `http://localhost:3000/RateRelay/user/following?userName=${name}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken || accessTokenLocalStorage}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    if (error.response) return error.response.data;
  }
}
