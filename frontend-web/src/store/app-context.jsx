import { createContext } from "react";

export const appContext = createContext({
  profilePicture: "",
  businessName: "",
  accessToken: "",
});
