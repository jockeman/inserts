import type { InsertInputs } from '../types/Insert';
import { generateId } from './idGenerator';
import { createEmptySkills } from './skillHelpers';

/**
 * Creates a complete InsertInputs object with all required fields populated.
 * Takes a partial input and fills in missing values with sensible defaults.
 * This prevents crashes when importing incomplete JSON data or working with partial objects.
 */
export function normalizeInsertInputs(partial: Partial<InsertInputs>): InsertInputs {
  // Handle null/undefined input
  const input = partial || {};
  return {
    // Basic info
    id: input.id || generateId(),
    name: input.name || '',
    image: input.image || '',
    cardType: input.cardType === 'monster' ? 'monster' : 'player',
    size: input.size === 'large' ? 'large' : 'small',
    selected: input.selected ?? true,

    // Player/Monster common fields
    race: input.race || 'Human',
    class: input.class || 'Fighter',
    ac: safeNumericValue(input.ac, 0),

    // Player fields
    level: safeNumericValue(input.level, 1),

    // Player - override flags
    proficiencyBonusOverride: input.proficiencyBonusOverride ?? false,
    maxHPOverride: input.maxHPOverride ?? false,
    darkvisionOverride: input.darkvisionOverride ?? false,

    // Player - manual override values
    proficiencyBonus: safeNumericValue(input.proficiencyBonus, 2),
    hp: safeNumericValue(input.hp, 0),
    darkvision: safeNumericValue(input.darkvision, 0),

    // Skills - merge with defaults
    skills:
      input.skills && typeof input.skills === 'object'
        ? { ...createEmptySkills(), ...input.skills }
        : createEmptySkills(),

    // Ability scores
    str: safeAbilityScore(input.str),
    dex: safeAbilityScore(input.dex),
    con: safeAbilityScore(input.con),
    int: safeAbilityScore(input.int),
    wis: safeAbilityScore(input.wis),
    cha: safeAbilityScore(input.cha),

    // Monster-specific fields
    monsterSize: input.monsterSize || 'Medium',
    monsterType: input.monsterType || 'Humanoid',
    monsterTypeTag: input.monsterTypeTag || '',
    cr: input.cr || '',
    speed: input.speed || '',
    acType: input.acType || '',
    hpFormula: input.hpFormula || '',
    savingThrowStr: input.savingThrowStr ?? null,
    savingThrowDex: input.savingThrowDex ?? null,
    savingThrowCon: input.savingThrowCon ?? null,
    savingThrowInt: input.savingThrowInt ?? null,
    savingThrowWis: input.savingThrowWis ?? null,
    savingThrowCha: input.savingThrowCha ?? null,
    damageImmunities: Array.isArray(input.damageImmunities) ? input.damageImmunities : [],
    damageResistances: Array.isArray(input.damageResistances) ? input.damageResistances : [],
    damageVulnerabilities: Array.isArray(input.damageVulnerabilities) ? input.damageVulnerabilities : [],
    conditionImmunities: Array.isArray(input.conditionImmunities) ? input.conditionImmunities : [],
    senses: input.senses || '',
    languages: input.languages || '',
    traits: input.traits || '',
    actions: input.actions || '',
    bonusActions: input.bonusActions || '',
  };
}

/**
 * Safely handles undefined/null ability scores in calculations
 */
export function safeAbilityScore(value: number | undefined | null): number {
  if (typeof value === 'number' && !Number.isNaN(value)) {
    return value;
  }
  return 10; // Default ability score
}

/**
 * Safely handles undefined/null numeric values
 */
export function safeNumericValue(value: number | undefined | null, defaultValue: number = 0): number {
  if (typeof value === 'number' && !Number.isNaN(value)) {
    return value;
  }
  return defaultValue;
}
