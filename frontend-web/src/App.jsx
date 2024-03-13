import "./index.css";
import AuthLayout from "./_auth/AuthLayout";
import SigninForm from "./_auth/forms/SigninForm";
import SignupForm from "./_auth/forms/SignupForm";
import RootLayout from "./_root/RootLayout";
import BusinessInfoForm from "./_auth/forms/BusinessInfoForm";
import LocationInfoForm from "./_auth/forms/LocationInfoForm";
import { Routes, Route } from "react-router-dom";
import ResetPasswordForm from "./_auth/forms/forgot-password/ResetPasswordForm";
import EmailConfirmationForm from "./_auth/forms/forgot-password/EmailConfirmationForm";
import OTPcodeForm from "./_auth/forms/forgot-password/OTPcodeForm";
import {
  Home,
  Feedback,
  Messages,
  Dashboard,
  AddPost,
  Notifications,
  Posts,
  Profile,
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
          <Route index element={<Home />} />
          <Route path="/Feedback" element={<Feedback />} />
          <Route path="/AddPost" element={<AddPost />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/Messages" element={<Messages />} />
          <Route path="/Notifications" element={<Notifications />} />
          <Route path="/Posts" element={<Posts />} />
          <Route path="/Profile" element={<Profile />} />
        </Route>
      </Routes>
    </main>
  );
}

export default App;
