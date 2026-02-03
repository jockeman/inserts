import { describe, expect, it } from 'vitest';
import { formatAbilityScore, formatBonus, formatModifierOnly } from '../utils/cardHelpers';

describe('cardHelpers', () => {
  describe('formatAbilityScore', () => {
    it('should format ability score with modifier correctly', () => {
      expect(formatAbilityScore(10)).toBe('10 (+0)');
      expect(formatAbilityScore(12)).toBe('12 (+1)');
      expect(formatAbilityScore(8)).toBe('8 (-1)');
      expect(formatAbilityScore(18)).toBe('18 (+4)');
      expect(formatAbilityScore(1)).toBe('1 (-5)');
    });

    it('should handle NaN values', () => {
      expect(formatAbilityScore(Number.NaN)).toBe('');
    });
  });

  describe('formatModifierOnly', () => {
    it('should format only the modifier with correct sign', () => {
      expect(formatModifierOnly(10)).toBe('+0');
      expect(formatModifierOnly(12)).toBe('+1');
      expect(formatModifierOnly(8)).toBe('-1');
      expect(formatModifierOnly(18)).toBe('+4');
      expect(formatModifierOnly(1)).toBe('-5');
    });

    it('should handle NaN values', () => {
      expect(formatModifierOnly(Number.NaN)).toBe('');
    });
  });

  describe('formatBonus', () => {
    it('should format numeric bonuses with correct sign', () => {
      expect(formatBonus(0)).toBe('');
      expect(formatBonus(3)).toBe('+3');
      expect(formatBonus(-2)).toBe('-2');
      expect(formatBonus(10)).toBe('+10');
    });

    it('should handle string bonuses', () => {
      expect(formatBonus('5')).toBe('+5');
      expect(formatBonus('-3')).toBe('-3');
      expect(formatBonus('0')).toBe('');
    });

    it('should handle empty or invalid strings', () => {
      expect(formatBonus('')).toBe('');
      expect(formatBonus('abc')).toBe('');
    });
  });
});
