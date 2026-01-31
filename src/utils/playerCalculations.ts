import type { Insert, InsertInputs, SkillName } from '../types/Insert';
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
 * - skills object with proficiency and modifier for each skill
 * - proficiencyBonusOverride, maxHPOverride, darkvisionOverride (override flags)
 * - proficiencyBonus (if override is true)
 * - hp (if maxHPOverride is true)
 * - darkvision (if darkvisionOverride is true)
 *
 * Calculated (added to output):
 * - proficiencyBonus (if override is false)
 * - hp (if maxHPOverride is false)
 * - darkvision (if darkvisionOverride is false)
 * - All skill.value fields in the skills object
 */
export function calculateAdvancedPlayerValues(inputs: InsertInputs): Insert {
  const result = { ...inputs, skills: { ...inputs.skills } } as Insert;

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

  // Calculate all skill values
  for (const [skillKey, skillInfo] of Object.entries(ALL_SKILLS)) {
    const skillName = skillKey as SkillName;
    const skill = result.skills[skillName];
    const abilityField = ABILITY_FIELD_MAP[skillInfo.ability];
    const abilityScore = result[abilityField] as number;

    if (abilityScore && result.proficiencyBonus !== undefined) {
      const passiveValue = calculatePassive(
        abilityScore,
        skill.proficiency as ProficiencyLevel,
        result.proficiencyBonus,
        skill.modifier || 0
      );
      result.skills[skillName] = {
        ...skill,
        value: passiveValue,
      };
    }
  }

  return result;
}
