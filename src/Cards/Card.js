import React from "react";

import {
  calculateHPLevel,
  calculateStrengthLevel,
  calculateWeaknessLevel,
  calculateTotalDamage,
  calculateHappinessLevel,
} from "../utils/utils";

import "./Card.css";

const CardComponent = ({ cardData }) => {
  const { imageUrl, name, hp: hitPoints, attacks, weaknesses } = cardData;

  console.log("cardData : ", cardData);

  const hp = calculateHPLevel(hitPoints);
  const str = calculateStrengthLevel(attacks);
  const weakness = calculateWeaknessLevel(weaknesses);
  const damage = calculateTotalDamage(attacks);
  const hapiness = calculateHappinessLevel(hp, damage, weaknesses);
  console.log("HP, STR, WEAKNESS, HAPPINESS : ", hp, str, weakness, hapiness);

  return (
    <div className="card">
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
          {hapiness &&
            [...Array(hapiness)].map((_, index) => (
              <img
                key={index}
                src="/cute.png" // Replace with the actual URL of your rating icon image
                alt={`Rating ${index + 1}`}
                className="rating-icon"
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default CardComponent;
