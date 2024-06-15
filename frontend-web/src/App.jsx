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
import { socket } from "./constants";
import {
  Profile,
  Home,
  CreatePost,
  Posts,
  FeedbackPage,
  Notifications,
  User,
  BusinessPage,
  Dashboard,
} from "./_root/pages";
import Error from "./helper-components/WarningsErrors/Error";
import AppPovider from "./Providers/AppPovider";
import MessagesProvider from "./Providers/MessagesProvider";
import ChatLayout from "./_chat/ChatLayout";
import Chatting from "./_chat/Chatting";
import ChattingMobile from "./_chat/ChattingMobile";
import { useEffect } from "react";
import NotificationsProvider from "@/Providers/NotificationsProvider";

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
        { path: "notifications", element: <Notifications /> },
        { path: "notifications/:feedbackId", element: <FeedbackPage /> },
        { path: "user/:username", element: <User /> },
        { path: "business/:businessname", element: <BusinessPage /> },
        { path: "dashboard", element: <Dashboard /> },
      ],
    },
    {
      path: "/chatting",
      element: <ChatLayout />,
      children: [
        { path: ":username", element: <Chatting /> },
        { path: "chat/:username", element: <ChattingMobile /> },
      ],
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

  useEffect(() => {
    socket.on("connect", () => {
      console.log(`Connected with socket ID: ${socket.id}`);
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from socket server");
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
    };
  }, []);

  return (
    <AppPovider>
      <MessagesProvider>
        <NotificationsProvider>
          <RouterProvider router={router} />
        </NotificationsProvider>
      </MessagesProvider>
    </AppPovider>
  );
}

export default App;
