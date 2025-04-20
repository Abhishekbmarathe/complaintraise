import React from "react";
import "./Loader.css"; // Add this line

const Loader = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="flex space-x-4">
        <span className="dot bounce1" />
        <span className="dot bounce2" />
        <span className="dot bounce3" />
      </div>
    </div>
  );
};

export default Loader;