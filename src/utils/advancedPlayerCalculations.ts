import { Insert, InsertInputs } from '../types/Insert';
import { calculatePassive } from './passiveCalculator';
import { calculateProficiencyBonus, calculateMaxHP } from './levelCalculations';
import { getDarkvisionForRace } from './raceConfig';
import { ALL_SKILLS,ProficiencyLevel } from './skillConfig';

const ABILITY_FIELD_MAP = {
  str: 'playerStr',
  dex: 'playerDex',
  con: 'playerCon',
  int: 'playerInt',
  wis: 'playerWis',
  cha: 'playerCha',
} as const;

/**
 * Calculates all derived values for an advanced player card.
 * Takes InsertInputs (stored data) and returns complete Insert with calculated values.
 * 
 * Inputs (from InsertInputs):
 * - name, image, cardType, size
 * - race, class, ac, level
 * - playerStr, playerDex, playerCon, playerInt, playerWis, playerCha
 * - profAcrobatics, profAnimalHandling, etc. (proficiency levels)
 * - modAcrobatics, modAnimalHandling, etc. (manual modifiers)
 * - proficiencyBonusOverride, maxHPOverride, darkvisionOverride (override flags)
 * - playerProficiencyBonus (if override is true)
 * - hp (if maxHPOverride is true)
 * - darkvision (if darkvisionOverride is true)
 * 
 * Calculated (added to output):
 * - playerProficiencyBonus (if override is false)
 * - hp (if maxHPOverride is false)
 * - darkvision (if darkvisionOverride is false)
 * - All passive skill values (acrobatics, animalHandling, arcana, etc.)
 */
export function calculateAdvancedPlayerValues(inputs: InsertInputs): Insert {
  const result = { ...inputs } as Insert;

  // Calculate proficiency bonus if not overridden
  if (!result.proficiencyBonusOverride && result.level) {
    const profBonus = calculateProficiencyBonus(result.level);
    result.playerProficiencyBonus = `+${profBonus}`;
  }

  // Calculate max HP if not overridden
  if (!result.maxHPOverride && result.level && result.class && result.playerCon) {
    const maxHP = calculateMaxHP(result.level, result.class, result.playerCon);
    result.hp = maxHP.toString();
  }

  // Calculate darkvision if not overridden
  if (!result.darkvisionOverride && result.race) {
    const darkvision = getDarkvisionForRace(result.race);
    result.darkvision = darkvision > 0 ? darkvision.toString() : '';
  }

  // Calculate all passive skill values
  Object.entries(ALL_SKILLS).forEach(([_skillKey, skillInfo]) => {
    const abilityField = ABILITY_FIELD_MAP[skillInfo.ability];
    const abilityScore = result[abilityField] as string;
    const profLevel = result[skillInfo.profField] as ProficiencyLevel;
    const manualMod = result[skillInfo.modField] as string;

    if (abilityScore && result.playerProficiencyBonus) {
      const passiveValue = calculatePassive(
        abilityScore,
        profLevel || 'none',
        result.playerProficiencyBonus,
        manualMod || ''
      );
      result[skillInfo.passiveField] = passiveValue;
    }
  });

  return result;
}
