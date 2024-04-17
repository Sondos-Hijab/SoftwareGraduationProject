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

export async function filterFeedbackDependingOnBusinessName(
  username,
  businessName
) {
  const accessToken = localStorage.getItem("accessToken");
  try {
    const response = await axios.get(
      `http://localhost:3000/RateRelay/user/filterFeedbackByName?userName=${username}&businessName=${businessName}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    if (error.response) return error.response.data;
  }
}
export async function filterFeedbackDependingOnCategory(username, category) {
  const accessToken = localStorage.getItem("accessToken");
  try {
    const response = await axios.get(
      `http://localhost:3000/RateRelay/user/filterFeedbackByCategory?userName=${username}&businessCategory=${category}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    if (error.response) return error.response.data;
  }
}
