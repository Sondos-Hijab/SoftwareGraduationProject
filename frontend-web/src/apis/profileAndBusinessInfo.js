export const fetchImage = async () => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    const response = await fetch(
      "http://localhost:3000/RateRelay/user/getAdminProfilePicture",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data["UserProfilePicture"];
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const fetchInfo = async () => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    const response = await fetch(
      "http://localhost:3000/RateRelay/user/getAdminProfileInfo",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data["businessInfo"];
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
