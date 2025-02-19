import React from "react";
import into from "../../assets/intro.gif";
import { Button } from "@mui/material";

const IntroPage = () => {
  return (
    <div className="h-screen p-10 bg-[#f0e0cf]">
      <div className="h-full flex flex-col items-center justify-center">
        <div className="my-5">
          <h4 className="text-lg font-milk">Welcome to</h4>
          <h1 className="text-6xl font-Poppins font-bold">Byaaj.</h1>
          <p className="leading-10 text-sm font-Poppins">
            Your Personal Loan & Interest Tracker
          </p>
        </div>
        <img src={into} alt="Intro" className="my-5" />
        <div className="my-5">
          <Button
            variant="contained"
            type="submit"
            sx={{
              width: "100%",
              backgroundColor: "white",
              fontFamily: "TT Milks Script Trl",
              color: "black",
              padding: "10px 40px",
              border: "none",
              borderRadius: 10,
              textTransform: "none",
              ":hover": {
                backgroundColor: "black",
                color: "white",
              },
            }}
          >
            Get Started
          </Button>
        </div>
      </div>
    </div>
  );
};

export default IntroPage;
