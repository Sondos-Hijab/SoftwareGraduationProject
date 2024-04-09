import "./index.css";
import AuthLayout from "./_auth/AuthLayout";
import RootLayout from "./_root/RootLayout";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  SignupForm,
  SigninForm,
  BusinessInfoForm,
  LocationInfoForm,
  OTPcodeForm,
  ResetPasswordForm,
  EmailConfirmationForm,
} from "./_auth/forms";
import {
  Profile,
  Home,
  CreatePost,
  Posts,
  FeedbackPage,
  Chatting,
  Notifications,
  User,
  BusinessPage,
  Dashboard,
} from "./_root/pages";
import Error from "./helper-components/WarningsErrors/Error";
import AppPovider from "./Providers/AppPovider";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        { path: "", element: <Home /> },
        { path: "profile", element: <Profile /> },
        { path: "create-post", element: <CreatePost /> },
        { path: "posts", element: <Posts /> },
        { path: "feedback/:id", element: <FeedbackPage /> },
        { path: "notifications", element: <Notifications /> },
        { path: "user/:username", element: <User /> },
        { path: "business/:businessname", element: <BusinessPage /> },
        { path: "dashboard", element: <Dashboard /> },
      ],
    },
    {
      path: "chatting",
      element: <Chatting />,
    },
    {
      path: "/auth",
      element: <AuthLayout />,
      children: [
        { path: "sign-in", element: <SigninForm /> },
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

  return (
    <AppPovider>
      <RouterProvider router={router} />
    </AppPovider>
  );
}

export default App;
