import React from "react";
import Card from "../Cards/Card";

const Pokedex = ({ cards, onRemove }) => {
  return (
    <div className="card-list">
      {cards?.map((cardData, index) => (
        <Card key={index} cardData={cardData} onRemove={onRemove} />
      ))}
    </div>
  );
};

export default Pokedex;
