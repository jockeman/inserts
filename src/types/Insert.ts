import type { ClassName, ProficiencyLevel, RaceName } from './Shared';

// D&D 5e Monster Sizes
export type MonsterSize = 'Tiny' | 'Small' | 'Medium' | 'Large' | 'Huge' | 'Gargantuan';

// D&D 5e Monster Types
export type MonsterType =
  | 'Aberration'
  | 'Beast'
  | 'Celestial'
  | 'Construct'
  | 'Dragon'
  | 'Elemental'
  | 'Fey'
  | 'Fiend'
  | 'Giant'
  | 'Humanoid'
  | 'Monstrosity'
  | 'Ooze'
  | 'Plant'
  | 'Undead';

/**
 * Skill data structure containing proficiency level, modifier, and optional calculated value
 */
export interface Skill {
  proficiency: ProficiencyLevel;
  modifier: number;
  value?: number; // Calculated at runtime, not stored
}

export type SkillName =
  | 'acrobatics'
  | 'animalHandling'
  | 'arcana'
  | 'athletics'
  | 'deception'
  | 'history'
  | 'insight'
  | 'intimidation'
  | 'investigation'
  | 'medicine'
  | 'nature'
  | 'perception'
  | 'performance'
  | 'persuasion'
  | 'religion'
  | 'sleightOfHand'
  | 'stealth'
  | 'survival';

/**
 * InsertInputs represents the data that is stored in localStorage.
 * This includes user inputs and override flags, but excludes calculated values.
 */
export interface InsertInputs {
  // Basic info
  id: string; // Unique identifier for the insert
  name: string;
  image: string;
  cardType: 'player' | 'monster';
  size: 'small' | 'large';
  selected: boolean;

  // Player/Monster common fields (inputs)
  race: RaceName;
  class: ClassName;
  ac: number;

  // Player fields
  level: number;

  // Player - override flags (inputs)
  proficiencyBonusOverride: boolean;
  maxHPOverride: boolean;
  darkvisionOverride: boolean;

  // Player - manual override values (inputs when override is true)
  proficiencyBonus: number;
  hp: number;
  darkvision: number;

  // Skills - stored as a keyed entity
  skills: Record<SkillName, Skill>;

  // Ability scores (shared between player and monster)
  str: number;
  dex: number;
  con: number;
  int: number;
  wis: number;
  cha: number;

  // Monster-specific fields (all inputs)
  monsterSize: MonsterSize;
  monsterType: MonsterType;
  monsterTypeTag: string; // Subtype/tag (e.g., "goblinoid", "shapechanger")
  cr: string; // Challenge Rating (e.g., "1/4", "2", "10")
  speed: string;
  acType: string; // Armor type (e.g., "natural armor", "leather armor")
  hpFormula: string; // Dice formula for HP (e.g., "33d20 + 330")
  savingThrowStr: number | null;
  savingThrowDex: number | null;
  savingThrowCon: number | null;
  savingThrowInt: number | null;
  savingThrowWis: number | null;
  savingThrowCha: number | null;
  damageImmunities: string[]; // Array of damage immunities (e.g., ["fire", "poison"])
  damageResistances: string[]; // Array of damage resistances
  damageVulnerabilities: string[]; // Array of damage vulnerabilities
  conditionImmunities: string[]; // Array of condition immunities
  senses: string;
  languages: string;
  traits: string;
  actions: string;
  bonusActions: string;
}

/**
 * Insert represents the complete insert data including both inputs and calculated values.
 * Extends InsertInputs - the skills.value fields are populated at runtime.
 */
export interface Insert extends InsertInputs {}
