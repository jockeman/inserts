/**
 * Shared utility functions for ability score and modifier calculations
 */

import type { AbilityType, ProficiencyLevel } from '../types/Shared';

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
  const profBonus = applyProficiencyMultiplier(profLevel, proficiencyBonus);
  return abilityMod + profBonus + manualMod;
}

/**
 * Apply proficiency multiplier to base proficiency bonus
 * @param profLevel - 'none', 'half', 'proficient', or 'expert'
 * @param baseProfBonus - Base proficiency bonus
 * @returns The proficiency bonus multiplied by the appropriate factor
 */
export function applyProficiencyMultiplier(profLevel: ProficiencyLevel, baseProfBonus: number): number {
  let multiplier: number;
  switch (profLevel) {
    case 'half':
      multiplier = 0.5;
      break;
    case 'proficient':
      multiplier = 1;
      break;
    case 'expert':
      multiplier = 2;
      break;
    default:
      multiplier = 0;
  }
  return Math.floor(baseProfBonus * multiplier);
}

/**
 * Get ability score value from an object containing ability scores
 * @param abilities - Object with ability score properties
 * @param abilityType - Which ability to retrieve (str, dex, con, int, wis, cha)
 * @returns The ability score value
 */
export function getAbilityScore(abilities: { [K in AbilityType]: number }, abilityType: AbilityType): number {
  return abilities[abilityType];
}
