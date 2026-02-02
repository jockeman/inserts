/**
 * Shared types used across the application
 */

/**
 * D&D 5e ability scores
 */
export type AbilityType = 'str' | 'dex' | 'con' | 'int' | 'wis' | 'cha';

/**
 * Skill proficiency levels
 */
export type ProficiencyLevel = 'none' | 'half' | 'proficient' | 'expert';

/**
 * D&D 5e character classes
 */
export type ClassName =
  | 'Barbarian'
  | 'Bard'
  | 'Cleric'
  | 'Druid'
  | 'Fighter'
  | 'Monk'
  | 'Paladin'
  | 'Ranger'
  | 'Rogue'
  | 'Sorcerer'
  | 'Warlock'
  | 'Wizard';

/**
 * D&D 5e races
 */
export type RaceName =
  | 'Dragonborn'
  | 'Dwarf'
  | 'Elf'
  | 'Gnome'
  | 'Goliath'
  | 'Half-Elf'
  | 'Half-Orc'
  | 'Halfling'
  | 'Human'
  | 'Tabaxi'
  | 'Tiefling';
