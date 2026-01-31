/**
 * Shared utility functions for ability score and modifier calculations
 */

import type { ProficiencyLevel } from './skillConfig';

export type AbilityType = 'str' | 'dex' | 'con' | 'int' | 'wis' | 'cha';
export const ABILITY_LABELS: Record<AbilityType, string> = {
  str: 'STR',
  dex: 'DEX',
  con: 'CON',
  int: 'INT',
  wis: 'WIS',
  cha: 'CHA',
};
/**
 * Calculate ability modifier from ability score
 * Formula: floor((score - 10) / 2)
 */
export function calculateAbilityModifier(abilityScore: number): number {
  if (Number.isNaN(abilityScore)) return 0;
  return Math.floor((abilityScore - 10) / 2);
}

/**
 * Format modifier as a string with + or - sign
 */
export function formatModifier(modifier: number): string {
  return modifier >= 0 ? `+${modifier}` : `${modifier}`;
}

/**
 * Calculate skill bonus from ability score, proficiency, and modifiers
 * Used for both players and monsters
 */
export function calculateSkillBonus(
  abilityScore: number,
  profLevel: ProficiencyLevel,
  proficiencyBonus: number,
  manualMod: number = 0
): number {
  const abilityMod = calculateAbilityModifier(abilityScore);
  const profBonus = calculateProficiencyBonus(profLevel, proficiencyBonus);
  return abilityMod + profBonus + manualMod;
}

/**
 * Calculate proficiency bonus based on proficiency level
 * @param profLevel - 'none', 'half', 'proficient', or 'expert'
 * @param proficiencyBonus - Base proficiency bonus
 * @returns The proficiency bonus multiplied by the appropriate factor
 */
function getProficiencyMultiplier(profLevel: ProficiencyLevel): number {
  switch (profLevel) {
    case 'half':
      return 0.5;
    case 'proficient':
      return 1;
    case 'expert':
      return 2;
    default:
      return 0;
  }
}

/**
 * Calculate the total proficiency bonus for a skill
 */
export function calculateProficiencyBonus(profLevel: ProficiencyLevel, baseProfBonus: number): number {
  return Math.floor(baseProfBonus * getProficiencyMultiplier(profLevel));
}
