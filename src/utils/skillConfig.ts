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
import type { SkillName } from '../types/Insert';
import type { UserPreferences } from '../types/UserPreferences';

type AbilityType = 'str' | 'dex' | 'con' | 'int' | 'wis' | 'cha';
export type ProficiencyLevel = 'none' | 'half' | 'proficient' | 'expert';

export interface SkillInfo {
  label: string;
  ability: AbilityType;
  key: SkillName; // The key in the skills object
  icon: React.ElementType;
}

export const ALL_SKILLS: Record<SkillName, SkillInfo> = {
  acrobatics: {
    label: 'Acrobatics',
    ability: 'dex',
    key: 'acrobatics',
    icon: GiJumpingRope,
  },
  animalHandling: {
    label: 'Animal Handling',
    ability: 'wis',
    key: 'animalHandling',
    icon: FaPaw,
  },
  arcana: {
    label: 'Arcana',
    ability: 'int',
    key: 'arcana',
    icon: FaBook,
  },
  athletics: {
    label: 'Athletics',
    ability: 'str',
    key: 'athletics',
    icon: FaDumbbell,
  },
  deception: {
    label: 'Deception',
    ability: 'cha',
    key: 'deception',
    icon: FaTheaterMasks,
  },
  history: {
    label: 'History',
    ability: 'int',
    key: 'history',
    icon: FaScroll,
  },
  insight: {
    label: 'Insight',
    ability: 'wis',
    key: 'insight',
    icon: FaBrain,
  },
  intimidation: {
    label: 'Intimidation',
    ability: 'cha',
    key: 'intimidation',
    icon: FaHandRock,
  },
  investigation: {
    label: 'Investigation',
    ability: 'int',
    key: 'investigation',
    icon: FaSearch,
  },
  medicine: {
    label: 'Medicine',
    ability: 'wis',
    key: 'medicine',
    icon: FaBriefcaseMedical,
  },
  nature: {
    label: 'Nature',
    ability: 'int',
    key: 'nature',
    icon: FaBook,
  },
  perception: {
    label: 'Perception',
    ability: 'wis',
    key: 'perception',
    icon: FaEye,
  },
  performance: {
    label: 'Performance',
    ability: 'cha',
    key: 'performance',
    icon: FaMusic,
  },
  persuasion: {
    label: 'Persuasion',
    ability: 'cha',
    key: 'persuasion',
    icon: FaComments,
  },
  religion: {
    label: 'Religion',
    ability: 'int',
    key: 'religion',
    icon: FaPray,
  },
  sleightOfHand: {
    label: 'Sleight of Hand',
    ability: 'dex',
    key: 'sleightOfHand',
    icon: FaHandPaper,
  },
  stealth: {
    label: 'Stealth',
    ability: 'dex',
    key: 'stealth',
    icon: FaUserSecret,
  },
  survival: {
    label: 'Survival',
    ability: 'wis',
    key: 'survival',
    icon: GiCampingTent,
  },
};

export function getVisibleSkills(preferences: UserPreferences): Array<[string, SkillInfo]> {
  return Object.entries(ALL_SKILLS).filter(
    ([key]) => preferences.skillVisibility[key as keyof typeof preferences.skillVisibility]
  );
}
