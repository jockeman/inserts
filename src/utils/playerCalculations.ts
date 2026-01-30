import type { Insert, InsertInputs } from '../types/Insert';
import { calculateMaxHP, calculateProficiencyBonus } from './levelCalculations';
import { calculatePassive } from './passiveCalculator';
import { getDarkvisionForRace } from './raceConfig';
import { ALL_SKILLS, type ProficiencyLevel } from './skillConfig';

const ABILITY_FIELD_MAP = {
  str: 'str',
  dex: 'dex',
  con: 'con',
  int: 'int',
  wis: 'wis',
  cha: 'cha',
} as const;

/**
 * Calculates all derived values for a player card.
 * Takes InsertInputs (stored data) and returns complete Insert with calculated values.
 *
 * Inputs (from InsertInputs):
 * - name, image, cardType, size
 * - race, class, ac, level
 * - str, dex, con, int, wis, cha (ability scores)
 * - profAcrobatics, profAnimalHandling, etc. (proficiency levels)
 * - modAcrobatics, modAnimalHandling, etc. (manual modifiers)
 * - proficiencyBonusOverride, maxHPOverride, darkvisionOverride (override flags)
 * - proficiencyBonus (if override is true)
 * - hp (if maxHPOverride is true)
 * - darkvision (if darkvisionOverride is true)
 *
 * Calculated (added to output):
 * - proficiencyBonus (if override is false)
 * - hp (if maxHPOverride is false)
 * - darkvision (if darkvisionOverride is false)
 * - All passive skill values (acrobatics, animalHandling, arcana, etc.)
 */
export function calculateAdvancedPlayerValues(inputs: InsertInputs): Insert {
  const result = { ...inputs } as Insert;

  // Calculate proficiency bonus if not overridden
  if (!result.proficiencyBonusOverride && result.level) {
    result.proficiencyBonus = calculateProficiencyBonus(result.level);
  }

  // Calculate max HP if not overridden
  if (!result.maxHPOverride && result.level && result.class && result.con) {
    result.hp = calculateMaxHP(result.level, result.class, result.con);
  }

  // Calculate darkvision if not overridden
  if (!result.darkvisionOverride && result.race) {
    result.darkvision = getDarkvisionForRace(result.race);
  }

  // Calculate all passive skill values
  for (const skillInfo of Object.values(ALL_SKILLS)) {
    const abilityField = ABILITY_FIELD_MAP[skillInfo.ability];
    const abilityScore = result[abilityField] as number;
    const profLevel = result[skillInfo.profField] as ProficiencyLevel;
    const manualMod = result[skillInfo.modField] as number;

    if (abilityScore && result.proficiencyBonus !== undefined) {
      const passiveValue = calculatePassive(abilityScore, profLevel || 'none', result.proficiencyBonus, manualMod || 0);
      (result as any)[skillInfo.passiveField] = passiveValue;
    }
  }

  return result;
}
