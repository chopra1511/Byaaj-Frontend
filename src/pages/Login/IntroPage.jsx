import React from "react";
import into from "../../assets/intro.gif";
import { Button } from "@mui/material";

const IntroPage = ({ onGetStarted }) => {
  return (
    <div className="h-screen p-10 bg-[#f0e0cf]">
      <div className="h-full flex flex-col items-center justify-center">
        <div className="my-5 w-full">
          <h4 className="text-lg font-milk">Welcome to</h4>
          <h1 className="text-6xl font-Poppins font-bold">Byaaj.</h1>
          <p className="leading-10 text-[12px] font-Quicksand font-semibold">
            Your Personal Loan & Interest Tracker
          </p>
        </div>
        <img src={into} alt="Intro" className="my-5" />
        <div className="my-5">
          <Button
            variant="contained"
            type="submit"
            className="button-shiny-effect"
            onClick={() => onGetStarted(false)}
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
            Get Started
          </Button>
        </div>
      </div>
    </div>
  );
};

export default IntroPage;
