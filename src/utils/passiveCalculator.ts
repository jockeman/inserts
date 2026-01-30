import type { ProficiencyLevel } from './skillConfig';

export function calculateModifier(score: number): number {
  if (Number.isNaN(score)) return 0;
  return Math.floor((score - 10) / 2);
}

export function calculatePassive(
  abilityScore: number,
  profLevel: ProficiencyLevel,
  profBonus: number,
  manualMod: number
): number {
  const abilityMod = calculateModifier(abilityScore);
  const profBonusNum = profBonus || 0;
  const manualModNum = manualMod || 0;

  let profMultiplier = 0;
  if (profLevel === 'proficient') profMultiplier = 1;
  if (profLevel === 'expert') profMultiplier = 2;

  const total = 10 + abilityMod + profBonusNum * profMultiplier + manualModNum;

  return total;
}
