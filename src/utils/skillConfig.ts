import {
  FaBook,
  FaBrain,
  FaBriefcaseMedical,
  FaComments,
  FaDumbbell,
  FaEye,
  FaHandPaper,
  FaHandRock,
  FaLeaf,
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
import type { AbilityType } from '../types/Shared';
import type { UserPreferences } from '../types/UserPreferences';

export interface SkillInfo {
  label: string;
  ability: AbilityType;
  key: SkillName;
  icon: React.ElementType;
}

export const ALL_SKILLS: SkillInfo[] = [
  {
    label: 'Acrobatics',
    ability: 'dex',
    key: 'acrobatics',
    icon: GiJumpingRope,
  },
  {
    label: 'Animal Handling',
    ability: 'wis',
    key: 'animalHandling',
    icon: FaPaw,
  },
  {
    label: 'Arcana',
    ability: 'int',
    key: 'arcana',
    icon: FaBook,
  },
  {
    label: 'Athletics',
    ability: 'str',
    key: 'athletics',
    icon: FaDumbbell,
  },
  {
    label: 'Deception',
    ability: 'cha',
    key: 'deception',
    icon: FaTheaterMasks,
  },
  {
    label: 'History',
    ability: 'int',
    key: 'history',
    icon: FaScroll,
  },
  {
    label: 'Insight',
    ability: 'wis',
    key: 'insight',
    icon: FaBrain,
  },
  {
    label: 'Intimidation',
    ability: 'cha',
    key: 'intimidation',
    icon: FaHandRock,
  },
  {
    label: 'Investigation',
    ability: 'int',
    key: 'investigation',
    icon: FaSearch,
  },
  {
    label: 'Medicine',
    ability: 'wis',
    key: 'medicine',
    icon: FaBriefcaseMedical,
  },
  {
    label: 'Nature',
    ability: 'int',
    key: 'nature',
    icon: FaLeaf,
  },
  {
    label: 'Perception',
    ability: 'wis',
    key: 'perception',
    icon: FaEye,
  },
  {
    label: 'Performance',
    ability: 'cha',
    key: 'performance',
    icon: FaMusic,
  },
  {
    label: 'Persuasion',
    ability: 'cha',
    key: 'persuasion',
    icon: FaComments,
  },
  {
    label: 'Religion',
    ability: 'int',
    key: 'religion',
    icon: FaPray,
  },
  {
    label: 'Sleight of Hand',
    ability: 'dex',
    key: 'sleightOfHand',
    icon: FaHandPaper,
  },
  {
    label: 'Stealth',
    ability: 'dex',
    key: 'stealth',
    icon: FaUserSecret,
  },
  {
    label: 'Survival',
    ability: 'wis',
    key: 'survival',
    icon: GiCampingTent,
  },
];

export function getVisibleSkills(preferences: UserPreferences): SkillInfo[] {
  return ALL_SKILLS.filter((skillInfo) => preferences.skillVisibility[skillInfo.key]);
}
