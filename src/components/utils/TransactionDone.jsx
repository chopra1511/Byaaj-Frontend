import React from "react";
import success from "../../assets/success.gif";

const TransactionDone = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-[#5db55d]">
      <img src={success} alt="" className="w-96" />
      <h1 className="text-3xl text-white font-Poppins font-bold drop-shadow-xl">
        Transaction Done!
      </h1>
    </div>
  );
};

export default TransactionDone;
