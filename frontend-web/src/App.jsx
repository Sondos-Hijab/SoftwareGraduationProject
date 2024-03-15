import "./index.css";
import AuthLayout from "./_auth/AuthLayout";
import RootLayout from "./_root/RootLayout";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { SigninContext } from "./store/sign-in-context";
import { useState } from "react";
import {
  SignupForm,
  SigninFormPage,
  BusinessInfoForm,
  LocationInfoForm,
  OTPcodeForm,
  ResetPasswordForm,
  signinAction,
  EmailConfirmationForm,
} from "./_auth/forms";

import { Home } from "./_root/pages";
import Error from "./helper-components/Error/Error";

function App() {
  const router = createBrowserRouter([
    { path: "/", element: <Home /> },
    {
      path: "/auth",
      element: <AuthLayout />,
      children: [
        {
          path: "sign-in",
          element: <SigninFormPage />,
          action: signinAction,
          errorElement: <Error />,
        },
        { path: "sign-up", element: <SignupForm /> },
        { path: "business-info", element: <BusinessInfoForm /> },
        { path: "location-info", element: <LocationInfoForm /> },
        { path: "confirm-email", element: <EmailConfirmationForm /> },
        { path: "otp-code-form", element: <OTPcodeForm /> },
        { path: "reset-password", element: <ResetPasswordForm /> },
      ],
    },
    { path: "*", element: <Error /> },
  ]);

  const [signinContextData, setSigninContextData] = useState({
    accessToken: "",
    username: "",
  });

  const addSigninData = (accessToken, username) => {
    setSigninContextData({ accessToken, username });
  };

  return (
    <SigninContext.Provider value={{ signinContextData, addSigninData }}>
      <RouterProvider router={router} />
    </SigninContext.Provider>
  );
}

export default App;

{
  /* <Routes>
<Route element={<AuthLayout />}>
  <Route path="/sign-in" element={<SigninForm />} />
  <Route path="/sign-in-try" element={<Signin />} />
  <Route path="/sign-up" element={<SignupForm />} />
  <Route path="/business-info" element={<BusinessInfoForm />} />
  <Route path="/location-info" element={<LocationInfoForm />} />
  <Route path="/reset-password" element={<ResetPasswordForm />} />
  <Route path="/confirm-email" element={<EmailConfirmationForm />} />
  <Route path="/otp-code-form" element={<OTPcodeForm />} />
</Route>
<Route element={<RootLayout />}>
  <Route index element={<Home />} />
  <Route path="/feedback/:feedbackId" element={<Feedback />} />
  <Route path="/posts" element={<Posts />} />
  <Route path="/post">
    <Route path=":postId" element={<Post />} />
    <Route path=":postId/edit-post" element={<EditPost />} />
    <Route path="addPost" element={<AddPost />} />
  </Route>
  <Route path="/followers" element={<Followers />} />
  <Route path="/follower/:followerId" element={<Follower />} />
  <Route path="/profile" element={<Profile />} />
  <Route path="/editProfile" element={<EditProfile />} />
  <Route path="/dashboard" element={<Dashboard />} />
  <Route path="/messages" element={<Messages />} />
  <Route path="/notifications" element={<Notifications />} />
</Route>
<Route path="*" element={<Error />} />
</Routes> */
}
