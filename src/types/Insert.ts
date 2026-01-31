import type { ClassName } from '../utils/classConfig';
import type { RaceName } from '../utils/raceConfig';
import type { ProficiencyLevel } from '../utils/skillConfig';

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

  // Player - proficiency levels (inputs)
  profAcrobatics: ProficiencyLevel;
  profAnimalHandling: ProficiencyLevel;
  profArcana: ProficiencyLevel;
  profAthletics: ProficiencyLevel;
  profDeception: ProficiencyLevel;
  profHistory: ProficiencyLevel;
  profInsight: ProficiencyLevel;
  profIntimidation: ProficiencyLevel;
  profInvestigation: ProficiencyLevel;
  profMedicine: ProficiencyLevel;
  profNature: ProficiencyLevel;
  profPerception: ProficiencyLevel;
  profPerformance: ProficiencyLevel;
  profPersuasion: ProficiencyLevel;
  profReligion: ProficiencyLevel;
  profSleightOfHand: ProficiencyLevel;
  profStealth: ProficiencyLevel;
  profSurvival: ProficiencyLevel;

  // Advanced player - manual modifiers (inputs)
  modAcrobatics: number;
  modAnimalHandling: number;
  modArcana: number;
  modAthletics: number;
  modDeception: number;
  modHistory: number;
  modInsight: number;
  modIntimidation: number;
  modInvestigation: number;
  modMedicine: number;
  modNature: number;
  modPerception: number;
  modPerformance: number;
  modPersuasion: number;
  modReligion: number;
  modSleightOfHand: number;
  modStealth: number;
  modSurvival: number;

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
 * For player cards, skill values are calculated from proficiency and modifiers.
 * For monster cards, skill values come directly from the modifier fields.
 */
export interface Insert extends InsertInputs {
  // Calculated/runtime skill values
  // For players: calculated from ability scores, proficiency, and modifiers
  // For monsters: copied from modifier fields for display
  acrobatics?: number;
  animalHandling?: number;
  athletics?: number;
  deception?: number;
  history?: number;
  intimidation?: number;
  medicine?: number;
  performance?: number;
  persuasion?: number;
  religion?: number;
  sleightOfHand?: number;
  perception?: number;
  insight?: number;
  investigation?: number;
  arcana?: number;
  nature?: number;
  survival?: number;
  stealth?: number;
}
