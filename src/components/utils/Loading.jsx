import React from "react";
import loadingGif from "../../assets/loading.gif";

const Loading = () => {
  return (
    <div className="h-screen flex justify-center items-center">
      <img src={loadingGif} alt="" className="w-24" />
    </div>
  );
};

export default Loading;
