import React from "react";
import { FallingLines } from "react-loader-spinner";

const LoadingScreen = () => {
  return (
    <div className="div-center">
      <FallingLines
        color="#8d5acd"
        width="100"
        visible={true}
        ariaLabel="falling-lines-loading"
      />
    </div>
  );
};

export default LoadingScreen;
