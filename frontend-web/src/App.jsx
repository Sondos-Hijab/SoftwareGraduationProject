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
          <Route index element={<Home />} />
          {/* this is a page for a single feedback */}
          <Route path="/feedback/:feedbackId" element={<Feedback />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/posts/:postId" element={<Post />} />
          <Route path="/addPost" element={<AddPost />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/notifications" element={<Notifications />} />
        </Route>
        {/* when the use navigates to undefined page - route */}
        <Route path="*" element={<Error />} />
      </Routes>
    </main>
  );
}

export default App;
