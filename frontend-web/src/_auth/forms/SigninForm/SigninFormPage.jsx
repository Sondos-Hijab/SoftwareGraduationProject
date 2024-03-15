import React from "react";
import SigninForm from "./SigninForm";
import { redirect } from "react-router-dom";

const SigninFormPage = () => {
  return <SigninForm />;
};

export default SigninFormPage;

export async function action({ request, params }) {
  let formData = await request.formData();

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
    throw new Response(JSON.stringify(errorMessage));
  }
  const data = await response.json();
  localStorage.setItem("accessToken", data.accessToken);
  return redirect("/");
}
