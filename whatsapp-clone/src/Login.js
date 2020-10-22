import React from "react";
import "./Login.css";
import { Button } from "@material-ui/core";
import { auth, googleauth } from "./firebase";
import { useStatevalue } from "./StateProvide";
import { actionTypes } from "./reducer";
function Login() {
  const [user, dispatch] = useStatevalue();
  const signIn = () => {
    auth
      .signInWithPopup(googleauth)
      .then((result) => {
        dispatch({
          type: actionTypes.SET_USER,
          user: result.user,
        });
      })
      .catch((error) => {
        alert(error.message);
      });
  };
  return (
    <div className="login">
      <div className="login__container">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
          alt=""
        />
        <div className="login_text">
          <h1>Sign in to Whatsapp</h1>
        </div>
        <Button type="submit" onClick={signIn}>
          Sign In with Google
        </Button>
      </div>
    </div>
  );
}

export default Login;
