import axios from "axios";

export async function fetchFeedback(name, accessToken) {
  const accessTokenLocalStorage = localStorage.getItem("accessToken");
  const businessName = localStorage.getItem("businessName");
  const passedParameter = name ? name : businessName;
  try {
    const response = await axios.get(
      `http://localhost:3000/RateRelay/user/getBusinessFeedback?businessName=${passedParameter}`,
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

export async function filterFeedbackBasedOnTone(businessName, tone) {
  const accessToken = localStorage.getItem("accessToken");
  try {
    const response = await axios.get(
      `http://localhost:3000/RateRelay/user/getBusinessFeedbackByType?businessName=${businessName}&type=${tone}`,
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

export async function filterFeedbackBasedOnToneUser(username, tone) {
  const accessToken = localStorage.getItem("accessToken");
  try {
    const response = await axios.get(
      `http://localhost:3000/RateRelay/user/getUserFeedbackByType?userName=${username}&type=${tone}`,
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
