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
