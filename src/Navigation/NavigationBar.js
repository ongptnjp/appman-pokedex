import React from "react";

import "./NavigationBar.css";

const NavigationBar = ({ onOpenModal }) => {
  return (
    <div className="nav-bar">
      {/* Navigation bar content */}
      <div className="circle" onClick={onOpenModal}>
        +
      </div>
    </div>
  );
};

export default NavigationBar;
