import axios from "axios";

export async function fetchBusinessInfo(name, accessToken) {
  const accessTokenLocalStorage = localStorage.getItem("accessToken");
  try {
    const response = await axios.get(
      `http://localhost:3000/RateRelay/user/getBusinesseInfo?name=${name}`,
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

export async function fetchBusinessFeedback(name, accessToken) {
  const accessTokenLocalStorage = localStorage.getItem("accessToken");
  try {
    const response = await axios.get(
      `http://localhost:3000/RateRelay/user/getBusinessFeedback?businessName=${name}`,
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

export async function fetchBusinessFollowers(name, accessToken) {
  const accessTokenLocalStorage = localStorage.getItem("accessToken");
  try {
    const response = await axios.get(
      `http://localhost:3000/RateRelay/user/followers?businessName=${name}`,
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

export async function fetchBusinessPosts(name, accessToken) {
  const accessTokenLocalStorage = localStorage.getItem("accessToken");
  try {
    const response = await axios.get(
      `http://localhost:3000/RateRelay/user/getPost?name=${name}`,
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

export async function getNumberOfFollowers(name, accessToken) {
  const accessTokenLocalStorage = localStorage.getItem("accessToken");
  try {
    const response = await axios.get(
      `http://localhost:3000/RateRelay/user/followersNumber?businessName=${name}`,
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

export async function filterFeedbackDependingOnUsername(
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
