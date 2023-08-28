import React, { useState } from "react";

import { CardModal } from "../CardsModal"; // Import the modal component

import "./NavigationBar.css";

const NavigationBar = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="nav-bar">
      {/* Navigation bar content */}
      <div className="circle" onClick={openModal}>
        +
      </div>
      <CardModal isOpen={modalOpen} onClose={closeModal} />
    </div>
  );
};

export default NavigationBar;
