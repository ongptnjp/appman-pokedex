// HP level calculation
// maximum is 100. if value is higher than 100 set it to 100, otherwise 0.
export function calculateHPLevel(value = 0) {
  // Ensure the value is between 0 and 100
  const clampedValue = Math.min(Math.max(value, 0), 100);

  return clampedValue;
}

// Strength level calculation
// use attacks length to multiply by 50, maximum is 100. e.g. if value is 1 set it to 50, 2 set it to 100, otherwise 0.
export function calculateStrengthLevel(attacks) {
  // Calculate the strength level based on attacks
  const strengthLevel = Math.min(attacks?.length * 50, 100);

  return strengthLevel;
}

// Weakness level calculation
// use weaknesses length multiply by 100, maximum is 100. e.g. if value is 1 set it to 100, otherwise 0.
export function calculateWeaknessLevel(weaknesses) {
  // Calculate the weakness level based on weaknesses
  const weaknessLevel = Math.min(weaknesses?.length * 100, 100);

  return weaknessLevel;
}

// Damage calculation
// use damage value without symbol of all attacks skill. e.g. 50+ set it to 50, 20* set it to 20, otherwise 0.
function calculateDamage(damage) {
  // Remove symbols and parse damage value
  const parsedDamage = parseInt(damage);

  return isNaN(parsedDamage) ? 0 : parsedDamage;
}

export function calculateTotalDamage(attacks = []) {
  let totalDamage = 0;

  for (const attack of attacks) {
    totalDamage += calculateDamage(attack.damage);
  }

  return totalDamage;
}

// Happiness level calculation
// ((HP / 10) + (Damage /10 ) + 10 - (Weakness)) / 5
export function calculateHappinessLevel(HP, damage, weaknesses) {
  // console.log("hp", HP);
  // console.log("damage", damage);
  // console.log("weaknesses", weaknesses);

  const hpFactor = HP / 10; // 10
  const damageFactor = damage / 10; // 5
  const weaknessFactor = weaknesses?.length; // 100

  const happinessRaw = (hpFactor + damageFactor + 10 - weaknessFactor) / 5;

  const happinessLevel = Math.min(5, Math.max(1, Math.round(happinessRaw)));

  return happinessLevel;
}
