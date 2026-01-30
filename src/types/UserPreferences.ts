export interface SkillVisibility {
  acrobatics: boolean;
  animalHandling: boolean;
  arcana: boolean;
  athletics: boolean;
  deception: boolean;
  history: boolean;
  insight: boolean;
  intimidation: boolean;
  investigation: boolean;
  medicine: boolean;
  nature: boolean;
  perception: boolean;
  performance: boolean;
  persuasion: boolean;
  religion: boolean;
  sleightOfHand: boolean;
  stealth: boolean;
  survival: boolean;
}

export interface UserPreferences {
  skillVisibility: SkillVisibility;
}

export const USER_PREFS_KEY = 'rpg-inserts-preferences';

export const DEFAULT_SKILL_VISIBILITY: SkillVisibility = {
  acrobatics: false,
  animalHandling: false,
  arcana: true,
  athletics: false,
  deception: false,
  history: false,
  insight: true,
  intimidation: false,
  investigation: true,
  medicine: false,
  nature: true,
  perception: true,
  performance: false,
  persuasion: false,
  religion: false,
  sleightOfHand: false,
  stealth: true,
  survival: true,
};

export const DEFAULT_PREFERENCES: UserPreferences = {
  skillVisibility: DEFAULT_SKILL_VISIBILITY,
};
