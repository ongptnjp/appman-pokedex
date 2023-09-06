import React from "react";

import {
  calculateHPLevel,
  calculateStrengthLevel,
  calculateWeaknessLevel,
  calculateTotalDamage,
  calculateHappinessLevel,
} from "../utils/utils";

import "./Card.css";

const CardComponent = ({ cardData, onAdd, onRemove }) => {
  const { imageUrl, name, hp: hitPoints, attacks, weaknesses } = cardData;

  const hp = calculateHPLevel(hitPoints);
  const str = calculateStrengthLevel(attacks);
  const weakness = calculateWeaknessLevel(weaknesses);
  const damage = calculateTotalDamage(attacks);
  const happiness = calculateHappinessLevel(hp, damage, weaknesses);

  return (
    <div className="card" style={{ width: `${onAdd ? "100%" : ""}` }}>
      <div className="card-image">
        <img src={imageUrl} alt={name} />
      </div>
      <div className="card-details">
        <p className="card-name">{name}</p>
        <div className="stat">
          <div className="stat-title">HP</div>
          <div className="stat-bar">
            <div className="bar" style={{ width: `${hp}%` }}></div>
          </div>
        </div>
        <div className="stat">
          <div className="stat-title">Str</div>
          <div className="stat-bar">
            <div className="bar" style={{ width: `${str}%` }}></div>
          </div>
        </div>
        <div className="stat">
          <div className="stat-title">Weak</div>
          <div className="stat-bar">
            <div className="bar" style={{ width: `${weakness}%` }}></div>
          </div>
        </div>
        <div className="rating">
          {happiness &&
            [...Array(happiness)].map((_, index) => (
              <img
                key={index}
                src="/cute.png" // Replace with the actual URL of your rating icon image
                alt={`Rating ${index + 1}`}
                className="rating-icon"
              />
            ))}
        </div>
      </div>
      {onAdd && (
        <div className="add-button-container">
          <p className="add-button" onClick={() => onAdd(cardData)}>
            Add
          </p>
        </div>
      )}
      {onRemove && <div className="remove-button-container">X</div>}
    </div>
  );
};

export default CardComponent;
