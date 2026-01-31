import {
  FaBook,
  FaBrain,
  FaBriefcaseMedical,
  FaComments,
  FaDumbbell,
  FaEye,
  FaHandPaper,
  FaHandRock,
  FaMusic,
  FaPaw,
  FaPray,
  FaScroll,
  FaSearch,
  FaTheaterMasks,
  FaUserSecret,
} from 'react-icons/fa';
import { GiCampingTent, GiJumpingRope } from 'react-icons/gi';
import type { Insert } from '../types/Insert';
import type { UserPreferences } from '../types/UserPreferences';

type AbilityType = 'str' | 'dex' | 'con' | 'int' | 'wis' | 'cha';
export type ProficiencyLevel = 'none' | 'half' | 'proficient' | 'expert';

export interface SkillInfo {
  label: string;
  ability: AbilityType;
  passiveField: keyof Insert;
  profField: keyof Insert;
  modField: keyof Insert;
  icon: React.ElementType;
}

export const ALL_SKILLS: Record<string, SkillInfo> = {
  acrobatics: {
    label: 'Acrobatics',
    ability: 'dex',
    passiveField: 'acrobatics',
    profField: 'profAcrobatics',
    modField: 'modAcrobatics',
    icon: GiJumpingRope,
  },
  animalHandling: {
    label: 'Animal Handling',
    ability: 'wis',
    passiveField: 'animalHandling',
    profField: 'profAnimalHandling',
    modField: 'modAnimalHandling',
    icon: FaPaw,
  },
  arcana: {
    label: 'Arcana',
    ability: 'int',
    passiveField: 'arcana',
    profField: 'profArcana',
    modField: 'modArcana',
    icon: FaBook,
  },
  athletics: {
    label: 'Athletics',
    ability: 'str',
    passiveField: 'athletics',
    profField: 'profAthletics',
    modField: 'modAthletics',
    icon: FaDumbbell,
  },
  deception: {
    label: 'Deception',
    ability: 'cha',
    passiveField: 'deception',
    profField: 'profDeception',
    modField: 'modDeception',
    icon: FaTheaterMasks,
  },
  history: {
    label: 'History',
    ability: 'int',
    passiveField: 'history',
    profField: 'profHistory',
    modField: 'modHistory',
    icon: FaScroll,
  },
  insight: {
    label: 'Insight',
    ability: 'wis',
    passiveField: 'insight',
    profField: 'profInsight',
    modField: 'modInsight',
    icon: FaBrain,
  },
  intimidation: {
    label: 'Intimidation',
    ability: 'cha',
    passiveField: 'intimidation',
    profField: 'profIntimidation',
    modField: 'modIntimidation',
    icon: FaHandRock,
  },
  investigation: {
    label: 'Investigation',
    ability: 'int',
    passiveField: 'investigation',
    profField: 'profInvestigation',
    modField: 'modInvestigation',
    icon: FaSearch,
  },
  medicine: {
    label: 'Medicine',
    ability: 'wis',
    passiveField: 'medicine',
    profField: 'profMedicine',
    modField: 'modMedicine',
    icon: FaBriefcaseMedical,
  },
  nature: {
    label: 'Nature',
    ability: 'int',
    passiveField: 'nature',
    profField: 'profNature',
    modField: 'modNature',
    icon: FaBook,
  },
  perception: {
    label: 'Perception',
    ability: 'wis',
    passiveField: 'perception',
    profField: 'profPerception',
    modField: 'modPerception',
    icon: FaEye,
  },
  performance: {
    label: 'Performance',
    ability: 'cha',
    passiveField: 'performance',
    profField: 'profPerformance',
    modField: 'modPerformance',
    icon: FaMusic,
  },
  persuasion: {
    label: 'Persuasion',
    ability: 'cha',
    passiveField: 'persuasion',
    profField: 'profPersuasion',
    modField: 'modPersuasion',
    icon: FaComments,
  },
  religion: {
    label: 'Religion',
    ability: 'int',
    passiveField: 'religion',
    profField: 'profReligion',
    modField: 'modReligion',
    icon: FaPray,
  },
  sleightOfHand: {
    label: 'Sleight of Hand',
    ability: 'dex',
    passiveField: 'sleightOfHand',
    profField: 'profSleightOfHand',
    modField: 'modSleightOfHand',
    icon: FaHandPaper,
  },
  stealth: {
    label: 'Stealth',
    ability: 'dex',
    passiveField: 'stealth',
    profField: 'profStealth',
    modField: 'modStealth',
    icon: FaUserSecret,
  },
  survival: {
    label: 'Survival',
    ability: 'wis',
    passiveField: 'survival',
    profField: 'profSurvival',
    modField: 'modSurvival',
    icon: GiCampingTent,
  },
};

export function getVisibleSkills(preferences: UserPreferences): Array<[string, SkillInfo]> {
  return Object.entries(ALL_SKILLS).filter(
    ([key]) => preferences.skillVisibility[key as keyof typeof preferences.skillVisibility]
  );
}
