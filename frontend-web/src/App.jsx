import "./index.css";
import AuthLayout from "./_auth/AuthLayout";
import RootLayout from "./_root/RootLayout";
import Error from "./helper-components/Error/Error";
import { Routes, Route } from "react-router-dom";
import { SigninContext } from "./store/sign-in-context";
import { useState } from "react";
import {
  SignupForm,
  SigninForm,
  BusinessInfoForm,
  EmailConfirmationForm,
  LocationInfoForm,
  OTPcodeForm,
  ResetPasswordForm,
} from "./_auth/forms";
import {
  Home,
  Feedback,
  Messages,
  Dashboard,
  AddPost,
  Notifications,
  Posts,
  Profile,
  Post,
  EditPost,
  Followers,
  Follower,
  EditProfile,
  // allFeedbackLoader,
  // feedbackLoader,
  // postsLoader,
  // postLoader,
  // profileLoader,
  // dashboardLoader,
  // notificationsLoader,
  // messagesLoader,
} from "./_root/pages";
function App() {
  // const [signinContext, setSigninContext] = useState({
  //   accessToken: "",
  //   username: "",
  // });

  const [signinContextData, setSigninContextData] = useState({
    accessToken: "",
    username: "",
  });

  const addSigninData = (accessToken, username) => {
    setSigninContextData({ accessToken, username });
  };

  return (
    <SigninContext.Provider value={{ signinContextData, addSigninData }}>
      <main>
        <Routes>
          {/* public routes */}
          <Route element={<AuthLayout />}>
            <Route path="/sign-in" element={<SigninForm />} />
            <Route path="/sign-up" element={<SignupForm />} />
            <Route path="/business-info" element={<BusinessInfoForm />} />
            <Route path="/location-info" element={<LocationInfoForm />} />
            <Route path="/reset-password" element={<ResetPasswordForm />} />
            <Route path="/confirm-email" element={<EmailConfirmationForm />} />
            <Route path="/otp-code-form" element={<OTPcodeForm />} />
          </Route>
          {/* private routes */}
          <Route element={<RootLayout />}>
            {/* home page will be containing all feedback */}
            <Route
              index
              element={<Home />}
              // loader={allFeedbackLoader}
            />
            {/* this is a page for a single feedback */}
            <Route
              path="/feedback/:feedbackId"
              element={<Feedback />}
              // loader={feedbackLoader}
            />
            <Route
              path="/posts"
              element={<Posts />}
              // loader={postsLoader}
            />
            <Route
              path="/post"
              // loader={postLoader}
            >
              <Route path=":postId" element={<Post />} />
              <Route path=":postId/edit-post" element={<EditPost />} />
              <Route path="addPost" element={<AddPost />} />
            </Route>

            <Route path="/followers" element={<Followers />} />

            <Route path="/follower/:followerId" element={<Follower />} />

            <Route
              path="/profile"
              element={<Profile />}
              // loader={profileLoader}
            />

            <Route path="/editProfile" element={<EditProfile />} />

            <Route
              path="/dashboard"
              element={<Dashboard />}
              // loader={dashboardLoader}
            />
            <Route
              path="/messages"
              element={<Messages />}
              // loader={messagesLoader}
            />
            <Route
              path="/notifications"
              element={<Notifications />}
              // loader={notificationsLoader}
            />
          </Route>
          {/* when the use navigates to undefined page - route */}
          <Route path="*" element={<Error />} />
        </Routes>
      </main>
    </SigninContext.Provider>
  );
}

export default App;
