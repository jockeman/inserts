import type { ProficiencyLevel } from '../types/Shared';
import { calculateSkillBonus } from './abilityHelpers';

/**
 * Calculate passive skill value (base 10 + ability mod + proficiency + manual mod)
 */
export function calculatePassive(
  abilityScore: number,
  profLevel: ProficiencyLevel,
  profBonus: number,
  manualMod: number
): number {
  const profBonusNum = profBonus || 0;
  const manualModNum = manualMod || 0;

  const skillBonus = calculateSkillBonus(abilityScore, profLevel, profBonusNum, manualModNum);
  const total = 10 + skillBonus;

  return total;
}
