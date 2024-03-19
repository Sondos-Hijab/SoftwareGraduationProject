export async function signin(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const signinData = {
    adminName: formData.get("username"),
    password: formData.get("password"),
  };

  const response = await fetch(
    "http://localhost:3000/RateRelay/user/adminLogin",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signinData),
    }
  );

  if (!response.ok) {
    const errorMessage = await response.json();
    return errorMessage;
  }

  const data = await response.json();
  return data;
}

export async function signup(signupInfo) {
  const response = await fetch(
    "http://localhost:3000/RateRelay/user/adminSignup",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signupInfo),
    }
  );

  if (!response.ok) {
    const errorMessage = await response.json();
    return errorMessage;
  }
  const data = await response.json();
  return data;
}

export async function confirmEmail(emailCofirmationData) {
  const response = await fetch(
    "http://localhost:3000/RateRelay/user/checkAdminEmail",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(emailCofirmationData),
    }
  );
  if (!response.ok) {
    const errorMessage = await response.json();
    return errorMessage;
  } else {
    const data = await response.json();
    localStorage.setItem("tempAccessToken", data.tempAccessToken);
    return data;
  }
}

export async function validateOTP(otpCode) {
  const response = await fetch(
    "http://localhost:3000/RateRelay/user/checkOTP",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("tempAccessToken")}`,
      },
      body: JSON.stringify(otpCode),
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

export async function resetPassword(resetPasswordInfo) {
  const response = await fetch(
    "http://localhost:3000/RateRelay/user/resetAdminPassword",
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("tempAccessToken")}`,
      },
      body: JSON.stringify(resetPasswordInfo),
    }
  );
  if (!response.ok) {
    const errorMessage = await response.json();
    return errorMessage;
  } else {
    const data = await response.json();
    localStorage.removeItem("tempAccessToken");
    return data;
  }
}

export async function logout(accessToken) {
  const response = await fetch("http://localhost:3000/RateRelay/user/logout", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${
        accessToken || localStorage.getItem("accessToken")
      }`,
    },
  });
  if (!response.ok) {
    const errorMessage = await response.json();
    return errorMessage;
  } else {
    const data = await response.json();
    return data;
  }
}
