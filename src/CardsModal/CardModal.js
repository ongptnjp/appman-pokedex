import React, { useRef, useEffect, useState } from "react";

import Card from "../Cards/Card";

import "./CardModal.css";

const CardModal = ({ isOpen, onClose, setCardList }) => {
  const modalRef = useRef(null);
  const [availableCards, setAvailableCards] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3030/api/cards?limit=30`)
      .then((response) => response.json())
      .then((data) => setAvailableCards(data?.cards))
      .catch((error) => console.error(error));
  }, []);

  const handleOutsideClick = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      onClose();
    }
  };

  if (!isOpen) return null;

  console.log(" availableCards", availableCards);

  return (
    <div className="modal-overlay" onClick={handleOutsideClick}>
      <div className="modal" ref={modalRef}>
        <div className="search-box">
          <input type="text" placeholder="Find Pokemon" />
          <img src="/search.png" alt="Search Icon" className="search-icon" />
        </div>
        <div className="card-list">
          {availableCards?.map((cardData, index) => (
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

export default CardModal;
