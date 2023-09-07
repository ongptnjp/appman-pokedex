import React, { useState } from "react";

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

  // TODO: use hover on desktop only for ipad is not supported
  const [isHovered, setIsHovered] = useState(true);

  const hp = calculateHPLevel(hitPoints);
  const str = calculateStrengthLevel(attacks);
  const weakness = calculateWeaknessLevel(weaknesses);
  const damage = calculateTotalDamage(attacks);
  const happiness = calculateHappinessLevel(hp, damage, weaknesses);

    return (
      <div
        className="card"
        style={{ width: `${onAdd ? "100%" : ""}` }}
        // TODO: on Ipad Hover is not support
        // onMouseEnter={() => setIsHovered(true)}
        // onMouseLeave={() => setIsHovered(false)}
      >
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
            {!!happiness &&
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
        {onAdd && isHovered && (
          <div className="add-button-container">
            <p className="add-button" onClick={() => onAdd(cardData)}>
              Add
            </p>
          </div>
        )}
        {onRemove && isHovered && (
          <div
            className="remove-button-container"
            onClick={() => onRemove(cardData)}
          >
            X
          </div>
        )}
      </div>
    );
};

export default CardComponent;
