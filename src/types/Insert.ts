export interface Insert {
  name: string;
  image: string;
  cardType: 'player' | 'player-advanced' | 'monster';
  size: 'small' | 'large';
  // Player/Monster common fields
  race: string;
  class: string;
  ac: string;
  hp: string;
  // Player-specific fields
  perception: string;
  insight: string;
  investigation: string;
  arcana: string;
  nature: string;
  survival: string;
  stealth: string;
  darkvision: string;
  // Advanced player fields
  level: string;
  playerStr: string;
  playerDex: string;
  playerCon: string;
  playerInt: string;
  playerWis: string;
  playerCha: string;
  playerProficiencyBonus: string;
  proficiencyBonusOverride: boolean;
  maxHPOverride: boolean;
  darkvisionOverride: boolean;
  // All 18 D&D skills (passive values)
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
  // Proficiency levels
  profAcrobatics: string;
  profAnimalHandling: string;
  profArcana: string;
  profAthletics: string;
  profDeception: string;
  profHistory: string;
  profInsight: string;
  profIntimidation: string;
  profInvestigation: string;
  profMedicine: string;
  profNature: string;
  profPerception: string;
  profPerformance: string;
  profPersuasion: string;
  profReligion: string;
  profSleightOfHand: string;
  profStealth: string;
  profSurvival: string;
  // Manual modifiers
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
  // Monster-specific fields
  monsterSize: string; // e.g., "Small"
  monsterType: string; // e.g., "Humanoid (Angulotl)"
  cr: string; // Challenge Rating
  speed: string; // e.g., "20 ft., climb 20 ft., swim 30 ft."
  str: string;
  dex: string;
  con: string;
  int: string;
  wis: string;
  cha: string;
  savingThrows: string; // e.g., "Str +2, Dex +4"
  skills: string; // e.g., "Perception +4, Stealth +4"
  damageImmunities: string;
  damageResistances: string;
  damageVulnerabilities: string;
  conditionImmunities: string;
  senses: string; // e.g., "darkvision 60 ft., passive Perception 14"
  languages: string;
  proficiencyBonus: string;
  traits: string; // Special abilities/traits (multiline)
  actions: string; // Actions (multiline)
  bonusActions: string; // Bonus Actions (multiline)
  selected: boolean;
}
