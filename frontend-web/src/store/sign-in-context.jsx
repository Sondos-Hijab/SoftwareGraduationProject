import { createContext } from "react";

export const SigninContext = createContext({
  accessToken: "",
  username: "",
  addSigninData: () => {},
});
