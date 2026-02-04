import type { InsertInputs, SenseType, SpeedType } from '../types/Insert';
import { generateId } from './idGenerator';
import { createEmptySkills } from './skillHelpers';

/**
 * Normalizes senses input to Partial<Record<SenseType, number>> format.
 * Handles both string and record inputs, and extracts passive perception to convert to perception skill.
 */
function normalizeSenses(
  input: string | Record<string, string | number> | Partial<Record<SenseType, number>> | undefined
): {
  senses: Partial<Record<SenseType, number>>;
  passivePerception: number | null;
} {
  if (!input) {
    return { senses: {}, passivePerception: null };
  }

  // If already a proper record with numbers, return it
  if (typeof input === 'object' && !Array.isArray(input)) {
    const senses: Partial<Record<SenseType, number>> = {};
    for (const [key, value] of Object.entries(input)) {
      if (['blindsight', 'darkvision', 'tremorsense', 'truesight'].includes(key)) {
        if (typeof value === 'number') {
          senses[key as SenseType] = value;
        } else if (typeof value === 'string') {
          const match = value.match(/(\d+)/);
          if (match) {
            senses[key as SenseType] = Number.parseInt(match[1], 10);
          }
        }
      }
    }
    return { senses, passivePerception: null };
  }

  // Parse string format (e.g., "darkvision 60 ft., tremorsense 30 ft., passive Perception 14")
  const senses: Partial<Record<SenseType, number>> = {};
  let passivePerception: number | null = null;

  const inputStr = input as string;
  const parts = inputStr.split(',').map((s: string) => s.trim());
  for (const part of parts) {
    // Check for passive Perception
    const passiveMatch = part.match(/passive\s+perception\s+(\d+)/i);
    if (passiveMatch) {
      passivePerception = Number.parseInt(passiveMatch[1], 10);
      continue;
    }

    // Parse sense with range (e.g., "darkvision 60 ft.")
    const senseMatch = part.match(/^([a-z\s]+?)\s+(\d+)\s*ft\.?$/i);
    if (senseMatch) {
      const senseName = senseMatch[1].trim().toLowerCase();
      const range = Number.parseInt(senseMatch[2], 10);
      if (['blindsight', 'darkvision', 'tremorsense', 'truesight'].includes(senseName)) {
        senses[senseName as SenseType] = range;
      }
    }
  }

  return { senses, passivePerception };
}

/**
 * Normalizes languages input to string array format.
 * Handles both string and array inputs.
 */
function normalizeLanguages(input: string | string[] | undefined): string[] {
  if (!input) {
    return [];
  }

  // If already an array, return it
  if (Array.isArray(input)) {
    return input;
  }

  // Parse string format (e.g., "Common, Draconic, Elvish")
  // Also handle special cases like "—" or "—"
  if (input === '—' || input === '-' || input.toLowerCase() === 'none') {
    return [];
  }

  return input
    .split(/[,;]/) // Split by comma or semicolon
    .map((lang) => lang.trim())
    .filter((lang) => lang.length > 0);
}

/**
 * Normalizes speed input to Partial<Record<SpeedType, number>> format.
 * Handles both string and Record inputs.
 */
function normalizeSpeed(
  input: string | Record<string, string | number> | Partial<Record<SpeedType, number>> | undefined
): Partial<Record<SpeedType, number>> {
  if (!input) {
    return {};
  }

  // If already a proper record, convert strings to numbers if needed
  if (typeof input === 'object' && !Array.isArray(input)) {
    const speed: Partial<Record<SpeedType, number>> = {};
    for (const [key, value] of Object.entries(input)) {
      if (['walk', 'fly', 'swim', 'burrow', 'climb'].includes(key)) {
        if (typeof value === 'number') {
          speed[key as SpeedType] = value;
        } else if (typeof value === 'string') {
          const match = value.match(/(\d+)/);
          if (match) {
            speed[key as SpeedType] = Number.parseInt(match[1], 10);
          }
        }
      }
    }
    return speed;
  }

  // Parse string format (e.g., "30 ft., fly 60 ft., swim 30 ft.")
  const speed: Partial<Record<SpeedType, number>> = {};

  // Split by comma and parse each speed type
  const parts = (input as string).split(',').map((s: string) => s.trim());

  for (const part of parts) {
    // Match patterns like "fly 60 ft." or just "30 ft."
    const match = part.match(/^(?:(\w+)\s+)?(\d+)\s*ft\.?/i);
    if (match) {
      const speedType = match[1] ? match[1].toLowerCase() : 'walk';
      const speedValue = Number.parseInt(match[2], 10);
      if (['walk', 'fly', 'swim', 'burrow', 'climb'].includes(speedType)) {
        speed[speedType as SpeedType] = speedValue;
      }
    }
  }

  return speed;
}

