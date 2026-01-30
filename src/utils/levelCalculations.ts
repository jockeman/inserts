export function calculateProficiencyBonus(level: string): number {
  const lvl = parseInt(level, 10);
  if (isNaN(lvl) || lvl < 1) return 2;
  if (lvl <= 4) return 2;
  if (lvl <= 8) return 3;
  if (lvl <= 12) return 4;
  if (lvl <= 16) return 5;
  return 6;
}

const hitDiceByClass: Record<string, number> = {
  'Barbarian': 12,
  'Fighter': 10,
  'Paladin': 10,
  'Ranger': 10,
  'Bard': 8,
  'Cleric': 8,
  'Druid': 8,
  'Monk': 8,
  'Rogue': 8,
  'Warlock': 8,
  'Sorcerer': 6,
  'Wizard': 6,
};

export function calculateMaxHP(level: string, className: string, conScore: string): number {
  const lvl = parseInt(level, 10);
  const con = parseInt(conScore, 10);
  
  if (isNaN(lvl) || lvl < 1) return 0;
  if (isNaN(con)) return 0;
  
  const hitDie = hitDiceByClass[className] || 8;
  const conModifier = Math.floor((con - 10) / 2);
    
  // Fixed value = average die roll rounded up
  const fixedIncrease = Math.ceil((hitDie + 1) / 2);
  const level1HP = hitDie + conModifier;
  const additionalLevels = lvl - 1;
  const additionalHP = additionalLevels * (fixedIncrease + conModifier);
  
  return Math.max(1, level1HP + additionalHP);
}
