import { useState, useReducer } from "react";
import logo from "../../assets/images/logo.png";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Form.module.css";
import { hasMinLength } from "@/utils/validation";
import Modal from "@/helper-components/WarningsErrors/Modal";
import { signin } from "@/apis/authRequests";
import { useAppContext } from "@/Providers/AppPovider";
import { getExpireDate } from "@/utils/utils";

const initialModalState = {
  showModal: false,
  modalMessage: "",
};

const modalReducer = (state, action) => {
  switch (action.type) {
    case "SHOW_MODAL":
      return { ...state, showModal: true, modalMessage: action.payload };
    case "HIDE_MODAL":
      return { ...state, showModal: false };
    default:
      return state;
  }
};


export default function SigninForm() {
  const { setFetchedAccessToken } = useAppContext();
  const navigate = useNavigate();
  const [modalState, modalDispatch] = useReducer(modalReducer, initialModalState);

  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [canSubmit, setCanSubmit] = useState(false);


  async function submitSigninData(event) {
    signin(event).then((response) => {
      if (response.error) {
        modalDispatch({
          type: "SHOW_MODAL",
          payload: "There was a problem signing in: " + response.error,
        });
      } else {
        localStorage.setItem("accessToken", response.accessToken);
        localStorage.setItem("refreshToken", response.refreshToken);
        localStorage.setItem("expireDate", getExpireDate());
        setFetchedAccessToken(response.accessToken);
        navigate("/");
      }
    });
  }

  return (
    <>
      <div className={styles["form-container"]}>
        <div className={styles["header-info-container"]}>
          <img src={logo} alt="RateRelay" />
          <h2>Sign in to your account</h2>
        </div>

        <div className={styles["form-container"]}>
          <form className={styles.form} onSubmit={submitSigninData}>
            <div className={styles["input-container"]}>
              <label htmlFor="username">Username</label>
              <div>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  onChange={(event) => {
                    if (event.target.value == "") {
                      setUsernameError("");
                      setCanSubmit(false);
                    } else if (!hasMinLength(event.target.value, 5)) {
                      setUsernameError(
                        "Username should be at least 5 characters"
                      );
                      setCanSubmit(false);
                    } else {
                      setUsernameError("");
                      setCanSubmit(true);
                    }
                  }}
                />
              </div>
              {usernameError && <p className={styles.error}>{usernameError}</p>}
            </div>

            <div className={styles["input-container"]}>
              <label htmlFor="password">Password</label>
              <div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  onChange={(event) => {
                    if (event.target.value == "") {
                      setPasswordError("");
                      setCanSubmit(false);
                    } else if (!hasMinLength(event.target.value, 6)) {
                      setPasswordError(
                        "Password should be at least 6 characters"
                      );
                      setCanSubmit(false);
                    } else {
                      setPasswordError("");
                      setCanSubmit(true);
                    }
                  }}
                />
              </div>
              {passwordError && <p className={styles.error}>{passwordError}</p>}
            </div>

            <div className={styles["flex-end"]}>
              <Link to="/auth/confirm-email" className={styles["link-text"]}>
                Forgot password?
              </Link>
            </div>

            <button
              disabled={!canSubmit}
              type="submit"
              className={styles.button}
            >
              Sign in
            </button>
          </form>

          <p className={styles["paragraph-text"]}>
            Not a member?
            <Link
              to="/auth/sign-up"
              relative="route"
              className={styles["link-text"]}
            >
              {" "}
              Go to Sign up
            </Link>
          </p>
        </div>
      </div>
      {modalState.showModal && (
        <Modal
          title="Can't Sign Your Business In"
          message={modalState.modalMessage}
          onClose={() => {
            modalDispatch({ type: "HIDE_MODAL" });
          }}
        />
      )}
    </>
  );
}
