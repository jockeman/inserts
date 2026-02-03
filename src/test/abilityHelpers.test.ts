import { describe, expect, it } from 'vitest';
import { ABILITY_LABELS, calculateAbilityModifier } from '../utils/abilityHelpers';

describe('abilityHelpers', () => {
  describe('calculateAbilityModifier', () => {
    it('should calculate modifier correctly for various ability scores', () => {
      // Test the standard D&D 5e ability modifier formula: floor((score - 10) / 2)
      expect(calculateAbilityModifier(1)).toBe(-5);
      expect(calculateAbilityModifier(8)).toBe(-1);
      expect(calculateAbilityModifier(10)).toBe(0);
      expect(calculateAbilityModifier(11)).toBe(0);
      expect(calculateAbilityModifier(12)).toBe(1);
      expect(calculateAbilityModifier(15)).toBe(2);
      expect(calculateAbilityModifier(18)).toBe(4);
      expect(calculateAbilityModifier(20)).toBe(5);
      expect(calculateAbilityModifier(30)).toBe(10);
    });

    it('should handle edge case of 0', () => {
      expect(calculateAbilityModifier(0)).toBe(-5);
    });
  });

  describe('ABILITY_LABELS', () => {
    it('should contain all expected ability labels', () => {
      expect(ABILITY_LABELS.str).toBe('STR');
      expect(ABILITY_LABELS.dex).toBe('DEX');
      expect(ABILITY_LABELS.con).toBe('CON');
      expect(ABILITY_LABELS.int).toBe('INT');
      expect(ABILITY_LABELS.wis).toBe('WIS');
      expect(ABILITY_LABELS.cha).toBe('CHA');
    });

    it('should have exactly 6 abilities', () => {
      expect(Object.keys(ABILITY_LABELS)).toHaveLength(6);
    });
  });
});
