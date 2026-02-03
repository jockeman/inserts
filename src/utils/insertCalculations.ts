import type { Insert, InsertInputs } from '../types/Insert';
import type { ProficiencyLevel } from '../types/Shared';
import { calculateSkillBonus, getAbilityScore } from './abilityHelpers';
import { safeAbilityScore, safeNumericValue } from './inputNormalizer';
import { calculateMaxHP, calculateProficiencyBonus } from './levelCalculations';
import { getDarkvisionForRace } from './raceConfig';
import { ALL_SKILLS } from './skillConfig';

/**
 * Calculates all derived values for an insert card (player or monster).
 * Takes InsertInputs (stored data) and returns complete Insert with calculated values.
 *
 * For Players:
 * - Calculates proficiencyBonus from level (if not overridden)
 * - Calculates max HP from level, class, and CON (if not overridden)
 * - Calculates darkvision from race (if not overridden)
 * - Calculates skill values as skill bonus (ability mod + proficiency + manual mod)
 *   Note: Display as passive by adding 10 to the skill.value
 *
 * For Monsters:
 * - Supports two modes:
 *   1. Pre-calculated mode (default): skill.modifier values are copied to skill.value
 *   2. Auto-calc mode: If proficiencyBonus is set and modifiers are 0,
 *      calculates from ability scores + proficiency
 */
export function calculateInsertValues(inputs: InsertInputs): Insert {
  const result = { ...inputs, skills: { ...inputs.skills } } as Insert;
  const isPlayer = inputs.cardType === 'player';

  // Player-specific calculations
  if (isPlayer) {
    // Calculate proficiency bonus if not overridden
    if (!result.proficiencyBonusOverride && result.level) {
      const level = safeNumericValue(result.level, 1);
      result.proficiencyBonus = calculateProficiencyBonus(level);
    }

    // Calculate max HP if not overridden
    if (!result.maxHPOverride && result.level && result.class && result.con) {
      const level = safeNumericValue(result.level, 1);
      const con = safeAbilityScore(result.con);
      if (level > 0 && con > 0) {
        result.hp = calculateMaxHP(level, result.class, con);
      }
    }

    // Calculate darkvision if not overridden
    if (!result.darkvisionOverride && result.race) {
      result.darkvision = getDarkvisionForRace(result.race);
    }
  }

  // Ensure we have valid skills object
  if (!result.skills || typeof result.skills !== 'object') {
    return result; // Skip skill calculations if no valid skills object
  }

  // Determine skill calculation mode for monsters
  const shouldAutoCalcMonster =
    !isPlayer &&
    !ALL_SKILLS.some((skillInfo) => {
      const skill = inputs.skills?.[skillInfo.key];
      return skill && typeof skill.modifier === 'number' && skill.modifier !== 0;
    });

  // Calculate skill values
  for (const skillInfo of ALL_SKILLS) {
    const skillName = skillInfo.key;
    const skill = result.skills[skillName];

    // Skip if skill doesn't exist or is invalid
    if (!skill || typeof skill !== 'object') {
      continue;
    }

    const abilityScore = safeAbilityScore(getAbilityScore(result, skillInfo.ability));

    if (shouldAutoCalcMonster || isPlayer) {
      // Auto-calculate skill bonus (ability mod + proficiency + manual mod)
      const proficiencyBonus = safeNumericValue(result.proficiencyBonus, 2);
      if (abilityScore && proficiencyBonus !== undefined) {
        const skillBonusValue = calculateSkillBonus(
          abilityScore,
          (skill.proficiency || 'none') as ProficiencyLevel,
          proficiencyBonus,
          safeNumericValue(skill.modifier, 0)
        );
        result.skills[skillName] = {
          ...skill,
          value: skillBonusValue,
        };
      }
    } else {
      // Monster: Pre-calculated mode - copy modifier to value
      result.skills[skillName] = {
        ...skill,
        value: safeNumericValue(skill.modifier, 0),
      };
    }
  }

  return result;
}
