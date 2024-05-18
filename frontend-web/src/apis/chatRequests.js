import axios from "axios";

export async function addChatMessage(chatInfo) {
  const accessTokenLocalStorage = localStorage.getItem("accessToken");
  try {
    const response = await axios.post(
      "http://localhost:3000/RateRelay/user/addChatMessage",
      chatInfo,
      {
        headers: {
          Authorization: `Bearer ${accessTokenLocalStorage}`,
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

export async function fetchMessages(username) {
  const accessTokenLocalStorage = localStorage.getItem("accessToken");
  const businessName = localStorage.getItem("businessName");
  try {
    const response = await axios.get(
      `http://localhost:3000/RateRelay/user/getChatMessages?businessName=${businessName}&userName=${username}`,
      {
        headers: {
          Authorization: `Bearer ${accessTokenLocalStorage}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    if (error.response) return error.response.data;
  }
}

export async function getBusinessChatPartners() {
  const accessTokenLocalStorage = localStorage.getItem("accessToken");
  const businessName = localStorage.getItem("businessName");
  try {
    const response = await axios.get(
      `http://localhost:3000/RateRelay/user/businessChatPartners?businessName=${businessName}`,
      {
        headers: {
          Authorization: `Bearer ${accessTokenLocalStorage}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    if (error.response) return error.response.data;
  }
}
