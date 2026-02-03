import type { Insert, MonsterSize, MonsterType, SkillName } from '../types/Insert';
import { createEmptySkills } from './skillHelpers';

// Valid D&D 5e monster sizes
const VALID_SIZES: MonsterSize[] = ['Tiny', 'Small', 'Medium', 'Large', 'Huge', 'Gargantuan'];

// Valid D&D 5e monster types
const VALID_TYPES: MonsterType[] = [
  'Aberration',
  'Beast',
  'Celestial',
  'Construct',
  'Dragon',
  'Elemental',
  'Fey',
  'Fiend',
  'Giant',
  'Humanoid',
  'Monstrosity',
  'Ooze',
  'Plant',
  'Undead',
];

export function parseMonsterStatBlock(text: string): Partial<Insert> {
  const lines = text
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line);

  const result: Partial<Insert> = {
    cardType: 'monster',
    size: 'small',
    skills: createEmptySkills(),
  };

  let currentSection = '';
  const traitsLines: string[] = [];
  const actionsLines: string[] = [];
  const bonusActionsLines: string[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Detect sections
    if (line === 'Actions') {
      currentSection = 'actions';
      continue;
    }
    if (line === 'Bonus Actions') {
      currentSection = 'bonusActions';
      continue;
    }
    if (line === 'Reactions') {
      currentSection = 'reactions';
      continue;
    }

    // Parse name (first line)
    if (i === 0) {
      result.name = line;
      continue;
    }

    // Parse type (second line, contains alignment)
    if (
      i === 1 &&
      (line.includes('Humanoid') ||
        line.includes('Beast') ||
        line.includes('Dragon') ||
        line.includes('Undead') ||
        line.includes('Fiend') ||
        line.includes('Celestial') ||
        line.includes('Construct') ||
        line.includes('Elemental') ||
        line.includes('Fey') ||
        line.includes('Giant') ||
        line.includes('Monstrosity') ||
        line.includes('Ooze') ||
        line.includes('Plant') ||
        line.includes('Aberration'))
    ) {
      // Extract size and type separately
      const fullType = line.replace(/, (Any|Lawful|Neutral|Chaotic|Good|Evil|Unaligned).*$/i, '');
      // Try to extract size (Tiny, Small, Medium, Large, Huge, Gargantuan)
      const sizeMatch = fullType.match(/^(Tiny|Small|Medium|Large|Huge|Gargantuan)\s+/i);
      if (sizeMatch) {
        const size = sizeMatch[1].charAt(0).toUpperCase() + sizeMatch[1].slice(1).toLowerCase();
        if (VALID_SIZES.includes(size as MonsterSize)) {
          result.monsterSize = size as MonsterSize;
        }
        const typeText = fullType.substring(sizeMatch[0].length).trim();
        // Extract base type (before any subtype in parentheses)
        const baseType = typeText.split('(')[0].trim();
        // Validate against known types
        const matchedType = VALID_TYPES.find((t) => t.toLowerCase() === baseType.toLowerCase());
        if (matchedType) {
          result.monsterType = matchedType;
        }
        // Extract tag/subtype from parentheses (e.g., "goblinoid" from "Humanoid (goblinoid)")
        const tagMatch = typeText.match(/\(([^)]+)\)/);
        if (tagMatch) {
          result.monsterTypeTag = tagMatch[1].trim();
        }
      }
      continue;
    }

    // CR
    if (line.startsWith('CR ')) {
      const crMatch = line.match(/CR\s+([\d/]+)/);
      if (crMatch) result.cr = crMatch[1];
      continue;
    }

    // Armor Class
    if (line.startsWith('Armor Class ')) {
      const acLine = line.replace('Armor Class ', '');
      // Extract the number (e.g., "15" from "15 (natural armor)")
      const acMatch = acLine.match(/^(\d+)/);
      if (acMatch) result.ac = Number.parseInt(acMatch[1], 10);
      // Extract the armor type from parentheses (e.g., "natural armor" from "15 (natural armor)")
      const typeMatch = acLine.match(/\(([^)]+)\)/);
      if (typeMatch) result.acType = typeMatch[1];
      continue;
    }

    // Hit Points
    if (line.startsWith('Hit Points ')) {
      const hpLine = line.replace('Hit Points ', '');
      // Extract the number (e.g., "365" from "365 (33d20 + 330)")
      const hpMatch = hpLine.match(/^(\d+)/);
      if (hpMatch) result.hp = Number.parseInt(hpMatch[1], 10);
      // Extract the dice formula from parentheses (e.g., "33d20 + 330" from "365 (33d20 + 330)")
      const formulaMatch = hpLine.match(/\(([^)]+)\)/);
      if (formulaMatch) result.hpFormula = formulaMatch[1];
      continue;
    }

    // Speed
    if (line.startsWith('Speed ')) {
      result.speed = line.replace('Speed ', '');
      continue;
    }

    // Ability scores - look for lines with just the ability name
    if (line === 'STR' && i + 1 < lines.length) {
      const nextLine = lines[i + 1];
      const match = nextLine.match(/^(\d+)/);
      if (match) result.str = Number.parseInt(match[1], 10);
      continue;
    }
    if (line === 'DEX' && i + 1 < lines.length) {
      const nextLine = lines[i + 1];
      const match = nextLine.match(/^(\d+)/);
      if (match) result.dex = Number.parseInt(match[1], 10);
      continue;
    }
    if (line === 'CON' && i + 1 < lines.length) {
      const nextLine = lines[i + 1];
      const match = nextLine.match(/^(\d+)/);
      if (match) result.con = Number.parseInt(match[1], 10);
      continue;
    }
    if (line === 'INT' && i + 1 < lines.length) {
      const nextLine = lines[i + 1];
      const match = nextLine.match(/^(\d+)/);
      if (match) result.int = Number.parseInt(match[1], 10);
      continue;
    }
    if (line === 'WIS' && i + 1 < lines.length) {
      const nextLine = lines[i + 1];
      const match = nextLine.match(/^(\d+)/);
      if (match) result.wis = Number.parseInt(match[1], 10);
      continue;
    }
    if (line === 'CHA' && i + 1 < lines.length) {
      const nextLine = lines[i + 1];
      const match = nextLine.match(/^(\d+)/);
      if (match) result.cha = Number.parseInt(match[1], 10);
      continue;
    }

    // Saving Throws
    if (line.startsWith('Saving Throws ')) {
      const savesText = line.replace('Saving Throws ', '');

      // Parse individual saves like "Str +2, Dex +4, Wis +6"
      const saveMap: Record<string, keyof Insert> = {
        Str: 'savingThrowStr',
        Dex: 'savingThrowDex',
        Con: 'savingThrowCon',
        Int: 'savingThrowInt',
        Wis: 'savingThrowWis',
        Cha: 'savingThrowCha',
      };

      // Split by comma and parse each save
      const saves = savesText.split(',').map((s) => s.trim());
      for (const save of saves) {
        for (const [saveName, fieldName] of Object.entries(saveMap)) {
          if (save.startsWith(saveName)) {
            // Extract the bonus value (e.g., "+2" or "-1")
            const match = save.match(/([+−-]\d+)/);
            if (match) {
              const bonus = Number.parseInt(match[1].replace('−', '-'), 10);
              if (!Number.isNaN(bonus)) {
                (result as any)[fieldName] = bonus;
              }
            }
            break;
          }
        }
      }
      continue;
    }

    // Skills
    if (line.startsWith('Skills ')) {
      const skillsText = line.replace('Skills ', '');

      // Parse individual skills like "Perception +13, Stealth +9"
      const skillMap: Record<string, SkillName> = {
        Acrobatics: 'acrobatics',
        'Animal Handling': 'animalHandling',
        Arcana: 'arcana',
        Athletics: 'athletics',
        Deception: 'deception',
        History: 'history',
        Insight: 'insight',
        Intimidation: 'intimidation',
        Investigation: 'investigation',
        Medicine: 'medicine',
        Nature: 'nature',
        Perception: 'perception',
        Performance: 'performance',
        Persuasion: 'persuasion',
        Religion: 'religion',
        'Sleight of Hand': 'sleightOfHand',
        Stealth: 'stealth',
        Survival: 'survival',
      };

      // Initialize skills object if not already present
      if (!result.skills) {
        result.skills = createEmptySkills();
      }

      // Split by comma and parse each skill
      const skills = skillsText.split(',').map((s) => s.trim());
      for (const skill of skills) {
        for (const [skillName, skillKey] of Object.entries(skillMap)) {
          if (skill.startsWith(skillName)) {
            // Extract the bonus value (e.g., "+13" or "-2")
            const match = skill.match(/([+−-]\d+)/);
            if (match) {
              const bonus = Number.parseInt(match[1].replace('−', '-'), 10);
              if (!Number.isNaN(bonus)) {
                result.skills[skillKey] = {
                  proficiency: 'none',
                  modifier: bonus,
                };
              }
            }
            break;
          }
        }
      }
      continue;
    }

    // Damage Immunities
    if (line.startsWith('Damage Immunities ')) {
      const immunitiesText = line.replace('Damage Immunities ', '');
      // Split by comma or semicolon and trim each item
      result.damageImmunities = immunitiesText
        .split(/[,;]/)
        .map((item) => item.trim())
        .filter((item) => item.length > 0);
      continue;
    }

    // Damage Resistances
    if (line.startsWith('Damage Resistances ')) {
      const resistancesText = line.replace('Damage Resistances ', '');
      // Split by comma or semicolon and trim each item
      result.damageResistances = resistancesText
        .split(/[,;]/)
        .map((item) => item.trim())
        .filter((item) => item.length > 0);
      continue;
    }

    // Damage Vulnerabilities
    if (line.startsWith('Damage Vulnerabilities ')) {
      const vulnerabilitiesText = line.replace('Damage Vulnerabilities ', '');
      // Split by comma or semicolon and trim each item
      result.damageVulnerabilities = vulnerabilitiesText
        .split(/[,;]/)
        .map((item) => item.trim())
        .filter((item) => item.length > 0);
      continue;
    }

    // Condition Immunities
    if (line.startsWith('Condition Immunities ')) {
      const conditionsText = line.replace('Condition Immunities ', '');
      // Split by comma or semicolon and trim each item
      result.conditionImmunities = conditionsText
        .split(/[,;]/)
        .map((item) => item.trim())
        .filter((item) => item.length > 0);
      continue;
    }

    // Senses
    if (line.startsWith('Senses ')) {
      const sensesText = line.replace('Senses ', '');
      const senses: Record<string, string> = {};
      let passivePerception: number | null = null;

      const parts = sensesText.split(',').map((s) => s.trim());
      for (const part of parts) {
        // Check for passive Perception
        const passiveMatch = part.match(/passive\s+perception\s+(\d+)/i);
        if (passiveMatch) {
          passivePerception = Number.parseInt(passiveMatch[1], 10);
          continue;
        }

        // Parse sense with range (e.g., \"darkvision 60 ft.\")
        const senseMatch = part.match(/^([a-z\s]+?)\s+(\d+\s*ft\.?)$/i);
        if (senseMatch) {
          const senseName = senseMatch[1].trim().toLowerCase();
          const range = senseMatch[2].trim();
          senses[senseName] = range;
        } else if (part.trim()) {
          // Store as-is if it doesn't match expected format
          senses[part.trim()] = '';
        }
      }

      result.senses = senses;

      // Convert passive perception to perception skill modifier
      if (passivePerception !== null && result.skills) {
        // Passive Perception = 10 + Perception modifier
        const perceptionModifier = passivePerception - 10;
        result.skills.perception = {
          ...result.skills.perception,
          modifier: perceptionModifier,
        };
      }
      continue;
    }

    // Languages
    if (line.startsWith('Languages ')) {
      const languagesText = line.replace('Languages ', '');
      // Handle special cases
      if (languagesText === '—' || languagesText === '-' || languagesText.toLowerCase() === 'none') {
        result.languages = [];
      } else {
        result.languages = languagesText
          .split(/[,;]/)
          .map((lang) => lang.trim())
          .filter((lang) => lang.length > 0);
      }
      continue;
    }

    // Proficiency Bonus
    if (line.startsWith('Proficiency Bonus ')) {
      const bonusStr = line.replace('Proficiency Bonus ', '').replace('+', '');
      const bonus = Number.parseInt(bonusStr, 10);
      if (!Number.isNaN(bonus)) result.proficiencyBonus = bonus;
      continue;
    }

    // Skip XP and other non-stat lines
    if (
      line.includes('XP') ||
      line.includes('Controller') ||
      line.includes('Brute') ||
      line.includes('Skirmisher') ||
      line.includes('Defender') ||
      line.includes('Lurker') ||
      line.match(/^\d+\s*\([−+\-\d]+\)$/)
    ) {
      continue;
    }

    // Everything else goes into the appropriate section
    if (currentSection === 'actions') {
      actionsLines.push(line);
    } else if (currentSection === 'bonusActions') {
      bonusActionsLines.push(line);
    } else if (currentSection === '' && i > 5) {
      // After basic stats, before Actions section = traits
      traitsLines.push(line);
    }
  }

  if (traitsLines.length > 0) {
    result.traits = traitsLines.join('\n');
  }
  if (actionsLines.length > 0) {
    result.actions = actionsLines.join('\n');
  }
  if (bonusActionsLines.length > 0) {
    result.bonusActions = bonusActionsLines.join('\n');
  }

  return result;
}
