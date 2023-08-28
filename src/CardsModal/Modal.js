import React, { useRef } from "react";
import "./Modal.css";
import { Card } from "../Cards";

const Modal = ({ isOpen, onClose, cardList }) => {
  const modalRef = useRef(null);

  const handleOutsideClick = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={handleOutsideClick}>
      <div className="modal" ref={modalRef}>
        <div className="search-box">
          <input type="text" placeholder="Search" />
          <img src="/search.png" alt="Search Icon" className="search-icon" />
        </div>
        <div className="card-list">
          {cardList.map((cardData, index) => (
            <Card key={index} cardData={cardData} />
          ))}
        </div>
        <span className="close-button" onClick={onClose}>
          &#10005;
        </span>
      </div>
    </div>
  );
};

export default Modal;
