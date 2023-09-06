import React from "react";
import Card from "../Cards/Card";

const Pokedex = ({ cards }) => {
  return (
    <div className="card-list">
      {cards?.map((cardData, index) => (
        <Card key={index} cardData={cardData} />
      ))}
    </div>
  );
};

export default Pokedex;
