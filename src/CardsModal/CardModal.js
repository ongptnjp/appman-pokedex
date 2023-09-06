import React, { useRef, useEffect, useState } from "react";

import Card from "../Cards/Card";

import "./CardModal.css";

const CardModal = ({
  isOpen,
  onClose,
  pokemonCards,
  addCard,
  words,
  setWords
}) => {
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
          <input
            type="text"
            placeholder="Find Pokemon"
            value={words}
            onChange={(e) => setWords(e.target?.value)}
          />
          <img src="/search.png" alt="Search Icon" className="search-icon" />
        </div>
        <div className="card-list">
          {pokemonCards?.map((cardData, index) => (
            <Card
              key={index}
              cardData={cardData}
              showAddButton
              onAdd={addCard}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CardModal;
