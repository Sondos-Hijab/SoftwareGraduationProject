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
