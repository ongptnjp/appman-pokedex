import React, { useState, useRef, useEffect } from "react";

import Card from "../Cards/Card";

import "./CardModal.css";

const CardModal = ({
  isOpen,
  onClose,
  pokemonCards,
  addCard,
  words,
  onChangeWords,
  hasMore,
  handleLoadMore,
}) => {
  const modalRef = useRef();

  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Detect if the user has scrolled to the bottom
      const scrollTop = document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;
      const totalHeight = document.documentElement.scrollHeight;

      if (
        totalHeight - scrollTop - windowHeight < 100 &&
        hasMore &&
        !isFetching
      ) {
        // Near the bottom of the page, fetch more data
        setIsFetching(true);
        handleLoadMore();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      setIsFetching(false)
    };
  }, [isFetching, hasMore, handleLoadMore]);

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
            onChange={onChangeWords}
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
