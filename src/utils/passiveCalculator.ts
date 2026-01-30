import { ProficiencyLevel } from './skillConfig';

export function calculateModifier(score: string): number {
  const numScore = parseInt(score, 10);
  if (isNaN(numScore)) return 0;
  return Math.floor((numScore - 10) / 2);
}

export function calculatePassive(
  abilityScore: string,
  profLevel: ProficiencyLevel,
  profBonus: string,
  manualMod: string
): string {
  const abilityMod = calculateModifier(abilityScore);
  const profBonusNum = parseInt(profBonus, 10) || 0;
  const manualModNum = parseInt(manualMod, 10) || 0;
  
  let profMultiplier = 0;
  if (profLevel === 'proficient') profMultiplier = 1;
  if (profLevel === 'expert') profMultiplier = 2;
  
  const total = 10 + abilityMod + (profBonusNum * profMultiplier) + manualModNum;
  
  return total.toString();
}
