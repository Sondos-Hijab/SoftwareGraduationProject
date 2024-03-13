import "./index.css";
import AuthLayout from "./_auth/AuthLayout";
import RootLayout from "./_root/RootLayout";
import Error from "./helper-components/Error/Error";
import { Routes, Route } from "react-router-dom";
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
  return (
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
          </Route>

          <Route path="/addPost" element={<AddPost />} />
          <Route
            path="/profile"
            element={<Profile />}
            // loader={profileLoader}
          />
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
  );
}

export default App;
