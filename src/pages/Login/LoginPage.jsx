import React, { useRef, useState } from "react";
import IntroPage from "./IntroPage";
import { Button } from "@mui/material";
import RegisterPage from "./RegisterPage";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../../mutations/UserMutations";
import { useNavigate } from "react-router";

const LoginPage = () => {
  const [login, setLogin] = useState(true);
  const [register, setRegister] = useState(false);
  const navigate = useNavigate();

  const phoneRef = useRef();
  const passwordRef = useRef();

  const [userLogin, { loading, error }] = useMutation(LOGIN_USER, {
    onCompleted: () => {
      navigate("/home");
    },
  });

  const loginHandler = (e) => {
    e.preventDefault();
    userLogin({
      variables: {
        phone: phoneRef.current.value,
        password: passwordRef.current.value,
      },
    });
  };
  return (
    <>
      {login && <IntroPage onGetStarted={setLogin} />}
      {!login && !register && (
        <div className="h-screen p-10 bg-[#f0e0cf] flex flex-col items-center justify-center">
          <h1 className="text-6xl font-Poppins">Login</h1>
          <div className="mt-10 w-full">
            <form className="mt-5" onSubmit={loginHandler}>
              <div className="w-full relative">
                <input
                  type="tel"
                  placeholder="Enter phone number"
                  ref={phoneRef}
                  className="relative w-full px-5 py-3 outline-none border-2 border-black bg-transparent rounded-xl"
                />
                <label className="text-sm bg-[#f0e0cf] font-Poppins font-semibold px-2 absolute -top-2.5 left-5">
                  Phone Number
                </label>
              </div>

              <div className="w-full mt-5 relative">
                <input
                  type="password"
                  placeholder="Enter password"
                  ref={passwordRef}
                  className="relative w-full px-5 py-3 outline-none border-2 border-black bg-transparent rounded-xl"
                />
                <label className="text-sm bg-[#f0e0cf] font-Poppins font-semibold px-2 absolute -top-2.5 left-5">
                  Password
                </label>
              </div>

              {error && (
                <h1 className="mt-2 text-sm text-red-500 font-Poppins font-semibold text-center">
                  {error.message}
                </h1>
              )}

              <div className="my-5">
                <Button
                  variant="contained"
                  type="submit"
                  className="button-shiny-effect"
                  sx={{
                    width: "100%",
                    backgroundColor: "black",
                    fontFamily: "TT Milks Script Trl",
                    color: "white",
                    padding: "10px 40px",
                    border: "none",
                    borderRadius: 10,
                    textTransform: "none",
                  }}
                >
                  {loading ? "..." : "Login"}
                </Button>
              </div>
            </form>

            <div>
              <h1 className="text-sm font-Poppins">
                Don't have an account ?{" "}
                <span
                  className="font-semibold cursor-pointer hover:underline"
                  onClick={() => setRegister(true)}
                >
                  Create Account
                </span>
              </h1>
            </div>
          </div>
        </div>
      )}

      {register && !login && <RegisterPage onLoginPage={setRegister} />}
    </>
  );
};

export default LoginPage;
