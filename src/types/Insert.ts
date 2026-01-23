export interface Insert {
  name: string;
  image: string;
  cardType: 'player' | 'monster';
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
  // Monster-specific fields
  monsterType: string; // e.g., "Small Humanoid (Angulotl)"
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
