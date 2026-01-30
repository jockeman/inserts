import type { ClassName } from '../utils/classConfig';
import type { ProficiencyLevel } from '../utils/skillConfig';

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
  race: string;
  class: ClassName;
  ac: number;

  // Player passive skills (can be calculated or manually entered)
  perception: number;
  insight: number;
  investigation: number;
  arcana: number;
  nature: number;
  survival: number;
  stealth: number;

  // Player fields
  level: number;

  // Player - override flags (inputs)
  proficiencyBonusOverride: boolean;
  maxHPOverride: boolean;
  darkvisionOverride: boolean;

  // Player - manual override values (inputs when override is true)
  playerProficiencyBonus: number;
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
  monsterSize: string;
  monsterType: string;
  cr: string; // Challenge Rating (e.g., "1/4", "2", "10")
  speed: string;
  acType: string; // Armor type (e.g., "natural armor", "leather armor")
  hpFormula: string; // Dice formula for HP (e.g., "33d20 + 330")
  savingThrows: string;
  skills: string;
  damageImmunities: string;
  damageResistances: string;
  damageVulnerabilities: string;
  conditionImmunities: string;
  senses: string;
  languages: string;
  proficiencyBonus: number;
  traits: string;
  actions: string;
  bonusActions: string;
}

/**
 * Insert represents the complete insert data including both inputs and calculated values.
 * For player cards, calculated values are derived from inputs by calculateAdvancedPlayerValues.
 */
export interface Insert extends InsertInputs {
  // Player - calculated passive skill values
  // These are calculated from ability scores, proficiency levels, proficiency bonus, and modifiers
  // (unless overridden by manual input)
  acrobatics: number;
  animalHandling: number;
  athletics: number;
  deception: number;
  history: number;
  intimidation: number;
  medicine: number;
  performance: number;
  persuasion: number;
  religion: number;
  sleightOfHand: number;
}
