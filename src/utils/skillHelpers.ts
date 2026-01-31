import type { Skill, SkillName } from '../types/Insert';
import { ALL_SKILLS } from './skillConfig';

/**
 * Create an empty skills object with default values
 */
export function createEmptySkills(): Record<SkillName, Skill> {
  const skills: Record<string, Skill> = {};

  for (const skillName of Object.keys(ALL_SKILLS) as SkillName[]) {
    skills[skillName] = {
      proficiency: 'none',
      modifier: 0,
    };
  }

  return skills as Record<SkillName, Skill>;
}
