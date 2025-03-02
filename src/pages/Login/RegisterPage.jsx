import { useMutation } from "@apollo/client";
import { Button } from "@mui/material";
import React, { useRef } from "react";
import { REGISTER_USER } from "../../mutations/UserMutations";

const RegisterPage = ({ onLoginPage }) => {
  const nameRef = useRef();
  const passwordRef = useRef();
  const phoneRef = useRef();

  const [registerUser, { loading, error }] = useMutation(REGISTER_USER, {
    onCompleted: () => {
      onLoginPage(false);
    },
  });

  const registerHandler = (e) => {
    e.preventDefault();
    registerUser({
      variables: {
        name: nameRef.current.value,
        password: passwordRef.current.value,
        phone: phoneRef.current.value,
      },
    });
  };

  return (
    <div>
      <div className="h-screen p-10 bg-[#f0e0cf] flex flex-col items-center justify-center">
        <h1 className="text-6xl font-Poppins">Register</h1>
        <div className="mt-10 w-full">
          <form className="mt-5" onSubmit={registerHandler}>
            <div className="w-full relative">
              <input
                type="text"
                placeholder="Enter name"
                ref={nameRef}
                className="relative w-full px-5 py-3 outline-none border-2 border-black bg-transparent rounded-xl"
              />
              <label className="text-sm bg-[#f0e0cf] font-Poppins font-semibold px-2 absolute -top-2.5 left-5">
                Name
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

            <div className="w-full mt-5 relative">
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
                {loading ? "..." : "Register"}
              </Button>
            </div>
          </form>

          <div>
            <h1 className="text-sm font-Poppins">
              Have an account ?{" "}
              <span
                className="font-semibold cursor-pointer hover:underline"
                onClick={() => onLoginPage(false)}
              >
                Login
              </span>
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