/**
 * Creates a complete InsertInputs object with all required fields populated.
 * Takes a partial input and fills in missing values with sensible defaults.
 * This prevents crashes when importing incomplete JSON data or working with partial objects.
 */
export function normalizeInsertInputs(partial: Partial<InsertInputs>): InsertInputs {
  // Handle null/undefined input
  const input = partial || {};

  // Parse senses and extract passive perception
  const { senses: parsedSenses, passivePerception } = normalizeSenses(input.senses as any);

  // Migrate old darkvision field to senses (for backwards compatibility)
  const migratedSenses = { ...parsedSenses };
  const legacyDarkvision = (input as any).darkvision;
  if (legacyDarkvision && typeof legacyDarkvision === 'number' && legacyDarkvision > 0) {
    migratedSenses.darkvision = legacyDarkvision;
  }

  // Parse languages
  const languages = normalizeLanguages(input.languages as any);
  return {
    // Basic info
    id: input.id || generateId(),
    name: input.name || '',
    image: input.image || '',
    cardType: input.cardType === 'monster' ? 'monster' : 'player',
    size: input.size === 'large' ? 'large' : 'small',
    selected: input.selected ?? true,
    backgroundColor: input.backgroundColor || '#f8f8f8',

    // Player/Monster common fields
    race: input.race || 'Human',
    class: input.class || 'Fighter',
    ac: safeNumericValue(input.ac, 0),

    // Player fields
    level: safeNumericValue(input.level, 1),

    // Player - override flags
    proficiencyBonusOverride: input.proficiencyBonusOverride ?? false,
    maxHPOverride: input.maxHPOverride ?? false,

    // Player - manual override values
    proficiencyBonus: safeNumericValue(input.proficiencyBonus, 2),
    hp: safeNumericValue(input.hp, 0),

    // Skills - merge with defaults, and update perception from passive perception if found
    skills: (() => {
      const baseSkills =
        input.skills && typeof input.skills === 'object'
          ? { ...createEmptySkills(), ...input.skills }
          : createEmptySkills();

      // If passive perception was found in senses, convert it to perception skill modifier
      if (passivePerception !== null) {
        // Passive Perception = 10 + Perception modifier
        const perceptionModifier = passivePerception - 10;
        baseSkills.perception = {
          ...baseSkills.perception,
          modifier: perceptionModifier,
        };
      }

      return baseSkills;
    })(),

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
    speed: normalizeSpeed(input.speed),
    acType: input.acType || '',
    hitDice: safeNumericValue(input.hitDice, 0),
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
    senses: migratedSenses,
    languages,
    traits: input.traits || '',
    actions: input.actions || '',
    bonusActions: input.bonusActions || '',
  };
}

/**
 * Safely handles undefined/null ability scores in calculations
 */
export function safeAbilityScore(value: number | undefined | null): number {
  return safeNumericValue(value, 10);
}

/**
 * Safely handles undefined/null numeric values
 */
export function safeNumericValue(value: number | string | undefined | null, defaultValue: number = 0): number {
  if (typeof value === 'number' && !Number.isNaN(value)) {
    return value;
  }
  if (typeof value === 'string') {
    const parsed = Number(value);
    if (!Number.isNaN(parsed)) {
      return parsed;
    }
  }
  return defaultValue;
}
