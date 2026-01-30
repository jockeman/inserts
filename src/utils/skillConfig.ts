import type { Insert } from '../types/Insert';
import type { UserPreferences } from '../types/UserPreferences';

export type AbilityType = 'str' | 'dex' | 'con' | 'int' | 'wis' | 'cha';
export type ProficiencyLevel = 'none' | 'proficient' | 'expert';

export interface SkillInfo {
  label: string;
  ability: AbilityType;
  passiveField: keyof Insert;
  profField: keyof Insert;
  modField: keyof Insert;
}

export const ALL_SKILLS: Record<string, SkillInfo> = {
  acrobatics: {
    label: 'Acrobatics',
    ability: 'dex',
    passiveField: 'acrobatics',
    profField: 'profAcrobatics',
    modField: 'modAcrobatics',
  },
  animalHandling: {
    label: 'Animal Handling',
    ability: 'wis',
    passiveField: 'animalHandling',
    profField: 'profAnimalHandling',
    modField: 'modAnimalHandling',
  },
  arcana: {
    label: 'Arcana',
    ability: 'int',
    passiveField: 'arcana',
    profField: 'profArcana',
    modField: 'modArcana',
  },
  athletics: {
    label: 'Athletics',
    ability: 'str',
    passiveField: 'athletics',
    profField: 'profAthletics',
    modField: 'modAthletics',
  },
  deception: {
    label: 'Deception',
    ability: 'cha',
    passiveField: 'deception',
    profField: 'profDeception',
    modField: 'modDeception',
  },
  history: {
    label: 'History',
    ability: 'int',
    passiveField: 'history',
    profField: 'profHistory',
    modField: 'modHistory',
  },
  insight: {
    label: 'Insight',
    ability: 'wis',
    passiveField: 'insight',
    profField: 'profInsight',
    modField: 'modInsight',
  },
  intimidation: {
    label: 'Intimidation',
    ability: 'cha',
    passiveField: 'intimidation',
    profField: 'profIntimidation',
    modField: 'modIntimidation',
  },
  investigation: {
    label: 'Investigation',
    ability: 'int',
    passiveField: 'investigation',
    profField: 'profInvestigation',
    modField: 'modInvestigation',
  },
  medicine: {
    label: 'Medicine',
    ability: 'wis',
    passiveField: 'medicine',
    profField: 'profMedicine',
    modField: 'modMedicine',
  },
  nature: {
    label: 'Nature',
    ability: 'int',
    passiveField: 'nature',
    profField: 'profNature',
    modField: 'modNature',
  },
  perception: {
    label: 'Perception',
    ability: 'wis',
    passiveField: 'perception',
    profField: 'profPerception',
    modField: 'modPerception',
  },
  performance: {
    label: 'Performance',
    ability: 'cha',
    passiveField: 'performance',
    profField: 'profPerformance',
    modField: 'modPerformance',
  },
  persuasion: {
    label: 'Persuasion',
    ability: 'cha',
    passiveField: 'persuasion',
    profField: 'profPersuasion',
    modField: 'modPersuasion',
  },
  religion: {
    label: 'Religion',
    ability: 'int',
    passiveField: 'religion',
    profField: 'profReligion',
    modField: 'modReligion',
  },
  sleightOfHand: {
    label: 'Sleight of Hand',
    ability: 'dex',
    passiveField: 'sleightOfHand',
    profField: 'profSleightOfHand',
    modField: 'modSleightOfHand',
  },
  stealth: {
    label: 'Stealth',
    ability: 'dex',
    passiveField: 'stealth',
    profField: 'profStealth',
    modField: 'modStealth',
  },
  survival: {
    label: 'Survival',
    ability: 'wis',
    passiveField: 'survival',
    profField: 'profSurvival',
    modField: 'modSurvival',
  },
};

export function getVisibleSkills(preferences: UserPreferences): Array<[string, SkillInfo]> {
  return Object.entries(ALL_SKILLS).filter(
    ([key]) => preferences.skillVisibility[key as keyof typeof preferences.skillVisibility]
  );
}
