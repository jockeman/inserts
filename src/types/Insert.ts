import { ProficiencyLevel } from '../utils/skillConfig';

/**
 * InsertInputs represents the data that is stored in localStorage.
 * This includes user inputs and override flags, but excludes calculated values.
 */
export interface InsertInputs {
  // Basic info
  name: string;
  image: string;
  cardType: 'player' | 'player-advanced' | 'monster';
  size: 'small' | 'large';
  selected: boolean;
  
  // Player/Monster common fields (inputs)
  race: string;
  class: string;
  ac: string;
  
  // Simple player card fields (all inputs)
  perception: string;
  insight: string;
  investigation: string;
  arcana: string;
  nature: string;
  survival: string;
  stealth: string;
  
  // Advanced player fields - ability scores (inputs)
  level: string;
  playerStr: string;
  playerDex: string;
  playerCon: string;
  playerInt: string;
  playerWis: string;
  playerCha: string;
  
  // Advanced player - override flags (inputs)
  proficiencyBonusOverride: boolean;
  maxHPOverride: boolean;
  darkvisionOverride: boolean;
  
  // Advanced player - manual override values (inputs when override is true)
  playerProficiencyBonus: string;
  hp: string;
  darkvision: string;
  
  // Advanced player - proficiency levels (inputs)
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
  modAcrobatics: string;
  modAnimalHandling: string;
  modArcana: string;
  modAthletics: string;
  modDeception: string;
  modHistory: string;
  modInsight: string;
  modIntimidation: string;
  modInvestigation: string;
  modMedicine: string;
  modNature: string;
  modPerception: string;
  modPerformance: string;
  modPersuasion: string;
  modReligion: string;
  modSleightOfHand: string;
  modStealth: string;
  modSurvival: string;
  
  // Monster-specific fields (all inputs)
  monsterSize: string;
  monsterType: string;
  cr: string;
  speed: string;
  str: string;
  dex: string;
  con: string;
  int: string;
  wis: string;
  cha: string;
  savingThrows: string;
  skills: string;
  damageImmunities: string;
  damageResistances: string;
  damageVulnerabilities: string;
  conditionImmunities: string;
  senses: string;
  languages: string;
  proficiencyBonus: string;
  traits: string;
  actions: string;
  bonusActions: string;
}

/**
 * Insert represents the complete insert data including both inputs and calculated values.
 * For advanced player cards, calculated values are derived from inputs by calculateAdvancedPlayerValues.
 */
export interface Insert extends InsertInputs {
  // Advanced player - calculated passive skill values
  // These are calculated from ability scores, proficiency levels, proficiency bonus, and modifiers
  acrobatics: string;
  animalHandling: string;
  athletics: string;
  deception: string;
  history: string;
  intimidation: string;
  medicine: string;
  performance: string;
  persuasion: string;
  religion: string;
  sleightOfHand: string;
}
