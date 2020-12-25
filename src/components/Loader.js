import React from "react";
import Loader from "react-loader-spinner";

import "../styles/styles.css";

export default function LoaderFunc() {
  return (
    <div className="loader">
      <Loader type="BallTriangle" color="#00BFFF" height={200} width={200} />
    </div>
  );
}
