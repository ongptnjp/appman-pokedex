import React from "react";
import Card from "./Card";
import "./CardList.css";

const CardList = ({ cardList }) => {
  return (
    <div className="card-list">
      {cardList?.map((cardData, index) => (
        <Card key={index} cardData={cardData} />
      ))}
    </div>
  );
};

export default CardList;
