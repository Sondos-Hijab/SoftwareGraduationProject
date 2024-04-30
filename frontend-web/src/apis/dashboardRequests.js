import axios from "axios";

export async function getAvgRate(rateType, startDate, endDate) {
  const accessToken = localStorage.getItem("accessToken");
  const businessName = localStorage.getItem("businessName");
  try {
    const response = await axios.get(
      `http://localhost:3000/RateRelay/user/avgRate?businessName=${businessName}&rateType=${rateType}&startDate=${startDate}&endDate=${endDate}`,
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

export async function getFeedbackGenderRatio() {
  const accessToken = localStorage.getItem("accessToken");
  const businessName = localStorage.getItem("businessName");
  try {
    const response = await axios.get(
      `http://localhost:3000/RateRelay/user/feedbackGenderRatio?businessName=${businessName}`,
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

export async function getFollowGenderRatio() {
  const accessToken = localStorage.getItem("accessToken");
  const businessName = localStorage.getItem("businessName");
  try {
    const response = await axios.get(
      `http://localhost:3000/RateRelay/user/followGenderRatio?businessName=${businessName}`,
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

export async function getFeedbackAgeRatio() {
  const accessToken = localStorage.getItem("accessToken");
  const businessName = localStorage.getItem("businessName");
  try {
    const response = await axios.get(
      `http://localhost:3000/RateRelay/user/feedbackAgeRatio?businessName=${businessName}`,
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

export async function getFollowAgeRatio() {
  const accessToken = localStorage.getItem("accessToken");
  const businessName = localStorage.getItem("businessName");
  try {
    const response = await axios.get(
      `http://localhost:3000/RateRelay/user/followAgeRatio?businessName=${businessName}`,
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

export async function getUniqueFeedbackAgeRatio() {
  const accessToken = localStorage.getItem("accessToken");
  const businessName = localStorage.getItem("businessName");
  try {
    const response = await axios.get(
      `http://localhost:3000/RateRelay/user/ageFeedbackRatio?businessName=${businessName}`,
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

export async function getUniqueFeedbackGenderRatio() {
  const accessToken = localStorage.getItem("accessToken");
  const businessName = localStorage.getItem("businessName");
  try {
    const response = await axios.get(
      `http://localhost:3000/RateRelay/user/genderFeedbackRatio?businessName=${businessName}`,
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

export async function getSentimentAnalysisFeedbackStats() {
  const accessToken = localStorage.getItem("accessToken");
  const businessName = localStorage.getItem("businessName");
  try {
    const response = await axios.get(
      `http://localhost:3000/RateRelay/user/getFeedbackStatsByType?businessName=${businessName}`,
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
