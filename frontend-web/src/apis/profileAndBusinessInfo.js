export const fetchImage = async (accessToken) => {
  try {
    const accessTokenLocalStorage = localStorage.getItem("accessToken");
    const response = await fetch(
      "http://localhost:3000/RateRelay/user/getAdminProfilePicture",
      {
        headers: {
          Authorization: `Bearer ${accessToken || accessTokenLocalStorage}`,
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

export async function updateImage(accessToken, file) {
  const accessTokenLocalStorage = localStorage.getItem("accessToken");
  const formData = new FormData();
  formData.append("profilePicture", file);
  const response = await fetch(
    "http://localhost:3000/RateRelay/user/addAdminProfilePicture",
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken || accessTokenLocalStorage}`,
      },
      body: formData,
    }
  );
  if (!response.ok) {
    const errorMessage = await response.json();
    return errorMessage;
  } else {
    const data = await response.json();
    return data;
  }
}

export const fetchInfo = async (accessToken) => {
  try {
    const accessTokenLocalStorage = localStorage.getItem("accessToken");
    const response = await fetch(
      "http://localhost:3000/RateRelay/user/getAdminProfileInfo",
      {
        headers: {
          Authorization: `Bearer ${accessToken || accessTokenLocalStorage}`,
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

export async function updateInfo(accessToken, updatedInfo) {
  const accessTokenLocalStorage = localStorage.getItem("accessToken");
  const response = await fetch(
    "http://localhost:3000/RateRelay/user/updateAdminProfile",
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken || accessTokenLocalStorage}`,
      },
      body: JSON.stringify(updatedInfo),
    }
  );
  if (!response.ok) {
    const errorMessage = await response.json();
    return errorMessage;
  } else {
    const data = await response.json();
    return data;
  }
}


