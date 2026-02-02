import type { Insert, InsertInputs, SkillName } from '../types/Insert';
import { applyProficiencyMultiplier, calculateAbilityModifier, getAbilityScore } from './abilityHelpers';
import { ALL_SKILLS } from './skillConfig';

/**
 * Calculates all derived values for a monster card.
 * Takes InsertInputs (stored data) and returns complete Insert with calculated values.
 *
 * For monsters, we support two modes:
 * 1. Pre-calculated mode (default): skill.modifier are already populated by parser
 *    - Simply copy modifier values to skill.value fields
 *    - This is for monsters parsed from stat blocks with pre-calculated bonuses
 *
 * 2. Calculate from ability scores mode: If proficiencyBonus is set and modifiers are 0
 *    - Calculate ability modifiers from ability scores
 *    - Add proficiency bonus for skills that have non-zero proficiency levels
 *    - This is for creating monsters from scratch
 *
 * Inputs (from InsertInputs):
 * - name, image, cardType, size
 * - monsterSize, monsterType, monsterTypeTag
 * - str, dex, con, int, wis, cha (ability scores)
 * - ac, hp, cr (challenge rating)
 * - skills object with proficiency and modifier for each skill
 * - proficiencyBonus (for auto-calc mode)
 * - savingThrowStr, savingThrowDex, etc. (saving throw bonuses)
 * - damageImmunities, damageResistances, damageVulnerabilities, conditionImmunities
 *
 * Calculated (added to output):
 * - All skill.value fields in the skills object
 * - If using auto-calc mode, calculates from ability scores + proficiency
 */
export function calculateMonsterValues(inputs: InsertInputs): Insert {
  const result = { ...inputs, skills: { ...inputs.skills } } as Insert;

  // Determine if we should auto-calculate from ability scores
  // Auto-calc if proficiencyBonus is set and at least one modifier is 0
  const hasModifiers = Object.values(ALL_SKILLS).some(
    (skillInfo) => inputs.skills[skillInfo.key as SkillName]?.modifier !== 0
  );
  const shouldAutoCalc = !hasModifiers && inputs.proficiencyBonus > 0;

  // Calculate skill values
  for (const [skillKey, skillInfo] of Object.entries(ALL_SKILLS)) {
    const skillName = skillKey as SkillName;
    const skill = result.skills[skillName];

    if (shouldAutoCalc) {
      // Auto-calculate from ability scores + proficiency
      const abilityScore = getAbilityScore(inputs, skillInfo.ability);
      const profLevel = skill.proficiency;
      const isProficient = profLevel === 'proficient' || profLevel === 'expert';

      if (abilityScore !== undefined) {
        const abilityMod = calculateAbilityModifier(abilityScore);
        let skillBonus = abilityMod;

        if (isProficient && inputs.proficiencyBonus) {
          const profBonus = applyProficiencyMultiplier(profLevel || 'none', inputs.proficiencyBonus);
          skillBonus += profBonus;
        }

        result.skills[skillName] = {
          ...skill,
          value: skillBonus,
        };
      }
    } else {
      // Pre-calculated mode: copy modifier value to skill.value
      result.skills[skillName] = {
        ...skill,
        value: skill.modifier,
      };
    }
  }

  return result;
}
